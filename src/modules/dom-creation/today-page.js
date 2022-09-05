import { appendChildren } from "./general-components/helper-functions";
import { createHeading } from "./general-components/elements";
import { createPage } from "./general-components/page";
import { createEmptyMessage } from "./general-components/ui-elements";

const createTodayPage = () => {
    const todayPage = createPage("today");
    const elements = [
        createHeading("2", "Today"),
        createEmptyMessage("There are no tasks to do today."),
    ];
    appendChildren(todayPage, elements);
    todayPage.style.display = "none";

    return todayPage;
};

export {
    createTodayPage,
};