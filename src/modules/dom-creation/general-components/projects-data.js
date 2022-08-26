const ProjectsDataList = () => {
    const errandsData = {
        errands: {
            taskPackage: {
                checked: true,
                name: "Drop off package",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
            taskGift: {
                checked: true,
                name: "Buy birthday gift",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
            taskPostcard: {
                checked: false,
                name: "Send out postcard",
                dueDate: "Jun 4, 2022",
                priority: "medium",
                overdue: true,
            },
            taskGroceries: {
                checked: true,
                name: "Get groceries",
                checked: false,
                dueDate: "Jun 8, 2022",
                priority: "medium",
            },
            taskBooking: {
                name: "Book Airbnb",
                dueDate: "Jun 11, 2022",
                priority: "medium",
            },
            taskMeal: {
                checked: false,
                name: "Meal prep",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
            taskPlants: {
                checked: false,
                name: "Water plants",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
            taskGym: {
                checked: true,
                name: "Go to gym",
                dueDate: "Jun 8, 2022",
                priority: "low",
            },
        },
    };
    const roadTripData = {
        ["road trip"]: {
            taskDog: {
                checked: false,
                name: "Schedule doggy daycare",
                dueDate: "Jun 9, 2022",
                priority: "high",
            },
            taskCar: {
                checked: false,
                name: "Get car checked",
                dueDate: "Jun 9, 2022",
                priority: "high",
            },
            taskPack: {
                checked: false,
                name: "Finish packing",
                dueDate: "Jun 15, 2022",
                priority: "high",
            },
            taskHouse: {
                checked: false,
                name: "Turn off all electronics and lock all doors",
                dueDate: "Jun 16, 2022",
                priority: "high",
            },
            taskDinner: {
                checked: false,
                name: "Make dinner reservations",
                dueDate: "Jun 11, 2022",
                priority: "medium",
            },
            taskParking: {
                checked: true,
                name: "Buy parking pass for national parks",
                dueDate: "Jun 12, 2022",
                priority: "medium",
            },
            taskShopping: {
                checked: true,
                name: "Buy travel items",
                dueDate: "Jun 9, 2022",
                priority: "low",
            },
        },
    };
    const workData = {
        work: {
            taskIntro: {
                checked: false,
                name: "Introduce new team members",
                dueDate: "Jun 8, 2022",
                priority: "high",
            },
            taskAnalysis: {
                checked: false,
                name: "Gather end-of-week analysis",
                dueDate: "Jun 10, 2022",
                priority: "high",
            },
            taskConfirm: {
                checked: true,
                name: "Confirm vacation time",
                dueDate: "Jun 9, 2022",
                priority: "high",
            },
            taskVideo: {
                checked: false,
                name: "Video call Joe",
                dueDate: "Jun 9, 2022",
                priority: "medium",
            },
        },
    };
    const projectsData = [
        errandsData,
        roadTripData,
        workData,
    ];

    const get = (projectName) => {
        for (const projectData of projectsData) {
            if (projectData[`${projectName}`]) return projectData;
        };
    };

    return {
        get,
    };
};

export {
    ProjectsDataList,
};