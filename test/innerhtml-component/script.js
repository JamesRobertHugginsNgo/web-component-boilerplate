import '../../innerhtml-component/index.js';

const nodeList = document.querySelectorAll('innerhtml-component');

nodeList[2].items = [
	{ text: 'Home', link: '#' },
	{ text: 'Directory', link: '#' },
	{ text: 'Page', link: '#' }
];

nodeList[3].innerHTML = /* html */ `
	<a href="#">Home</a>
	<a href="#">Directory</a>
	<a href="#">Page</a>
	<a href="#">Section</a>
`;

let linkElement;

linkElement = nodeList[4].appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Home';

linkElement = nodeList[4].appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Directory';

linkElement = nodeList[4].appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Page';

linkElement = nodeList[4].appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Section';

linkElement = nodeList[4].appendChild(document.createElement('a'));
linkElement.setAttribute('href', '#');
linkElement.textContent = 'Sub Section';
