import { appendChildren } from "../helper-functions";
import { createDiv } from "../elements";
import { createProjectContent } from "./project-content";

const createProjectsSection = (allProjectsData) => {
    const createProjects = () => {
        const projects = [];
        for (const projectData of Object.values(allProjectsData)) {
            projects.push(createProjectContent(projectData));
        };
    
        return projects;
    };

    const attributes = { class: "projects" };
    const projectsSection = createDiv(attributes);
    appendChildren(projectsSection, createProjects(allProjectsData));

    return projectsSection;
};

export {
    createProjectsSection,
};