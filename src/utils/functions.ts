export const signupInitialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm_password: "",
};

export const loginInitialValues = {
  email: "",
  password: "",
};

export function signup_validation(values: typeof signupInitialValues) {
  const errors: Partial<typeof signupInitialValues> = {};

  const { firstname, lastname, email, password, confirm_password } = values;

  if (!firstname) {
    errors.firstname = "Reuired";
  } else if (firstname.includes(" ")) {
    errors.firstname = "Space is not allowed!";
  }

  if (!lastname) {
    errors.lastname = "Reuired";
  } else if (lastname.includes(" ")) {
    errors.lastname = "Space is not allowed!";
  }

  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Required";
  } else if (password.length < 5 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Space is not allowed!";
  }

  if (!confirm_password) {
    errors.confirm_password = "Required";
  } else if (password !== confirm_password) {
    errors.confirm_password = "Password Not Match...!";
  } else if (confirm_password.includes(" ")) {
    errors.confirm_password = "Space is not allowed!";
  }

  return errors;
}

export function login_validation(values: typeof loginInitialValues) {
  const errors: Partial<typeof loginInitialValues> = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}
