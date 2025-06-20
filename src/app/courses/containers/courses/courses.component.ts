import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  private coursesService = inject(CoursesService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  /**outro jeito de fazer roteamento para new curso */
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);

  courses$!: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];


  constructor() {

  }

  loadCourses() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.errorDialog('Erro ao carregar os dados');
        return of([])
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
