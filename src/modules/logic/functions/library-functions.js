import * as date from "./date-functions";

const _library = [];

const add = (project) => _library.push(project);

const get = (projectName) => {
    for (const project of _library) {
        if (project.getName().toLowerCase() === projectName) {
            return project;
        };
    };
};

// Get this week

// Get this month

const _getToday = (tasks) => tasks.filter(task => task.dueDate === date.getToday());

const _getUpcoming = (tasks) => tasks.filter(task => date.isUpcoming(task.dueDate));

const filterBy = (sectionName) => {
    const filteredProjects = [];
    for (const project of _library) {
        const tasks = project.getTasks();
        const result = sectionName === "today" ? _getToday(tasks) : _getUpcoming(tasks);
        filteredProjects.push(result);
    };

    return filteredProjects;
};

export {
    add,
    get,
    filterBy,
};