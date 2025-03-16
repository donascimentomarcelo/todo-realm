export class NoteDTO {
  id: number;
  content: string;
  taskId: string;
  created_at: string;
  updated_at: string;
  constructor(
    id: number,
    content: string,
    taskId: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.content = content;
    this.taskId = taskId;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
