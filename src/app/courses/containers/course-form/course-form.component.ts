import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {


  private formBuilder = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private route = inject(ActivatedRoute)

  constructor() { }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']
    this.cadastroForm.patchValue(course);
    // this.cadastroForm.setValue({
    //   id: course.id,
    //   name: course.name,
    //   category: course.category,
    // });

  }

  cadastroForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
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
