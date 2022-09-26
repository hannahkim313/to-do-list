import * as element from "../html-elements";
import * as page from "../page-elements";
import * as projectComp from "../general-components/project-components";

const create = () => {
    const elements = [
        element.createHeading("2", "Today"),
        projectComp.createEmptyMessage("There are no tasks left to do today.", false),
    ];
    const todayPage = page.createPage("today", elements);

    return todayPage;
};

export {
    create,
};