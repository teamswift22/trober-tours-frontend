import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToCustomFormat(date: string) {
  // Get the day of the month
  const dateClass = new Date(date);
  const day = dateClass.getDate();

  // Array of month names (adjust for your locale if needed)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name based on the month index
  const month = monthNames[dateClass.getMonth()];

  // Function to get the suffix for the day (e.g., "st", "nd", "rd", "th")
  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Concatenate the day, suffix, month, and year (if needed)
  const formattedDate = `${day}${getDaySuffix(day)} ${month}`;
  return formattedDate;
}

export const checkObjectEquality = (
  obj1: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
  obj2: { [x: string]: any }
) => {
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
};
