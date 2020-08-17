import { Component, OnInit } from '@angular/core';
import { ConceptService } from 'src/app/services/concept/concept.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-concept-details',
  templateUrl: './concept-details.component.html',
  styleUrls: ['./concept-details.component.css']
})
export class ConceptDetailsComponent implements OnInit {
  currentConcept = null;
  message = '';

  constructor(
    private conceptService: ConceptService,
    private route: ActivatedRoute,
    private router: Router) { }

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
          this.message = 'The concept was updated successfully!';
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
}
