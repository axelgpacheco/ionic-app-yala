import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../common/core/state/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { selectAuthUser } from 'src/app/common/core/state/auth/auth.selectors';
import { formatDate } from 'src/app/common/core/functions/formatDate';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class HomePage implements OnInit, OnDestroy {


  user$: Observable<any | null>;
  documents: any[] = [];
  totalGastos: number = 0;
  totalIngresos: number = 0;
  saldo: number = 0;

  private userSubscription: Subscription | null = null;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private store: Store,
    private firestoreService: StorageService,
    private cdr: ChangeDetectorRef
  ) {

    addIcons({ library, playCircle, radio, search });
    this.user$ = this.store.select(selectAuthUser);
  }

  async ngOnInit() {
    this.userSubscription = this.user$.subscribe(user => {
      if (user) {
        this.firestoreService.listenToDocumentsByUid(user.uid).subscribe(documents => {

         this.documents = documents.sort((a, b) => {
          const dateA = new Date(a.data.fecha).getTime();
          const dateB = new Date(b.data.fecha).getTime();
          return dateB - dateA;
        });
          this.calculateTotals();
          this.cdr.detectChanges();
        });
      } else {

      }
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  calculateTotals() {
    this.totalGastos = this.documents
      .filter(doc => doc.data.type === 'gasto')
      .reduce((sum, doc) => sum + parseFloat(doc.data.monto), 0);

    this.totalIngresos = this.documents
      .filter(doc => doc.data.type === 'ingreso')
      .reduce((sum, doc) => sum + parseFloat(doc.data.monto), 0);

    this.saldo = this.totalIngresos - this.totalGastos;
  }


  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
