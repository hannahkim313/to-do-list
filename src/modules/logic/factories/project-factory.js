const Project = () => {
    let _projectName;
    let _tasks;

    const getName = () => _projectName;

    const getTasks = () => _tasks;

    const setName = (name) => _projectName = name;

    const setTasks = (tasks) => _tasks = tasks;

    return {
        getName,
        getTasks,
        setName,
        setTasks,
    };
};

export {
    Project,
};