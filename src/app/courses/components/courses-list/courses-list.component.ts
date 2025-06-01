import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() remove = new EventEmitter(false);

  constructor() { }

  readonly displayedColumns = ['name', 'category', 'actions'];

  ngOnInit() {
    // this.coursesService.list().subscribe().pipe

  }

  onDelete(course: Course) {
    this.remove.emit(course);
  }

}
