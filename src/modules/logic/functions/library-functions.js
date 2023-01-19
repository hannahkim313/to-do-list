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

const _getTotalTasks = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();
        
        if (tasks[0].project === projectName) {
            return count += tasks.length;
        };

        if (!projectName) {
            count += tasks.length;
        };
    };

    return count;
};

const _getNumCompleted = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();
        
        if (tasks[0].project === projectName) {
            return count += tasks.filter(task => task.checked).length;
        };

        if (!projectName) {
            count += tasks.filter(task => task.checked).length;
        };
    };

    return count;
};

const _getNumOverdue = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();
        
        if (tasks[0].project === projectName) {
            return count += tasks.filter(task => task.overdue).length;
        };

        if (!projectName) {
            count += tasks.filter(task => task.overdue).length;
        };
    };

    return count;
};

const _getNumRemaining = (projectName) => {
    if (!projectName) {
        return _getTotalTasks() - (_getNumCompleted() + _getNumOverdue());
    } else {
        return _getTotalTasks(projectName) - (_getNumCompleted(projectName) + _getNumOverdue(projectName));
    };
};

const _taskStatsFns = {
    completed: _getNumCompleted,
    overdue: _getNumOverdue,
    remaining: _getNumRemaining,
};

const getTaskStats = (projectName, stat) => {
    if (projectName) {
        projectName = method.undoKebabCase(projectName);
    };

    for (const key of Object.keys(_taskStatsFns)) {
        if (key === stat) {
            return _taskStatsFns[key](projectName);
        };
    };
};

const _getToday = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.dueDate === date.getToday());
    };
};

const _getUpcoming = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.overdue === false);
    };
};

const _getThisWeek = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.overdue === false && date.isThisWeek(task.dueDate));
    };
};

const _getThisMonth = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.overdue === false && date.isThisMonth(task.dueDate));
    };
};

const _filterFns = {
    today: _getToday,
    all: _getUpcoming,
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

const updateStatus = (taskTitle) => {
    for (const project of _library) {
        const tasks = project.getTasks();
        for (const task of tasks) {
            if (task.title === taskTitle) {
                const isChecked = task.checked;
                task.checked = isChecked ? false : true;
            };
        };
    };
};

export {
    add,
    get,
    getTaskStats,
    filterBy,
    updateStatus,
};