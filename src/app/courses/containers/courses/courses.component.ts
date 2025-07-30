import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { catchError, Observable, of, tap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursePage } from '../../model/course-page';
import { CoursesService } from '../../services/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    standalone: true,
    imports: [MatCard, MatToolbar, CoursesListComponent, MatPaginator, MatProgressSpinner, AsyncPipe]
})
export class CoursesComponent implements OnInit {

  private coursesService = inject(CoursesService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  /**outro jeito de fazer roteamento para new curso */
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);

  courses$!: Observable<CoursePage>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;


  displayedColumns = ['name', 'category', 'actions'];


  constructor() {

  }

  loadCourses(pageEvent: PageEvent = {length: 0,  pageIndex: 0, pageSize: 10}) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex,
        this.pageSize = pageEvent.pageSize
      }),
      catchError(error => {
        this.errorDialog('Erro ao carregar os dados');
        return of({courses: [], totalElements:0 , totalPages: 0})
      })
    );
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  errorDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onRemove(course: Course) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso? ',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.delete(course.id).subscribe(
          () => {
            this.loadCourses();
            this.onMessage('Curso removido com sucesso');
          },
          () => { this.errorDialog('Erro ao remover curso.') }
        );
      }
    });
  }


  onMessage(message: string) {
    this.snackBar.open(message, 'X',
      {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
  }


  /** outro jeito de fazer roteamento para new curso */
  // onAdd() {
  //   this.router.navigate(['new'], { relativeTo: this.route })
  // }


}
