import * as date from 'date-fns';

const FullDate = () => {
    const dateObj = new Date();

    const getToday = () => date.format(dateObj, `LLL d, yyyy`);

    const getDayAhead = (duration) => date.format(date.add(dateObj, duration), `LLL d, yyyy`);

    const getDayBehind = (duration) => date.format(date.sub(dateObj, duration), `LLL d, yyyy`);

    const getNextDay = (day, weeks) => {
        const startDate = date.add(dateObj, { weeks: weeks, });
        const nextDays = {
            sunday: date.format(date.nextSunday(startDate), `LLL d, yyyy`),
            monday: date.format(date.nextMonday(startDate), `LLL d, yyyy`),
            tuesday: date.format(date.nextTuesday(startDate), `LLL d, yyyy`),
            wednesday: date.format(date.nextWednesday(startDate), `LLL d, yyyy`),
            thursday: date.format(date.nextThursday(startDate), `LLL d, yyyy`),
            friday: date.format(date.nextFriday(startDate), `LLL d, yyyy`),
            saturday: date.format(date.nextSaturday(startDate), `LLL d, yyyy`),
        };
        for (const [key, fullDate] of Object.entries(nextDays)) {
            if (key === day) return fullDate;
        };
    };

    const getPreviousDay = (day, weeks) => {
        const startDate = date.sub(dateObj, { weeks: weeks, });
        const previousDays = {
            sunday: date.format(date.previousSunday(startDate), `LLL d, yyyy`),
            monday: date.format(date.previousMonday(startDate), `LLL d, yyyy`),
            tuesday: date.format(date.previousTuesday(startDate), `LLL d, yyyy`),
            wednesday: date.format(date.previousWednesday(startDate), `LLL d, yyyy`),
            thursday: date.format(date.previousThursday(startDate), `LLL d, yyyy`),
            friday: date.format(date.previousFriday(startDate), `LLL d, yyyy`),
            saturday: date.format(date.previousSaturday(startDate), `LLL d, yyyy`),
        };
        for (const [key, fullDate] of Object.entries(previousDays)) {
            if (key === day) return fullDate;
        };
    };

    return {
        getToday,
        getDayAhead,
        getDayBehind,
        getNextDay,
        getPreviousDay,
    };
};

export {
    FullDate,
};