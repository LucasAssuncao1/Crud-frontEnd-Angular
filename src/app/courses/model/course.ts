import { Lesson } from "./Lesson";

export interface Course {
  id: string;
  name: string;
  category: string;
  lessons?: Lesson[];
}
