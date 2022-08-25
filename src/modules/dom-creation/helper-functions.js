const appendChildren = (parent, children) => {
    for (const child of children) {
        parent.appendChild(child);
    };
};

const setAttributesOf = (el, attributes) => {
    for (const [key, value] of Object.entries(attributes)) {
        const attribute = key;
        el.setAttribute(attribute, value);
    };
};

const capitalize = (str) => str = str.charAt(0).toUpperCase() + str.slice(1);

export {
    appendChildren,
    setAttributesOf,
    capitalize,
};