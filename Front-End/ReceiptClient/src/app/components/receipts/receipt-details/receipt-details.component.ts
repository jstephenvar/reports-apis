import { ConceptService } from './../../../services/concept/concept.service';
import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {
  currentReceipt: any;
  message = '';
  concepts: any;
  currentConcept: any;
  currentPriceValue = null;
  currentTRM = null;
  currentIndex = -1;
  conceptSelected = null;
  submitted = false;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router,
    private conceptService: ConceptService
  ) { }

  ngOnInit() {
    this.message = '';
    this.getReceipt(this.route.snapshot.paramMap.get('id'));
    this.retrieveConcepts();
  }

  getReceipt(id) {
    this.receiptService.get(id)
      .subscribe(
        data => {
          this.currentReceipt = data;
          console.log(data);
          this.setCurrentConcept();
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
          this.message = 'El Recibo fue actualizado satisfactoriamente!';
          this.submitted = true;
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

  retrieveConcepts() {
    this.conceptService.getAll()
      .subscribe(
        data => {
          this.concepts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setCurrentConcept() {
    this.currentConcept = this.currentReceipt.concept;
    this.currentPriceValue = this.currentConcept.price.value;
    this.currentTRM = this.currentConcept.price.rate;
  }

  refreshList() {
    this.retrieveConcepts();
    this.currentConcept = null;
    this.currentIndex = -1;
  }

  setActiveConcept() {
    this.concepts.forEach(concept => {
      if (concept.id == this.conceptSelected) {
        this.currentReceipt.concept = this.conceptSelected;
        this.currentConcept = concept;
        this.currentPriceValue = concept.price.value;
        this.currentTRM = concept.price.rate;
      }
    });
  }
}
