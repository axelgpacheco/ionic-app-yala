import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GastosPage } from '../gastos/gastos.page';
import { IngresosPage } from '../ingresos/ingresos.page';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [IonicModule ,FormsModule , GastosPage, IngresosPage],

})
export class CategoriaPage {

  public mostrarGastos: boolean = true;
  public selectedSegment: string = 'gastos';

  togglePage() {
    this.mostrarGastos = !this.mostrarGastos;
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
