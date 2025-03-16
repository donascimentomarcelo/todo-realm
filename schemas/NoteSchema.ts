export const NoteSchema = {
  name: "Note",
  primaryKey: "id",
  properties: {
    id: "int",
    content: "string",
    taskId: "int", // Relacionamento com Task
    created_at: "date",
    updated_at: "date",
  },
};
