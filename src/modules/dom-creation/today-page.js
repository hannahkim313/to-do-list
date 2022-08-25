import { appendChildren } from "./general-components/helper-functions";
import { createHeading } from "./general-components/elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";

const createTodayPage = () => {
    const todayPage = createPage("today");
    todayPage.style.display = "none";
    const allProjectsData = {
        errands: {
            taskPackage: {
                checked: true,
                name: "Drop off package",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
            taskGift: {
                checked: true,
                name: "Buy birthday gift",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
            taskGroceries: {
                checked: true,
                name: "Get groceries",
                dueDate: "Jun 8, 2022",
                priority: "medium",
            },
            taskMeal: {
                checked: false,
                name: "Meal prep",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
            taskPlants: {
                checked: false,
                name: "Water plants",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
            taskGym: {
                checked: true,
                name: "Go to gym",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
        },
        work: {
            taskIntro: {
                checked: false,
                name: "Introduce new team members",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
        },
    };
    const elements = [
        createHeading("2", "Today"),
        createProjectsSection(allProjectsData),
    ];
    appendChildren(todayPage, elements);

    return todayPage;
};

export {
    createTodayPage,
};