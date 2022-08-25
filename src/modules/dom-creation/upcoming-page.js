import { appendChildren } from "./helper-functions";
import { createButton, createDiv, createHeading, createPara } from "./elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";

const _createFilters = () => {
    const createAllBtn = () => {
        const allBtnAttributes = {
            type: "button",
            class: "all",
        };
        const allBtn = createButton(allBtnAttributes);
        const elements = [
            createPara("All"),
        ];
        appendChildren(allBtn, elements);

        return allBtn;
    };

    const createThisWeekBtn = () => {
        const thisWeekBtnAttributes = {
            type: "button",
            class: "this-week",
        };
        const thisWeekBtn = createButton(thisWeekBtnAttributes);
        const elements = [
            createPara("This week"),
        ];
        appendChildren(thisWeekBtn, elements);

        return thisWeekBtn;
    };

    const createThisMonthBtn = () => {
        const thisMonthBtnAttributes = {
            type: "button",
            class: "this-month",
        };
        const thisMonthBtn = createButton(thisMonthBtnAttributes);
        const elements = [
            createPara("This month"),
        ];
        appendChildren(thisMonthBtn, elements);

        return thisMonthBtn;
    };
    
    const filtersAttributes = {
        class: "filters",
    };
    const filters = createDiv(filtersAttributes);
    const elements = [
        createAllBtn(),
        createThisWeekBtn(),
        createThisMonthBtn(),
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