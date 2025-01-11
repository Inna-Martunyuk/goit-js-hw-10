import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримання елементів форми
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримання значень з форми
  const delay = Number(delayInput.value);
  const state = Array.from(stateInputs).find(input => input.checked)?.value;

  if (!delay || !state) {
    iziToast.error({
      title: 'Error',
      message: 'Please fill out all fields',
      position: 'topCenter',
      timeout: 3000,
    });
    return;
  }

  // Створення та обробка промісу
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay}ms`,
        position: 'topCenter',
        timeout: 3000,
      });
    });

  // Очищення форми
  form.reset();
});
