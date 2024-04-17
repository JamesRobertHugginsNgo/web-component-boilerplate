// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<style>
		:host {
			display: block;
		}
	</style>

	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
			</ol>
		</nav>
	</div>
`;

const itemTemplateElement = document.createElement('template');
itemTemplateElement.innerHTML = /* html */ `
	<li class="breadcrumb-item"><a></a></li>
`;

const activeItemTemplateElement = document.createElement('template');
activeItemTemplateElement.innerHTML = /* html */ `
	<li class="breadcrumb-item active" aria-current="page"></li>
`;

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('innerhtml-component', class extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = ['items'];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#breadcrumbElement;
	#childNodes = [];
	#items;
	#mutationObserver;

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get items() {
		console.log('GET - ITEMS');

		return this.#items;
	}
	set items(newValue) {
		console.log('SET - ITEMS');

		this.#items = newValue;

		this.#breadcrumbElement.innerHTML = '';

		if (!Array.isArray(this.#items)) {
			return;
		}

		for (let index = 0; index < this.#items.length; index++) {
			const item = this.#items[index];
			if (!item || typeof item !== 'object') {
				continue;
			}

			if (index + 1 === this.#items.length) {
				const { text } = item;
				const documentFragment = activeItemTemplateElement.content.cloneNode(true);
				documentFragment.querySelector('.breadcrumb-item').textContent = text;
				this.#breadcrumbElement.appendChild(documentFragment);
				continue;
			}

			const { text, link } = item;
			const documentFragment = itemTemplateElement.content.cloneNode(true);
			const linkElement = documentFragment.querySelector('a');
			linkElement.textContent = text;
			linkElement.setAttribute('href', link);
			this.#breadcrumbElement.appendChild(documentFragment);
		}
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#breadcrumbElement = this.shadowRoot.querySelector('.breadcrumb');

		this.#mutationObserver = new MutationObserver((mutationRecords) => {
			this.#childNodes = Array.from(this.#childNodes);
			this.mutationCallback(mutationRecords);
		});

		this.#childNodes = Array.from(this.#childNodes);
		this.mutationCallback();
	}

	connectedCallback() {
		console.group('CONNECTED CALLBACK');
		console.log('Custom element added to page.');
		console.groupEnd();

		if (this.#childNodes.length !== this.childNodes.length || !this.#childNodes.every((node, index) => {
			return node === this.childNodes[index];
		})) {
			this.#childNodes = Array.from(this.childNodes);
			this.mutationCallback();
		}

		this.#mutationObserver.observe(this, { childList: true });
	}

	disconnectedCallback() {
		console.group('DISCONNECTED CALLBACK');
		console.log('Custom element removed from page.');
		console.groupEnd();

		this.#mutationObserver.disconnect();
	}

	adoptedCallback() {
		console.group('ADOPTED CALLBACK');
		console.log('Custom element moved to new page.');
		console.groupEnd();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.group('ATTRIBUTE CHANGED CALLBACK');
		console.log('NAME', name);
		console.log('OLD VALUE', oldValue);
		console.log('NEW VALUE', newValue);
		console.groupEnd();

		switch (name) {
			case 'items':
				try {
					this.items = JSON.parse(newValue);
				} catch (error) {
					console.log(error);
					this.items = null;
				}
				break;
		}
	}

	mutationCallback(mutationRecords) {
		console.group('MUTATION CALLBACK');
		console.log('MUTATION RECORDS', mutationRecords);
		console.groupEnd();

		const items = [];
		const linkElements = this.querySelectorAll(':scope > a');
		for (let index = 0; index < linkElements.length; index++) {
			const linkElement = linkElements[index];
			items.push({
				text: linkElement.textContent,
				link: linkElement.getAttribute('href')
			});
		}
		this.items = items;
	}
});
