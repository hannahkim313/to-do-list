import { emitEvents } from "./modules/logic/emit-events";
import { setDefault } from "./modules/logic/set-default";
import { setStyles } from "./modules/logic/set-styles";
import "./css/style.css";
import "./css/reset.css";

if (localStorage.length === 0) {
    setDefault();
} else {
    localStorage.removeItem("debug");
    
    setStyles();
};

emitEvents();