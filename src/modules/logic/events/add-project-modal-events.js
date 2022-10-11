import * as modal from "../../dom/modals";

const _cancelModal = (dialog) => modal.cancel(dialog);

const _validateModal = (e, dialog) => {
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
    const btn = e.target.closest("button");
    const dialog = e.target.closest("dialog");

    if (!btn) {
        return;
    };
    
    if (btn.classList.contains("cancel-btn")) {
        _cancelModal(dialog);
    };
    
    if (btn.classList.contains("confirm-btn")) {
        _validateModal(e, dialog);
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
        if (eventType === event) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};