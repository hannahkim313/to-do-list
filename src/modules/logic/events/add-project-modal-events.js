import * as modal from "../../dom/modals";

const _cancelModal = (dialog) => modal.cancel(dialog);

const _validateModal = (e) => {
    const dialog = e.target.closest("dialog");
    const inputs = dialog.querySelectorAll("input");
    for (const input of inputs) {
        if (modal.isValid(input)) {
            modal.submit(dialog);
        } else {
            e.preventDefault();
            modal.displayInvalid(input);
        };
    };
};

const _emitClickEvents = (e) => {
    if (!e.target.closest("button")) {
        return;
    };
    
    if (e.target.closest("button").classList.contains("cancel-btn")) {
        const dialog = e.target.closest("dialog");
        _cancelModal(dialog);
    };
    
    if (e.target.closest("button").classList.contains("confirm-btn")) {
        _validateModal(e);
    };
};

const _toggleInputBorderColor = (form) => {
    const inputs = form.querySelectorAll("input");
    for (const input of inputs) {
        const borderColor = input.style.borderColor;

        if (borderColor === "transparent") {
            input.style.borderColor = "var(--color-text-1)";
        };

        if (borderColor === "var(--color-text-1)") {
            input.style.borderColor = "transparent";
        };
    };
};

const _emitFocusinEvents = (e) => {
    if (e.target.closest("form")) {
        const form = e.target.closest("form");
        _toggleInputBorderColor(form);
    };
};

const _emitFocusoutEvents = (e) => {
    if (e.target.closest("form")) {
        const form = e.target.closest("form");
        _toggleInputBorderColor(form);
    };
};

const _events = {
    click: _emitClickEvents,
    focusin: _emitFocusinEvents,
    focusout: _emitFocusoutEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};