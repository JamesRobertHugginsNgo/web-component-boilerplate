document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
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
		<div class="container">
			<p><img src="${import.meta.resolve('./assets/logo.svg')}" alt=""></p>
			<p><span id="greeting">Hello</span> <slot>World</slot></p>
		</div>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('test-component', class extends HTMLElement {
	static observedAttributes = ['greeting'];

	#greetingElement;

	constructor() {
		super();

		console.log('CONSTRUCTOR');

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#greetingElement = this.shadowRoot.getElementById('greeting');
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
			case 'greeting':
				if (!newValue) {
					this.#greetingElement.textContent = 'Hello';
				} else {
					this.#greetingElement.textContent = newValue;
				}
				break;
		}
	}
});
