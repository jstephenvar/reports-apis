import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptListComponent } from './components/receipts/receipt-list/receipt-list.component';
import { ReceiptDetailsComponent } from './components/receipts/receipt-details/receipt-details.component';
import { AddReceiptComponent } from './components/receipts/add-receipt/add-receipt.component';
import { ConceptListComponent } from './components/concepts/concept-list/concept-list.component';
import { ConceptDetailsComponent } from './components/concepts/concept-details/concept-details.component';
import { AddConceptComponent } from './components/concepts/add-concept/add-concept.component';

const routes: Routes = [
  { path: '', redirectTo: 'receipts', pathMatch: 'full' },
  { path: 'receipts', component: ReceiptListComponent },
  { path: 'receipts/:id', component: ReceiptDetailsComponent },
  { path: 'add', component: AddReceiptComponent },
  { path: 'concepts', component: ConceptListComponent },
  { path: 'concepts/:id', component: ConceptDetailsComponent },
  { path: 'addConcept', component: AddConceptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
