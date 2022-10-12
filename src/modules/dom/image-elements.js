import * as element from "./html-elements";
import appLogoImg from "../../img/logo.svg";
import arrowDownImg from "../../img/arrow-down.svg";
// import checkedHoverImg from "../../img/checked-hover.svg";
import checkedImg from "../../img/checked.svg";
import chevronDownImg from "../../img/chevron-down.svg";
import githubImg from "../../img/github.svg";
import highPriorityImg from "../../img/high-priority.svg";
import homeImg from "../../img/home.svg";
import listImg from "../../img/bullet-list.svg";
import lowPriorityImg from "../../img/low-priority.svg";
import mediumPriorityImg from "../../img/medium-priority.svg";
import moreOptionsImg from "../../img/dots-horizontal.svg";
import overviewImg from "../../img/overview.jpg";
import plusImg from "../../img/plus.svg";
import plusInvertedImg from "../../img/plus-inverted.svg";
import projectsImg from "../../img/folder.svg";
import todayImg from "../../img/today.svg";
import uncheckedImg from "../../img/unchecked.svg";
// import uncheckedHoverImg from "../../img/unchecked-hover.svg";
import upcomingImg from "../../img/upcoming.svg";

const createAppLogo = () => {
    const imgAttributes = {
        src: appLogoImg,
        alt: "Bulleted list icon",
        class: "logo",
    };
    
    return element.createImg(imgAttributes);
};

const createArrowDownIcon = () => {
    const imgAttributes = {
        src: arrowDownImg,
        alt: "Down arrow icon",
    };

    return element.createImg(imgAttributes);
};

// const createCheckedHoverIcon = () => {
//     const imgAttributes = {
//         src: checkedHoverImg,
//         alt: "Checked box hovered",
//     };

//     return element.createImg(imgAttributes);
// };

const createCheckedIcon = () => {
    const imgAttributes = {
        src: checkedImg,
        alt: "Checked box",
    };
    const img = element.createImg(imgAttributes);
    img.dataset.isChecked = "true";

    return img;
};

const createCollapsibleIcon = () => {
    const imgAttributes = {
        src: chevronDownImg,
        alt: "Click to display content",
        class: "collapsible icon",
    };

    return element.createImg(imgAttributes);
};

const createGithubIcon = () => {
    const imgAttributes = {
        src: githubImg,
        alt: "Github icon",
    };

    return element.createImg(imgAttributes);
};

const createHighPriorityIcon = () => {
    const imgAttributes = {
        src: highPriorityImg,
        alt: "High priority",
    };

    return element.createImg(imgAttributes);
};

const createHomeIcon = () => {
    const imgAttributes = {
        src: homeImg,
        alt: "Home icon",
    };

    return element.createImg(imgAttributes);
};

const createListIcon = () => {
    const imgAttributes = {
        src: listImg,
        alt: "Bullet list",
    };

    return element.createImg(imgAttributes);
};

const createLowPriorityIcon = () => {
    const imgAttributes = {
        src: lowPriorityImg,
        alt: "Low priority",
    };

    return element.createImg(imgAttributes);
};

const createMediumPriorityIcon = () => {
    const imgAttributes = {
        src: mediumPriorityImg,
        alt: "Medium priority",
    };

    return element.createImg(imgAttributes);
};

const createMoreOptionsIcon = () => {
    const imgAttributes = {
        src: moreOptionsImg,
        alt: "Click for more options",
    };

    return element.createImg(imgAttributes);
};

const createOverviewImg = () => {
    const imgAttributes = {
        src: overviewImg,
        alt: "Aesthetic image",
    };

    return element.createImg(imgAttributes);
};

const createPlusIcon = (isInverted) => {
    const imgAttributes = {
        alt: "Plus icon",
    };
    imgAttributes.src = isInverted ? plusInvertedImg : plusImg;

    return element.createImg(imgAttributes);
};

const createProjectsIcon = () => {
    const imgAttributes = {
        src: projectsImg,
        alt: "Folder icon",
    };
    
    return element.createImg(imgAttributes);
};

const createTodayIcon = () => {
    const imgAttributes = {
        src: todayImg,
        alt: "Single day calendar icon",
    };
    
    return element.createImg(imgAttributes);
};

const createUncheckedIcon = () => {
    const imgAttributes = {
        src: uncheckedImg,
        alt: "Unchecked box",
    };
    const img = element.createImg(imgAttributes);
    img.dataset.isChecked = "false";

    return img;
};

// const createUncheckedHoverIcon = () => {
//     const imgAttributes = {
//         src: uncheckedHoverImg,
//         alt: "Unchecked box hovered",
//     };

//     return element.createImg(imgAttributes);
// };

const createUpcomingIcon = () => {
    const imgAttributes = {
        src: upcomingImg,
        alt: "Multiple days calendar icon",
    };
    
    return element.createImg(imgAttributes);
};

export {
    createAppLogo,
    createArrowDownIcon,
    createCheckedIcon,
    // createCheckedHoverIcon,
    createCollapsibleIcon,
    createHighPriorityIcon,
    createHomeIcon,
    createGithubIcon,
    createListIcon,
    createMediumPriorityIcon,
    createLowPriorityIcon,
    createMoreOptionsIcon,
    createOverviewImg,
    createPlusIcon,
    createProjectsIcon,
    createTodayIcon,
    createUncheckedIcon,
    // createUncheckedHoverIcon,
    createUpcomingIcon,
};