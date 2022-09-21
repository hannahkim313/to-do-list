import * as method from "../dom-creation/helper-functions";

const _projectLibrary = [];

const add = (project) => _projectLibrary.push(project);

const get = (projectName) => {
    for (const project of _projectLibrary) {
        if (method.capitalize(project.getProjectName()) === projectName) return project;
    };
};

export {
    add,
    get,
};