import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatMiniFabButton, MatTooltip, RouterLink, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
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
