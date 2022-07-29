import { Fancybox } from "@fancyapps/ui";

// registration/login
function checkIfLogIn() {
  const logged = localStorage.getItem("logged");
  const nav__buttons = document.getElementById('nav__buttons');
  const nav__buttons__mobile = document.getElementById('nav__buttons--mobile');

  if (logged === 'true') {
    nav__buttons.classList.add('logged');
    nav__buttons__mobile.classList.add('logged');
  } else {
    nav__buttons.classList.remove('logged');
    nav__buttons__mobile.classList.remove('logged');
  }
}

function login() {
  let log_form, email, emailInput, emailError, password, passwordInput, passwordError;

  let user_records = new Array(0);
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

  log_form = document.getElementById('log_form');
  email = document.getElementById('log_email');
  emailInput = document.getElementById('log_email__input');
  emailError = document.getElementById('log_email_error');
  password = document.getElementById('log_password');
  passwordInput = document.getElementById('log_password__input');
  passwordError = document.getElementById('log_password_error');

  emailError.innerHTML = '';
  emailInput.classList.remove('error');
  passwordError.innerHTML = '';
  passwordInput.classList.remove('error');

  if (!user_records.some(item => item.email === email.value)) {
    emailError.innerHTML = 'User with this email does not exist.'
    emailInput.classList.add('error');
  } else if (user_records.some(item => item.email === email.value && item.password !== password.value)) {
    passwordError.innerHTML = 'Password entered incorrectly.'
    passwordInput.classList.add('error');
  } else {
    localStorage.setItem("logged", 'true');

    emailError.innerHTML = '';
    emailInput.classList.remove('error');
    passwordError.innerHTML = '';
    passwordInput.classList.remove('error');

    log_form.reset();

    checkIfLogIn();
    Fancybox.close();
  }
}

function reg() {
  let reg_form, email, emailInput, emailError, name, nameInput, nameError, password, passwordInput, passwordError, policy, policyError;

  reg_form = document.getElementById('reg_form');
  email = document.getElementById('reg_email');
  emailInput = document.getElementById('reg_email__input');
  emailError = document.getElementById('reg_email_error');
  name = document.getElementById('name');
  nameInput = document.getElementById('reg_name__input');
  nameError = document.getElementById('name_error');
  password = document.getElementById('reg_password');
  passwordInput = document.getElementById('reg_password__input');
  passwordError = document.getElementById('reg_password_error');
  policy = document.getElementById('policy');
  policyError = document.getElementById('policy_error');

  let user_records = new Array(0);
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

  emailError.innerHTML = '';
  emailInput.classList.remove('error');
  nameError.innerHTML = '';
  nameInput.classList.remove('error');
  passwordError.innerHTML = '';
  passwordInput.classList.remove('error');
  policyError.innerHTML = '';

  if (email.value.length === 0) {
    emailError.innerHTML = 'The email field is required.'
    emailInput.classList.add('error');
  } else if (!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    emailError.innerHTML = 'Email field entered incorrectly.'
    emailInput.classList.add('error');
  } else if (user_records.some(item => item.email === email.value)) {
    emailError.innerHTML = 'This email is already in use.'
    emailInput.classList.add('error');
  } else if (name.value.length === 0) {
    nameError.innerHTML = 'The name field is required.'
    nameInput.classList.add('error');
  } else if (name.value.length < 3) {
    nameError.innerHTML = 'The name field must be at least 3 characters.'
    nameInput.classList.add('error');
  } else if (password.value.length === 0) {
    passwordError.innerHTML = 'The password field is required.'
    passwordInput.classList.add('error');
  } else if (password.value.length < 6) {
    passwordError.innerHTML = 'The password field must be at least 6 characters.'
    passwordInput.classList.add('error');
  } else if (!policy.checked) {
    policyError.innerHTML = 'Please accept the privacy policy.'
  } else {
    user_records.push({
      "name": name.value,
      "email": email.value,
      "password": password.value
    });
    localStorage.setItem("users", JSON.stringify(user_records));
    localStorage.setItem("logged", 'true');

    emailError.innerHTML = '';
    emailInput.classList.remove('error');
    nameError.innerHTML = '';
    nameInput.classList.remove('error');
    passwordError.innerHTML = '';
    passwordInput.classList.remove('error');
    policyError.innerHTML = '';

    reg_form.reset();

    checkIfLogIn();
    Fancybox.close();
  }
}

function logOut() {
  localStorage.setItem("logged", 'false');
  checkIfLogIn();
}

window.login = login;
window.reg = reg;
window.logOut = logOut;

checkIfLogIn();
