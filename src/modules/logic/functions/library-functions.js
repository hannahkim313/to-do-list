import * as date from "./date-functions";
import * as method from "../../helper-functions";

const _library = [];

const add = (project) => _library.push(project);

const get = (projectName) => {
    for (const project of _library) {
        if (project.getName().toLowerCase() === projectName) {
            return project;
        };
    };
};

const _getToday = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.dueDate === date.getToday());
    };
};

const _getAll = (tasks) => tasks;

const _getThisWeek = (tasks) => {
    if (tasks) {
        return tasks.filter(task => date.isThisWeek(task.dueDate));
    };
};

const _getThisMonth = (tasks) => {
    if (tasks) {
        return tasks.filter(task => date.isThisMonth(task.dueDate));
    };
};

const _getUpcoming = (tasks) => {
    if (tasks) {
        return tasks.filter(task => date.isUpcoming(task.dueDate));
    };
};

const _filterFns = {
    today: _getToday,
    all: _getAll,
    thisWeek: _getThisWeek,
    thisMonth: _getThisMonth,
    upcoming: _getUpcoming,
};

const filterBy = (sectionName) => {
    sectionName = method.toCamelCase(sectionName);
    
    const filteredProjects = [];
    for (const project of _library) {
        const tasks = project.getTasks();
        for (const key of Object.keys(_filterFns)) {
            if (key === sectionName) {
                filteredProjects.push(_filterFns[key](tasks));
            };
        }
    };

    return filteredProjects;
};

export {
    add,
    get,
    filterBy,
};