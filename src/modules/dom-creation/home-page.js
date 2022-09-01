import { appendChildren, setAttributesOf, dayToString, monthToString } from "./general-components/helper-functions";
import { createHeading, createPara, createDiv, createArticle } from "./general-components/elements";
import { createOverviewImg } from "./general-components/image-elements";
import { createPage } from "./general-components/page";

const _createOverview = (taskStats) => {
    const createDateSection = () => {
        const dateObj = new Date();

        const createNumDate = () => {
            const date = dateObj.getDate();
            const numDate = createPara(date);
            const numDateAttributes = {
                class: "num-date",
            };
            setAttributesOf(numDate, numDateAttributes);

            return numDate;
        };

        const createFullDate = () => {
            const fullDateAttributes = {
                class: "full-date",
            };
            const fullDate = createDiv(fullDateAttributes);
            const day = dayToString(dateObj.getDay());
            const month = monthToString(dateObj.getMonth());
            const year = dateObj.getFullYear();
            const elements = [
                createPara(`${day},`),
                createPara(`${month} ${year}`),
            ];
            appendChildren(fullDate, elements);

            return fullDate;
        };

        const dateSectionAttributes = {
            class: "date-container",
        };
        const dateSection = createDiv(dateSectionAttributes);
        const elements = [
            createNumDate(),
            createFullDate(),
        ];
        appendChildren(dateSection, elements);

        return dateSection;
    };

    const createTasksSection = () => {
        const createTaskCircles = () => {
            const taskCircles = [];
            for (const [taskType, numTasks] of Object.entries(taskStats)) {
                const taskAttributes = {
                    class: `${taskType}`,
                };
                const task = createArticle(taskAttributes);
                const taskData = [
                    createHeading("4", `${numTasks}`),
                    createPara("Tasks"),
                    createPara(`${taskType}`),
                ];
                appendChildren(task, taskData);
                taskCircles.push(task);
            };

            return taskCircles;
        };

        const tasksSectionAttributes = {
            class: "overview-tasks",
        };
        const tasksSection = createDiv(tasksSectionAttributes);
        appendChildren(tasksSection, createTaskCircles());

        return tasksSection;
    };

    const createImgSection = () => {
        const sectionAttributes = {
            class: "overview-img-wrapper",
        };
        const section = createDiv(sectionAttributes);
        const elements = [
            createOverviewImg(),
        ];
        appendChildren(section, elements);

        return section;
    };

    const overviewAttributes = {
        class: "overview",
    };
    const overview = createArticle(overviewAttributes);
    const elements = [
        createHeading("3", "Overview"),
        createDateSection(),
        createTasksSection(),
        createImgSection(),
    ];
    appendChildren(overview, elements);

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
        setAttributesOf(textArea, textAreaAttributes);

        return textArea;
    };

    const notesAttributes = {
        class: "notes",
    };
    const notes = createArticle(notesAttributes);
    const elements = [
        createHeading("3", "Notes"),
        createTextArea(),
    ];
    appendChildren(notes, elements);

    return notes;
};

const createHomePage = () => {
    const homePage = createPage("home");
    const taskStats = {
        completed: "4",
        remaining: "3",
        overdue: "2",
    };
    const elements = [
        createHeading("2", "Home"),
        _createOverview(taskStats),
        _createNotesSection(),
    ];
    appendChildren(homePage, elements);

    return homePage;
};

export {
    createHomePage,
};