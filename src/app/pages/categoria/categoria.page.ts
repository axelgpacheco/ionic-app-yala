import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GastosPage } from '../gastos/gastos.page';
import { IngresosPage } from '../ingresos/ingresos.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [IonicModule ,FormsModule,RouterModule , GastosPage, IngresosPage ,CommonModule, HeaderComponent],

})
export class CategoriaPage  implements OnInit {

  selectedTab: string = 'gastos';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'] || 'gastos';
    });
  }

  navigateTo(tab: string) {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
    this.selectedTab = tab;
  }
}
