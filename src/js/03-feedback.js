import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formValues = {
  email: '',
  message: '',
};

const formDataUpdate = throttle(data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}, 500);

const getValues = localStorage.getItem(STORAGE_KEY);
if (getValues) {
  formValues = JSON.parse(getValues);
  feedbackForm.elements.email.value = formValues.email;
  feedbackForm.elements.message.value = formValues.message;
}

function saveValues(event) {
  formValues[event.target.name] = event.target.value;
  formDataUpdate(formValues);
}

const formSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  const objectValues = {
    email: email.value,
    message: message.value,
  };
  console.log(objectValues);
  localStorage.removeItem(STORAGE_KEY);
  formValues = {
    email: '',
    message: '',
  };
  feedbackForm.reset();
};

feedbackForm.addEventListener('input', formValues);
feedbackForm.addEventListener('submit', formSubmit);
