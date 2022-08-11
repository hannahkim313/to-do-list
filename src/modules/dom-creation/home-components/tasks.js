import { appendChildren } from "../../helper-functions/append-children";
import { Heading } from "../elements/heading";
import { Para } from "../elements/para";
import { Article } from "../elements/article";
import { Div } from "../elements/div";

const _createTasks = (tasks) => {
    const sections = [];
    for (const [taskType, numTasks] of Object.entries(tasks)) {
        const taskInfo = [
            Heading("4", `${numTasks}`).getHeading(),
            Para("Tasks").getPara(),
            Para(`${taskType}`).getPara()
        ];
        const attributes = {
            class: `${taskType}`,
        };
        const task = Article(attributes).getArticle();
        appendChildren(task, taskInfo);
        sections.push(task);
    };
    return sections;
};

const createTasksSection = () => {
    const tasksInfo = {
        completed: "4",
        remaining: "3",
        overdue: "2"
    };
    const tasks = _createTasks(tasksInfo);
    const attributes = {
        class: "tasks",
    };
    const tasksSection = Div(attributes).getDiv();
    appendChildren(tasksSection, tasks);
    return tasksSection;
};

export {
    createTasksSection,
};