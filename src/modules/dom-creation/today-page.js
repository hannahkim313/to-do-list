import { appendChildren } from "./general-components/helper-functions";
import { createHeading } from "./general-components/elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";
import { ProjectsDataList } from "./general-components/projects-data";

const createTodayPage = () => {
    const todayPage = createPage("today");
    const filters = {
        type: "due date",
        value: "Jun 8, 2022",
        canDelete: false,
    };
    const allProjectsData = Object.assign(
        ProjectsDataList().get("errands", filters),
        ProjectsDataList().get("road trip", filters),
        ProjectsDataList().get("work", filters),
    );
    const elements = [
        createHeading("2", "Today"),
        createProjectsSection(allProjectsData),
    ];
    appendChildren(todayPage, elements);
    todayPage.style.display = "none";

    return todayPage;
};

export {
    createTodayPage,
};