import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule, CommonModule, HeaderComponent]
})
export class ReportesPage {

  startDate: string | null = null;
  endDate: string | null = null;
  errorMessage: string | null = null;
  registros: any[] = [];

  constructor(private storageService: StorageService) { }

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
    if (!this.errorMessage) {
      if (this.startDate && this.endDate) {
        const startTimestamp = Math.floor(new Date(this.startDate).getTime() / 1000);
        const endTimestamp = Math.floor(new Date(this.endDate).getTime() / 1000);

        console.log('Start timestamp (seconds):', startTimestamp);
        console.log('End timestamp (seconds):', endTimestamp);

        this.storageService
          .getBetweenDateDocument(startTimestamp, endTimestamp)
          .then((result) => {
            console.log('Filtered results:', result[0].data);
            console.log('Filtered results:', result);

            // Do something with the filtered results

            this.registros = result;
          })
          .catch((error) => {
            console.error('Error fetching documents:', error);
          });
      }
    }

    this.registros.filter((registro) => {

      // filtrar aqui los registros por fecha de inicio y fin 
      return registro.data.fecha && this.startDate && this.endDate && registro.data.fecha >= this.startDate && registro.data.fecha <= this.endDate;

    });

    console.log('Filtered results:', this.registros);

  }

}
