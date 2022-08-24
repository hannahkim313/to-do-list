import { appendChildren, setAttributesOf } from "./helper-functions";
import { createHeading, createPara, createDiv, createArticle, createImg } from "./elements";
import { createPage } from "./general-components/page";
import overviewImg from "../../img/overview.jpg";

const _createOverview = (taskStats) => {
    const createDateSection = () => {
        const createNumDate = () => {
            const numDate = createPara("8");
            const attributes = { class: "num-date" };
            setAttributesOf(numDate, attributes);

            return numDate;
        };

        const createFullDate = () => {
            const attributes = { class: "full-date" };
            const fullDate = createDiv(attributes);
            const elements = [createPara("Wed,"), createPara("Jun 2022")];
            appendChildren(fullDate, elements);

            return fullDate;
        };

        const attributes = { class: "date-container" };
        const dateSection = createDiv(attributes);
        const elements = [createNumDate(), createFullDate()];
        appendChildren(dateSection, elements);

        return dateSection;
    };

    const createTasksSection = () => {
        const createTaskCircles = () => {
            const taskCircles = [];
            for (const [taskType, numTasks] of Object.entries(taskStats)) {
                const attributes = { class: `${taskType}` };
                const task = createArticle(attributes);
                const taskData = [
                    createHeading("4", `${numTasks}`),
                    createPara("Tasks"),
                    createPara(`${taskType}`)
                ];
                appendChildren(task, taskData);
                taskCircles.push(task);
            };

            return taskCircles;
        };

        const attributes = { class: "overview-tasks" };
        const tasksSection = createDiv(attributes);
        appendChildren(tasksSection, createTaskCircles());

        return tasksSection;
    };

    const createImgSection = () => {
        const attributes = { class: "overview-img-wrapper" };
        const section = createDiv(attributes);
        const elements = [createImg({ src: overviewImg, alt: "Foggy autumnal forest" })];
        appendChildren(section, elements);

        return section;
    };

    const attributes = { class: "overview" };
    const overview = createArticle(attributes);
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
        const attributes = {
            name: "user-notes",
            id: "user-notes",
            cols: "30",
            rows: "10",
        };
        setAttributesOf(textArea, attributes);

        return textArea;
    };

    const attributes = { class: "notes" };
    const notes = createArticle(attributes);
    const elements = [createHeading("3", "Notes"), createTextArea()];
    appendChildren(notes, elements);

    return notes;
};

const createHomePage = () => {
    const homePage = createPage("home");
    const taskStats = { completed: "4", remaining: "3", overdue: "2" };
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