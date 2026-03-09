import { Response } from './response.model';

export interface Question {
  questionId?: number;
  title: string;
  createdDate?: string | Date;
  responses?: Response[];
}
