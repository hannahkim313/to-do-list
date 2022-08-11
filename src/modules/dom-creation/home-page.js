import { appendChildren } from "../helper-functions/append-children";
import { Page } from "./page-components/page";
import { createPageTitle } from "./home-components/title";
import { createOverview } from "./home-components/overview";
import { createNotesSection } from "./home-components/notes";

const createHomePage = () => {
    const homePageElements = [
        createPageTitle(),
        createOverview(),
        createNotesSection()
    ];
    const homePage = Page("home").getPage();
    appendChildren(homePage, homePageElements);
    return homePage;
};

export {
    createHomePage,
};