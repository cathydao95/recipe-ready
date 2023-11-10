// Function to format instructions
export const formatStringInstructions = (str) => {
  // Split a string into an array where there is a period followed by a space.
  const strParts = str.split(". ");

  // Map through each element in array and return "index + 1. element"
  const formattedParts = strParts.map((part, index) => `${index + 1}. ${part}`);

  // Join array elements together by a period and space
  const formattedString = formattedParts.join(". ");

  return formattedString;
};

// Function that informs how many recipes to load at a time depending on screen size
export const limitScreenSize = (screenWidth) => {
  // Base on current media query breakpoints
  if (screenWidth >= 1025) {
    return 8;
  } else if (screenWidth >= 769) {
    return 6;
  } else {
    return 4;
  }
};

//  /Function to determine the  meal time
export const getMealTime = () => {
  const hour = new Date().getHours();

  if (hour < 11) {
    return "Breakfast";
  } else if (hour < 17) {
    return "Lunch";
  } else {
    return "Dinner";
  }
};
