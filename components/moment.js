import React from "react";

function splitDate(str, parts) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < str.length && j < parts.length) {
    let format = parts[j];
    let char = (str + "").slice(i, i + format.length);

    if (char === format) {
      result.push(format);
      j++;
      i += format.length;
    } else {
      char = char[0];
      result.push(char);
      i++;
    }
  }

  return result;
}
export const moment = (time, format) => {
  if (isNaN(new Date(time || new Date()).getTime())) {
    return time;
  }
  const options = {
    year: format.includes("YYYY") ? "numeric" : "2-digit",
    month: format.includes("MMMM")
      ? "long"
      : format.includes("MMM")
      ? "short"
      : format.includes("MM")
      ? "2-digit"
      : "numeric",
    // ? "long"
    // : format.includes("ddd")
    // ? "short"
    // : "narrow",
    weekday: format.includes("dddd")
      ? "long"
      : format.includes("ddd")
      ? "short"
      : "narrow",
    day: format.includes("DD") ? "2-digit" : "numeric",
    hour: format.includes("hh") ? "2-digit" : "numeric",
    minute: format.includes("mm") ? "2-digit" : "numeric",
    second: format.includes("ss") ? "2-digit" : "numeric",
    hourCycle: format.includes("a") ? "h11" : "h23",
  };
  const values = {};
  new Intl.DateTimeFormat("en-IN", options)
    .formatToParts(new Date(time || new Date()))
    .map(({ type, value, ...rest }) => {
      values[type] = value;
    });
  const _values = {};
  const formatParts = format.match(
    /(YYYY|YY|M{2,3}|d{2,4}|D{1,2}|h{1,2}|m{1,2}|s{1,2}|a)/g
  );
  formatParts.forEach((part) => {
    if (part.includes("Y")) {
      _values[part] = values.year;
    } else if (part.includes("M")) {
      _values[part] = values.month;
    } else if (part.includes("D")) {
      _values[part] = values.day;
    } else if (part.includes("h")) {
      _values[part] = values.hour;
    } else if (part.includes("m")) {
      _values[part] = values.minute;
    } else if (part.includes("s")) {
      _values[part] = values.second;
    } else if (part.includes("a")) {
      _values[part] = values.dayPeriod;
    } else if (values.includes("d")) {
      _values[part] = values.weekday;
    }
  });
  return splitDate(format, formatParts)
    .map((item) => _values[item] || item)
    .join("");
};

Date.prototype.deduct = function (time) {
  if (time.match(/[a-z]/gi)) {
    time = parseTimeShorthand(time);
  }
  const [sec, min, hour, day, month, year] = time
    .split(" ")
    .map((t) => parseInt(t))
    .filter((t) => !isNaN(t));

  let date = new Date(this);
  if (sec) {
    date = new Date(date.setSeconds(date.getSeconds() - sec));
  }
  if (min) {
    date = new Date(date.setMinutes(date.getMinutes() - min));
  }
  if (hour) {
    date = new Date(date.setHours(date.getHours() - hour));
  }
  if (day) {
    date = new Date(date.setDate(date.getDate() - day));
  }
  if (month) {
    date = new Date(date.setMonth(date.getMonth() - month));
  }
  if (year) {
    date = new Date(date.setYear(date.getFullYear() - year));
  }

  return date;
};
Date.prototype.add = function (time) {
  if (time.match(/[a-z]/gi)) {
    time = parseTimeShorthand(time);
  }

  const [sec, min, hour, day, month, year] = time
    .split(" ")
    .map((t) => parseInt(t))
    .filter((t) => !isNaN(t));

  let date = new Date(this);
  if (sec) {
    date = new Date(date.setSeconds(date.getSeconds() + sec));
  }
  if (min) {
    date = new Date(date.setMinutes(date.getMinutes() + min));
  }
  if (hour) {
    date = new Date(date.setHours(date.getHours() + hour));
  }
  if (day) {
    date = new Date(date.setDate(date.getDate() + day));
  }
  if (month) {
    date = new Date(date.setMonth(date.getMonth() + month));
  }
  if (year) {
    date = new Date(date.setYear(date.getFullYear() + year));
  }

  return date;
};

export const Moment = ({ format, children, ...rest }) => {
  return (
    <time {...rest} data-testid="moment">
      {moment(children, format)}
    </time>
  );
};

export const getAllDates = ({ startDate, endDate, format }) => {
  const dates = [];
  let currDate = startDate;
  while (currDate <= endDate) {
    dates.push(moment(currDate, format || "YYYY-MM-DD"));
    currDate = currDate.add("0 0 0 1");
  }
  return dates;
};
