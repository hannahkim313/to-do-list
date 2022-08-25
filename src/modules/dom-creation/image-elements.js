import { createImg } from "./elements";
import githubImg from "../../img/github.svg";
import appLogoImg from "../../img/logo.svg";
import overviewImg from "../../img/overview.jpg";
import plusLightImg from "../../img/plus-light.svg";
import plusDarkImg from "../../img/plus-dark.svg";
import homeImg from "../../img/home.svg";
import todayImg from "../../img/today.svg";
import upcomingImg from "../../img/upcoming.svg";
import projectsImg from "../../img/folder.svg";
import chevronDownImg from "../../img/chevron-down.svg";
import listImg from "../../img/circle-filled-dark-orange.svg";
import arrowDownImg from "../../img/arrow-down.svg";
import moreOptionsImg from "../../img/dots-horizontal.svg";
import checkedImg from "../../img/checkbox.svg";
import uncheckedImg from "../../img/circle-outline.svg";
import lowPriorityImg from "../../img/circle-filled-blue.svg";
import mediumPriorityImg from "../../img/circle-filled-yellow.svg";
import highPriorityImg from "../../img/circle-filled-red.svg";

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
        alt: "Foggy autumnal forest",
    };

    return createImg(imgAttributes);
};

const createPlusLightIcon = () => {
    const imgAttributes = {
        src: plusLightImg,
        alt: "Plus icon",
    };

    return createImg(imgAttributes);

};

const createPlusDarkIcon = () => {
    const imgAttributes = {
        src: plusDarkImg,
        alt: "Plus icon",
    };

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
    createPlusLightIcon,
    createPlusDarkIcon,
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