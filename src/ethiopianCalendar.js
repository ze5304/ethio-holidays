// የኢትዮጵያ ዘመን አቆጣጠር ወደ ጎርጎሪያን መለወጫ
export function ethiopianToGregorian(year, month, day) {
  // ኢትዮጵያ አቆጣጠር በሴፕቴምበር 11/12 ይጀምራል
  const gregorianYear = year + 7; // በግምት
  // ትክክለኛ ስሌት ለማድረግ ውስብስብ ነው, ለአሁን እንደዚህ
  return new Date(gregorianYear, month - 1, day + 10);
}

// ቋሚ የኢትዮጵያ በዓላት (በኢትዮጵያ ዘመን አቆጣጠር)
export const fixedChristianHolidays = (ethiopianYear) => {
  return [
    { name: "አደራ (ትርቱ በዓል)", month: 1, day: 1 },    // መስከረም 1
    { name: "መስቀል", month: 1, day: 17 },                // መስከረም 17
    { name: "እንቁጣጣሽ (ልደት)", month: 4, day: 28 },     // ታህሳስ 28
    { name: "ጥምቀት", month: 5, day: 11 },               // ጥር 11
    { name: "ንብር", month: 13, day: 6 },                 // ጳጉሜ 6 (ለዘመነ ሉቃስ)
  ];
};