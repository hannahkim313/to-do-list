import * as dateAPI from "date-fns";

const _date = new Date();

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

const _stringToDate = (formattedDate) => {
    const chars = Array.from(formattedDate);
    const commaIndex = chars.findIndex(element => element === ",");
    chars.splice(commaIndex, 1)
    formattedDate = chars.join("").split(" ");
    
    const getMonthIndex = () => {
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
        
        return months.findIndex(month => month === formattedDate[0]);
    };
    
    const month = getMonthIndex();
    const day = formattedDate[1];
    const year = formattedDate[2];

    return new Date(year, month, day);
};

const isUpcoming = (upcomingDate) => {
    upcomingDate = _stringToDate(upcomingDate);
    
    return dateAPI.isAfter(upcomingDate, _date);
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
    isUpcoming,
};