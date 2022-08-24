import { appendChildren } from "./helper-functions";
import { createButton, createDiv, createHeading, createPara } from "./elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";

const _createFilters = () => {
    const allBtn = createButton({ type: "button", class: "all" });
    appendChildren(allBtn, [createPara("All")]);
    const thisWeekBtn = createButton({ type: "button", class: "this-week" });
    appendChildren(thisWeekBtn, [createPara("This week")]);
    const thisMonthBtn = createButton({ type: "button", class: "this-month" });
    appendChildren(thisMonthBtn, [createPara("This month")]);
    
    const attributes = { class: "filters" };
    const filters = createDiv(attributes);
    const elements = [allBtn, thisWeekBtn, thisMonthBtn];
    appendChildren(filters, elements);

    return filters;
};

const createUpcomingPage = () => {
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
    const upcomingPage = createPage("upcoming");
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