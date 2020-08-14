import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit {

  receipts: any;
  currentReceipt = null;
  currentIndex = -1;
  title = '';

  constructor(private receiptService: ReceiptService) { }

  ngOnInit() {
    this.retrieveReceipts();
  }

  retrieveReceipts() {
    this.receiptService.getAll()
      .subscribe(
        data => {
          this.receipts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveReceipts();
    this.currentReceipt = null;
    this.currentIndex = -1;
  }

  setActiveReceipt(receipt, index) {
    this.currentReceipt = receipt;
    this.currentIndex = index;
  }

  removeAllReceipts() {
    this.receiptService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveReceipts();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this.receiptService.findByTitle(this.title)
      .subscribe(
        data => {
          this.receipts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}