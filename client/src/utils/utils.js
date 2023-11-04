export const formatStringInstructions = (str) => {
  // Split a string into an array where there is a period followed by a space.
  const strParts = str.split(". ");

  // Map through each element in array and return "index + 1. element"
  const formattedParts = strParts.map((part, index) => `${index + 1}. ${part}`);

  // Join array elements together by a period and space
  const formattedString = formattedParts.join(". ");

  return formattedString;
};