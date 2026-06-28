const form = document.getElementById('regForm');
const successMsg = document.getElementById('successMsg');

function showErr(id, show) {
  const errorElement = document.getElementById(id);

  if (errorElement) {
    errorElement.style.display = show ? 'block' : 'none';
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /[\d\s\-().+]{7,}/.test(phone);
}

function getInputValue(id) {
  const input = document.getElementById(id);
  return input ? input.value.trim() : '';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;

  const teamName = getInputValue('teamName');
  showErr('teamNameErr', !teamName);
  if (!teamName) valid = false;

  const p1first = getInputValue('p1first');
  showErr('p1firstErr', !p1first);
  if (!p1first) valid = false;

  const p1last = getInputValue('p1last');
  showErr('p1lastErr', !p1last);
  if (!p1last) valid = false;

  const p1email = getInputValue('p1email');
  const p1emailOk = validateEmail(p1email);
  showErr('p1emailErr', !p1emailOk);
  if (!p1emailOk) valid = false;

  const p1phone = getInputValue('p1phone');
  const p1phoneOk = validatePhone(p1phone);
  showErr('p1phoneErr', !p1phoneOk);
  if (!p1phoneOk) valid = false;

  const p1ageInput = document.getElementById('p1age');

  if (p1ageInput) {
    const p1age = parseInt(p1ageInput.value);
    const p1ageOk = p1age >= 5 && p1age <= 110;
    showErr('p1ageErr', !p1ageOk);
    if (!p1ageOk) valid = false;
  }

  const p2first = getInputValue('p2first');
  showErr('p2firstErr', !p2first);
  if (!p2first) valid = false;

  const p2last = getInputValue('p2last');
  showErr('p2lastErr', !p2last);
  if (!p2last) valid = false;

  const p2ageInput = document.getElementById('p2age');

  if (p2ageInput) {
    const p2age = parseInt(p2ageInput.value);
    const p2ageOk = p2age >= 5 && p2age <= 110;
    showErr('p2ageErr', !p2ageOk);
    if (!p2ageOk) valid = false;
  }

  const waiver = document.getElementById('waiver').checked;
  showErr('waiverErr', !waiver);
  if (!waiver) valid = false;

if (!valid) return;

const eventType = getInputValue('eventType');

const formData = {
  eventType: eventType,
  teamName: getInputValue('teamName'),

  p1first: getInputValue('p1first'),
  p1last: getInputValue('p1last'),
  p1email: getInputValue('p1email'),
  p1phone: getInputValue('p1phone'),
  p1age: getInputValue('p1age'),

  p2first: getInputValue('p2first'),
  p2last: getInputValue('p2last'),
  p2email: getInputValue('p2email'),
  p2phone: getInputValue('p2phone'),
  p2age: getInputValue('p2age')
};

fetch('https://script.google.com/macros/s/AKfycbzfoScIcmLmz-gRHNd7-E32r_bp6SvGC2NayWR2t9sBDNLGK-OrrA-ceqsvacEzJquO/exec', {
  method: 'POST',
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  const prefix = eventType.includes('Bags') ? 'BAG' : 'PKL';

  const regId =
    prefix +
    '-' +
    Math.random().toString(36).substring(2, 8).toUpperCase();

  document.getElementById('regIdDisplay').textContent =
    'Registration ID: ' + regId;

  form.style.display = 'none';
  successMsg.style.display = 'block';
})
.catch(error => {
  console.error(error);
  alert('Registration failed. Please try again.');
});
});