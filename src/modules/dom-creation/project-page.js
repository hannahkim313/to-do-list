import { appendChildren, setAttributesOf } from "./general-components/helper-functions";
import { createHeading } from "./general-components/elements";
import { createProjectsSection } from "./general-components/projects-section";
import { ProjectsDataList } from "./general-components/projects-data";

const createProjectsPage = (projectName) => {
    const createPage = () => {
        const page = document.createElement("main");
        const pageAttributes = {
            class: `projects page ${projectName.replaceAll(" ", "-")}`,
        };
        setAttributesOf(page, pageAttributes);

        return page;
    };

    const projectsPage = createPage();
    projectsPage.style.display = "none";
    const projectData = ProjectsDataList().get(projectName);
    const elements = [
        createHeading("2", "Projects"),
        createProjectsSection(projectData),
    ];
    appendChildren(projectsPage, elements);

    return projectsPage;
};

export {
    createProjectsPage,
};