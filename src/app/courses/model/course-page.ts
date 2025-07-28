import { Course } from "./course";


export interface CoursePage {
  courses: Course[];
  totalPages:  number;
  totalElements: number; 

}
