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

const capitalize = (str) => {
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    };
    
    return words.join(" ");
};

const toCamelCase = (str) => {
    const letters = Array.from(str);
    for (let i = 0; i < letters.length - 1; i++) {
        if (letters[i + 1] === undefined) break;
        if (letters[i] === " ") letters[i + 1] = letters[i + 1].toUpperCase();
    };
    return letters.filter(el => el !== " ").join("");
};

const undoCamelCase = (str) => {
    const letters = Array.from(str);
    for (let i = 0; i < letters.length - 1; i++) {
        if (letters[i] === " ") continue;
        if (letters[i] === letters[i].toUpperCase()) {
            letters[i] = letters[i].toLowerCase();
            letters.splice(i, 0, " ");
        };
    };
    return letters.join("");
};

export {
    appendChildren,
    setAttributesOf,
    capitalize,
    toCamelCase,
    undoCamelCase,
};