import { setAttributesOf } from "../helper-functions/set-attributes-of";
import { appendChildren } from "../helper-functions/append-children";
import { Article } from "./elements/article";
import { Div } from "./elements/div";
import { Heading } from "./elements/heading";
import { Para } from "./elements/para";
import { Img } from "./elements/img";
import { Page } from "./page-components/page";
import overviewImg from "../../img/overview.jpg"

const _createPageTitle = () => Heading("2", "Home").getHeading();

const _createNumDate = () => {
    const numDate = Para("8").getPara();
    const attributes = {
        class: "num-date"
    };
    setAttributesOf(numDate, attributes);
    return numDate;
};

const _createFullDate = () => {
    const dateElements = [
        Para("Wed,").getPara(),
        Para("Jun 2022").getPara()
    ];
    const attributes = {
        class: "full-date"
    };
    const fullDate = Div(attributes).getDiv();
    appendChildren(fullDate, dateElements);
    return fullDate;
};

// Add placeholder date and update when implementing app logic of getting real-time date.
const _createDateSection = () => {
    const dateElements = [
        _createNumDate(),
        _createFullDate()
    ];
    const attributes = {
        class: "date-container",
    };
    const dateSection = Div(attributes).getDiv();
    appendChildren(dateSection, dateElements);
    return dateSection;
};

const _createTaskSections = (tasks) => {
    const sections = [];
    for (const [taskType, numTasks] of Object.entries(tasks)) {
        const taskInfo = [
            Heading("4", `${numTasks}`).getHeading(),
            Para("Tasks").getPara(),
            Para(`${taskType}`).getPara()
        ];
        const attributes = {
            class: `${taskType}`,
        };
        const task = Article(attributes).getArticle();
        appendChildren(task, taskInfo);
        sections.push(task);
    };
    return sections;
};

const _createTasks = () => {
    const tasks = {
        completed: "4",
        remaining: "3",
        overdue: "2"
    };
    const taskSections = _createTaskSections(tasks);
    const attributes = {
        class: "tasks",
    };
    const tasksContainer = Div(attributes).getDiv();
    appendChildren(tasksContainer, taskSections);
    return tasksContainer;
};

const _createImgContainer = () => {
    const attributes = {
        class: "img-container"
    };
    return Div(attributes).getDiv();
};

const _createImg = () => {
    const attributes = {
        src: overviewImg,
        alt: "Foggy autumnal forest"
    };
    const img = [
        Img(attributes).getImg()
    ];
    const imgContainer = _createImgContainer();
    appendChildren(imgContainer, img);
    return imgContainer;
};

const _createOverview = () => {
    const overviewElements = [
        Heading("3", "Overview").getHeading(),
        _createDateSection(),
        _createTasks(),
        _createImg()
    ];
    const attributes = {
        class: "overview",
    };
    const overview = Article(attributes).getArticle();
    appendChildren(overview, overviewElements);
    return overview;
};

const _createTextArea = () => {
    const textArea = document.createElement("textarea");
    const attributes = {
        name: "user-notes",
        id: "user-notes",
        cols: "30",
        rows: "10"
    };
    setAttributesOf(textArea, attributes);
    return textArea;
};

const _createNotesSection = () => {
    const attributes = {
        class: "notes"
    };
    const notesElements = [
        Heading("3", "Notes").getHeading(),
        _createTextArea()
    ];
    const notes = Article(attributes).getArticle();
    appendChildren(notes, notesElements);
    return notes;
};

const createHomePage = () => {
    const homePageElements = [
        _createPageTitle(),
        _createOverview(),
        _createNotesSection()
    ];
    const homePage = Page("home").getPage();
    appendChildren(homePage, homePageElements);
    return homePage;
};

export {
    createHomePage,
};