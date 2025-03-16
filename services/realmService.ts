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

export const getAllTaskLists = () => {

  const taskLists = realm.objects<TaskListDTO[]>("TaskList");

  const taskListsWithTasksAndNotes = taskLists.map((taskList: any) => {
    // Busca as Tasks associadas à TaskList atual
    const tasks = realm
      .objects<TaskDTO[]>("Task")
      .filtered(`taskListId == ${taskList.id}`);

    // Para cada Task, busca as Notes associadas
    const tasksWithNotes = tasks.map((task: any) => {
      const notes = realm
        .objects<NoteDTO[]>("Note")
        .filtered(`taskId == ${task.id}`);
      return {
        ...task,
        notes: notes, // Adiciona as Notes à Task
      };
    });

    return {
      ...taskList,
      tasks: tasksWithNotes, // Adiciona as Tasks (com Notes) à TaskList
    };
  });

  return taskListsWithTasksAndNotes;
};

export const clean = () => {
  try {
    realm.write(() => {
      realm.deleteAll();
      console.log("delete all");
    });
  } catch (err) {
    console.log("Error when deleting:", err);
  }
};
