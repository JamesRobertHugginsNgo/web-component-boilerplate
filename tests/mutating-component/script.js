import '../../components/index.js';

const mutatingComponents = document.querySelectorAll('mutating-component');

mutatingComponents[2].items = [
	{ text: 'Home', link: '#' },
	{ text: 'Directory', link: '#' },
	{ text: 'Page', link: '#' }
];

mutatingComponents[3].innerHTML = /* html */ `
	<a href="#">Home</a>
	<a href="#">Directory</a>
	<a href="#">Page</a>
	<a href="#">Section</a>
`;

let mutatingComponent;

mutatingComponent = mutatingComponents[4].appendChild(document.createElement('a'));
mutatingComponent.setAttribute('href', '#');
mutatingComponent.textContent = 'Home';

mutatingComponent = mutatingComponents[4].appendChild(document.createElement('a'));
mutatingComponent.setAttribute('href', '#');
mutatingComponent.textContent = 'Directory';

mutatingComponent = mutatingComponents[4].appendChild(document.createElement('a'));
mutatingComponent.setAttribute('href', '#');
mutatingComponent.textContent = 'Page';

mutatingComponent = mutatingComponents[4].appendChild(document.createElement('a'));
mutatingComponent.setAttribute('href', '#');
mutatingComponent.textContent = 'Section';

mutatingComponent = mutatingComponents[4].appendChild(document.createElement('a'));
mutatingComponent.setAttribute('href', '#');
mutatingComponent.textContent = 'Sub Section';

