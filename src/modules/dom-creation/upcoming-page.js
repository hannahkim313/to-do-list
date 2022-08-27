import { appendChildren, capitalize } from "./general-components/helper-functions";
import { createButton, createDiv, createHeading, createPara } from "./general-components/elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";

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
    upcomingPage.style.display = "none";
    const allProjectsData = {
        errands: {
            taskBooking: {
                checked: false,
                name: "Book Airbnb",
                dueDate: "Jun 11, 2022",
                priority: "medium",
            },
        },
        work: {
            taskAnalysis: {
                checked: false,
                name: "Gather end-of-week analysis",
                dueDate: "Jun 10, 2022",
                priority: "high",
            },
        },
    };
    const elements = [
        createHeading("2", "Upcoming"),
        _createFilters(),
        createProjectsSection(allProjectsData),
    ];
    appendChildren(upcomingPage, elements);

    return upcomingPage;
};

export {
    createUpcomingPage,
};