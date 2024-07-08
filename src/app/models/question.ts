import { Section } from "./Section";

export class Question {
    questionId: number | null;
    title: string;
    createdDate: Date;
    generatedDate: Date;
    sections: Section;



    constructor(question: Partial<Question> = {}) {
      this.questionId = question?.questionId || null;
      this.title = question?.title || '';
      this.createdDate = question?.createdDate || new Date;
      this.generatedDate = question?.generatedDate || new Date;
      this.sections = question?.sections || [];
    }
  }
