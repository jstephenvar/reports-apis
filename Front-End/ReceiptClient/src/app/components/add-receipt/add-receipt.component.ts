import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css']
})
export class AddReceiptComponent implements OnInit {

  receipt = {
    title: '',
    description: '',
    creation_date: '',
    last_modified: '',
    concept: ''
  };
  submitted = false;

  constructor(private receiptService: ReceiptService) { }

  ngOnInit() {
  }

  saveReceipt() {
    const data = {
      title: this.receipt.title,
      description: this.receipt.description,
      creation_date: this.receipt.creation_date,
      last_modified: this.receipt.last_modified, 
      concept: this.receipt.last_modified,
    };

    this.receiptService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newReceipt() {
    this.submitted = false;
    this.receipt = {
      title: '',
      description: '',
      creation_date: '',
      last_modified: '',
      concept: ''
    };
  }
}

