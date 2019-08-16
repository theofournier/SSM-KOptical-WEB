import moment from 'moment';

export function datetimeFormatting(dateStr) {
  return dateStr !== null && dateStr
    ? moment(dateStr).format('YYYY/MM/DD HH:mm')
    : '';
}

export function dateFormatting(dateStr) {
  return dateStr !== null && dateStr
    ? moment(dateStr).format('YYYY/MM/DD')
    : '';
}

export function timeFormatting(dateStr) {
  return dateStr !== null && dateStr ? moment(dateStr).format('HH:mm') : '';
}

export function localToUTC(datetimeLocalStr) {
  return datetimeLocalStr !== null && datetimeLocalStr ? moment(datetimeLocalStr).utc() : '';
}

export function UTCToLocal(datetimeUTCStr) {
  return datetimeUTCStr !== null && datetimeUTCStr ? moment.utc(datetimeUTCStr).local() : '';
}

export function datetimeFormattingDB(datetimeStr) {
  return datetimeStr !== null && datetimeStr ? moment(datetimeStr).format('YYYY-MM-DD HH:mm:SS') : '';
}

export function getNextBusinnessDay(date, days) {
  const dayOfWeek = moment(date)
    .add(days, 'days')
    .day();
  if (dayOfWeek === 6) {
    return moment(date)
      .add(days + 2, 'days')
      .format('YYYY-MM-DD');
  }
  if (dayOfWeek === 0) {
    return moment(date)
      .add(days + 1, 'days')
      .format('YYYY-MM-DD');
  }
  return moment(date)
    .add(days, 'days')
    .format('YYYY-MM-DD');
}

export function calculateCountdown(endDate) {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  // clear countdown when date is reached
  if (diff < 0) return false;

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    millisec: 0,
  };

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400);
    diff -= timeLeft.days * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;

  return timeLeft;
}

export function round(value, decimals) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
