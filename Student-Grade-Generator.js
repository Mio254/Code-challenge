// Prompt user for input
let marks = prompt("Enter student marks (0 - 100):");

// Convert input to number
marks = Number(marks);

// Check if input is valid
if (isNaN(marks) || marks < 0 || marks > 100) {
  console.log("Invalid input! Please enter a number between 0 and 100.");
} else {
  // Determine grade
  let grade;

  if (marks > 79) {
    grade = "A";
  } else if (marks >= 60) {
    grade = "B";
  } else if (marks >= 49) {
    grade = "C";
  } else if (marks >= 40) {
    grade = "D";
  } else {
    grade = "E";
  }

  console.log(`Marks: ${marks}, Grade: ${grade}`);
}
