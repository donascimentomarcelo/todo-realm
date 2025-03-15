import { TaskDTO } from "./TaskDTO";


export class TaskListDTO {
    id: number;
    name: string;
    tasks: TaskDTO[] = [];
    constructor(id: number, name: string, tasks: TaskDTO[]) {
      this.id = id;
      this.name = name;
      this.tasks = tasks; // Array de TaskDTO
    }
  }