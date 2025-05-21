import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  private coursesService = inject(CoursesService);
  public dialog = inject(MatDialog);

  /**outro jeito de fazer roteamento para new curso */
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);

  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];


  constructor() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.errorDialog('Erro ao carregar os dados');
        return of([])
      })
    );

  }

  ngOnInit(): void {
  }

  errorDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  /** outro jeito de fazer roteamento para new curso */
  // onAdd() {
  //   this.router.navigate(['new'], { relativeTo: this.route })
  // }


}
