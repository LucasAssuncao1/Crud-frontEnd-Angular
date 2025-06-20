import { Location } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from '../../model/Lesson';

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

  cadastroForm!: FormGroup;

  // cadastroForm: FormGroup = this.formBuilder.group({
  //   id: [''],
  //   name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
  //   category: ['', [Validators.required, Validators.nullValidator]],
  // });

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']
    this.cadastroForm = this.formBuilder.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      category: [course.category, [Validators.required, Validators.nullValidator]],
      lessons: this.formBuilder.array(this.getLessons(course))
    });

  }



  getLessonsFormArray() {
    return (<UntypedFormArray>this.cadastroForm.get('lessons'))?.controls;
  }

  addNewLesson() {
    const lessons = this.cadastroForm.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  private getLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });

  }

  deleteLesson(index: number) {
    const lessons =  this.cadastroForm.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);

}



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

  getErrorMessage(formField: string) {
    const field = this.cadastroForm.get(formField);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 3;
      return "Tamanho mínimo precisa ser de " + requiredLength + " caracteres.";
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 25;
      return "Tamanho máximo de " + requiredLength + " caracteres excedido.";
    }
    return ''
  }

}
