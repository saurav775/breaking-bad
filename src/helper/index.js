export const validateEmail = (email) => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const handleValidation = (fields, formType) => {
  const errors = {};
  // email vaildation
  if (formType !== "code" && formType !== 'resetPassword' && !fields["email"]) {
    errors["email"] = "Email ID is required";
  }
  if (fields["email"] && !validateEmail(fields["email"])) {
    errors["email"] = "Email is not valid";
  }

  // password validation
  if (
    formType !== "code" &&
    formType !== "forgotPassword" &&
    !fields["password"]
  ) {
    errors["password"] = "Password is required";
  }
  if (
    formType !== "code" &&
    formType !== "forgotPassword" &&
    fields["password"] &&
    !(fields["password"].length >= 8 && fields["password"].length <= 16)
  ) {
    errors["password"] =
      "Password should be atleast 8 characters or max 16 characters long";
  }

  // confirm password validation
  if (
    formType !== "code" &&
    (formType === "signup" || formType === 'resetPassword') &&
    !fields["confirm_password"]
  ) {
    errors["confirm_password"] = "Confirm your password";
  }

  // verification code validation
  if (formType === "code" && !fields["code"]) {
    errors["code"] = "Code is required";
  }

  return Object.entries(errors).length > 0 ? errors : false;
};
