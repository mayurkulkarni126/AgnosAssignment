import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { MenuHomeComponent } from './components/menu-home/menu-home.component';
import { BillPaymentsComponent } from './components/bill-payments/bill-payments.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { ComboInfoModalComponent } from './components/combo-info-modal/combo-info-modal.component';
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    MenuHomeComponent,
    BillPaymentsComponent,
    OrderPlacedComponent,
    MenuItemsComponent,
    ComboInfoModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
  ],
  entryComponents: [ComboInfoModalComponent]
})
export class MenuModule { }
