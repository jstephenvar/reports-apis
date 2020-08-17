import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {
  currentReceipt = null;
  message = '';

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getReceipt(this.route.snapshot.paramMap.get('id'));
  }

  getReceipt(id) {
    this.receiptService.get(id)
      .subscribe(
        data => {
          this.currentReceipt = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateReceipt() {
    this.receiptService.update(this.currentReceipt.id, this.currentReceipt)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The receipt was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteReceipt() {
    this.receiptService.delete(this.currentReceipt.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/receipts']);
        },
        error => {
          console.log(error);
        });
  }
}
