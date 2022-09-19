import * as method from "../helper-functions";
import * as element from "../html-elements";
import * as page from "../page-elements";
import * as projectComp from "../general-components/project-components";

const createProjectPage = (name) => {
    const message = projectComp.createEmptyMessage("This project has no tasks.", true);
    const elements = [
        element.createHeading("2", "Projects"),
        projectComp.createDisplayedProjects(name, message),
    ];
    const projectPage = page.createPage(method.capitalize(name), elements);
    projectPage.className += " projects";

    return projectPage;
};

export {
    createProjectPage,
};