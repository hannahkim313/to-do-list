import * as date from "../logic/functions/date-functions";
import * as element from "./html-elements";
import * as image from "./image-elements";
import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";
import * as page from "./page";

const _createOverview = () => {
    const createDateSection = () => {
        const createNumDate = () => {
            const numDate = element.createPara(date.getDate());
            const numDateAttributes = {
                class: "num-date",
            };
            method.setAttributesOf(numDate, numDateAttributes);

            return numDate;
        };

        const createFullDate = () => {
            const fullDateAttributes = {
                class: "full-date",
            };
            const fullDate = element.createDiv(fullDateAttributes);
            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getYear();
            const elements = [
                element.createPara(`${day},`),
                element.createPara(`${month} ${year}`),
            ];
            method.appendChildren(fullDate, elements);

            return fullDate;
        };

        const dateSectionAttributes = {
            class: "date-wrapper",
        };
        const dateSection = element.createDiv(dateSectionAttributes);
        const elements = [
            createNumDate(),
            createFullDate(),
        ];
        method.appendChildren(dateSection, elements);

        return dateSection;
    };

    const createTasksSection = () => {
        const createTaskCircles = () => {
            const taskCircles = [];
            const taskTypes = [
                "completed",
                "remaining",
                "overdue"
            ];
            for (const taskType of taskTypes) {
                const taskAttributes = {
                    class: taskType,
                };
                const task = element.createArticle(taskAttributes);
                const taskData = [
                    element.createHeading("4", "0"),
                    element.createPara("Tasks"),
                    element.createPara(taskType),
                ];
                method.appendChildren(task, taskData);
                taskCircles.push(task);
            };

            return taskCircles;
        };

        const tasksSectionAttributes = {
            class: "overview-tasks",
        };
        const tasksSection = element.createDiv(tasksSectionAttributes);
        const elements = createTaskCircles();
        method.appendChildren(tasksSection, elements);

        return tasksSection;
    };

    const createImgSection = () => {
        const sectionAttributes = {
            class: "overview-img-wrapper",
        };
        const section = element.createDiv(sectionAttributes);
        const elements = [
            image.createOverviewImg(),
        ];
        method.appendChildren(section, elements);

        return section;
    };

    const overviewAttributes = {
        class: "overview",
    };
    const overview = element.createArticle(overviewAttributes);
    const elements = [
        element.createHeading("3", "Overview"),
        createDateSection(),
        createTasksSection(),
        createImgSection(),
    ];
    method.appendChildren(overview, elements);

    return overview;
};

const _createNotesSection = () => {
    const createTextArea = () => {
        const textArea = document.createElement("textarea");
        const textAreaAttributes = {
            name: "user-notes",
            id: "user-notes",
            cols: "30",
            rows: "10",
        };
        method.setAttributesOf(textArea, textAreaAttributes);

        return textArea;
    };

    const notesAttributes = {
        class: "notes",
    };
    const notes = element.createArticle(notesAttributes);
    const elements = [
        element.createHeading("3", "Notes"),
        createTextArea(),
    ];
    method.appendChildren(notes, elements);

    return notes;
};

const create = () => {
    const elements = [
        element.createHeading("2", "Home"),
        _createOverview(),
        _createNotesSection(),
    ];
    const homePage = page.create("home", elements);
    homePage.style.display = "grid";

    return homePage;
};

const updateOverviewTasks = () => {
    const numCompleted = library.getTaskStats(null, "completed");
    const currentCompleted = document.querySelector(".overview-tasks .completed h4");
    currentCompleted.textContent = numCompleted;
    
    const numOverdue = library.getTaskStats(null, "overdue");
    const currentOverdue = document.querySelector(".overview-tasks .overdue h4");
    currentOverdue.textContent = numOverdue;
    
    const numRemaining = library.getTaskStats(null, "remaining");
    const currentRemaining = document.querySelector(".overview-tasks .remaining h4");
    currentRemaining.textContent = numRemaining;
};

export {
    create,
    updateOverviewTasks,
};