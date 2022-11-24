const getFirstDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
const getLastDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
const getMonthName = (date: Date) => {
  return date.toLocaleString('default', {
    month: 'short',
  });
};
const getMonthParams = (date: Date) => {
  return {
    from: getFirstDay(date).getTime(),
    to: getLastDay(date).getTime(),
  };
};

const currentDate = new Date();
export const currentMonthName = getMonthName(currentDate);
export const currentMonthParams = getMonthParams(currentDate);

const previousMonth = new Date();
previousMonth.setMonth(currentDate.getMonth() - 1);
export const previousMonthName = getMonthName(previousMonth);
export const previousMonthParams = getMonthParams(previousMonth);
