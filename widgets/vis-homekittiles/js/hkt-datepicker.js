/*! jQuery UI - v1.10.3 - 2013-05-03
 * http://jqueryui.com
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT
 * Modified 2024 Standarduser */

(function(t, e) {
	function i() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-hktDatepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		}, this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		}, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='homekitTiles ui-datepicker ui-widget ui-widget-content ui-helper-clearfix'></div>"))
	}

	function s(e) {
		var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return e.delegate(i, "mouseout", function() {
			t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
		}).delegate(i, "mouseover", function() {
			t.hktDatepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
		})
	}

	function n(e, i) {
		t.extend(e, i);
		for (var s in i) null == i[s] && (e[s] = i[s]);
		return e
	}
	t.extend(t.ui, {
		hktDatepicker: {
			version: "1.10.3"
		}
	});
	var a, r = "hktDatepicker";
	t.extend(i.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(t) {
			return n(this._defaults, t || {}), this
		},
		_attachDatepicker: function(e, i) {
			var s, n, a;
			s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), a = this._newInst(t(e), n), a.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
		},
		_newInst: function(e, i) {
			var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: n,
				input: e,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: i,
				dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(e, i) {
			var s = t(e);
			i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, r, i), i.settings.disabled && this._disableDatepicker(e))
		},
		_attachments: function(e, i) {
			var s, n, a, r = this._get(i, "appendText"),
				o = this._get(i, "isRTL");
			i.append && i.append.remove(), r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"), e[o ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
				src: a,
				alt: n,
				title: n
			}) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({
				src: a,
				alt: n,
				title: n
			}) : n)), e[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
				return t.hktDatepicker._datepickerShowing && t.hktDatepicker._lastInput === e[0] ? t.hktDatepicker._hideDatepicker() : t.hktDatepicker._datepickerShowing && t.hktDatepicker._lastInput !== e[0] ? (t.hktDatepicker._hideDatepicker(), t.hktDatepicker._showDatepicker(e[0])) : t.hktDatepicker._showDatepicker(e[0]), !1
			}))
		},
		_autoSize: function(t) {
			if (this._get(t, "autoSize") && !t.inline) {
				var e, i, s, n, a = new Date(2009, 11, 20),
					r = this._get(t, "dateFormat");
				r.match(/[DM]/) && (e = function(t) {
					for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n);
					return s
				}, a.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), t.input.attr("size", this._formatDate(t, a).length)
			}
		},
		_inlineDatepicker: function(e, i) {
			var s = t(e);
			s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, r, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(e, i, s, a, o) {
			var h, l, c, u, d, p = this._dialogInst;
			return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], r, p)), n(p.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], r, p), this
		},
		_destroyDatepicker: function(e) {
			var i, s = t(e),
				n = t.data(e, r);
			s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, r), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
		},
		_enableDatepicker: function(e) {
			var i, s, n = t(e),
				a = t.data(e, r);
			n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, a.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
				return t === e ? null : t
			}))
		},
		_disableDatepicker: function(e) {
			var i, s, n = t(e),
				a = t.data(e, r);
			n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, a.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
				return t === e ? null : t
			}), this._disabledInputs[this._disabledInputs.length] = e)
		},
		_isDisabledDatepicker: function(t) {
			if (!t) return !1;
			for (var e = 0; this._disabledInputs.length > e; e++)
				if (this._disabledInputs[e] === t) return !0;
			return !1
		},
		_getInst: function(e) {
			try {
				return t.data(e, r)
			} catch (i) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(i, s, a) {
			var r, o, h, l, c = this._getInst(i);
			return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.hktDatepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (r = s || {}, "string" == typeof s && (r = {}, r[s] = a), c && (this._curInst === c && this._hideDatepicker(), o = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, r), null !== h && r.dateFormat !== e && r.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && r.dateFormat !== e && r.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled" in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, o), this._updateAlternate(c), this._updateDatepicker(c)), e)
		},
		_changeDatepicker: function(t, e, i) {
			this._optionDatepicker(t, e, i)
		},
		_refreshDatepicker: function(t) {
			var e = this._getInst(t);
			e && this._updateDatepicker(e)
		},
		_setDateDatepicker: function(t, e) {
			var i = this._getInst(t);
			i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
		},
		_getDateDatepicker: function(t, e) {
			var i = this._getInst(t);
			return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
		},
		_doKeyDown: function(e) {
			var i, s, n, a = t.hktDatepicker._getInst(e.target),
				r = !0,
				o = a.dpDiv.is(".ui-datepicker-rtl");
			if (a._keyEvent = !0, t.hktDatepicker._datepickerShowing) switch (e.keyCode) {
				case 9:
					t.hktDatepicker._hideDatepicker(), r = !1;
					break;
				case 13:
					return n = t("td." + t.hktDatepicker._dayOverClass + ":not(." + t.hktDatepicker._currentClass + ")", a.dpDiv), n[0] && t.hktDatepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]), i = t.hktDatepicker._get(a, "onSelect"), i ? (s = t.hktDatepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : t.hktDatepicker._hideDatepicker(), !1;
				case 27:
					t.hktDatepicker._hideDatepicker();
					break;
				case 33:
					t.hktDatepicker._adjustDate(e.target, e.ctrlKey ? -t.hktDatepicker._get(a, "stepBigMonths") : -t.hktDatepicker._get(a, "stepMonths"), "M");
					break;
				case 34:
					t.hktDatepicker._adjustDate(e.target, e.ctrlKey ? +t.hktDatepicker._get(a, "stepBigMonths") : +t.hktDatepicker._get(a, "stepMonths"), "M");
					break;
				case 35:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._clearDate(e.target), r = e.ctrlKey || e.metaKey;
					break;
				case 36:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._gotoToday(e.target), r = e.ctrlKey || e.metaKey;
					break;
				case 37:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._adjustDate(e.target, o ? 1 : -1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.hktDatepicker._adjustDate(e.target, e.ctrlKey ? -t.hktDatepicker._get(a, "stepBigMonths") : -t.hktDatepicker._get(a, "stepMonths"), "M");
					break;
				case 38:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._adjustDate(e.target, -7, "D"), r = e.ctrlKey || e.metaKey;
					break;
				case 39:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._adjustDate(e.target, o ? -1 : 1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.hktDatepicker._adjustDate(e.target, e.ctrlKey ? +t.hktDatepicker._get(a, "stepBigMonths") : +t.hktDatepicker._get(a, "stepMonths"), "M");
					break;
				case 40:
					(e.ctrlKey || e.metaKey) && t.hktDatepicker._adjustDate(e.target, 7, "D"), r = e.ctrlKey || e.metaKey;
					break;
				default:
					r = !1
			} else 36 === e.keyCode && e.ctrlKey ? t.hktDatepicker._showDatepicker(this) : r = !1;
			r && (e.preventDefault(), e.stopPropagation())
		},
		_doKeyPress: function(i) {
			var s, n, a = t.hktDatepicker._getInst(i.target);
			return t.hktDatepicker._get(a, "constrainInput") ? (s = t.hktDatepicker._possibleChars(t.hktDatepicker._get(a, "dateFormat")), n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e
		},
		_doKeyUp: function(e) {
			var i, s = t.hktDatepicker._getInst(e.target);
			if (s.input.val() !== s.lastVal) try {
				i = t.hktDatepicker.parseDate(t.hktDatepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.hktDatepicker._getFormatConfig(s)), i && (t.hktDatepicker._setDateFromField(s), t.hktDatepicker._updateAlternate(s), t.hktDatepicker._updateDatepicker(s))
			} catch (n) {}
			return !0
		},
		_showDatepicker: function(e) {
			if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.hktDatepicker._isDisabledDatepicker(e) && t.hktDatepicker._lastInput !== e) {
				var i, s, a, r, o, h, l;
				i = t.hktDatepicker._getInst(e), t.hktDatepicker._curInst && t.hktDatepicker._curInst !== i && (t.hktDatepicker._curInst.dpDiv.stop(!0, !0), i && t.hktDatepicker._datepickerShowing && t.hktDatepicker._hideDatepicker(t.hktDatepicker._curInst.input[0])), s = t.hktDatepicker._get(i, "beforeShow"), a = s ? s.apply(e, [e, i]) : {}, a !== !1 && (n(i.settings, a), i.lastVal = null, t.hktDatepicker._lastInput = e, t.hktDatepicker._setDateFromField(i), t.hktDatepicker._inDialog && (e.value = ""), t.hktDatepicker._pos || (t.hktDatepicker._pos = t.hktDatepicker._findPos(e), t.hktDatepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function() {
					return r |= "fixed" === t(this).css("position"), !r
				}), o = {
					left: t.hktDatepicker._pos[0],
					top: t.hktDatepicker._pos[1]
				}, t.hktDatepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), t.hktDatepicker._updateDatepicker(i), o = t.hktDatepicker._checkOffset(i, o, r), i.dpDiv.css({
					position: t.hktDatepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
					display: "none",
					left: o.left + "px",
					top: o.top + "px"
				}), i.inline || (h = t.hktDatepicker._get(i, "showAnim"), l = t.hktDatepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.hktDatepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.hktDatepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.hktDatepicker._shouldFocusInput(i) && i.input.focus(), t.hktDatepicker._curInst = i))
			}
		},
		_updateDatepicker: function(e) {
			this.maxRows = 4, a = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			var i, s = this._getNumberOfMonths(e),
				n = s[1],
				r = 17;
			e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", r * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.hktDatepicker._curInst && t.hktDatepicker._datepickerShowing && t.hktDatepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
				i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(t) {
			return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
		},
		_checkOffset: function(e, i, s) {
			var n = e.dpDiv.outerWidth(),
				a = e.dpDiv.outerHeight(),
				r = e.input ? e.input.outerWidth() : 0,
				o = e.input ? e.input.outerHeight() : 0,
				h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
				l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
			return i.left -= this._get(e, "isRTL") ? n - r : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + o ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + o) : 0), i
		},
		_findPos: function(e) {
			for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
			return i = t(e).offset(), [i.left, i.top]
		},
		_hideDatepicker: function(e) {
			var i, s, n, a, o = this._curInst;
			!o || e && o !== t.data(e, r) || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function() {
				t.hktDatepicker._tidyDialog(o)
			}, t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.hktDatepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(t) {
			t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(e) {
			if (t.hktDatepicker._curInst) {
				var i = t(e.target),
					s = t.hktDatepicker._getInst(i[0]);
				(i[0].id !== t.hktDatepicker._mainDivId && 0 === i.parents("#" + t.hktDatepicker._mainDivId).length && !i.hasClass(t.hktDatepicker.markerClassName) && !i.closest("." + t.hktDatepicker._triggerClass).length && t.hktDatepicker._datepickerShowing && (!t.hktDatepicker._inDialog || !t.blockUI) || i.hasClass(t.hktDatepicker.markerClassName) && t.hktDatepicker._curInst !== s) && t.hktDatepicker._hideDatepicker()
			}
		},
		_adjustDate: function(e, i, s) {
			var n = t(e),
				a = this._getInst(n[0]);
			this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a))
		},
		_gotoToday: function(e) {
			var i, s = t(e),
				n = this._getInst(s[0]);
			this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
		},
		_selectMonthYear: function(e, i, s) {
			var n = t(e),
				a = this._getInst(n[0]);
			a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n)
		},
		_selectDay: function(e, i, s, n) {
			var a, r = t(e);
			t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (a = this._getInst(r[0]), a.selectedDay = a.currentDay = t("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
		},
		_clearDate: function(e) {
			var i = t(e);
			this._selectDate(i, "")
		},
		_selectDate: function(e, i) {
			var s, n = t(e),
				a = this._getInst(n[0]);
			i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
		},
		_updateAlternate: function(e) {
			var i, s, n, a = this._get(e, "altField");
			a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).each(function() {
				t(this).val(n)
			}))
		},
		noWeekends: function(t) {
			var e = t.getDay();
			return [e > 0 && 6 > e, ""]
		},
		iso8601Week: function(t) {
			var e, i = new Date(t.getTime());
			return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
		},
		parseDate: function(i, s, n) {
			if (null == i || null == s) throw "Invalid arguments";
			if (s = "object" == typeof s ? "" + s : s + "", "" === s) return null;
			var a, r, o, h, l = 0,
				c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10),
				d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
				p = (n ? n.dayNames : null) || this._defaults.dayNames,
				f = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
				m = (n ? n.monthNames : null) || this._defaults.monthNames,
				g = -1,
				v = -1,
				_ = -1,
				b = -1,
				y = !1,
				x = function(t) {
					var e = i.length > a + 1 && i.charAt(a + 1) === t;
					return e && a++, e
				},
				k = function(t) {
					var e = x(t),
						i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
						n = RegExp("^\\d{1," + i + "}"),
						a = s.substring(l).match(n);
					if (!a) throw "Missing number at position " + l;
					return l += a[0].length, parseInt(a[0], 10)
				},
				w = function(i, n, a) {
					var r = -1,
						o = t.map(x(i) ? a : n, function(t, e) {
							return [
								[e, t]
							]
						}).sort(function(t, e) {
							return -(t[1].length - e[1].length)
						});
					if (t.each(o, function(t, i) {
							var n = i[1];
							return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = i[0], l += n.length, !1) : e
						}), -1 !== r) return r + 1;
					throw "Unknown name at position " + l
				},
				D = function() {
					if (s.charAt(l) !== i.charAt(a)) throw "Unexpected literal at position " + l;
					l++
				};
			for (a = 0; i.length > a; a++)
				if (y) "'" !== i.charAt(a) || x("'") ? D() : y = !1;
				else switch (i.charAt(a)) {
					case "d":
						_ = k("d");
						break;
					case "D":
						w("D", d, p);
						break;
					case "o":
						b = k("o");
						break;
					case "m":
						v = k("m");
						break;
					case "M":
						v = w("M", f, m);
						break;
					case "y":
						g = k("y");
						break;
					case "@":
						h = new Date(k("@")), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
						break;
					case "!":
						h = new Date((k("!") - this._ticksTo1970) / 1e4), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
						break;
					case "'":
						x("'") ? D() : y = !0;
						break;
					default:
						D()
				}
			if (s.length > l && (o = s.substr(l), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
			if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)), b > -1)
				for (v = 1, _ = b;;) {
					if (r = this._getDaysInMonth(g, v - 1), r >= _) break;
					v++, _ -= r
				}
			if (h = this._daylightSavingAdjust(new Date(g, v - 1, _)), h.getFullYear() !== g || h.getMonth() + 1 !== v || h.getDate() !== _) throw "Invalid date";
			return h
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
		formatDate: function(t, e, i) {
			if (!e) return "";
			var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
				a = (i ? i.dayNames : null) || this._defaults.dayNames,
				r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
				o = (i ? i.monthNames : null) || this._defaults.monthNames,
				h = function(e) {
					var i = t.length > s + 1 && t.charAt(s + 1) === e;
					return i && s++, i
				},
				l = function(t, e, i) {
					var s = "" + e;
					if (h(t))
						for (; i > s.length;) s = "0" + s;
					return s
				},
				c = function(t, e, i, s) {
					return h(t) ? s[e] : i[e]
				},
				u = "",
				d = !1;
			if (e)
				for (s = 0; t.length > s; s++)
					if (d) "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
					else switch (t.charAt(s)) {
						case "d":
							u += l("d", e.getDate(), 2);
							break;
						case "D":
							u += c("D", e.getDay(), n, a);
							break;
						case "o":
							u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
							break;
						case "m":
							u += l("m", e.getMonth() + 1, 2);
							break;
						case "M":
							u += c("M", e.getMonth(), r, o);
							break;
						case "y":
							u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
							break;
						case "@":
							u += e.getTime();
							break;
						case "!":
							u += 1e4 * e.getTime() + this._ticksTo1970;
							break;
						case "'":
							h("'") ? u += "'" : d = !0;
							break;
						default:
							u += t.charAt(s)
					}
			return u
		},
		_possibleChars: function(t) {
			var e, i = "",
				s = !1,
				n = function(i) {
					var s = t.length > e + 1 && t.charAt(e + 1) === i;
					return s && e++, s
				};
			for (e = 0; t.length > e; e++)
				if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
				else switch (t.charAt(e)) {
					case "d":
					case "m":
					case "y":
					case "@":
						i += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						n("'") ? i += "'" : s = !0;
						break;
					default:
						i += t.charAt(e)
				}
			return i
		},
		_get: function(t, i) {
			return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
		},
		_setDateFromField: function(t, e) {
			if (t.input.val() !== t.lastVal) {
				var i = this._get(t, "dateFormat"),
					s = t.lastVal = t.input ? t.input.val() : null,
					n = this._getDefaultDate(t),
					a = n,
					r = this._getFormatConfig(t);
				try {
					a = this.parseDate(i, s, r) || n
				} catch (o) {
					s = e ? "" : s
				}
				t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), t.currentDay = s ? a.getDate() : 0, t.currentMonth = s ? a.getMonth() : 0, t.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(t)
			}
		},
		_getDefaultDate: function(t) {
			return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
		},
		_determineDate: function(e, i, s) {
			var n = function(t) {
					var e = new Date;
					return e.setDate(e.getDate() + t), e
				},
				a = function(i) {
					try {
						return t.hktDatepicker.parseDate(t.hktDatepicker._get(e, "dateFormat"), i, t.hktDatepicker._getFormatConfig(e))
					} catch (s) {}
					for (var n = (i.toLowerCase().match(/^c/) ? t.hktDatepicker._getDate(e) : null) || new Date, a = n.getFullYear(), r = n.getMonth(), o = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
						switch (l[2] || "d") {
							case "d":
							case "D":
								o += parseInt(l[1], 10);
								break;
							case "w":
							case "W":
								o += 7 * parseInt(l[1], 10);
								break;
							case "m":
							case "M":
								r += parseInt(l[1], 10), o = Math.min(o, t.hktDatepicker._getDaysInMonth(a, r));
								break;
							case "y":
							case "Y":
								a += parseInt(l[1], 10), o = Math.min(o, t.hktDatepicker._getDaysInMonth(a, r))
						}
						l = h.exec(i)
					}
					return new Date(a, r, o)
				},
				r = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
			return r = r && "Invalid Date" == "" + r ? s : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
		},
		_daylightSavingAdjust: function(t) {
			return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
		},
		_setDate: function(t, e, i) {
			var s = !e,
				n = t.selectedMonth,
				a = t.selectedYear,
				r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
			t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
		},
		_getDate: function(t) {
			var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
			return e
		},
		_attachHandlers: function(e) {
			var i = this._get(e, "stepMonths"),
				s = "#" + e.id.replace(/\\\\/g, "\\");
			e.dpDiv.find("[data-handler]").map(function() {
				var e = {
					prev: function() {
						t.hktDatepicker._adjustDate(s, -i, "M")
					},
					next: function() {
						t.hktDatepicker._adjustDate(s, +i, "M")
					},
					hide: function() {
						t.hktDatepicker._hideDatepicker()
					},
					today: function() {
						t.hktDatepicker._gotoToday(s)
					},
					selectDay: function() {
						return t.hktDatepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return t.hktDatepicker._selectMonthYear(s, this, "M"), !1
					},
					selectYear: function() {
						return t.hktDatepicker._selectMonthYear(s, this, "Y"), !1
					}
				};
				t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(t) {
			var e, i, s, n, a, r, o, h, l, c, u, d, p, f, m, g, v, _, b, y, x, k, w, D, T, C, M, S, N, I, P, A, z, H, E, F, O, W, j, R = new Date,
				L = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
				Y = this._get(t, "isRTL"),
				B = this._get(t, "showButtonPanel"),
				J = this._get(t, "hideIfNoPrevNext"),
				K = this._get(t, "navigationAsDateFormat"),
				Q = this._getNumberOfMonths(t),
				V = this._get(t, "showCurrentAtPos"),
				U = this._get(t, "stepMonths"),
				q = 1 !== Q[0] || 1 !== Q[1],
				X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
				G = this._getMinMaxDate(t, "min"),
				$ = this._getMinMaxDate(t, "max"),
				Z = t.drawMonth - V,
				te = t.drawYear;
			if (0 > Z && (Z += 12, te--), $)
				for (e = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - Q[0] * Q[1] + 1, $.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
			for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - U, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : J ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + U, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : J ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", r = this._get(t, "currentText"), o = this._get(t, "gotoCurrent") && t.currentDay ? X : L, r = K ? this.formatDate(r, o, this._getFormatConfig(t)) : r, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; Q[0] > k; k++) {
				for (w = "", this.maxRows = 4, D = 0; Q[1] > D; D++) {
					if (T = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), C = " ui-corner-all", M = "", q) {
						if (M += "<div class='ui-datepicker-group", Q[1] > 1) switch (D) {
							case 0:
								M += " ui-datepicker-group-first", C = " ui-corner-" + (Y ? "right" : "left");
								break;
							case Q[1] - 1:
								M += " ui-datepicker-group-last", C = " ui-corner-" + (Y ? "left" : "right");
								break;
							default:
								M += " ui-datepicker-group-middle", C = ""
						}
						M += "'>"
					}
					for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && 0 === k ? Y ? a : s : "") + (/all|right/.test(C) && 0 === k ? Y ? s : a : "") + this._generateMonthYearHeader(t, Z, te, G, $, k > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", S = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) N = (x + c) % 7, S += "<th" + ((x + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[N] + "'>" + p[N] + "</span></th>";
					for (M += S + "</tr></thead><tbody>", I = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), P = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((P + I) / 7), z = q ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = z, H = this._daylightSavingAdjust(new Date(te, Z, 1 - P)), E = 0; z > E; E++) {
						for (M += "<tr>", F = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>" : "", x = 0; 7 > x; x++) O = g ? g.apply(t.input ? t.input[0] : null, [H]) : [!0, ""], W = H.getMonth() !== Z, j = W && !_ || !O[0] || G && G > H || $ && H > $, F += "<td class='" + ((x + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (j ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + O[1] + (H.getTime() === X.getTime() ? " " + this._currentClass : "") + (H.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : j ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === L.getTime() ? " ui-state-highlight" : "") + (H.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H);
						M += F + "</tr>"
					}
					Z++, Z > 11 && (Z = 0, te++), M += "</tbody></table>" + (q ? "</div>" + (Q[0] > 0 && D === Q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), w += M
				}
				y += w
			}
			return y += l, t._keyEvent = !1, y
		},
		_generateMonthYearHeader: function(t, e, i, s, n, a, r, o) {
			var h, l, c, u, d, p, f, m, g = this._get(t, "changeMonth"),
				v = this._get(t, "changeYear"),
				_ = this._get(t, "showMonthAfterYear"),
				b = "<div class='ui-datepicker-title'>",
				y = "";
			if (a || !g) y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
			else {
				for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + o[c] + "</option>");
				y += "</select>"
			}
			if (_ || (b += y + (!a && g && v ? "" : "&#xa0;")), !t.yearshtml)
				if (t.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
				else {
					for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
							var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
							return isNaN(e) ? d : e
						}, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
					t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
				} return b += this._get(t, "yearSuffix"), _ && (b += (!a && g && v ? "" : "&#xa0;") + y), b += "</div>"
		},
		_adjustInstDate: function(t, e, i) {
			var s = t.drawYear + ("Y" === i ? e : 0),
				n = t.drawMonth + ("M" === i ? e : 0),
				a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
				r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
			t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
		},
		_restrictMinMax: function(t, e) {
			var i = this._getMinMaxDate(t, "min"),
				s = this._getMinMaxDate(t, "max"),
				n = i && i > e ? i : e;
			return s && n > s ? s : n
		},
		_notifyChange: function(t) {
			var e = this._get(t, "onChangeMonthYear");
			e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
		},
		_getNumberOfMonths: function(t) {
			var e = this._get(t, "numberOfMonths");
			return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
		},
		_getMinMaxDate: function(t, e) {
			return this._determineDate(t, this._get(t, e + "Date"), null)
		},
		_getDaysInMonth: function(t, e) {
			return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
		},
		_getFirstDayOfMonth: function(t, e) {
			return new Date(t, e, 1).getDay()
		},
		_canAdjustMonth: function(t, e, i, s) {
			var n = this._getNumberOfMonths(t),
				a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
			return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a)
		},
		_isInRange: function(t, e) {
			var i, s, n = this._getMinMaxDate(t, "min"),
				a = this._getMinMaxDate(t, "max"),
				r = null,
				o = null,
				h = this._get(t, "yearRange");
			return h && (i = h.split(":"), s = (new Date).getFullYear(), r = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += s), i[1].match(/[+\-].*/) && (o += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!r || e.getFullYear() >= r) && (!o || o >= e.getFullYear())
		},
		_getFormatConfig: function(t) {
			var e = this._get(t, "shortYearCutoff");
			return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
				shortYearCutoff: e,
				dayNamesShort: this._get(t, "dayNamesShort"),
				dayNames: this._get(t, "dayNames"),
				monthNamesShort: this._get(t, "monthNamesShort"),
				monthNames: this._get(t, "monthNames")
			}
		},
		_formatDate: function(t, e, i, s) {
			e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
			var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
			return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
		}
	}), t.fn.hktDatepicker = function(e) {
		if (!this.length) return this;
		t.hktDatepicker.initialized || (t(document).mousedown(t.hktDatepicker._checkExternalClick), t.hktDatepicker.initialized = !0), 0 === t("#" + t.hktDatepicker._mainDivId).length && t("body").append(t.hktDatepicker.dpDiv);
		var i = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.hktDatepicker["_" + e + "Datepicker"].apply(t.hktDatepicker, [this[0]].concat(i)) : this.each(function() {
			"string" == typeof e ? t.hktDatepicker["_" + e + "Datepicker"].apply(t.hktDatepicker, [this].concat(i)) : t.hktDatepicker._attachDatepicker(this, e)
		}) : t.hktDatepicker["_" + e + "Datepicker"].apply(t.hktDatepicker, [this[0]].concat(i))
	}, t.hktDatepicker = new i, t.hktDatepicker.initialized = !1, t.hktDatepicker.uuid = (new Date).getTime(), t.hktDatepicker.version = "1.10.3"
})(jQuery);