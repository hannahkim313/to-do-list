const Project = () => {
    let _projectName;
    let _tasks = [];

    const getName = () => _projectName;

    const getTasks = () => _tasks;

    const setName = (name) => _projectName = name;

    const addTask = (task) => _tasks.push(task);

    return {
        getName,
        getTasks,
        setName,
        addTask,
    };
};

export {
    Project,
};