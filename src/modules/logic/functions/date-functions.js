import * as dateAPI from "date-fns";

const _date = new Date();

const _getMonthIndex = (monthName) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    
    return months.findIndex(month => month === monthName);
};

const getDate = () => dateAPI.format(_date, "d");

const getDay = () => dateAPI.format(_date, "EEE");

const getMonth = () => dateAPI.format(_date, "LLL");

const getYear = () => dateAPI.format(_date, "yyyy");

const getToday = () => dateAPI.format(_date, `LLL d, yyyy`);

const getDayAhead = (duration) => dateAPI.format(dateAPI.add(_date, duration), `LLL d, yyyy`);

const getDayBehind = (duration) => dateAPI.format(dateAPI.sub(_date, duration), `LLL d, yyyy`);

const getNextDay = (day, weeks) => {
    const duration = {
        weeks: weeks,
    };
    const startDate = dateAPI.add(_date, duration);
    const nextDays = {
        sunday: dateAPI.format(dateAPI.nextSunday(startDate), `LLL d, yyyy`),
        monday: dateAPI.format(dateAPI.nextMonday(startDate), `LLL d, yyyy`),
        tuesday: dateAPI.format(dateAPI.nextTuesday(startDate), `LLL d, yyyy`),
        wednesday: dateAPI.format(dateAPI.nextWednesday(startDate), `LLL d, yyyy`),
        thursday: dateAPI.format(dateAPI.nextThursday(startDate), `LLL d, yyyy`),
        friday: dateAPI.format(dateAPI.nextFriday(startDate), `LLL d, yyyy`),
        saturday: dateAPI.format(dateAPI.nextSaturday(startDate), `LLL d, yyyy`),
    };

    for (const [key, fullDate] of Object.entries(nextDays)) {
        if (key === day) {
            return fullDate;
        };
    };
};

const getPreviousDay = (day, weeks) => {
    const duration = {
        weeks: weeks,
    };
    const startDate = dateAPI.sub(_date, duration);
    const previousDays = {
        sunday: dateAPI.format(dateAPI.previousSunday(startDate), `LLL d, yyyy`),
        monday: dateAPI.format(dateAPI.previousMonday(startDate), `LLL d, yyyy`),
        tuesday: dateAPI.format(dateAPI.previousTuesday(startDate), `LLL d, yyyy`),
        wednesday: dateAPI.format(dateAPI.previousWednesday(startDate), `LLL d, yyyy`),
        thursday: dateAPI.format(dateAPI.previousThursday(startDate), `LLL d, yyyy`),
        friday: dateAPI.format(dateAPI.previousFriday(startDate), `LLL d, yyyy`),
        saturday: dateAPI.format(dateAPI.previousSaturday(startDate), `LLL d, yyyy`),
    };

    for (const [key, fullDate] of Object.entries(previousDays)) {
        if (key === day) {
            return fullDate;
        };
    };
};

const getMonthFromIndex = (index) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return months[index - 1];
};

const stringToDate = (date) => {
    const chars = Array.from(date);
    const commaIndex = chars.findIndex(element => element === ",");
    chars.splice(commaIndex, 1)
    date = chars.join("").split(" ");
    
    const month = _getMonthIndex(date[0]);
    const day = date[1];
    const year = date[2];

    return new Date(year, month, day);
};

const stringToValue = (str) => {
    const dateObj = str ? stringToDate(str) : new Date();

    const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
    const date = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const year = dateObj.getFullYear();
    
    return `${year}-${month}-${date}`;
};

const valueToString = (value) => {
    const dateArray = value.split("-");
    const month = dateArray[1].charAt(0) === "0" ? dateArray[1].slice(1) : dateArray[1];
    const day = dateArray[2].charAt(0) === "0" ? dateArray[2].slice(1) : dateArray[2];
    const year = dateArray[0];
    
    return `${getMonthFromIndex(month)} ${day}, ${year}`;
};

const isThisWeek = (date) => {
    date = stringToDate(date);

    return dateAPI.isThisWeek(date);

};

const isThisMonth = (date) => {
    date = stringToDate(date);

    return dateAPI.isThisMonth(date);
};

const isToday = (date) => {
    date = stringToDate(date);
    
    return dateAPI.isToday(date);
};

const isBeforeToday = (date) => {
    date = stringToDate(date);

    const year = getYear();
    const month = _getMonthIndex(getMonth());
    const dateNum = getDate();
    const today = new Date(year, month, dateNum);
    
    return dateAPI.isBefore(date, today);
};

export {
    getDate,
    getDay,
    getMonth,
    getYear,
    getToday,
    getDayAhead,
    getDayBehind,
    getNextDay,
    getPreviousDay,
    getMonthFromIndex,
    stringToDate,
    stringToValue,
    valueToString,
    isThisWeek,
    isThisMonth,
    isToday,
    isBeforeToday,
};