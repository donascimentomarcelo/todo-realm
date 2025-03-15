import Realm from 'realm';

// Schema para Note
const NoteSchema = {
  name: 'Note',
  primaryKey: 'id',
  properties: {
    id: 'int',
    content: 'string',
    taskId: 'int', // Relacionamento com Task
  },
};

// Schema para Task
const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    description: 'string',
    taskListId: 'int', // Relacionamento com TaskList
    notes: 'Note[]', // Relacionamento com Notes (um para muitos)
  },
};

// Schema para TaskList
const TaskListSchema = {
  name: 'TaskList',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    tasks: 'Task[]', // Relacionamento com Tasks (um para muitos)
  },
};

// Inicializando o Realm com os schemas
const realm = new Realm({ schema: [TaskListSchema, TaskSchema, NoteSchema] });

export default realm;