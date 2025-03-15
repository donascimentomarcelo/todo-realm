export class NoteDTO {
    id: number;
    content: string;
    taskId: string;
  constructor(id: number, content: string, taskId: string) {
    this.id = id;
    this.content = content;
    this.taskId = taskId;
  }
}
