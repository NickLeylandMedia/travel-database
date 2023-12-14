//Function to remove underscores and capitalize individual words
function formatTitles(string: string) {
  if (string.includes("_")) {
    const words = string.split("_");
    //Iterate Through words and capitalize
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    return words.join(" ");
  }

  if (!string.includes("_")) {
    return string[0].toUpperCase() + string.substring(1);
  }
}

export { formatTitles };
