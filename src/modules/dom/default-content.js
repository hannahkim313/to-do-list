import * as date from "../logic/functions/date-functions";
import * as homePage from "./home-page";
import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";
import * as page from "./page";
import { Project } from "../logic/factories/project-factory";
import * as project from "./project";
import * as projectMenu from "./project-menu";
import * as projectPage from "./project-page";
import * as sidebar from "./sidebar";
import * as taskMenu from "./task-menu";
import { Task } from "../logic/factories/task-factory";

const _errandsTasks = [
    {
        title: "Drop off package",
        description: "Store opens at 10 AM",
        dueDate: date.getToday(),
        priority: "high",
        overdue: false,
        checked: true,
        project: "errands",
    },
    {
        title: "Buy birthday gift",
        dueDate: date.getToday(),
        priority: "high",
        overdue: false,
        checked: true,
        project: "errands",
    },
    {
        title: "Send out postcard",
        dueDate: date.getPreviousDay("sunday", 0),
        priority: "medium",
        overdue: true,
        overdue: true,
        checked: false,
        project: "errands",
    },
    {
        title: "Get groceries",
        dueDate: date.getToday(),
        priority: "medium",
        overdue: false,
        checked: true,
        project: "errands",
    },
    {
        title: "Meal prep",
        dueDate: date.getToday(),
        priority: "low",
        overdue: false,
        checked: false,
        project: "errands",
    },
    {
        title: "Water plants",
        dueDate: date.getToday(),
        priority: "low",
        overdue: false,
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
        dueDate: date.getToday(),
        priority: "low",
        overdue: false,
        checked: true,
        project: "errands",
    },
];

const _roadTripTasks = [
    {
        title: "Book Airbnb",
        description: "Check cancellation policy before booking",
        dueDate: date.getToday(),
        priority: "high",
        overdue: false,
        checked: true,
        project: "road trip",
    },
    {
        title: "Schedule doggy daycare",
        dueDate: date.getDayAhead({ days: 4, }),
        priority: "high",
        overdue: false,
        checked: true,
        project: "road trip",
    },
    {
        title: "Get car checked",
        dueDate: date.getNextDay("saturday", 1),
        priority: "high",
        overdue: false,
        checked: false,
        project: "road trip",
    },
    {
        title: "Finish packing",
        dueDate: date.getNextDay("thursday", 3),
        priority: "high",
        overdue: false,
        checked: false,
        project: "road trip",
    },
    {
        title: "Turn off all electronics and lock all doors",
        dueDate: date.getNextDay("friday", 3),
        priority: "high",
        overdue: false,
        checked: false,
        project: "road trip",
    },
    {
        title: "Make dinner reservations for the day we arrive",
        dueDate: date.getToday(),
        priority: "medium",
        overdue: false,
        checked: false,
        project: "road trip",
    },
    {
        title: "Buy parking pass for national parks/viewpoints",
        dueDate: date.getDayAhead({ days: 4, }),
        description: "Save copies of tickets",
        priority: "medium",
        overdue: false,
        checked: true,
        project: "road trip",
    },
    {
        title: "Buy travel items",
        dueDate: date.getDayAhead({ days: 6, }),
        priority: "low",
        overdue: false,
        checked: true,
        project: "road trip",
    },
];

const _workTasks = [
    {
        title: "Confirm vacation time",
        dueDate: date.getNextDay("tuesday", 0),
        priority: "high",
        overdue: false,
        checked: true,
        project: "work",
    },
    {
        title: "Introduce new team members",
        dueDate: date.getNextDay("monday", 2),
        priority: "high",
        overdue: false,
        checked: false,
        project: "work",
    },
    {
        title: "Gather end-of-week analysis",
        dueDate: date.getNextDay("friday", 2),
        priority: "high",
        overdue: false,
        checked: false,
        project: "work",
    },
    {
        title: "Video call Joe",
        description: "Go over team dynamic and discuss possible changes",
        dueDate: date.getPreviousDay("wednesday", 0),
        priority: "medium",
        overdue: true,
        checked: false,
        project: "work",
    },
];

const _taskSets = [
    _errandsTasks,
    _roadTripTasks,
    _workTasks,
];

const _populateLibrary = () => {
    for (const taskSet of _taskSets) {
        const project = Project();
        project.setName(taskSet[0].project);

        for (const taskData of taskSet) {
            const task = Task();
            task.setTitle(taskData.title);
            task.setDescription(taskData.description);
            task.setDueDate(taskData.dueDate);
            task.setPriority(taskData.priority);
            task.setOverdue(taskData.overdue);
            task.setChecked(taskData.checked);
            task.setProject(taskData.project);

            project.addTask(task);
        };

        library.add(project);
    };
};

const _createFilteredContent = (sections) => {
    for (const section of sections) {
        const filters = [
            section,
        ];
        const filteredTaskSets = library.filterBy(filters);
        for (const taskSet of filteredTaskSets) {
            if (taskSet.length === 0) {
                continue;
            };
            
            const projectElement = project.create(taskSet);
            projectMenu.addTo(section, projectElement);
            
            taskMenu.addTo(section, taskSet);
        };
    };
};

const _createProjectsContent = () => {
    for (const taskSet of _taskSets) {
        const projectName = taskSet[0].project;
        const pageElement = projectPage.create(projectName);
        page.addToDOM(pageElement);

        const tasks = library.get(projectName).getTasks();

        const projectElement = project.create(tasks);
        projectMenu.addTo(projectName, projectElement);

        taskMenu.addTo(projectName, tasks);
    };
};

const _createSidebarContent = () => {
    for (const taskSet of _taskSets) {
        const projectName = taskSet[0].project;
        sidebar.addSubsection(method.capitalize(projectName), "projects");

        const sectionName = method.toKebabCase(projectName);
        const section = document.querySelector(`[data-page-name="${sectionName}"]`);
        const alerts = sidebar.createAlerts(method.toKebabCase(projectName));
        section.appendChild(alerts);
    };
};

const create = () => {
    const sections = [
        "today",
        "upcoming",
    ];

    _populateLibrary();
    _createFilteredContent(sections);
    _createProjectsContent();
    _createSidebarContent();
    homePage.updateOverviewTasks();
};

export {
    create,
};