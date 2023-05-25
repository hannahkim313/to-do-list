import * as projectMenu from "../../dom/project-menu";

const _toggleDropdownMenu = (dropdown) => {
    dropdown.classList.toggle("expanded");

    const menu = dropdown.nextElementSibling;

    if (dropdown.classList.contains("expanded")) {
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    } else {
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    };
};

const _changeSortByFilters = (newFilter) => {
    const currentFilter = newFilter.closest("menu").querySelector(".selected");
    currentFilter.classList.toggle("selected");
    newFilter.classList.toggle("selected");

    const dropdown = newFilter.closest("div").querySelector(".dropdown");
    dropdown.firstElementChild.textContent = newFilter.firstElementChild.textContent;
};

const _emitClickEvents = (e) => {
    if (e.target.closest("button").classList.contains("dropdown")) {
        const dropdown = e.target.closest("button");
        _toggleDropdownMenu(dropdown);
    };

    if (e.target.closest("button").classList.contains("sort-by-filter")) {
        const newFilter = e.target.closest("button");
        _changeSortByFilters(newFilter);
        
        const dropdown = e.target.closest("div").querySelector(".dropdown");
        _toggleDropdownMenu(dropdown);
    
        const selectedFilter = e.target.closest("button");
        projectMenu.sortProjectTasks(selectedFilter);
    };
};

const _events = {
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};