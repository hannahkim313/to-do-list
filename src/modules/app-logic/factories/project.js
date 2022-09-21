import * as method from "../../dom-creation/helper-functions";

const Project = (projectName, tasks) => {
    const getProjectName = () => method.capitalize(projectName);

    const getTasks = () => tasks;

    return {
        getProjectName,
        getTasks,
    };
};

export {
    Project,
};