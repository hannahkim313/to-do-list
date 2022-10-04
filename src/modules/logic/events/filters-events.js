import * as method from "../../helper-functions";
import * as projectMenu from "../../dom/project-menu";

const _deselectCurrentFilter = () => {
    const selectedBtn = document.querySelector(".filters .selected");
    selectedBtn.classList.remove("selected");
};

const _displayAll = (pageName) => {
    const allBtn = document.querySelector(`.${pageName} .filters .all`);
    allBtn.classList.add("selected");

    projectMenu.display("all");
};

const _displayThisWeek = (pageName) => {
    const thisWeekBtn = document.querySelector(`.${pageName} .filters .this-week`);
    thisWeekBtn.classList.add("selected");

    projectMenu.display("this week");
};

const _displayThisMonth = (pageName) => {
    const thisMonthBtn = document.querySelector(`.${pageName} .filters .this-month`);
    thisMonthBtn.classList.add("selected");

    projectMenu.display("this month");
};

const _emitFns = {
    all: _displayAll,
    thisWeek: _displayThisWeek,
    thisMonth: _displayThisMonth,
};

const emitEvents = (e) => {
    const btn = e.target.closest("button");
    
    if (!btn || btn.classList.contains("selected")) {
        return;
    };
    
    const filter = method.toCamelCase(method.undoKebabCase(btn.getAttribute("class")));
    for (const key of Object.keys(_emitFns)) {
        if (key === filter) {
            _deselectCurrentFilter();
            const pageName = btn.closest("main").dataset.pageName;
            projectMenu.removeProjects(pageName);
            _emitFns[filter](pageName);
        };
    };
};

export {
    emitEvents,
};