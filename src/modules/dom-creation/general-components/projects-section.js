import { appendChildren, undoCamelCase } from "./helper-functions";
import { createDiv } from "./elements";
import { createProjectContent } from "./project-content";

const createProjectsSection = (allProjectsData) => {
    const createProjects = () => {
        const projects = [];
        for (const [projectName, projectData] of Object.entries(allProjectsData)) {
            if (Object.keys(projectData).length > 0) {
                projects.push(createProjectContent(undoCamelCase(projectName), projectData));
            };
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