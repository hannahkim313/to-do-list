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

        if (!tasks) {
            return count;
        };
        
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

        if (!tasks) {
            return count;
        };
        
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

        if (!tasks) {
            return count;
        };
        
        if (tasks[0].project === projectName) {
            return count += tasks.filter(task => task.overdue && !task.checked).length;
        };

        if (!projectName) {
            count += tasks.filter(task => task.overdue && !task.checked).length;
        };
    };

    return count;
};

const _getNumRemaining = (projectName) => {
    if (!projectName) {
        return _getTotalTasks() - _getNumCompleted();
    } else {
        return _getTotalTasks(projectName) - _getNumCompleted(projectName);
    };
};

const _taskStatsGetFns = {
    completed: _getNumCompleted,
    overdue: _getNumOverdue,
    remaining: _getNumRemaining,
};

const getTaskStats = (projectName, stat) => {
    if (projectName) {
        projectName = method.undoKebabCase(projectName);
    };

    for (const key of Object.keys(_taskStatsGetFns)) {
        if (key === stat) {
            return _taskStatsGetFns[key](projectName);
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

const _getPriorityDesc = (tasks) => {
    if (tasks) {
        const isHigherPriority = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.dueDate);
            const nextTaskDate = date.stringToDate(nextTask.dueDate);

            if (currentTask.priority === nextTask.priority) {
                return currentTaskDate < nextTaskDate ? -1 : 1;
            } else {
                return nextTask.priority - currentTask.priority;
            };
        };

        tasks.sort((currentTask, nextTask) => isHigherPriority(currentTask, nextTask));

        return tasks;
    };
};

const _getPriorityAsc = (tasks) => {
    if (tasks) {
        const isLowerPriority = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.dueDate);
            const nextTaskDate = date.stringToDate(nextTask.dueDate);

            if (currentTask.priority === nextTask.priority) {
                return currentTaskDate < nextTaskDate ? -1 : 1;
            } else {
                return currentTask.priority - nextTask.priority;
            };
        };

        tasks.sort((currentTask, nextTask) => isLowerPriority(currentTask, nextTask));

        return tasks;
    };
};

const _getDateDesc = (tasks) => {
    if (tasks) {
        const isHigherDate = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.dueDate);
            const nextTaskDate = date.stringToDate(nextTask.dueDate);

            if (currentTask.dueDate === nextTask.dueDate) {
                return currentTask.priority > nextTask.priority ? -1 : 1;
            } else {
                return nextTaskDate - currentTaskDate;
            };
        };

        tasks.sort((currentTask, nextTask) => isHigherDate(currentTask, nextTask));

        return tasks;
    };
};

const _getDateAsc = (tasks) => {
    if (tasks) {
        const isLowerDate = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.dueDate);
            const nextTaskDate = date.stringToDate(nextTask.dueDate);

            if (currentTask.dueDate === nextTask.dueDate) {
                return currentTask.priority > nextTask.priority ? -1 : 1;
            } else {
                return currentTaskDate - nextTaskDate;
            };
        };

        tasks.sort((currentTask, nextTask) => isLowerDate(currentTask, nextTask));

        return tasks;
    };
};

const _filterFns = {
    today: _getToday,
    upcoming: _getUpcoming,
    all: _getUpcoming,
    thisWeek: _getThisWeek,
    thisMonth: _getThisMonth,
    priorityAsc: _getPriorityAsc,
    priorityDesc: _getPriorityDesc,
    dateAsc: _getDateAsc,
    dateDesc: _getDateDesc,
};

const filterBy = (filters) => {
    const filteredProjects = [];
    
    for (const project of _library) {
        const tasks = project.getTasks();

        let filteredProject;
        for (const filter of filters) {
            filteredProject = _filterFns[filter](tasks);
        };

        filteredProjects.push(filteredProject);
    };

    return filteredProjects;
};

const updateCheckedStatus = (taskTitle) => {
    for (const project of _library) {
        const tasks = project.getTasks();

        if (!tasks) {
            return;
        };

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
    updateCheckedStatus,
};