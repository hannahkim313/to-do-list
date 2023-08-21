import * as date from "./date-functions";
import * as method from "../../helper-functions";

const _library = [];

const getContent = () => {
    const content = [];

    for (const project of _library) {
        content.push(project);
    };

    return content;
};

const checkIfOverdue = () => {
    for (const project of _library) {
        const tasks = project.getTasks();
        for (const task of tasks) {
            const dueDate = task.getDueDate();
            
            if (date.isBeforeToday(dueDate)) {
                task.setOverdue(true);
            };
        };
    };
};

const add = (project) => _library.push(project);

const get = (projectName) => {
    for (const project of _library) {
        if (project.getName().toLowerCase() === projectName) {
            return project;
        };
    };
};

const deleteTask = (taskProperties) => {
    const projectTasks = get(taskProperties.projectName).getTasks();
    const indexToRemove = projectTasks.findIndex(task => task.getTitle() === taskProperties.title);
    projectTasks.splice(indexToRemove, 1);
};

const deleteProject = (projectName) => {
    const index = _library.findIndex(project => project.getName() === projectName);
    _library.splice(index, 1);
};

const _getTotalTasks = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();

        if (tasks.length === 0) {
            return count;
        };
        
        if (!projectName) {
            count += tasks.length;
        };
        
        if (tasks[0].getProject() === projectName) {
            return count += tasks.length;
        };
    };

    return count;
};

const _getNumCompleted = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();

        if (tasks.length === 0) {
            return count;
        };
        
        if (!projectName) {
            count += tasks.filter(task => task.getChecked()).length;
        };
        
        if (tasks[0].getProject() === projectName) {
            return count += tasks.filter(task => task.getChecked()).length;
        };
    };

    return count;
};

const _getNumOverdue = (projectName) => {
    let count = 0;
    for (const project of _library) {
        const tasks = project.getTasks();

        if (tasks.length === 0) {
            return count;
        };
        
        if (!projectName) {
            count += tasks.filter(task => task.getOverdue() && !task.getChecked()).length;
        };

        if (tasks[0].getProject() === projectName) {
            return count += tasks.filter(task => task.getOverdue() && !task.getChecked()).length;
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
        return tasks.filter(task => task.getDueDate() === date.getToday());
    };
};

const _getUpcoming = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.getOverdue() === false);
    };
};

const _getAll = (tasks) => {
    if (tasks) {
        return tasks;
    };
};

const _getThisWeek = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.getOverdue() === false && date.isThisWeek(task.getDueDate()));
    };
};

const _getThisMonth = (tasks) => {
    if (tasks) {
        return tasks.filter(task => task.getOverdue() === false && date.isThisMonth(task.getDueDate()));
    };
};

const _getPriorityNum = (priority) => {
    if (priority === "low") {
        return 1;
    };

    if (priority === "medium") {
        return 2;
    };

    if (priority === "high") {
        return 3;
    };
};

const _getPriorityDesc = (tasks) => {
    if (tasks) {
        const isHigherPriority = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.getDueDate());
            const nextTaskDate = date.stringToDate(nextTask.getDueDate());
            const currentTaskPriority = _getPriorityNum(currentTask.getPriority());
            const nextTaskPriority = _getPriorityNum(nextTask.getPriority());

            if (currentTaskPriority === nextTaskPriority) {
                return currentTaskDate < nextTaskDate ? -1 : 1;
            } else {
                return nextTaskPriority - currentTaskPriority;
            };
        };

        tasks.sort((currentTask, nextTask) => isHigherPriority(currentTask, nextTask));

        return tasks;
    };
};

const _getPriorityAsc = (tasks) => {
    if (tasks) {
        const isLowerPriority = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.getDueDate());
            const nextTaskDate = date.stringToDate(nextTask.getDueDate());
            const currentTaskPriority = _getPriorityNum(currentTask.getPriority());
            const nextTaskPriority = _getPriorityNum(nextTask.getPriority());

            if (currentTaskPriority === nextTaskPriority) {
                return currentTaskDate < nextTaskDate ? -1 : 1;
            } else {
                return currentTaskPriority - nextTaskPriority;
            };
        };

        tasks.sort((currentTask, nextTask) => isLowerPriority(currentTask, nextTask));

        return tasks;
    };
};

const _getDateDesc = (tasks) => {
    if (tasks) {
        const isHigherDate = (currentTask, nextTask) => {
            const currentTaskDate = date.stringToDate(currentTask.getDueDate());
            const nextTaskDate = date.stringToDate(nextTask.getDueDate());
            const currentTaskPriority = _getPriorityNum(currentTask.getPriority());
            const nextTaskPriority = _getPriorityNum(nextTask.getPriority());

            if (currentTask.getDueDate() === nextTask.getDueDate()) {
                return currentTaskPriority > nextTaskPriority ? -1 : 1;
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
            const currentTaskDate = date.stringToDate(currentTask.getDueDate());
            const nextTaskDate = date.stringToDate(nextTask.getDueDate());
            const currentTaskPriority = _getPriorityNum(currentTask.getPriority());
            const nextTaskPriority = _getPriorityNum(nextTask.getPriority());

            if (currentTask.getDueDate() === nextTask.getDueDate()) {
                return currentTaskPriority > nextTaskPriority ? -1 : 1;
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
    all: _getAll,
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
            if (task.getTitle() === taskTitle) {
                const isChecked = task.getChecked();
                isChecked ? task.setChecked(false) : task.setChecked(true);
            };
        };
    };
};

export {
    getContent,
    checkIfOverdue,
    add,
    get,
    deleteTask,
    deleteProject,
    getTaskStats,
    filterBy,
    updateCheckedStatus,
};