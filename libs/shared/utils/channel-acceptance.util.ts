import dayjs from 'dayjs';
const quarterOfYear = require('dayjs/plugin/quarterOfYear');
dayjs.extend(quarterOfYear);

export function getMonthsFromHalfYear(
  halfYearNumber: number,
  year: number,
  effectiveDate?: Date,
  expirationDate?: Date,
) {
  const month: string[] = [];
  switch (halfYearNumber) {
    case 1:
      if (checkMonth(1, year, effectiveDate, expirationDate)) {
        month.push(`1/${year}`);
      }
      if (checkMonth(2, year, effectiveDate, expirationDate)) {
        month.push(`2/${year}`);
      }
      if (checkMonth(3, year, effectiveDate, expirationDate)) {
        month.push(`3/${year}`);
      }
      if (checkMonth(4, year, effectiveDate, expirationDate)) {
        month.push(`4/${year}`);
      }
      if (checkMonth(5, year, effectiveDate, expirationDate)) {
        month.push(`5/${year}`);
      }
      if (checkMonth(6, year, effectiveDate, expirationDate)) {
        month.push(`6/${year}`);
      }
      break;
    case 2:
      if (checkMonth(7, year, effectiveDate, expirationDate)) {
        month.push(`7/${year}`);
      }
      if (checkMonth(8, year, effectiveDate, expirationDate)) {
        month.push(`8/${year}`);
      }
      if (checkMonth(9, year, effectiveDate, expirationDate)) {
        month.push(`9/${year}`);
      }
      if (checkMonth(10, year, effectiveDate, expirationDate)) {
        month.push(`10/${year}`);
      }
      if (checkMonth(11, year, effectiveDate, expirationDate)) {
        month.push(`11/${year}`);
      }
      if (checkMonth(12, year, effectiveDate, expirationDate)) {
        month.push(`12/${year}`);
      }
      break;
  }
  return month;
}
export function checkMonth(
  month: number,
  year: number,
  effectiveDate?: Date,
  expirationDate?: Date,
) {
  if (expirationDate && dayjs(expirationDate) <= dayjs()) {
    return (
      dayjs(`${year}-${String(month).padStart(2, '0')}-01`) <=
        dayjs(expirationDate) &&
      dayjs(effectiveDate).startOf('month') <=
        dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
    );
  } else {
    return (
      dayjs(`${year}-${String(month).padStart(2, '0')}-01`) <= dayjs() &&
      dayjs(effectiveDate).startOf('month') <=
        dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
    );
  }
}
export function generateMonthItems(
  paymentFormType: string,
  paymentPeriod: string,
  effectiveDateContract: Date,
  expirationDateContract: Date,
) {
  const itemMonths: any[] = [];
  switch (paymentFormType) {
    case 'monthly':
      {
        const timeAcceptanceM = paymentPeriod.split('T')[1];
        itemMonths.push(timeAcceptanceM);
      }
      break;
    case 'quarterly': {
      const timeAcceptanceQ = paymentPeriod.split('Q')[1];
      const year = Number(timeAcceptanceQ.split('/')[1]);
      const quarterNumber = Number(timeAcceptanceQ.split('/')[0]);
      const months = getMonthsFromQuarter(
        quarterNumber,
        year,
        effectiveDateContract,
        expirationDateContract,
      );
      months.forEach((e: string) => {
        itemMonths.push(e);
      });
      break;
    }
    case 'onetime': {
      const startMonth = dayjs(effectiveDateContract).month() + 1;
      const startYear = dayjs(effectiveDateContract).year();
      const monthCounts =
        dayjs() <= dayjs(expirationDateContract)
          ? dayjs().diff(dayjs(effectiveDateContract), 'month')
          : dayjs(expirationDateContract).diff(
              dayjs(effectiveDateContract),
              'month',
            );
      let countYear = 0;
      for (let i = 0; i <= monthCounts; i++) {
        countYear = Math.floor((startMonth + i) / 12);
        itemMonths.push(
          `${(startMonth + i) % 12 === 0 ? 12 : (startMonth + i) % 12}/${
            startYear + countYear
          }`,
        );
      }
      break;
    }
    case 'every6months': {
      const timeAcceptanceH = paymentPeriod.split('6M')[1];
      const yearH = Number(timeAcceptanceH.split('/')[1]);
      const halfYearNumber = Number(timeAcceptanceH.split('/')[0]);

      const monthsInHalfYear = getMonthsFromHalfYear(
        halfYearNumber,
        yearH,
        effectiveDateContract,
        expirationDateContract,
      );
      monthsInHalfYear.forEach((e: string) => {
        itemMonths.push(e);
      });

      break;
    }
  }
  return itemMonths;
}

export function generateDateRanges(startDate, endDate) {
  const itemMonths: any[] = [];
  const itemYears: any[] = [];
  let current = startDate;
  while (
    current.startOf('month').isBefore(endDate.startOf('month')) ||
    current.isSame(endDate, 'month')
  ) {
    itemMonths.push(`T${current.month() + 1}/${current.year()}`);

    const quarter = Math.floor(current.month() / 3) + 1;
    if (!itemMonths.includes(`Q${quarter}/${current.year()}`)) {
      itemMonths.push(`Q${quarter}/${current.year()}`);
    }
    const halfYear = Math.floor((current.month() + 1) / 6) + 1;
    if (!itemMonths.includes(`6M${halfYear}/${current.year()}`)) {
      itemMonths.push(`6M${halfYear}/${current.year()}`);
    }
    const year = current.year();
    if (!itemYears.includes(`${year}`)) {
      itemYears.push(`${year}`);
    }
    current = current.add(1, 'month');
  }

  return {
    itemMonths,
    itemYears,
  };
}

export function getMonthsFromQuarter(
  quarter: number,
  year: number,
  effectiveDate?: Date,
  expirationDate?: Date,
) {
  const month: string[] = [];
  switch (quarter) {
    case 1:
      if (checkMonth(1, year, effectiveDate, expirationDate)) {
        month.push(`1/${year}`);
      }
      if (checkMonth(2, year, effectiveDate, expirationDate)) {
        month.push(`2/${year}`);
      }
      if (checkMonth(3, year, effectiveDate, expirationDate)) {
        month.push(`3/${year}`);
      }
      break;
    case 2:
      if (checkMonth(4, year, effectiveDate, expirationDate)) {
        month.push(`4/${year}`);
      }
      if (checkMonth(5, year, effectiveDate, expirationDate)) {
        month.push(`5/${year}`);
      }
      if (checkMonth(6, year, effectiveDate, expirationDate)) {
        month.push(`6/${year}`);
      }
      break;
    case 3:
      if (checkMonth(7, year, effectiveDate, expirationDate)) {
        month.push(`7/${year}`);
      }
      if (checkMonth(8, year, effectiveDate, expirationDate)) {
        month.push(`8/${year}`);
      }
      if (checkMonth(9, year, effectiveDate, expirationDate)) {
        month.push(`9/${year}`);
      }
      break;
    case 4:
      if (checkMonth(10, year, effectiveDate, expirationDate)) {
        month.push(`10/${year}`);
      }
      if (checkMonth(11, year, effectiveDate, expirationDate)) {
        month.push(`11/${year}`);
      }
      if (checkMonth(12, year, effectiveDate, expirationDate)) {
        month.push(`12/${year}`);
      }
      break;
  }
  return month;
}
