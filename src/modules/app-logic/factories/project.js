const Project = (projectName) => {
    const getProjectName = () => projectName;

    const getTask = (taskName) => {
        for (const task of tasks) {
            // If name of task === taskName, return task
        };
    };

    return {
        getProjectName,
        getTask,
    };
};

export {
    Project,
};