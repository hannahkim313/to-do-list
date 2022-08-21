import { appendChildren } from "./helper-functions";
import { createHeading } from "./elements";
import { createPage } from "./general-components/page";
import { createProjectsSection } from "./general-components/projects-section";

const createTodayPage = () => {
    const allProjectsData = {
        projectOne: {
            title: "Errands",
            taskOne: {
                checked: true,
                name: "Drop off package",
                dueDate: "Jun 8, 2022",
                priority: "high"
            },
            taskTwo: {
                checked: true,
                name: "Buy birthday gift",
                dueDate: "Jun 8, 2022",
                priority: "high"
            },
            taskThree: {
                checked: true,
                name: "Get groceries",
                dueDate: "Jun 8, 2022",
                priority: "medium"
            },
            taskFour: {
                checked: false,
                name: "Meal prep",
                dueDate: "Jun 8, 2022",
                priority: "low"
            },
            taskFive: {
                checked: false,
                name: "Water plants",
                dueDate: "Jun 8, 2022",
                priority: "low"
            },
            taskSix: {
                checked: true,
                name: "Go to gym",
                dueDate: "Jun 8, 2022",
                priority: "low"
            },
        },
        projectTwo: {
            title: "Work",
            taskOne: {
                checked: false,
                name: "Introduce new team members",
                dueDate: "Jun 8, 2022",
                priority: "high"
            }
        }
    };
    const todayPage = createPage("today");
    const elements = [
        createHeading("2", "Today"),
        createProjectsSection(allProjectsData)
    ];
    appendChildren(todayPage, elements);
    todayPage.style.display = "none";

    return todayPage;
};

export {
    createTodayPage,
};