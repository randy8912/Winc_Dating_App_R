'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();


// Your code here
let userProfile = {
  first_name: "Randy",
  last_name: "Saija",
  age: 31,
  gender: "M",
  gender_interest: "F",
  min_interested_age: 25,
  max_interested_age: 40,
  location: "City"
};

// Log when user profile is created
console.log("User profile created:", userProfile); // Display userProfile

// Ask users for their first_name
while (true) {
  userProfile.first_name = prompt("What is your first name? "); // Ask user for first name
  if (userProfile.first_name.trim() !== "") // Input must be longer than 0 characters
    break; // Break out of the loop
  console.log("Please enter your name."); // Checks if first name is meeting required standards
}

// Ask users for their last_name
while (true) {
  userProfile.last_name = prompt("What is your last name? "); // Ask user for first name
  if (userProfile.last_name.trim() !== "") // Input must be longer than 0 characters
    break; // Break out of the loop
  console.log("Please enter your last name."); // Checks if last name is meeting required standards
}

// Ask users for their age (has to be 18 or older)
while (true) {
  userProfile.age = Number(prompt("Please enter your age. "));
  if (!isNaN(userProfile.age) && userProfile.age >= 18) // If user age is under 18, user is not granted to use application
    break; // Break out of the loop
  console.log("To enter, you have to be 18 or older. When you are 18, we are happy to welcome you to our platform! :)"); // Display message which shows when user CAN use our application
}

// Ask the user for their gender (must be M(Male), F(Female), or X(Undefined))
while (true) {
  userProfile.gender = prompt("Please enter your gender (M (Male), F (Female), or X (Undefined)): ").toUpperCase(); // Convert input to upperCase to meet desired standard
  if (["M", "F", "X"].includes(userProfile.gender)) 
    break; // Break out of the loop
  console.log("Please enter one of three options: M (Male), F (Female), or X (Undefined)."); // Help user give the desired input
}

// Ask user for their preferred gender match
while (true) {
  userProfile.gender_interest = prompt("What gender does your ideal match have? (M, F, X): ").toUpperCase(); // Convert input to upperCase to meet desired standard
  if (["M", "F", "X"].includes(userProfile.gender_interest))
    break; // Break out of the loop
  console.log("Please enter one of three options: M (Male), F (Female), or X (Undefined)."); // Help user give the desired input
}

// Ask user for their preferred minimum age of their match
while (true) {
  userProfile.min_interested_age = Number(prompt("What is the minimum age of your ideal match? ")); // Convert string input to Number
  if (!isNaN(userProfile.min_interested_age) && userProfile.min_interested_age >= 18) // Input can not be other than a number
    break; // Break out of the loop
  console.log("Minimum age for your perfect match has to be 18 or older."); // when user preference is under 18, log message
}

// Ask user for their preferred maximum age of their match
while (true) {
  userProfile.max_interested_age = Number(prompt("What is the maximum age of your ideal match? ")); // Convert string input to Number
  if (!isNaN(userProfile.max_interested_age) && userProfile.max_interested_age >= userProfile.min_interested_age) // Input can not be other than a number
    break; // Break out of the loop
  console.log("Maximum age must be greater than or equal to the minimum age (18).");
}

// Ask the user where their ideal match has to come from (City or Rural)
while (true) {
  userProfile.location = prompt("Do you live in a 'city' or 'rural' area? ").toLowerCase(); // Convert input to lowerCase to meet desired standard
  if (["city", "rural"].includes(userProfile.location)) // Input must be either "city" or "rural"
    break; // Break out of the loop
  console.log("Location must be 'city' or 'rural'."); // Input must be either "city" or "rural"
}


// initiate matchCounter
let matchCounter = 0; // Counts matched users
const matches = []; // Create empty array to list matches

for (let user of mockData) {
  const isAgeInRange = user.age >= userProfile.min_interested_age && user.age <= userProfile.max_interested_age; // Check if userProfile age matches user age
  const isUserAgeInRange = userProfile.age >= user.min_age_interest && userProfile.age <= user.max_age_interest; // Check if user age matches userProfiles age
  const isGenderInterestMatch = user.gender_interest === userProfile.gender_interest; // Check if user gender matches Userprofile gender
  const isUserGenderInterestMatch = userProfile.gender_interest === user.gender; // Check if userProfile gender matches user age
  const isLocationMatch = user.location === userProfile.location; // Check if the userProfile and user match in their location preferences

  // Check wether user matches all preferences of userProfile
  if (isAgeInRange && isUserAgeInRange && isGenderInterestMatch && isUserGenderInterestMatch && isLocationMatch) {
    matchCounter++; // If all preferences match, add match to matchCounter
    matches.push({ // Push name, age and location to matches
      name: `${user.first_name} ${user.last_name}`, // Display First & Last name of match
      age : user.age, // Display age of match
      location : user.location // display location of match 
    });
  }
}

// Initiate model to check for matches (if matchCounter > 1, add "es")
if (matchCounter > 0) {
  console.log(`We found ${matchCounter} match${matchCounter > 1 ? "es" : ""} for you:`); // Display number of matches
  matches.forEach(match => {
    console.log(`- Name: ${match.name}, Age: ${match.age}, Location: ${match.location}`); // Display match name, age and location
  });
} else {
  console.log("Sorry, no matches found based on your preferences."); // When no matches are found, display there are no matches based on userProfile preferences
}

// Display the total number of matches
console.log(`Total matches found: ${matchCounter}`);