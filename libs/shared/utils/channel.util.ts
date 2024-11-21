import dayjs from 'dayjs';
export const LAST_CHANNEL_POINT_ORDER = 2147483647;

function differenceInMonths(date1, date2) {
  const dayDiff = date1.getDate() - date2.getDate();
  const monthDiff = date1.getMonth() - date2.getMonth();
  const yearDiff = date1.getYear() - date2.getYear();

  return dayDiff > 0
    ? monthDiff + yearDiff * 12 + 1
    : monthDiff + yearDiff * 12;
}
function differenceInMonthsNew(date1: any, date2: any) {
  const start = dayjs(date1);
  const end = dayjs(date2);

  if (start.isAfter(end)) {
    throw new Error('Ng�y b?t d?u ph?i tru?c ng�y k?t th�c');
  }

  const result = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end, 'day')) {
    const startOfMonth = current.startOf('month');
    const endOfMonth = current.endOf('month');

    const monthStart = current.isSame(start, 'month') ? start : startOfMonth;
    const monthEnd = current.isSame(end, 'month') ? end : endOfMonth;

    // S? ng�y trong th�ng hi?n t?i
    const daysInMonth = current.daysInMonth();
    // S? ng�y trong kho?ng th?i gian trong th�ng hi?n t?i
    const daysInRange = monthEnd.diff(monthStart, 'day') + 1;

    const percentage = (daysInRange / daysInMonth) * 100;
    result.push({
      date: current,
      percentage: percentage.toString().includes('.')
        ? parseFloat(percentage.toFixed(2)) / 100
        : percentage / 100,
    });
    current = current.add(1, 'month').startOf('month');
  }
  return result;
}
export const countMonth = (model: any, appendix: any, contract: any) => {
  let start_date;
  let end_date;
  if (model.fromDate) {
    start_date = new Date(model.fromDate);
  } else {
    start_date = new Date(appendix.effectiveDate);
  }

  if (model.toDate) {
    end_date = new Date(model.toDate);
  } else {
    if (appendix.expirationDate) {
      end_date = new Date(appendix.expirationDate);
    } else {
      end_date = new Date(contract.expirationDate);
    }
  }
  start_date.setHours(0, 0, 0);
  end_date.setHours(0, 0, 0);

  return differenceInMonths(end_date, start_date);
};

export const countValue = (model: any, appendix: any, contract: any) => {
  const result = countMonth(model, appendix, contract);
  let value = 0;
  switch (contract.type) {
    case 'CONTRACT_CHANNEL_FULL':
      if (model.unit === 'kilometer') {
        value = Number(model.price) * Number(model.capbleLength) * result;
      } else {
        value = Number(model.price) * result;
      }
      break;
    case 'CONTRACT_CHANNEL_CAPACITY':
      value =
        ((Number(model.price) + Number(model.gateFee)) *
          Number(model.routeNumber) +
          Number(model.vlanFee)) *
        result;
      break;
    case 'CONTRACT_CHANNEL_VIBA':
      value = Number(model.price) * result;
      break;
  }
  return value;
};
export const countMonthNew = (model: any, appendix: any, contract: any) => {
  let start_date;
  let end_date;
  if (model.fromDate) {
    start_date = model.fromDate;
  } else {
    start_date = appendix.effectiveDate;
  }

  if (model.toDate) {
    end_date = model.toDate;
  } else {
    if (appendix.expirationDate) {
      end_date = appendix.expirationDate;
    } else {
      end_date = contract.expirationDate;
    }
  }
  return differenceInMonthsNew(start_date, end_date);
};
export const countValueNew = (
  model: any,
  contract: any,
  calculateMonthPercentage: number,
) => {
  let value = 0;
  let valueBeforeVat = 0;
  switch (contract.type) {
    case 'CONTRACT_CHANNEL_FULL':
      if (model.unit === 'kilometer') {
        valueBeforeVat =
          Number(model.price) * Number(model.unit) * calculateMonthPercentage;
        value = valueBeforeVat + (valueBeforeVat * Number(model.taxRate)) / 100;
      } else {
        valueBeforeVat = Number(model.price) * calculateMonthPercentage;
        value = valueBeforeVat + (valueBeforeVat * Number(model.taxRate)) / 100;
      }
      break;
    case 'CONTRACT_CHANNEL_CAPACITY':
      valueBeforeVat =
        (Number(model.price) + Number(model.vlanFee) + Number(model.gateFee)) *
        calculateMonthPercentage;
      value = valueBeforeVat + (valueBeforeVat * Number(model.taxRate)) / 100;
      break;
    case 'CONTRACT_CHANNEL_VIBA':
      valueBeforeVat = Number(model.price) * calculateMonthPercentage;
      value = valueBeforeVat + (valueBeforeVat * Number(model.taxRate)) / 100;
      break;
  }
  return value;
};
export function differenceInMonth(date1: any, date2: any) {
  const start = dayjs(date1);
  const end = dayjs(date2);
  if (start.isAfter(end)) {
    throw new Error('Ngày bắt đầu phải lớn hơn ngày kết thúc');
  }
  const current = start;
  let percentage = 0;
  if (current.isBefore(end) || current.isSame(end, 'day')) {
    const startOfMonth = current.startOf('month');
    const endOfMonth = current.endOf('month');
    const monthStart = current.isSame(start, 'month') ? start : startOfMonth;
    const monthEnd = current.isSame(end, 'month') ? end : endOfMonth;
    const daysInMonth = current.daysInMonth();
    const daysInRange = monthEnd.diff(monthStart, 'day') + 1;
    percentage = (daysInRange / daysInMonth) * 100;
  }
  return percentage.toString().includes('.')
    ? parseFloat(percentage.toFixed(2))
    : percentage;
}
export const countValueInOneMonthNew = (model: any, contract: any) => {
  let value = 0;
  switch (contract.type) {
    case "CONTRACT_CHANNEL_FULL":
      if (model.unit === "kilometer") {
        value = Number(model.price) * Number(model.capbleLength);
      } else {
        value = Number(model.price);
      }
      break;
    case "CONTRACT_CHANNEL_CAPACITY":
      value =
        Number(model.price) + Number(model.vlanFee) + Number(model.gateFee);
      break;
    case "CONTRACT_CHANNEL_VIBA":
      value = Number(model.price);
      break;
  }
  return value;
};
export function differenceInDay(date1: any, date2: any) {
  const start = dayjs(date1);
  const end = dayjs(date2);
  if (start.isAfter(end)) {
    throw new Error('Ngày bắt đầu phải trước ngày kết thúc');
  }
  const current = start;
  let percentage = 0;
  if (current.isBefore(end) || current.isSame(end, 'day')) {
    const startOfMonth = current.startOf('month');
    const endOfMonth = current.endOf('month');

    const monthStart = current.isSame(start, 'month') ? start : startOfMonth;
    const monthEnd = current.isSame(end, 'month') ? end : endOfMonth;
    const daysInRange = monthEnd.diff(monthStart, 'day') + 1;
    percentage = daysInRange;
  }
  return percentage;
}

export const penaltyRateForDisruption = [
  { min: -Infinity, max: 86, rate: 0 },
  { min: 87, max: 216, rate: 5 },
  { min: 217, max: 640, rate: 7 },
  { min: 641, max: Infinity, rate: 10 },
];
