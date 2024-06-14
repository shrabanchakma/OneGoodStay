const currentDate = new Date().setHours(0, 0, 0, 0);
const anotherDate = new Date(currentDate);
const comparisonDate = "2024-06-13T18:00:00.000Z";
console.log(anotherDate);
console.log(comparisonDate);
if (anotherDate === comparisonDate) {
  console.log("same day");
} else {
  console.log("different day");
}
