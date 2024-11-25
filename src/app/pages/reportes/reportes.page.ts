import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StorageService } from 'src/app/services/storage.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { selectAuthUser } from 'src/app/common/core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule, HeaderComponent , CanvasJSAngularChartsModule],
})
export class ReportesPage implements OnInit, OnDestroy{
  user$: Observable<any | null>;
  startDate: string | null = null;
  endDate: string | null = null;
  errorMessage: string | null = null;
  registros: any[] = [];
  chartOptions: any = {};
  loaded = false;

  private registrosSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;

  constructor(    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private store: Store ) {
    this.user$ = this.store.select(selectAuthUser);
  }

  ngOnInit() {

    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.listenToUserDocuments(user.uid);
      } else {
        this.registros = [];
        this.updateChart([]);
        this.loaded = true;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {

    this.userSubscription?.unsubscribe();
    this.registrosSubscription?.unsubscribe();
  }

  listenToUserDocuments(uid: string) {

    this.registrosSubscription?.unsubscribe();

    // Escuchar registros específicos del usuario
    this.registrosSubscription = this.storageService.listenToDocumentsByUid(uid).subscribe((documents) => {
      this.registros = documents;
      this.updateChart(documents);
      this.loaded = true;
      this.cdr.detectChanges();
    },
    (error)=>{
      console.log("Error al escuchar domentos ...")
      this.loaded= true
    }

   );
  }


  updateChart(documents: any[]) {
    const ingresos: { x: Date; y: number; }[] = [];
    const gastos: { x: Date; y: number; }[] = [];

    documents.forEach((doc) => {
      if (doc.data?.fecha && doc.data?.monto && doc.data?.type) {
        const fecha = new Date(doc.data.fecha);
        const monto = parseFloat(doc.data.monto);

        if (doc.data.type === 'ingreso') {
          ingresos.push({ x: fecha, y: monto });
        } else if (doc.data.type === 'gasto') {
          gastos.push({ x: fecha, y: monto });
        }
      } else {
        console.warn('Documento con datos incompletos:', doc);
      }
    });


    this.chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      axisX: {
        valueFormatString: 'D MMM',
      },
      axisY: {
        title: 'Monto (S/)',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Gastos',
          dataPoints: gastos,
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Ingresos',
          dataPoints: ingresos,
        },
      ],
    };
  }



  datetimeFormatOptions = {
    date: { weekday: 'short', month: 'long', day: '2-digit' },
    time: { hour: '2-digit', minute: '2-digit' },
  };




  validateDates() {
    if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
      this.errorMessage = 'La fecha de inicio no puede ser posterior a la fecha de fin.';
    } else {
      this.errorMessage = null;
    }
  }

  clearDates() {
    this.startDate = null;
    this.endDate = null;
    this.errorMessage = null;
  }

  applyDates() {
    this.validateDates();
    if (!this.errorMessage && this.startDate && this.endDate) {
      const startTimestamp = new Date(this.startDate).getTime();
      const endTimestamp = new Date(this.endDate).getTime();

      this.storageService
        .getBetweenDateDocument(startTimestamp, endTimestamp)
        .then((result) => {

          this.registros = this.filterByDateRange(result, startTimestamp, endTimestamp);
          console.log('Filtered registros:', this.registros);
        })
        .catch((error) => {
          console.error('Error fetching documents:', error);
        });
    }
  }

  filterByDateRange(registros: any[], startTimestamp: number, endTimestamp: number) {
    if (!Array.isArray(registros)) {
      console.error('Invalid registros format:', registros);
      return [];
    }

    return registros.filter((registro) => {
      const registroTimestamp = registro.data?.fecha;
      return (
        typeof registroTimestamp === 'number' &&
        registroTimestamp >= startTimestamp &&
        registroTimestamp <= endTimestamp
      );
    });
  }

}
