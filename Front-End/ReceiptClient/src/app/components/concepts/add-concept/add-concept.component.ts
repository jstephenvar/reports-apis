import { Component, OnInit } from '@angular/core';
import { formatCurrency, formatDate } from '@angular/common';
import { ConceptService } from './../../../services/concept/concept.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-concept',
  templateUrl: './add-concept.component.html',
  styleUrls: ['./add-concept.component.css']
})
export class AddConceptComponent implements OnInit {

  concept = {
    name: '',
    description: '',
    creation_date: '',
    last_modified: '',
    price: {
      title: '',
      value: '',
      rate: '',
      creation_date: '',
      last_modified: ''
    }
  };
  submitted = false;

  addConceptForm: FormGroup;

  constructor(private conceptService: ConceptService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  saveConcept() {
    const data = {
      name: this.concept.name,
      description: this.concept.description,
      creation_date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      last_modified: null,
      price: {
        title: this.concept.price.title,
        value: this.concept.price.value,
        rate: this.concept.price.rate,
        creation_date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        last_modified: null
      }
    };

    this.conceptService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newConcept() {
    this.submitted = false;
    this.concept = {
      name: '',
      description: '',
      creation_date: '',
      last_modified: '',
      price: {
        title: '',
        value: '',
        rate: '',
        creation_date: '',
        last_modified: ''
      }
    };
  }

  createForm() {
    this.addConceptForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      rate: ['', Validators.required]
    });
  }

}

