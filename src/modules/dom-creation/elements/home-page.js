import * as element from "../html-elements";
import * as page from "../page-elements";
import * as method from "../helper-functions";
import * as image from "../image-elements";
import * as date from "date-fns";

const _createOverview = () => {
    const createDateSection = () => {
        const dateObj = new Date();

        const createNumDate = () => {
            const numDate = element.createPara(date.format(dateObj, "d"));
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
            const day = date.format(dateObj, "EEE");
            const month = date.format(dateObj, "LLL");
            const year = date.format(dateObj, "yyyy");
            const elements = [
                element.createPara(day),
                element.createPara(`${month} ${year}`),
            ];
            method.appendChildren(fullDate, elements);

            return fullDate;
        };

        const dateSectionAttributes = {
            class: "date-container",
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

            const taskTypes = ["completed", "remaining", "overdue"];
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
        method.appendChildren(tasksSection, createTaskCircles());

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

const createHomePage = () => {
    const elements = [
        element.createHeading("2", "Home"),
        _createOverview(),
        _createNotesSection(),
    ];
    const homePage = page.createPage("home", elements);
    homePage.style.display = "grid";

    return homePage;
};

export {
    createHomePage,
};