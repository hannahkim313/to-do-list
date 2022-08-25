import { appendChildren } from "./helper-functions";
import { createDiv } from "./elements";
import { createProjectContent } from "./project-content";

const createProjectsSection = (allProjectsData) => {
    const createProjects = () => {
        const projects = [];
        for (const [projectName, projectData] of Object.entries(allProjectsData)) {
            projects.push(createProjectContent(projectName, projectData));
        };
    
        return projects;
    };

    const sectionAttributes = {
        class: "projects",
    };
    const section = createDiv(sectionAttributes);
    appendChildren(section, createProjects(allProjectsData));

    return section;
};

export {
    createProjectsSection,
};