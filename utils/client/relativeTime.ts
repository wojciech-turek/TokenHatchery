export const getRelativeTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime();
  const diffSeconds = Math.floor(timeDiff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffWeeks / 4);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffSeconds < 60) {
    return `${diffSeconds} ${diffSeconds == 1 ? "second" : "seconds"} ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes == 1 ? "minute" : "minutes"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours == 1 ? "hour" : "hours"} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays == 1 ? "day" : "days"} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} ${diffWeeks == 1 ? "week" : "weeks"} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths == 1 ? "month" : "months"} ago`;
  } else {
    return `${diffYears} ${diffYears == 1 ? "year" : "years"} ago`;
  }
};
