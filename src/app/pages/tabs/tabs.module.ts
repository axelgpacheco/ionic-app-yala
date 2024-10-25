import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { TabsPageRoutingModule } from './tabs-routing.module';
 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel
  ],
})
export class TabsPageModule {}
