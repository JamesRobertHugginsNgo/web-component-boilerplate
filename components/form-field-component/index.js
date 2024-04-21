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
// CUSTOM ELEMENT(S)
// ==

class FormFieldComponent extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static formAssociated = true;
	static observedAttributes = [
		'readonly',
		'required'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#inputElement;
	#elementInternals;
	#readonly;
	#required;

	// --
	// PRIVATE METHOD(S)
	// --

	#setValidity() {
		this.#elementInternals.setValidity(
			this.#inputElement.validity,
			this.#inputElement.validationMessage,
			this.#inputElement
		);
	}

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get readonly() {
		console.log('GET READONLY', this);

		return this.#readonly;
	}
	set readonly(newValue) {
		console.log('SET READONLY', this);

		this.#readonly = newValue;

		if (this.#readonly === null) {
			this.#inputElement.removeAttribute('readonly');
		} else {
			this.#inputElement.setAttribute('readonly', '');
		}

		this.#setValidity();
	}

	get required() {
		console.log('GET REQUIRED', this);

		return this.#required;
	}
	set required(newValue) {
		console.log('SET REQUIRED', this);

		this.#required = newValue;

		if (this.#required === null) {
			this.#inputElement.removeAttribute('required');
		} else {
			this.#inputElement.setAttribute('required', '');
		}

		this.#setValidity();
	}

	get validity() {
		console.log('GET VALIDITY', this);

		return this.#elementInternals.validity;
	}

	get validationMessage() {
		console.log('GET VALIDATION MESSAGE', this);

		return this.#elementInternals.validationMessage;
	}

	// --
	// PUBLIC METHOD(S)
	// --

	checkValidity() {
		return this.#elementInternals.checkValidity();
	}

	reportValidity() {
		return this.#elementInternals.reportValidity();
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({
			mode: 'open',
			delegatesFocus: true
		});
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#elementInternals = this.attachInternals();

		this.#inputElement = this.shadowRoot.querySelector('input');
		this.#setValidity();
		this.#inputElement.addEventListener('input', () => {
			this.#elementInternals.setFormValue(this.#inputElement.value);
			this.#setValidity();
		});
	}

	connectedCallback() {
		console.group('CONNECTED CALLBACK', this);
		console.log('Custom element added to page.');
		console.log(this.#elementInternals.form);
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
			case 'readonly':
				this.readonly = newValue;
				break;
			case 'required':
				this.required = newValue;
				break;
		}
	}
}

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('form-field-component', FormFieldComponent);
