export class Manage {
    Id: number | null;
   /* user: User;
    feedback: Feedback;*/


    constructor(manage: Partial<Manage> = {}) {
      this.Id = manage?.Id || null;

    }
  }
