export const TaskSchema = {
  name: "Task",
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    description: "string",
    taskListId: "int", // Relacionamento com TaskList
    notes: "Note[]", // Relacionamento com Notes (um para muitos)
    created_at: "date",
    updated_at: "date",
  },
};
