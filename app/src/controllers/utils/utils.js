const utils = {
  titleCase: (string) => {
    return string
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-");
  },

  normalizeDateToUTC: (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) {
      throw new Error(`Invalid date: ${dateString}`);
    }

    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    ).toISOString();
  },
};

module.exports = utils;
