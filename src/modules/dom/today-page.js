import * as element from "./html-elements";
import * as page from "./page";
import * as projectMenu from "./project-menu";

const create = () => {
    const elements = [
        element.createHeading("2", "Today"),
        projectMenu.create(),
    ];
    const todayPage = page.create("today", elements);

    return todayPage;
};

export {
    create,
};