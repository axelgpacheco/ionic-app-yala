import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StorageService } from 'src/app/services/storage.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule, HeaderComponent , CanvasJSAngularChartsModule],
})
export class ReportesPage {
  startDate: string | null = null;
  endDate: string | null = null;
  errorMessage: string | null = null;
  registros: any[] = [];

  chartOptions = {
	  animationEnabled: true,
	  theme: "light2",
	  axisX:{
		valueFormatString: "D MMM"
	  },
	  axisY: {
	  },
	  toolTip: {
		shared: true
	  },
	  legend: {
		cursor: "pointer",
		itemclick: function (e: any) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			}
			e.chart.render();
		}
	  },
	  data: [{
		type: "line",
		showInLegend: true,
		name: "Gastos",
		xValueFormatString: "MMM DD, YYYY",
		dataPoints: [
			{ x: new Date(2021, 8, 1), y: 63 },
			{ x: new Date(2021, 8, 2), y: 69 },
		]
	  }, {
		type: "line",
		showInLegend: true,
		name: "Ingresos",
		dataPoints: [
			{ x: new Date(2021, 8, 1), y: 60 },
			{ x: new Date(2021, 8, 2), y: 57 },
		]
	  }]
	}

  datetimeFormatOptions = {
    date: { weekday: 'short', month: 'long', day: '2-digit' },
    time: { hour: '2-digit', minute: '2-digit' },
  };


  constructor(private storageService: StorageService) {

  }

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
          // Filter the registros array using the Firebase object format
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
