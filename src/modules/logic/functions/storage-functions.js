import * as library from "./library-functions";
import * as method from "../../helper-functions";

const populate = () => {
    const libraryContent = library.getContent();
    for (const project of libraryContent) {
        const projectName = method.toKebabCase(project.getName());

        const projectInfo = {
            name: project.getName(),
        };
        localStorage.setItem(`${projectName}-info`, JSON.stringify(projectInfo));

        const tasks = project.getTasks();
        let count = 1;
        for (const task of tasks) {
            const taskInfo = {
                title: task.getTitle(),
                project: task.getProject(),
                description: task.getDescription(),
                isChecked: task.getChecked(),
                dueDate : task.getDueDate(),
                isOverdue: task.getOverdue(),
                priority: task.getPriority(),
            };
            localStorage.setItem(`${projectName}-task-${count}`, JSON.stringify(taskInfo));

            count++;
        };
    };
};

const _isSubset = (array1, array2) => array2.every(element => array1.includes(element));

const removeItems = (projectName) => {
    projectName = method.toKebabCase(projectName);
    const projectNameArr = projectName.split("-");
    
    for (const key of Object.keys(localStorage)) {
        const keyNameArr = key.split("-");

        if(_isSubset(keyNameArr, projectNameArr)) {
            localStorage.removeItem(key);
        };
    };
};

const addNotes = () => {
    const value = document.querySelector(".home.page textarea").value;
    localStorage.setItem("notes", value);
};

export {
    populate,
    removeItems,
    addNotes,
};