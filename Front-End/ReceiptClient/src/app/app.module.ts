import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReceiptComponent } from './components/receipts/add-receipt/add-receipt.component';
import { ReceiptDetailsComponent } from './components/receipts/receipt-details/receipt-details.component';
import { ReceiptListComponent } from './components/receipts/receipt-list/receipt-list.component';
import { AddConceptComponent } from './components/concepts/add-concept/add-concept.component';
import { ConceptDetailsComponent } from './components/concepts/concept-details/concept-details.component';
import { ConceptListComponent } from './components/concepts/concept-list/concept-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AddReceiptComponent,
    ReceiptDetailsComponent,
    ReceiptListComponent,
    AddConceptComponent,
    ConceptDetailsComponent,
    ConceptListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
