const appendChildren = (parent, ...children) => {
    for (const child of children) {
        parent.appendChild(child);
    };
};

export {
    appendChildren,
};