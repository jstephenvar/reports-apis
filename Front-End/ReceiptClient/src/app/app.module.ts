import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReceiptComponent } from './components/add-receipt/add-receipt.component';
import { ReceiptDetailsComponent } from './components/receipt-details/receipt-details.component';
import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddReceiptComponent,
    ReceiptDetailsComponent,
    ReceiptListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
