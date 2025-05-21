import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  private formBuilder = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);

  public cadastroForm: FormGroup = this.formBuilder.group({
    name: [null],
    category: [null]
  });

  onSubmit() {
    this.coursesService.save(this.cadastroForm.value).subscribe(
      response => this.onSuccess(), error => this.onError()
    );


  }

  onSuccess() {
    this.snackBar.open('Curso salvo com sucesso.', '', { duration: 3000 });
    this.onCancel();
  }

  onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }

  onCancel() {
    this.location.back();
  }


}
