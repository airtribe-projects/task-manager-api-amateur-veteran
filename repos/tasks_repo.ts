import fs from 'fs';
import path from 'path';

const TASKS_FILE_PATH = path.join(process.cwd(), 'task.json'); // could've been tasks.json : )

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    level: string | undefined;
}

var tasksMemLoad: Task[] = [];


function loadTasksFromFile() {
    try {
        if (!fs.existsSync(TASKS_FILE_PATH)) {
            tasksMemLoad = [];
        }

        const jsonData = fs.readFileSync(TASKS_FILE_PATH, 'utf-8');
        const { tasks } = JSON.parse(jsonData);
        if (!Array.isArray(tasks)) {
            throw new Error('Invalid data from file read');
        }
        tasksMemLoad = tasks;
        } catch (error: any) { // is there a better way to handle this?
        // Not resetting the file. Could be a potential issue which can cause the same later.
        throw new Error('Failed to load tasks: ' + error.message);
    }
}

async function writeTasksToFile(tasks: Task[]): Promise<void> {
    try {
        const jsonData = JSON.stringify({ tasks }, null, 2);
        fs.writeFileSync(TASKS_FILE_PATH, jsonData);
        loadTasksFromFile();
    } catch (error: any) {
        // throw new Error('Failed to write tasks: ' + JSON.stringify(error)); // Why this is not working?
        throw new Error('Failed to write tasks: ' + error.message);
    }
}


async function listTasks(model: { completedStatus?: boolean }): Promise<Task[]> {
    const { completedStatus } = model || {};
    if (completedStatus !== undefined) {
        return tasksMemLoad.filter((t) => t.completed === completedStatus);
    }
    const sortedTasks = tasksMemLoad.sort((a, b) => a.id - b.id); // our operations ensure id as a map to creation date technically.
    return sortedTasks;
}

async function getTask(id: number) {
    const task = tasksMemLoad.find((t) => t.id === id);
    return task;
}

async function createTask(task: Task) {
    const newTask = { ...task, id: tasksMemLoad.length + 1 };
    tasksMemLoad.push(newTask);
    await writeTasksToFile(tasksMemLoad);
    return newTask;
}

async function updateTask(id: number, task: Task) {
    const index = tasksMemLoad.findIndex((t) => t.id === id);
    if (index < 0) return null;

    tasksMemLoad[index] = { ...task, id };
    await writeTasksToFile(tasksMemLoad);
    return tasksMemLoad[index];
}

async function deleteTask(id: number) {
    const index = tasksMemLoad.findIndex((t) => t.id === id);
    if (index < 0) {
        throw new Error('Task not found');
    }

    tasksMemLoad.splice(index, 1);
    await writeTasksToFile(tasksMemLoad);
}

/*

    Implement filtering by completion status for GET /tasks (e.g., GET /tasks?completed=true).

    Implement sorting by creation date for GET /tasks.

    Add a priority attribute to tasks (low, medium, high).

        Implement GET /tasks/priority/:level: Retrieve tasks by priority level.

        Ensure task creation and updates support the priority field.

*/

async function getTasksByPriority(level: string) {
    const tasks = tasksMemLoad.filter((t: Task) => t.level === level);
    return tasks;
}

loadTasksFromFile();

export default { 
    listTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTasksByPriority,
};