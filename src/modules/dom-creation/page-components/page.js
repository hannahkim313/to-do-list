const Page = (name) => {
    const page = document.createElement("main");
    page.setAttribute("id", `${name}-page`);
    const getPage = () => page;
    return { getPage };
};

export {
    Page,
};