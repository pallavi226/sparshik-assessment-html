! function(t) {
	function e(r) {
		if (i[r]) return i[r].exports;
		var n = i[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(n.exports, n, n.exports, e), n.l = !0, n.exports
	}
	var i = {};
	e.m = t, e.c = i, e.d = function(t, i, r) {
		e.o(t, i) || Object.defineProperty(t, i, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	}, e.n = function(t) {
		var i = t && t.__esModule ? function() {
			return t.default
		} : function() {
			return t
		};
		return e.d(i, "a", i), i
	}, e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, e.p = "", e(e.s = 0)
}([function(t, e, i) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}
	i(1), i(2);
	var n = (i(3), r(i(4)));
	(0, r(i(6)).default)(), (0, n.default)()
}, function(t, e) {}, function(t, e, i) {
	"use strict";
	var r = document.querySelector("html");
	if (-1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("CriOS")) {
		-1 != navigator.userAgent.indexOf("iPhone") && r.classList.add("ios"), r.classList.add("safari");
		var n = navigator.userAgent.indexOf("Version/") + 8;
		parseFloat(navigator.userAgent.slice(n).split(" ")[0]) < 9 && r.classList.add("safari-old")
	} - 1 != navigator.userAgent.indexOf("Trident") && -1 == navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("CriOS") && r.classList.add("ie", "ms"), -1 != navigator.userAgent.indexOf("Edge") && r.classList.add("edge", "ms")
}, function(t, e, i) {
	"use strict";

	function r(t, e) {
		var i = null;
		return function() {
			var r = this,
			n = arguments;
			clearTimeout(i), i = setTimeout(function() {
				t.apply(r, n)
			}, e)
		}
	}

	function n(t, e, i) {
		e || (e = 250);
		var r, n;
		return function() {
			var a = i || this,
			s = +new Date,
			o = arguments;
			r && s < r + e ? (clearTimeout(n), n = setTimeout(function() {
				r = s, t.apply(a, o)
			}, e)) : (r = s, t.apply(a, o))
		}
	}

	function a() {
		var t = window,
		e = "inner";
		return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
			width: t[e + "Width"],
			height: t[e + "Height"]
		}
	}

	function s(t, e) {
		return Math.floor(Math.random() * (e - t)) + t
	}

	function o(t) {
		for (var e = window.location.search.substring(1), i = e.split("&"), r = 0; r < i.length; r++) {
			var n = i[r].split("=");
			if (n[0] == t) return n[1]
		}
	return !1
}

function u(t, e) {
	var i = new XMLHttpRequest;
	i.overrideMimeType("application/json"), i.open("GET", t, !0), i.onreadystatechange = function() {
		4 == i.readyState && "200" == i.status && e(i.responseText)
	}, i.send(null)
}

function d(t) {
	for (var e, i, r = t.length; 0 !== r;) i = Math.floor(Math.random() * r), r -= 1, e = t[r], t[r] = t[i], t[i] = e;
		return t
}

function l(t, e, i) {
	return i.indexOf(t) === e
}
Object.defineProperty(e, "__esModule", {
	value: !0
}), e.debounce = r, e.throttle = n, e.viewport = a, e.getRandomInt = s, e.getQueryVariable = o, e.loadJSON = u, e.shuffle = d, e.unique = l
}, function(t, e, i) {
	"use strict";

	function r(t) {
		this.el = t, this.init()
	}

	function n() {
		Array.from(document.querySelectorAll("[data-smart-form]")).forEach(function(t, e) {
			a(t)
		})
	}

	function a(t) {
		u.push(t);
		new r(t)
	}

	function s(t) {
		!t || t.length < 1 ? n() : a(t)
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.initAll = n, e.init = a, e.default = s;
	var o = function(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}(i(5)),
	u = [],
	d = {
		requiredField: {
			en: "This field is required.",
			ar: "هذا الحقل إلزامي",
			ch: "这是必填栏",
			ru: "Это обязательное поле",
			de: "Dies ist ein Pflichtfeld"
		},
		requiredSelect: {
			en: "Please select.",
			ar: "الرجاء اختيار",
			ch: "请选择",
			ru: "Пожалуйста, выберите",
			de: "Bitte auswählen"
		},
		email: {
			en: "Please enter a valid email address.",
			ar: "رجاء إدخال عنوان بريد إلكتروني صحيح",
			ch: "请输入有效的电子邮件地址",
			ru: "Укажите действительный адрес эл.почты",
			de: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
		}
	};
	r.prototype.init = function() {
		this.id = "f".concat(u.length - 1), this.el.setAttribute("novalidate", ""), this.el.setAttribute("data-state", "ready"), this.requireds = this.el.querySelectorAll("[required]"), this.el.hasAttribute("data-api") && this.el.addEventListener("submit", this.submitHandler.bind(this)), this.initValidation(), this.submitBtn = this.el.querySelector('[type="submit"]'), this.submitBtn.hasAttribute("data-require") && this.initSubmitDisable()
	}, r.prototype.initSubmitDisable = function() {
		var t = this,
		e = this.el.querySelector(this.submitBtn.getAttribute("data-require"));
		this.submitBtn.disabled = !this.validate(e), e.addEventListener("input", function(i) {
			t.submitBtn.disabled = !t.validate(e)
		})
	}, r.prototype.initValidation = function() {
		var t = this;
		this.requireds.forEach(function(e, i) {
			var r = document.createElement("div");
			r.classList.add("error-msg"), e.parentNode.appendChild(r), e.setAttribute("data-state", "ready"), e.addEventListener("blur", function(i) {
				"INPUT" === e.tagName && t.validateInput(e)
			}), e.addEventListener("input", function(i) {
				"SELECT" === e.tagName && t.validateSelect(e), "INPUT" === e.tagName && "error" === e.getAttribute("data-state") && t.validateInput(e), "INPUT" === e.tagName && "checkbox" === e.type && t.validateInput(e)
			})
		})
	}, r.prototype.validateSelect = function(t) {
		"n/a" == t.value ? (t.setAttribute("data-state", "error"), t.parentNode.querySelector(".error-msg").innerHTML = d.requiredSelect[o.default.lang]) : t.setAttribute("data-state", "valid")
	}, r.prototype.validateInput = function(t) {
		"" == t.value ? (t.setAttribute("data-state", "error"), t.parentNode.querySelector(".error-msg").innerHTML = d.requiredField[o.default.lang]) : "email" === t.type ? this.validateEmail(t.value) ? t.setAttribute("data-state", "valid") : (t.setAttribute("data-state", "error"), t.parentNode.querySelector(".error-msg").innerHTML = d.email[o.default.lang]) : "checkbox" === t.type ? t.checked ? t.setAttribute("data-state", "valid") : (t.setAttribute("data-state", "error"), t.parentNode.querySelector(".error-msg").innerHTML = d.requiredField[o.default.lang]) : t.setAttribute("data-state", "valid")
	}, r.prototype.validateEmail = function(t) {
		return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)
	}, r.prototype.validate = function(t) {
		return "INPUT" === t.tagName && this.validateInput(t), "SELECT" === t.tagName && this.validateSelect(t), "valid" == t.getAttribute("data-state")
	}, r.prototype.validator = function() {
		var t = this,
		e = !0;
		return this.requireds.forEach(function(i) {
			t.validate(i), "error" === i.getAttribute("data-state") && (e = !1)
		}), e
	}, r.prototype.submitHandler = function(t) {
		if (t.preventDefault(), t.stopPropagation(), this.validator()) {
			if (this.api = this.el.getAttribute("data-api"), this.setState("working"), 0 == this.api.length || "test" == this.api) {
				var e = this.el.hasAttribute("data-test-state") ? this.el.getAttribute("data-test-state") : "error";
				return void setTimeout(function() {
					this.setState(e)
				}.bind(this), 1e3)
			}
			var email = document.getElementById("email").value;
			var agerange = document.getElementById("agerange").value;
			var nationality = document.getElementById("nationality").value;
			var language =document.getElementById("language").value;
			var source =document.getElementById("source").value;
			this.submitData(email, agerange, nationality, language, source)
		}
	}, r.prototype.submitData = function(email, agerange, nationality, language, source) {
		var t = this,
		e = new XMLHttpRequest,
		i = new FormData(this.el);
		var obj = {Email:email, AgeRange:agerange, Nationality:nationality, Language:language, Source:source};
		var jsonObject = JSON.stringify(obj);
		var urlEncodedData = '';
		var urlEncodedDataPairs = [];

		// Turn the data object into an array of URL-encoded key/value pairs.
		urlEncodedDataPairs.push(encodeURIComponent('Email') + '=' + encodeURIComponent(email));
		urlEncodedDataPairs.push(encodeURIComponent('Language') + '=' + encodeURIComponent(language));
		urlEncodedDataPairs.push(encodeURIComponent('Nationality') + '=' + encodeURIComponent(nationality));	
		urlEncodedDataPairs.push(encodeURIComponent('AgeRange') + '=' + agerange);
		urlEncodedDataPairs.push(encodeURIComponent('Source') + '=' + encodeURIComponent(source));
		
		// Combine the pairs into a single string and replace all %-encoded spaces to 
		// the '+' character; matches the behaviour of browser form submissions.
		urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+')
		//console.log(agerange)
		//console.log(urlEncodedData)
		//var params = 'Email=matt%40all.com&Language=en&Nationality=British&AgeRange=18-26&Source=test'
		//var params1 = 'Email=matt%40all.com&Language=en&Nationality=Antarctica&AgeRange=18%20%E2%80%94%2026'
		e.addEventListener("load", function(e) {
			200 == e.target.status ? t.setState("success") : t.setState("error")
		}), e.addEventListener("error", function(e) {
			t.setState("error")
		}), e.open("POST", this.api), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); e.send(urlEncodedData)
	}, r.prototype.setState = function(t) {
		this.el.setAttribute("data-state", t), "error" == t && setTimeout(function() {
			this.el.setAttribute("data-state", "ready")
		}.bind(this), 2e3), "success" == t && setTimeout(function() {
			this.setState("success-feedback")
			 $("#success").show();
             $("#form-airport").hide();
			//alert("API called successfully");
		}.bind(this), 700)
	}
}, function(t, e, i) {
	"use strict";
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = void 0;
	var r = {};
	r.lang = document.querySelector("html").getAttribute("lang"), r.dir = document.querySelector("html").getAttribute("dir");
	var n = r;
	e.default = n
}, function(t, e, i) {
	"use strict";

	function r(t) {
		this.trigger = t, this.init()
	}

	function n() {
		Array.from(document.querySelectorAll("[data-popup]")).forEach(function(t) {
			new r(t)
		})
	}
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.default = n;
	document.querySelector("body").getAttribute("data-lang");
	r.prototype.init = function() {
		var t = this;
		this.content = document.querySelector(this.trigger.getAttribute("data-popup")), this.build(), this.trigger.addEventListener("click", function(e) {
			e.preventDefault(), document.querySelector("body").appendChild(t.container), setTimeout(t.show.bind(t), 100)
		}), this.closeBtn.addEventListener("click", function(e) {
			t.hide()
		}), this.wrapper.addEventListener("click", function(e) {
			e.target == t.wrapper && t.hide()
		})
	}, r.prototype.show = function() {
		document.querySelector("body").classList.add("popup-active")
	}, r.prototype.hide = function() {
		var t = this;
		document.querySelector("body").classList.remove("popup-active"), setTimeout(function() {
			t.container.remove()
		}, 500)
	}, r.prototype.build = function() {
		this.container = document.createElement("div"), this.container.classList = "popup-container", this.wrapper = document.createElement("div"), this.wrapper.classList = "popup-wrapper", this.wrapper.appendChild(this.content), this.container.appendChild(this.wrapper), this.closeBtn = document.createElement("button"), this.closeBtn.classList = "custom popup-close", this.closeBtn.innerHTML = '\n\t\t<svg role="img" title="close" class="icon">\n\t\t\t<use xlink:href="/assets/images/icons.svg#times"/>\n\t\t</svg>\n\t', this.content.appendChild(this.closeBtn)
	}
}]);