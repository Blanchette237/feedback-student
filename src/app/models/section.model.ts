import { Question } from './question.model';

export interface Section {
  sectionId?: number;
  title: string;
  description?: string;
  questions?: Question[];
}
