import '../index.js';

const third = document.getElementById('third');
third.greeting = 'Holla';

const forth = document.getElementById('forth');
forth.items = [{ text: 'Home', link: '#' }];

const sixth = document.getElementById('sixth');
sixth.innerHTML =/* html */ `
	<a href="#">Home</a>
	<a href="#">Directory</a>
`;
sixth.remove();
const linkElement = sixth.appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Page';
document.body.append(sixth);
