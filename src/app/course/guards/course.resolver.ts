import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

import { Course } from '../../courses/model/course';
import { CoursesService } from '../../courses/services/courses.service';

export const courseResolver: ResolveFn<Course> = (route, state) => {

  const coursesService = inject(CoursesService);

  if (route.params && route.params['id']) {
    return coursesService.loadById(route.params['id']);
  }
  return of({ id: '', name: '', category: '', lessons: [] });
};
