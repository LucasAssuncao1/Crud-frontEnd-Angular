import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';



import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';



@NgModule({
    imports: [
    CommonModule,
    CoursesRoutingModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent,
]
})
export class CoursesModule { }
