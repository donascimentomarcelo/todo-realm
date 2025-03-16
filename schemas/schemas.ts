import Realm from "realm";
import { TaskListSchema } from "./TaskListSchema";
import { TaskSchema } from "./TaskSchema";
import { NoteSchema } from "./NoteSchema";

const realm = new Realm({ schema: [TaskListSchema, TaskSchema, NoteSchema] });

export default realm;