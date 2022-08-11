import { SidebarSection } from "../sidebar-components/sidebar-section";
import homeImg from "../../../img/home.svg";
import todayImg from "../../../img/today.svg";
import upcomingImg from "../../../img/upcoming.svg";
import projectsImg from "../../../img/folder.svg";

const createSections = () => {
    const sectionsInfo = {
        home: {
            imgAttributes: { src: homeImg, alt: "Home icon", },
            paraText: { text: "Home" },
        },
        today: {
            imgAttributes: { src: todayImg, alt: "Single day calendar icon", },
            paraText: { text: "Today" },
        },
        upcoming: {
            imgAttributes: { src: upcomingImg, alt: "Multiple days calendar icon", },
            paraText: { text: "Upcoming" },
        },
        projects: {
            imgAttributes: { src: projectsImg, alt: "Folder icon", },
            paraText: { text: "Projects" },
        },
    };
    const sections = [];
    for (const section of Object.values(sectionsInfo)) {
        sections.push(SidebarSection(section).getSection());
    };
    return sections;
};

export {
    createSections,
};