import '../../formfield-component/index.js';

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
	console.group('FORM DATA');
	for (const pair of formData.entries()) {
		console.log(pair[0], pair[1]);
	}
	console.groupEnd();
});
