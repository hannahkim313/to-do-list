import * as element from "./html-elements";

const create = () => {
    const sectionAttributes = {
        class: "projects",
    };
    const section = element.createDiv(sectionAttributes);

    return section;
};

const addTo = (pageName, project) => {
    pageName = pageName.replaceAll(" ", "-");
    const menu = document.querySelector(`.${pageName} .projects`);
    menu.appendChild(project);
};

export {
    create,
    addTo,
};