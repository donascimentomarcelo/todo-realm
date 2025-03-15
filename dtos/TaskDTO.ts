import { NoteDTO } from "./NoteDTO";

export class TaskDTO {
    id: number;
    title: string;
    description: string;
    taskListId: number;
    notes: NoteDTO[];
    constructor(id: number, title: string, description: string, taskListId: number, notes: NoteDTO[]) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.taskListId = taskListId;
      this.notes = notes; // Array de NoteDTO
    }
  }