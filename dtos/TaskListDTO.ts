import { TaskDTO } from "./TaskDTO";

export class TaskListDTO {
  id: number;
  name: string;
  tasks: TaskDTO[] = [];
  created_at: string;
  updated_at: string;
  constructor(
    id: number,
    name: string,
    tasks: TaskDTO[],
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.name = name;
    this.tasks = tasks; // Array de TaskDTO
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
