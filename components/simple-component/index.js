// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<style>
		:host {
			--component--text-color: var(--test-component--text-color, var(--text-color, salmon));
			display: block;
		}
		p {
			color: var(--component--text-color);
		}
	</style>

	<p><img src="${import.meta.resolve('./assets/logo.svg')}" alt="Logo"></p>

	<p><span>Hello</span> <slot>world</slot></p>
`;

// ==
// CLASS(ES)
// ==

class SimpleComponent extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'greeting'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#greeting;
	#greetingElement;

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get greeting() {
		console.log('GET GREETING', this);

		return this.#greeting;
	}
	set greeting(newValue) {
		console.log('SET GREETING', this);

		this.#greeting = newValue;

		if (!this.#greeting) {
			this.#greetingElement.textContent = 'Hello';
		} else {
			this.#greetingElement.textContent = this.#greeting;
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

		this.#greetingElement = this.shadowRoot.querySelector('span');
	}

	connectedCallback() {
		console.group('CONNECTED CALLBACK', this);
		console.log('Custom element added to page.');
		console.groupEnd();
	}

	disconnectedCallback() {
		console.group('DISCONNECTED CALLBACK', this);
		console.log('Custom element removed from page.');
		console.groupEnd();
	}

	adoptedCallback() {
		console.group('ADOPTED CALLBACK', this);
		console.log('Custom element moved to new page.');
		console.groupEnd();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.group('ATTRIBUTE CHANGED CALLBACK', this);
		console.log('NAME', name);
		console.log('OLD VALUE', oldValue);
		console.log('NEW VALUE', newValue);
		console.groupEnd();

		switch (name) {
			case 'greeting':
				this.greeting = newValue;
				break;
		}
	}
}

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('simple-component', SimpleComponent);
