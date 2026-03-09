import { Section } from './section.model';
import { Course } from './course.model';
import { Comment } from './comment.model';

export interface Feedback {
  feedId?: number;
  description: string;
  createdDate?: string | Date;
  generatedDate?: string | Date;
  sections?: Section[];
  courses?: Course[];
  comments?: Comment[];
}
