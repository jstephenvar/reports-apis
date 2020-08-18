import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { ConceptService } from './../../../services/concept/concept.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

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
  addReceiptForm: FormGroup;
  concepts: any;
  currentConcept = null;
  currentIndex = -1;
  currentPrice = 0;
  currentTRM = '';
  createdConcepts = false;

  constructor(
    private receiptService: ReceiptService,
    private fb: FormBuilder,
    private conceptService: ConceptService) { }

  ngOnInit() {
    this.createForm();
    this.retrieveConcepts();
  }

  saveReceipt() {
    const data = {
      title: this.receipt.title,
      description: this.receipt.description,
      creation_date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      last_modified: null,
      concept: this.receipt.concept,
    };

    console.log(data);

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

  retrieveConcepts() {
    this.conceptService.getAll()
      .subscribe(
        data => {
          this.concepts = data;
          console.log(data);
          if (data.toLocaleString.length !== 0) {
            this.createdConcepts = true;
          }
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveConcepts();
    this.currentConcept = null;
    this.currentIndex = -1;
  }

  changePrice() {
    this.concepts.forEach(concept => {
      if (concept.id == this.receipt.concept) {
        this.currentPrice = concept.price.value;
        this.currentTRM = concept.price.rate;
      }
    });
  }

  createForm() {
    this.addReceiptForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      concept: ['', Validators.required],
      value: ['', Validators.required],
      rate: ['', Validators.required]
    });
  }

}

