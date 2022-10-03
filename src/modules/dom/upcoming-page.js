import * as element from "./html-elements";
import * as method from "../helper-functions";
import * as page from "./page";
import * as projectMenu from "./project-menu";

const _createFilters = () => {
    const createFilterBtn = (name) => {
        const btnAttributes = {
            type: "button",
            class: name.replaceAll(" ", "-"),
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            element.createPara(method.capitalize(name)),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };
    
    const filtersAttributes = {
        class: "filters",
    };
    const filters = element.createDiv(filtersAttributes);
    const elements = [
        createFilterBtn("all"),
        createFilterBtn("this week"),
        createFilterBtn("this month"),
    ];
    method.appendChildren(filters, elements);
    
    return filters;
};

const create = () => {
    const elements = [
        element.createHeading("2", "Upcoming"),
        _createFilters(),
        projectMenu.create(),
    ];
    const upcomingPage = page.create("upcoming", elements);

    return upcomingPage;
};

export {
    create,
};