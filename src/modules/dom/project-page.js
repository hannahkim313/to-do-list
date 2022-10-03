import * as element from "./html-elements";
import * as method from "../helper-functions";
import * as page from "./page";
import * as projectMenu from "./project-menu";

const create = (name) => {
    const elements = [
        element.createHeading("2", "Projects"),
        projectMenu.create(),
    ];
    const projectName = method.capitalize(name);
    const projectPage = page.create(projectName, elements);
    projectPage.className += " projects";

    return projectPage;
};

export {
    create,
};