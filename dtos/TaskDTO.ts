import { NoteDTO } from "./NoteDTO";

export class TaskDTO {
  id: number;
  title: string;
  description: string;
  taskListId: number;
  notes: NoteDTO[];
  created_at: string;
  updated_at: string;
  constructor(
    id: number,
    title: string,
    description: string,
    taskListId: number,
    notes: NoteDTO[],
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.taskListId = taskListId;
    this.notes = notes; // Array de NoteDTO
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
