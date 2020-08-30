// Just to make sure wherever critical string is used, bad string is not put there.

const values = {
  mobileNo: "mobileNo",
  password: "password",
  confirmPassword: "confirmPassowrd",
  age: "age",
  profession: "profession",
  otp: "otp",
  name: "name",
};

const Placeholders = {
  mobileNo: "Mobile No",
  password: "Password",
  confirmPassword: "Confirm Password",
  address1: "Address Line 1",
  address2: "Address Line 2",
  address3: "Address Line 3",
  pinCode: "Pin Code",
  name: "Name",
  profession: "Enter Profession",
  age: "Age(eg:25,39)",
  password: "Password",
  confirmPassword: "Confirm Password",
  location: "Enter Location",
  otp: "OTP",
};

const PickerLabels = {
  male: "Male",
  female: "Female",
  other: "Other",
  needFood: "Need Food",
  needMedical: "Need Medical Attention",
  profession: "Profession",
  student: "Student",
  engineer: "Engineer",
  doctor: "Doctor",
  lawyer: "Lawyer",
  businessMan: "Business man",
  selfEmployed: "self employed",
};

const ErrorMsgs = {
  nameAlphabaetical: "Name should be Alphabetical",
  familyMemberMax: "Maximum 15 Member allowed",
  mobileNoTenDigits: "Mobile number should be of 10 digits",
  problemEmpty: "Problem can't be empty",
  addressEmpty: "Address can't be empty",
  locationEmpty: "Location can't be empty",
  descriptionMinimum: "Description should be of minimum 20 letters",
  passwordEmpty: "Password not chosen",
  confirmPasswordNotMatch: "Confirm password entry does not match password",
  addressNotValid: "Address not valid",
  pinCodeNotValid: "Pincode must be of 6 digits",
  professionAlphabaetical: "Profession entry should be Alphabetical",
  genderAlphabaetical: "Gender entry should be Alphabetical",
  ageNotValid: "Age should be more than 10 or less than 199",
  otpNotValid: "Otp must be of 4 digits",
};

const TextValues = {
  dataWillBeShared: "** This data will be shared with our users **",
  address: "Address",
  feedbackWelcomeNote:
    "Welcome, We are open to your suggestions. You can help us in improving hHANDS.\n\nYour support will help us in reaching out to more people in need. Thank you for considering hHands!! :-)",
  age: "Age",
  profession: "Profession",
  report: "Report",
  loginToReport: "Please login to report",
  dataWontBeShared:
    "** This data will not be shared with any donor or donee **",
  forgotPassword: "Forgot Password",
};

const Alerts = {
  loggedIn: {
    title: "Logged In",
    description: "You are logged in, seek help or help people around you",
  },
  userNotFound: {
    title: "User Not Found",
    description: "Your account does not exist, Please signup",
  },
  reported: {
    title: "Reported",
    description: "You have reported this ticket :-(",
  },
  userExists: {
    title: "User Exists",
    description: "You are already a member of hHands, Please login.",
  },
  badRequest: {
    title: "Bad Request",
    description: "Please check your internet connection or try again later.",
  },
  noResponse: {
    title: "No Response",
    description: "It's not you, It's us. We will be back soon. Thank you!",
  },
  permissionInsufficient: {
    title: "Insufficient Permissions",
    description: "You need to grant location permission to continue",
  },
  couldNotFetchLocation: {
    title: "Could not fetch location",
    description:
      "Please check internet connection or press Recenter Location button on the bottom left of map.",
  },
  noInternet: {
    title: "No Internet",
    description: "Please check your internet connection",
  },
};

export default values;
export { Placeholders, PickerLabels, Alerts, TextValues, ErrorMsgs };
