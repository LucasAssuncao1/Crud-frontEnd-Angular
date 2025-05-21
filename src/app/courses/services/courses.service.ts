import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private readonly API = 'api/courses';
  private http = inject(HttpClient);

  constructor() { }

  list() {
    return this.http.get<Course[]>(this.API).pipe(
      first(),
      // delay(5000),
      tap((courses) => console.log(courses))
    );
  }

  save(course: Course) {
    return this.http.post<Course>(this.API, course).pipe(first());
  }

}
