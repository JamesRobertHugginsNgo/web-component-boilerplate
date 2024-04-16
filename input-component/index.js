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

		.form-control:valid {
			border-color: var(--bs-form-valid-border-color);
		}
		.form-control:invalid {
			border-color: var(--bs-form-invalid-border-color);
		}
	</style>

	<input type="text" class="form-control">
`;

// ==
// CUSTOM ELEMENTS
// ==

customElements.define('input-component', class extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static formAssociated = true;
	static observedAttributes = ['readonly', 'required'];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#inputElement;
	#internals;
	#readonly;
	#required;

	// --
	// PRIVATE METHOD(S)
	// --

	#setValidity() {
		this.#internals.setValidity(
			this.#inputElement.validity,
			this.#inputElement.validationMessage,
			this.#inputElement
		);
	}

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get readonly() {
		return this.#readonly;
	}
	set readonly(newValue) {
		this.#readonly = newValue;

		if (this.#readonly === null) {
			this.#inputElement.removeAttribute('readonly');
		} else {
			this.#inputElement.setAttribute('readonly', '');
		}

		this.#setValidity();
	}

	get required() {
		return this.#required;
	}
	set required(newValue) {
		this.#required = newValue;

		if (this.#required === null) {
			this.#inputElement.removeAttribute('required');
		} else {
			this.#inputElement.setAttribute('required', '');
		}

		this.#setValidity();
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		console.log('CONSTRUCTOR');

		this.attachShadow({
			mode: 'open',
			delegatesFocus: true
		});
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#inputElement = this.shadowRoot.querySelector('input');

		this.#internals = this.attachInternals();
		this.#setValidity();
		this.#inputElement.addEventListener('input', () => {
			this.#internals.setFormValue(this.#inputElement.value);
			this.#setValidity();
		});
	}

	connectedCallback() {
		console.group('CONNECTED CALLBACK');
		console.log('Custom element added to page.');
		console.groupEnd();
	}

	disconnectedCallback() {
		console.group('DISCONNECTED CALLBACK');
		console.log('Custom element removed from page.');
		console.groupEnd();
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
			case 'readonly':
				this.readonly = newValue;
				break;
			case 'required':
				this.required = newValue;
				break;
		}
	}
});
