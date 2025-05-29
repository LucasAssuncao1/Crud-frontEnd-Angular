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

  loadById(id: string) {
    return this.http.get<Course>(`${this.API}/${id}`).pipe(first());
  }

  create(course: Course) {
    return this.http.post<Course>(this.API, course).pipe(first());
  }


  update(course: Course) {
    return this.http.put<Course>(`${this.API}/${course.id}`, course);
  }

  save(course: Course) {
    // console.log(course);
    if (course.id) {
      // console.log("update");
      return this.update(course);
    }
    // console.log("create");
    return this.create(course);
  }

  delete(course: Course) {
    return this.http.delete(`${this.API}/${course.id}`).pipe(first());
  }

}
