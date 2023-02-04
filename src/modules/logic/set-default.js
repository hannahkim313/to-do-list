import * as defaultContent from "../dom/default-content";
import * as footer from "../dom/footer";
import * as header from "../dom/header";
import * as homePage from "../dom/home-page";
import * as method from "../helper-functions";
import * as modal from "../dom/add-project-modal";
import * as sidebar from "../dom/sidebar";
import * as todayPage from "../dom/today-page";
import * as upcomingPage from "../dom/upcoming-page";

const setDefault = () => {
    const body = document.querySelector("body");
    const elements = [
        header.create(),
        sidebar.create(),
        homePage.create(),
        todayPage.create(),
        upcomingPage.create(),
        footer.create(),
        modal.createAddProjectModal(),
    ];
    method.appendChildren(body, elements);

    defaultContent.create();
};

export {
    setDefault,
};