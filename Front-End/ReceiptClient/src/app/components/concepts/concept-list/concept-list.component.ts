import { Component, OnInit } from '@angular/core';
import { ConceptService } from 'src/app/services/concept/concept.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concept-list',
  templateUrl: './concept-list.component.html',
  styleUrls: ['./concept-list.component.css']
})
export class ConceptListComponent implements OnInit {

  concepts: any;
  currentConcept = null;
  currentIndex = -1;
  title = '';

  constructor(private conceptService: ConceptService, private router: Router) { }

  ngOnInit() {
    this.retrieveConcepts();
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

  refreshList() {
    this.retrieveConcepts();
    this.currentConcept = null;
    this.currentIndex = -1;
  }

  setActiveConcept(concept, index) {
    this.currentConcept = concept;
    this.currentIndex = index;
  }

  removeAllConcepts() {
    this.conceptService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveConcepts();
        },
        error => {
          console.log(error);
        });
  }

  addConcept() {
    this.router.navigateByUrl('/addConcept');
  }
}