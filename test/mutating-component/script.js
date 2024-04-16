import '../../index.js';

const forth = document.getElementById('forth');
forth.items = [{ text: 'Home', link: '#' }];

const sixth = document.getElementById('sixth');
console.log('INNER HTML');
sixth.innerHTML = /* html */ `
	<a href="#">Home</a>
	<a href="#">Directory</a>
`;
console.log('REMOVE');
sixth.parentNode.removeChild(sixth);
console.log('APPEND CHILD');
const linkElement = sixth.appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Page';
console.log('APPEND CHILD');
document.body.appendChild(sixth);
