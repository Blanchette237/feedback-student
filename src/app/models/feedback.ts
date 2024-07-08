import { Course } from "./course";
import { Section } from "./Section";

export class Feedback {
    feedId: number | null;
    description: string;
    createdDate: Date;
    generatedDate: Date;
    courses: Course[];
    comments: Comment[];
    sections: Section[];


    constructor(feedback: Partial<Feedback> = {}) {
      this.feedId = feedback?.feedId || null;
      this.description = feedback?.description || '';
      this.createdDate = feedback?.createdDate || new Date;
      this.generatedDate = feedback?.generatedDate || new Date;
      this.courses = feedback?.courses || [];
      this.comments = feedback?.comments || [];
      this.sections = feedback?.sections || [];

    }
  }
