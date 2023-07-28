import * as addProjectModal from "../dom/add-project-modal";
import * as addTaskModal from "../dom/add-task-modal";
import * as contentModal from "../dom/default-content-modal";
import * as deleteTaskModal from "../dom/delete-task-modal";
import * as deleteProjectModal from "../dom/delete-project-modal";
import * as editProjectModal from "../dom/edit-project-modal";
import * as editTaskModal from "../dom/edit-task-modal";
import * as footer from "../dom/footer";
import * as header from "../dom/header";
import * as homePage from "../dom/home-page";
import * as method from "../helper-functions";
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
        addProjectModal.create(),
        addTaskModal.create(),
        editTaskModal.create(),
        deleteTaskModal.create(),
        editProjectModal.create(),
        deleteProjectModal.create(),
        contentModal.create(),
    ];
    method.appendChildren(body, elements);

    const defaultContentModal = document.querySelector(".default-content.modal");
    defaultContentModal.showModal();
};

export {
    setDefault,
};