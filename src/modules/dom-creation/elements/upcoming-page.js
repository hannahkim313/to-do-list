import * as element from "../html-elements";
import * as pageComp from "../page-elements";
import * as projectComp from "../general-components/project-components";

const createUpcomingPage = () => {
    const elements = [
        element.createHeading("2", "Upcoming"),
        // projectComp.createFilters(),
        projectComp.createEmptyMessage("There are no upcoming tasks.", false),
    ];
    const page = pageComp.createPage("upcoming", elements);

    return page;
};

export {
    createUpcomingPage,
};