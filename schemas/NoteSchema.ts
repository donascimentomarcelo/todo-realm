export const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int",
    content: "string",
    taskId: "int", // Relacionamento com Task
  },
};
