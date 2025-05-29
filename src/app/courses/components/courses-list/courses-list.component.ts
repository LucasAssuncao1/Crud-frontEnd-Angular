import { Component, inject, Input, OnInit } from '@angular/core';
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

  constructor() { }

  readonly displayedColumns = ['name', 'category', 'actions'];

  ngOnInit() {
    // this.coursesService.list().subscribe().pipe

  }

  onDelete(){
    this.courses.fi
  }

}
