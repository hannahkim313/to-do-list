import { createImg } from "./elements";
import githubImg from "../../../img/github.svg";
import appLogoImg from "../../../img/logo.svg";
import overviewImg from "../../../img/overview.jpg";
import plusInvertedImg from "../../../img/plus-inverted.svg";
import plusImg from "../../../img/plus.svg";
import homeImg from "../../../img/home.svg";
import todayImg from "../../../img/today.svg";
import upcomingImg from "../../../img/upcoming.svg";
import projectsImg from "../../../img/folder.svg";
import chevronDownImg from "../../../img/chevron-down.svg";
import listImg from "../../../img/bullet-list.svg";
import arrowDownImg from "../../../img/arrow-down.svg";
import moreOptionsImg from "../../../img/dots-horizontal.svg";
import checkedImg from "../../../img/checkbox.svg";
import uncheckedImg from "../../../img/circle-outline.svg";
import lowPriorityImg from "../../../img/low-priority.svg";
import mediumPriorityImg from "../../../img/medium-priority.svg";
import highPriorityImg from "../../../img/high-priority.svg";

const createGithubIcon = () => {
    const imgAttributes = {
        src: githubImg,
        alt: "Github icon",
    };

    return createImg(imgAttributes);
};

const createAppLogo = () => {
    const imgAttributes = {
        src: appLogoImg,
        alt: "Bulleted list icon",
        class: "logo",
    };

    return createImg(imgAttributes);
};

const createOverviewImg = () => {
    const imgAttributes = {
        src: overviewImg,
        alt: "Aesthetic image",
    };

    return createImg(imgAttributes);
};

const createPlusIcon = (isInverted) => {
    const imgAttributes = {
        alt: "Plus icon",
    };
    imgAttributes.src = isInverted ? plusInvertedImg : plusImg;

    return createImg(imgAttributes);
};

const createHomeIcon = () => {
    const imgAttributes = {
        src: homeImg,
        alt: "Home icon",
    };

    return createImg(imgAttributes);
};

const createTodayIcon = () => {
    const imgAttributes = {
        src: todayImg,
        alt: "Single day calendar icon",
    };
    
    return createImg(imgAttributes);
};

const createUpcomingIcon = () => {
    const imgAttributes = {
        src: upcomingImg,
        alt: "Multiple days calendar icon",
    };
    
    return createImg(imgAttributes);
};
const createProjectsIcon = () => {
    const imgAttributes = {
        src: projectsImg,
        alt: "Folder icon",
    };
    
    return createImg(imgAttributes);
};

const createExpandIcon = () => {
    const imgAttributes = {
        src: chevronDownImg,
        alt: "Click to expand",
    };

    return createImg(imgAttributes);
};

const createListIcon = () => {
    const imgAttributes = {
        src: listImg,
        alt: "Bullet list",
    };

    return createImg(imgAttributes);
};

const createArrowDownIcon = () => {
    const imgAttributes = {
        src: arrowDownImg,
        alt: "Down arrow icon",
    };

    return createImg(imgAttributes);
};

const createMoreOptionsIcon = () => {
    const imgAttributes = {
        src: moreOptionsImg,
        alt: "Click for more options",
    };

    return createImg(imgAttributes);
};

const createCheckedIcon = () => {
    const imgAttributes = {
        src: checkedImg,
        alt: "Checked box",
    };

    return createImg(imgAttributes);
};

const createUncheckedIcon = () => {
    const imgAttributes = {
        src: uncheckedImg,
        alt: "Unchecked box",
    };

    return createImg(imgAttributes);
};

const createLowPriorityIcon = () => {
    const imgAttributes = {
        src: lowPriorityImg,
        alt: "Low priority",
    };

    return createImg(imgAttributes);
};

const createMediumPriorityIcon = () => {
    const imgAttributes = {
        src: mediumPriorityImg,
        alt: "Medium priority",
    };

    return createImg(imgAttributes);
};

const createHighPriorityIcon = () => {
    const imgAttributes = {
        src: highPriorityImg,
        alt: "High priority",
    };

    return createImg(imgAttributes);
};

export {
    createGithubIcon,
    createAppLogo,
    createOverviewImg,
    createPlusIcon,
    createHomeIcon,
    createTodayIcon,
    createUpcomingIcon,
    createProjectsIcon,
    createExpandIcon,
    createArrowDownIcon,
    createMoreOptionsIcon,
    createListIcon,
    createCheckedIcon,
    createUncheckedIcon,
    createLowPriorityIcon,
    createMediumPriorityIcon,
    createHighPriorityIcon,
};