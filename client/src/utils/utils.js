// Function to format instructions
export const formatStringInstructions = (str) => {
  // Split string into an array where there is a period followed by a space and filter out strings that are not empty space
  const strParts = str.split(". ").filter((part) => part.trim() !== "");

  // map through elements and return "index + 1. element"
  const formattedParts = strParts.map(
    (part, index) => `${index + 1}. ${part.trim()}`
  );

  // join array elements together by a period and space
  const formattedString = formattedParts.join(". ");

  return formattedString;
};

// Function to remove number from instructions that are being edited
export const removeNumberingFromInstructions = (str) => {
  return str.replace(/\d+\.\s+/g, "");
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

// Function to validate that ingredients are being typed in the correct format
export const validateIngredients = (ingredients) => {
  // \s* matches white spaces before and after 0 or more times
  // [a-zA-Z]+ matches one or more alphabetic characters
  // (-[a-zA-Z]+)* matches hyphens followed by alphabetic characters, 0 or more times
  // (\s[a-zA-Z]+)* matches spaces followed by alphabetic characters, 0 or more times
  // (\s*[a-zA-Z]+(-[a-zA-Z]+)*(\s[a-zA-Z]+)*\s*,\s*)* matches ingredients followed by commas
  // \s*[a-zA-Z]+(-[a-zA-Z]+)*(\s[a-zA-Z]+)*\s* matches an ingredient without a comma at the end
  const regex =
    /^(\s*[a-zA-Z]+(-[a-zA-Z]+)*(\s[a-zA-Z]+)*\s*,\s*)*(\s*[a-zA-Z]+(-[a-zA-Z]+)*(\s[a-zA-Z]+)*\s*)$/;
  return regex.test(ingredients);
};

// Function to validate that the instruction are being typed in the correct format
export const validateInstructions = (instructions) => {
  // \s* matches white spaces before anfter 0 or more times
  // \w+ matches one or more words
  // .* matches any characters 0 or more times
  // [.] matches a single period
  // * matches the (\s*\w+.*[.]\s*) group one or more times
  const regex = /^(\s*\w+.*[.]\s*)+$/;
  return regex.test(instructions);
};
