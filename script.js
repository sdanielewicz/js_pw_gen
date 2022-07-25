// Declarations 
var generateBtn = document.querySelector("#generate");
var pw_length = "";
var characters = "";
// needed 'this' for password global varible 
this.password = "";

// Functions 
// Get length of pw from user 
function getLength() {
  pw_length = prompt("Welcome to password generator.\nWhat character length would you like your password to be?\nEnter a number between 8 and 128.");
  if ((pw_length < 8) || (pw_length > 128)) {
    alert("Your password is either under 8 characters or above 128 characters. Please try again.");
    getLength();
  }
}

// Get password parameters from user 
function getInput() {
  input = {
    lowercaseInput: [confirm("Include lowercase letters?"), "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    uppercase: [confirm("Include uppercase letters?"), "abcdefghijklmnopqrstuvwxyz"],
    numbers: [confirm("Include numbers?"), "0123456789"],
    special: [confirm("Include special characters?"), "~`!@#$%^&*()_-+={}[]\|;:',<.>?/"]
  };

  // initialize temp var 
  let temp="";

  // iterate over object properties
  // if true convert to string and add to characters
  for (var prop in input) {
    if (input[prop][0] == true) {
      temp=input[prop][1].toString();
      characters += temp;

      // re-initialize temp for if this funtion is re-run 
      temp = "";
    }
  }
  // call evaluate requirements function to check minimum requirements for password is met
  evalReq();
}

// Evaluate for min and max length of password 
function evalReq(){
  // init counter 
  let count = 0;
  // iterate over input properties and keep a count of true values 
  for (var prop_eval in input){
    if (input[prop_eval][0] === true){
      count += 1;
    }
  }
    if (count === 0 ){
      alert("The options you have selected for a password do not meet the minimum requirements. Please try again.");
      getInput();
    }
}

// Generate password based on input 
function generatePassword() {
  // additional init of of global password var needed if button is clicked multiple times 
  password ='';
  
  // iterate n times specified by pw_length
  // for each iteration pick a random character from the characters string defined in getInput 
  for (var i = 0; i < pw_length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
}

// password is written to #password ID 
function writePassword() {
  this.password = generatePassword(); 
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Function call 
getLength();
getInput();





//TODO escape char for " "