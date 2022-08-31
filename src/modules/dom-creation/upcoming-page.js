import { appendChildren, capitalize } from "./general-components/helper-functions";
import { createButton, createDiv, createHeading, createPara } from "./general-components/elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";
import { ProjectsDataList } from "./general-components/projects-data";

const _createFilters = () => {
    const createFilterBtn = (name) => {
        const btnAttributes = {
            type: "button",
            class: name.replaceAll(" ", "-"),
        };
        const btn = createButton(btnAttributes);
        const elements = [
            createPara(capitalize(name)),
        ];
        appendChildren(btn, elements);

        return btn;
    };

    const filtersAttributes = {
        class: "filters",
    };
    const filters = createDiv(filtersAttributes);
    const elements = [
        createFilterBtn("all"),
        createFilterBtn("this week"),
        createFilterBtn("this month"),
    ];
    appendChildren(filters, elements);

    return filters;
};

const createUpcomingPage = () => {
    const upcomingPage = createPage("upcoming");
    const filters = {
        type: "due date",
        value: "Jun 8, 2022",
        canDelete: true,
    };
    const allProjectsData = Object.assign(
        ProjectsDataList().get("errands", filters),
        ProjectsDataList().get("road trip", filters),
        ProjectsDataList().get("work", filters),
    );
    const elements = [
        createHeading("2", "Upcoming"),
        _createFilters(),
        createProjectsSection(allProjectsData),
    ];
    appendChildren(upcomingPage, elements);
    upcomingPage.style.display = "none";

    return upcomingPage;
};

export {
    createUpcomingPage,
};