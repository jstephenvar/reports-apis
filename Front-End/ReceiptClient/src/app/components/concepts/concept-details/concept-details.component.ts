import { Component, OnInit } from '@angular/core';
import { ConceptService } from 'src/app/services/concept/concept.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-concept-details',
  templateUrl: './concept-details.component.html',
  styleUrls: ['./concept-details.component.css']
})
export class ConceptDetailsComponent implements OnInit {
  currentConcept = null;
  message = '';
  editConceptForm: FormGroup;
  submitted = false;

  constructor(
    private conceptService: ConceptService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.editForm();
  }

  ngOnInit() {
    this.message = '';
    this.getConcept(this.route.snapshot.paramMap.get('id'));
  }

  getConcept(id) {
    this.conceptService.get(id)
      .subscribe(
        data => {
          this.currentConcept = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateConcept() {
    this.conceptService.update(this.currentConcept.id, this.currentConcept)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El concepto fue actualizado satisfactoriamente!';
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  deleteConcept() {
    this.conceptService.delete(this.currentConcept.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/concepts']);
        },
        error => {
          console.log(error);
        });
  }

  editForm() {
    this.editConceptForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      rate: ['', Validators.required]
    });
  }
}
