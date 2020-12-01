import globals from './globals.js';
const forms = [];
const fieldErrors = {
	requiredField: {
		'en': 'This field is required.',
		'ar': 'هذا الحقل إلزامي'
	},
	requiredSelect: {
		'en': 'Please select.',
		'ar': 'الرجاء اختيار'
	},
	email: {
		'en': 'Please enter a valid email address.',
		'ar': 'رجاء إدخال عنوان بريد إلكتروني صحيح'
	}
}


function SmartForm(el) {
	this.el = el;
	this.init();
};
SmartForm.prototype.init = function() {
  this.id = `f${forms.length-1}`
	this.el.setAttribute('novalidate', '');
	this.el.setAttribute('data-state', 'ready');
  this.requireds = this.el.querySelectorAll('[required]');

	if (this.el.hasAttribute('data-api')) {
		this.el.addEventListener('submit', this.submitHandler.bind(this));
	}
	this.initValidation();

	this.submitBtn = this.el.querySelector('[type="submit"]');
	if(this.submitBtn.hasAttribute('data-require')) {
		this.initSubmitDisable();
	}
}
SmartForm.prototype.initSubmitDisable = function () {
	var requirement = this.el.querySelector(this.submitBtn.getAttribute('data-require'));
	this.submitBtn.disabled = !this.validate(requirement);
	requirement.addEventListener('input', (event) => {
		this.submitBtn.disabled = !this.validate(requirement);
	})

}
SmartForm.prototype.initValidation = function () {
	this.requireds.forEach((elem, index) => {
		var errorElem = document.createElement('div');
		errorElem.classList.add('error-msg');
		elem.parentNode.appendChild(errorElem);
		elem.setAttribute('data-state', 'ready');

		elem.addEventListener('blur', (event) => {
			if(elem.tagName === 'INPUT') {
				this.validateInput(elem);
			}
		});
		elem.addEventListener('input', (event) => {
			if(elem.tagName === 'SELECT') {
				this.validateSelect(elem);
			}
			if(elem.tagName === 'INPUT' && elem.getAttribute('data-state') === 'error') {
				this.validateInput(elem);
			}
			if(elem.tagName === 'INPUT' && elem.type === 'checkbox') {
				this.validateInput(elem);
			}
		});
	});
}
SmartForm.prototype.validateSelect = function (elem) {
	if (elem.value == 'n/a') {
		elem.setAttribute('data-state', 'error');
		elem.parentNode.querySelector('.error-msg').innerHTML = fieldErrors.requiredSelect[globals.lang];
	} else {
		elem.setAttribute('data-state', 'valid');
	}
}
SmartForm.prototype.validateInput = function(elem) {
	if(elem.value == '') {
		elem.setAttribute('data-state', 'error');
		elem.parentNode.querySelector('.error-msg').innerHTML = fieldErrors.requiredField[globals.lang];
	} else {
		if(elem.type === 'email') {
			if (this.validateEmail(elem.value)) {
				elem.setAttribute('data-state', 'valid');
			} else {
				elem.setAttribute('data-state', 'error');
				elem.parentNode.querySelector('.error-msg').innerHTML = fieldErrors.email[globals.lang];
			}
		} else if(elem.type === 'checkbox') {
			if (elem.checked) {
				elem.setAttribute('data-state', 'valid');
			} else {
				elem.setAttribute('data-state', 'error');
				elem.parentNode.querySelector('.error-msg').innerHTML = fieldErrors.requiredField[globals.lang];
			}
		} else {
			elem.setAttribute('data-state', 'valid');
		}
	}
}
SmartForm.prototype.validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
SmartForm.prototype.validate = function(elem) {
	if(elem.tagName === 'INPUT') {
		this.validateInput(elem);
	}
	if(elem.tagName === 'SELECT') {
		this.validateSelect(elem);
	}
	return (elem.getAttribute('data-state') == 'valid');
}
SmartForm.prototype.validator = function() {
	var valid = true;
	this.requireds.forEach((elem) => {
		this.validate(elem);
		if(elem.getAttribute('data-state') === 'error') valid = false;
	})
	return valid;
}
SmartForm.prototype.submitHandler = function (event) {
	event.preventDefault();
  event.stopPropagation();

	if(!this.validator()) return;

	// get api url
  this.api = this.el.getAttribute('data-api');

  this.setState('working');

	if (this.api.length == 0 || this.api == 'test') {
		var testState = (this.el.hasAttribute('data-test-state')) ? this.el.getAttribute('data-test-state') : 'error';
		setTimeout(function(){
	    this.setState(testState);
	  }.bind(this), 1000);
	  return;
	}
	this.submitData();
}
SmartForm.prototype.submitData = function() {
	var XHR = new XMLHttpRequest();
  var FD = new FormData(this.el);
  // Success
  XHR.addEventListener('load', (event) => {
		if(event.target.status == 200) {
			this.setState('success');
		} else {
			this.setState('error');
		}
		//console.log(event.target.status, event.target.statusText);
  });
  // Error
  XHR.addEventListener('error', (event) => {
		this.setState('error');
		//console.log(event.target.status, event.target.statusText);
  });
  XHR.open("POST", this.api);
	//console.log('sending', FD);
  XHR.send(FD);
}
SmartForm.prototype.setState = function(state) {
	this.el.setAttribute('data-state', state);
	if (state == 'error') {
		setTimeout(function(){
			this.el.setAttribute('data-state', 'ready');
		}.bind(this), 2000);
	}
	if (state == 'success') {
		setTimeout(function(){
			this.setState('success-feedback');
		}.bind(this), 700);
	}
}



export function initAll () {
	Array.from(document.querySelectorAll('[data-smart-form]')).forEach(function(elem, index) {
		init(elem);
	});
};
export function init(elem) {
  forms.push(elem)
  var form = new SmartForm(elem);
}

export default function (elem) {
	if (!elem || elem.length < 1) {
		initAll();
	} else {
	  init(elem);
	}
}
