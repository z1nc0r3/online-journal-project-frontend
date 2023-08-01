import { endOfWeek, getWeekOfMonth, startOfMonth, addMonths, endOfMonth, getWeeksInMonth, getMonth, subMonths, isSameWeek } from 'date-fns';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function getWeekInfo(date) {
    var currentYear = date.getFullYear(); // get the current year
    var currentMonth = getMonth(date); // get the current month
    var currentWeek = getWeekOfMonth(date, { weekStartsOn: 1 }); // get the current week of the month

    const actualMonth = currentMonth;
    var totalWeeks = getWeeksInMonth(date, { weekStartsOn: 1 }); // get the total number of weeks in the current month

    // getting the last day of the last month and the first day of the next month
    const lastMonthEndDate = endOfMonth(subMonths(date, 1));
    const nextMonthStartDate = startOfMonth(addMonths(date, 1));

    const isStartInSameWeek = isSameWeek(lastMonthEndDate, startOfMonth(date), { weekStartsOn: 1 }); // check if the first day of the current month is in the same week as the last day of the last month
    const isEndInSameWeek = isSameWeek(nextMonthStartDate, endOfMonth(date), { weekStartsOn: 1 }); // check if the last day of the current month is in the same week as the first day of the next month

    // getting the last day of the first week and the first day of the last week
    const endOfFirstWeek = endOfWeek(startOfMonth(date), { weekStartsOn: 1 }).getDate();
    const endOfLastWeek = endOfWeek(endOfMonth(date), { weekStartsOn: 1 }).getDate();

    var startOffset = isStartInSameWeek && (endOfFirstWeek - 1) < 3; // check if the first week has less than 3 days
    var endOffset = isEndInSameWeek && (endOfLastWeek > 3); // check if the last week has less than 3 days

    // if the first week has less than 3 days, then current month should be the last month
    if (currentWeek === 1 && startOffset) {
        currentMonth--;
    }

    // if the last week has less than 3 days, then current month should be the next month
    if (currentWeek === totalWeeks && endOffset) {
        currentMonth++;
    }

    totalWeeks -= startOffset + endOffset; // calculate the number of weeks in the current month
    currentMonth = ((currentMonth % 12) + 12) % 12; // make sure the month is between 0 and 11

    if (startOffset) { // if the first week has less than 3 days, then the current week should be the last week of the last month
        currentWeek--;
    }

    if (currentWeek > totalWeeks) { // if the last week has less than 3 days, then the current week should be the first week of the next month
        currentWeek = 1;
    }

    // if the current week is 0, then it should be the last week of the last month
    currentWeek = (currentWeek === 0) ? getWeeksInMonth(subMonths(date, 1), { weekStartsOn: 1 }) : currentWeek;

    // shifting the year if the current month is January or December
    if (actualMonth === 0 && currentMonth === 11) {
        currentYear--;
    }

    if (actualMonth === 11 && currentMonth === 0) {
        currentYear++;
    }

    const currentMonthName = months[currentMonth];

    return { currentYear, currentMonth, currentMonthName, currentWeek, totalWeeks };
}

export default getWeekInfo;