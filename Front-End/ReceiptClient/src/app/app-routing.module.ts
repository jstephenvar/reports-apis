import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './components/receipt-details/receipt-details.component';
import { AddReceiptComponent } from './components/add-receipt/add-receipt.component';

const routes: Routes = [
  { path: '', redirectTo: 'receipts', pathMatch: 'full' },
  { path: 'receipts', component: ReceiptListComponent },
  { path: 'receipts/:id', component: ReceiptDetailsComponent },
  { path: 'add', component: AddReceiptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }