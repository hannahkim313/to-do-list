import {
    format,
    add,
    sub,
    nextSunday,
    nextMonday,
    nextTuesday,
    nextWednesday,
    nextThursday,
    nextFriday,
    nextSaturday,
    previousSunday,
    previousMonday,
    previousTuesday,
    previousWednesday,
    previousThursday,
    previousFriday,
    previousSaturday
} from 'date-fns'

const FullDate = () => {
    const date = new Date();

    const getToday = () => format(date, `LLL d, yyyy`);

    const getDayAhead = (duration) => format(add(date, duration), `LLL d, yyyy`);

    const getDayBehind = (duration) => format(sub(date, duration), `LLL d, yyyy`);

    const getNextDay = (day, weeks) => {
        const startDate = add(date, { weeks: weeks, });

        const nextDays = {
            sunday: format(nextSunday(startDate), `LLL d, yyyy`),
            monday: format(nextMonday(startDate), `LLL d, yyyy`),
            tuesday: format(nextTuesday(startDate), `LLL d, yyyy`),
            wednesday: format(nextWednesday(startDate), `LLL d, yyyy`),
            thursday: format(nextThursday(startDate), `LLL d, yyyy`),
            friday: format(nextFriday(startDate), `LLL d, yyyy`),
            saturday: format(nextSaturday(startDate), `LLL d, yyyy`),
        };
        for (const [key, fullDate] of Object.entries(nextDays)) {
            if (key === day) return fullDate;
        };
    };

    const getPreviousDay = (day, weeks) => {
        const startDate = sub(date, { weeks: weeks, });

        const previousDays = {
            sunday: format(previousSunday(startDate), `LLL d, yyyy`),
            monday: format(previousMonday(startDate), `LLL d, yyyy`),
            tuesday: format(previousTuesday(startDate), `LLL d, yyyy`),
            wednesday: format(previousWednesday(startDate), `LLL d, yyyy`),
            thursday: format(previousThursday(startDate), `LLL d, yyyy`),
            friday: format(previousFriday(startDate), `LLL d, yyyy`),
            saturday: format(previousSaturday(startDate), `LLL d, yyyy`),
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