import '../../components/index.js';

const simpleComponents = document.querySelectorAll('simple-component');
simpleComponents[4].setAttribute('greeting', 'Hola');
simpleComponents[4].innerHTML = 'Mundo';
