import { appendChildren } from "../../helper-functions/append-children";
import { Heading } from "../elements/heading";
import { Article } from "../elements/article";
import { createDateSection } from "./date";
import { createTasksSection } from "./tasks";
import { createImgSection } from "./img";

const createOverview = () => {
    const overviewElements = [
        Heading("3", "Overview").getHeading(),
        createDateSection(),
        createTasksSection(),
        createImgSection()
    ];
    const attributes = {
        class: "overview",
    };
    const overview = Article(attributes).getArticle();
    appendChildren(overview, overviewElements);
    return overview;
};

export {
    createOverview,
};