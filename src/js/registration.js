// registration/login
function checkIfLogIn() {
  const logged = localStorage.getItem("logged");
  const nav__buttons = document.getElementById('nav__buttons');

  if (logged === 'true') {
    nav__buttons.classList.add('logged');
  } else {
    nav__buttons.classList.remove('logged');
  }
}

function login() {
  let log_form, log_success, email, emailError, password, passwordError;

  let user_records = new Array(0);
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

  log_form = document.getElementById('log_form');
  log_success = document.getElementById('log_success');
  email = document.getElementById('log_email');
  emailError = document.getElementById('log_email_error');
  password = document.getElementById('log_password');
  passwordError = document.getElementById('log_password_error');

  emailError.innerHTML = '';
  passwordError.innerHTML = '';

  if (user_records.some(item => item.email !== email.value)) {
    emailError.innerHTML = 'User with this email does not exist.'
  } else if (user_records.some(item => item.email === email.value && item.password !== password.value)) {
    passwordError.innerHTML = 'Password entered incorrectly.'
  } else {
    localStorage.setItem("logged", 'true');

    log_success.style.display = 'block';
    setTimeout(() => log_success.style.display = 'none', 1000);

    emailError.innerHTML = '';
    passwordError.innerHTML = '';

    log_form.reset();
    checkIfLogIn();
  }
}

function reg() {
  let reg_form, reg_success, email, emailError, name, nameError, password, passwordError, policy, policyError;

  reg_form = document.getElementById('reg_form');
  reg_success = document.getElementById('reg_success');
  email = document.getElementById('reg_email');
  emailError = document.getElementById('reg_email_error');
  name = document.getElementById('name');
  nameError = document.getElementById('name_error');
  password = document.getElementById('reg_password');
  passwordError = document.getElementById('reg_password_error');
  policy = document.getElementById('policy');
  policyError = document.getElementById('policy_error');

  let user_records = new Array(0);
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

  emailError.innerHTML = '';
  nameError.innerHTML = '';
  passwordError.innerHTML = '';
  policyError.innerHTML = '';

  if (email.value.length === 0) {
    emailError.innerHTML = 'The email field is required.'
  } else if (name.value.length === 0) {
    nameError.innerHTML = 'The name field is required.'
  } else if (password.value.length === 0) {
    passwordError.innerHTML = 'The password field is required.'
  } else if (user_records.some(item => item.email === email.value)) {
    emailError.innerHTML = 'This email is already in use.'
  } else if (!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    emailError.innerHTML = 'Email field entered incorrectly.'
  } else if (name.value.length < 3) {
    nameError.innerHTML = 'The name field must be at least 3 characters.'
  } else if (password.value.length < 6) {
    passwordError.innerHTML = 'The password field must be at least 6 characters.'
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

    reg_success.style.display = 'block';
    setTimeout(() => reg_success.style.display = 'none', 1000);

    emailError.innerHTML = '';
    nameError.innerHTML = '';
    passwordError.innerHTML = '';
    policyError.innerHTML = '';

    reg_form.reset();
    checkIfLogIn();
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
