export const TaskListSchema = {
  name: "TaskList",
  primaryKey: "id",
  properties: {
    id: "int",
    name: "string",
    tasks: "Task[]", // Relacionamento com Tasks (um para muitos)
  },
};
