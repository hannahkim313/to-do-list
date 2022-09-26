import { Project } from "../app-logic/factories/project";
import * as library from "../app-logic/project-library";
import * as dateFunc from "../app-logic/date-logic";
import * as pageFunc from "../app-logic/page-logic";
import * as sidebarFunc from "../app-logic/sidebar-logic";
import * as method from "./helper-functions";
import * as element from "./html-elements";
import * as projectPage from "./elements/project-page";
import * as task from "./task-elements";

const _errandsTasks = [
    {
        title: "Drop off package",
        description: "Store opens at 10AM",
        dueDate: dateFunc.getToday(),
        priority: "high",
        checked: true,
        project: "errands",
    },
    {
        title: "Buy birthday gift",
        dueDate: dateFunc.getToday(),
        priority: "high",
        checked: true,
        project: "errands",
    },
    {
        title: "Send out postcard",
        dueDate: dateFunc.getPreviousDay("sunday", 0),
        priority: "medium",
        overdue: true,
        checked: false,
        project: "errands",
    },
    {
        title: "Get groceries",
        dueDate: dateFunc.getToday(),
        priority: "medium",
        checked: true,
        project: "errands",
    },
    {
        title: "Meal prep",
        dueDate: dateFunc.getToday(),
        priority: "low",
        checked: false,
        project: "errands",
    },
    {
        title: "Water plants",
        dueDate: dateFunc.getToday(),
        priority: "low",
        checked: false,
        project: "errands",
    },
    {
        title: "Go to gym",
        description: `
            Upper body day:
            bicep curls, overhead tricep extensions, upright row,
            rear delt fly/pull, overhead shoulder presses, chest presses
        `,
        dueDate: dateFunc.getToday(),
        priority: "low",
        checked: true,
        project: "errands",
    },
];

const _roadTripTasks = [
    {
        title: "Book Airbnb",
        description: "Check cancellation policy before booking",
        dueDate: dateFunc.getToday(),
        priority: "high",
        checked: true,
        project: "road trip",
    },
    {
        title: "Schedule doggy daycare",
        dueDate: dateFunc.getDayAhead({ days: 4, }),
        priority: "high",
        checked: true,
        project: "road trip",
    },
    {
        title: "Get car checked",
        dueDate: dateFunc.getNextDay("saturday", 1),
        priority: "high",
        checked: false,
        project: "road trip",
    },
    {
        title: "Finish packing",
        dueDate: dateFunc.getNextDay("thursday", 3),
        priority: "high",
        checked: false,
        project: "road trip",
    },
    {
        title: "Turn off all electronics and lock all doors",
        dueDate: dateFunc.getNextDay("friday", 3),
        priority: "high",
        checked: false,
        project: "road trip",
    },
    {
        title: "Make dinner reservations for the day we arrive",
        dueDate: dateFunc.getToday(),
        priority: "medium",
        checked: false,
        project: "road trip",
    },
    {
        title: "Buy parking pass for national parks/viewpoints",
        dueDate: dateFunc.getDayAhead({ days: 4, }),
        priority: "medium",
        checked: true,
        project: "road trip",
    },
    {
        title: "Buy travel items",
        dueDate: dateFunc.getDayAhead({ days: 6, }),
        priority: "low",
        checked: true,
        project: "road trip",
    },
];

const _workTasks = [
    {
        title: "Confirm vacation time",
        dueDate: dateFunc.getNextDay("tuesday", 0),
        priority: "high",
        checked: true,
        project: "work",
    },
    {
        title: "Introduce new team members",
        dueDate: dateFunc.getNextDay("monday", 2),
        priority: "high",
        checked: false,
        project: "work",
    },
    {
        title: "Gather end-of-week analysis",
        dueDate: dateFunc.getNextDay("friday", 2),
        priority: "high",
        checked: false,
        project: "work",
    },
    {
        title: "Video call Joe",
        description: "Go over team dynamic and discuss possible changes",
        dueDate: dateFunc.getPreviousDay("wednesday", 0),
        priority: "medium",
        overdue: true,
        checked: false,
        project: "work",
    },
];

const _createDefaultProject = (taskGroup) => {
    const projectName = taskGroup[0].project;

    const projectElement = Project(projectName, taskGroup);
    library.add(projectElement);
    console.log(library.get("errands"))
    sidebarFunc.addSubsection(projectElement.getProjectName(), "projects");

    const page = projectPage.create(projectName);
    pageFunc.addToDOM(page);
};

const _createDefaultTasks = (taskGroup) => {
    for (const data of taskGroup) {
        const taskElement = task.createTask(data);
        const taskMenu = document.querySelector(`.${data.project.replaceAll(" ", "-")} menu`);
        if (taskMenu.firstElementChild.classList.contains("empty")) taskMenu.firstElementChild.remove();
        taskMenu.appendChild(taskElement);
    };
};

const _createDefaultAlerts = (taskGroup) => {
    const getTotalOverdue = () => {
        let count = 0;
        for (const taskData of taskGroup) {
            if (taskData.overdue) count++;
        };

        return count;
    };

    const getTotalChecked = () => {
        let count = 0;
        for (const taskData of taskGroup) {
            if (taskData.checked) count++;
        };

        return count;
    };

    const getTotalRemaining = () => taskGroup.length - getTotalChecked();

    const createAlert = (name, num) => {
        const alert = element.createPara();
        const alertAttributes = {
            class: name,
        };
        method.setAttributesOf(alert, alertAttributes);
        const strong = document.createElement("strong");
        strong.textContent = num;
        const elements = [
            strong,
        ];
        method.appendChildren(alert, elements);

        return alert;
    };

    const alertsAttributes = {
        class: "alerts",
    };
    const alerts = document.createElement("aside");
    method.setAttributesOf(alerts, alertsAttributes);
    const elements = [];
    if (getTotalOverdue() > 0) elements.push(createAlert("overdue", getTotalOverdue()));
    if (getTotalRemaining() > 0) elements.push(createAlert("remaining", getTotalRemaining()));
    method.appendChildren(alerts, elements);

    return alerts;
};

// Call logic function that populates "Today" and "Upcoming" pages based on library

const populate = () => {
    const taskGroups = [
        _errandsTasks,
        _roadTripTasks,
        _workTasks,
    ];
    for (const taskGroup of taskGroups) {
        _createDefaultProject(taskGroup);
        _createDefaultTasks(taskGroup);
        const sectionName = taskGroup[0].project.replaceAll(" ", "-");
        const section = document.querySelector(`[data-name='${sectionName}']`);
        const alerts = _createDefaultAlerts(taskGroup);
        section.appendChild(alerts);
    };
};

export {
    populate,
};