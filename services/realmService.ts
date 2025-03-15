import realm from "../schemas/schemas";
import { TaskListDTO } from "@/dtos/TaskListDTO";
import { TaskDTO } from "@/dtos/TaskDTO";
import { NoteDTO } from "@/dtos/NoteDTO";

// Função para salvar uma TaskList com Tasks e Notes
export const saveTaskList = (taskList: TaskListDTO[]) => {
  taskList.forEach((taskListData: TaskListDTO) => {
    const { id, name, tasks } = taskListData;

    console.log(`taskList persisted: ${name} - #${id}`);

    try {
      realm.write(() => {
        const taskList = realm.create("TaskList", {
          id,
          name,
        });

        // Salvar Tasks e Notes
        tasks.forEach((taskData: TaskDTO) => {
          const { id: taskId, title, description, notes } = taskData;

          console.log(`task persisted: ${title} - #${taskId}`);

          const task = realm.create("Task", {
            id: taskId,
            title,
            description,
            taskListId: taskList.id,
          });

          // Salvar Notes
          notes.forEach((noteData: NoteDTO) => {
            const { id: noteId, content } = noteData;

            console.log(`note persisted: ${content} - #${noteId}`);

            realm.create("Note", {
              id: noteId,
              content,
              taskId: task.id,
            });
          });
        });
      });
    } catch (err) {
      console.log("Error:", err);
    }
  });
};

// Função para buscar todas as TaskLists com Tasks e Notes
export const getAllTaskLists = () => {
  return realm.objects("TaskList");
};
