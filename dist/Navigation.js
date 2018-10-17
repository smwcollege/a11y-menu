"use strict";var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Navigation=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.menuId,s=void 0===n?"main-menu":n,a=t.fontFamily,i=void 0===a?"Font Awesome 5 Free":a,l=t.chevronDown,u=void 0===l?"\\f078":l,o=t.chevronUp,r=void 0===o?"\\f077":o,c=t.click,m=void 0!==c&&c;_classCallCheck(this,e),this.chevronDown=u,this.chevronUp=r,this.fontFamilies=["FontAwesome","Font Awesome 5 Free","Glyphicons Halflings"],this.fontFamily=i,this.hasNestedSubmenu=!1,this.menu=null,this.menuId=s,this.click=m}return _createClass(e,[{key:"clickHandler",value:function(e){var t=e.target,n=null;if("span"===t.localName&&(t=t.parentElement),null!==t.nextSibling&&"ul"===t.nextSibling.localName)return(n=t.nextSibling).getElementsByTagName("ul").length?this.hasNestedSubmenu=!0:this.hasNestedSubmenu=!1,n.classList.toggle("submenu-list-open"),void(n.classList.contains("submenu-list-open")?t.setAttribute("aria-expanded","true"):t.setAttribute("aria-expanded","false"));document.getElementsByClassName("submenu-list-open").length>0&&((n=document.getElementsByClassName("submenu-list-open")[0]).classList.remove("submenu-list-open"),n.previousSibling.setAttribute("aria-expanded","false"))}},{key:"focusInHandler",value:function(e){var t=e.target,n=t.offsetParent.parentNode,s=this.menu.querySelectorAll('[aria-expanded="true"]'),a=this.menu.getElementsByClassName("submenu-list-open");!this.menu.contains(t)&&s.length?(s[0].setAttribute("aria-expanded","false"),a[0].classList.remove("submenu-list-open")):(s=n.querySelectorAll('[aria-expanded="true"]'),a=n.getElementsByClassName("submenu-list-open"),n.id===this.menuId&&s.length&&(s[0].setAttribute("aria-expanded","false"),a[0].classList.remove("submenu-list-open")))}},{key:"keyDownHandler",value:function(e){var t=e.keyCode,n=document.querySelectorAll('[aria-expanded="true"]')[0],s=document.getElementsByClassName("submenu-list-open")[0];27===t&&s&&(n.setAttribute("aria-expanded","false"),s.classList.remove("submenu-list-open"))}},{key:"hoverHandler",value:function(e){var t=e.type,n=e.target;"mouseout"===t&&"true"===n.getAttribute("aria-haspopup")?n.setAttribute("aria-expanded","false"):"mouseover"===t&&"false"===n.getAttribute("aria-haspopup")&&n.setAttribute("aria-expanded","true")}},{key:"eventDispatcher",value:function(e){switch(e.type){case"click":this.clickHandler(e);break;case"focusin":this.focusInHandler(e);break;case"keydown":this.keyDownHandler(e);break;case"mouseover":case"mouseout":this.hoverHandler(e);break;default:return}}},{key:"setEventListeners",value:function(){var e=this;Array.prototype.slice.call(this.menu.getElementsByClassName("no-js")).forEach(function(e){e.classList.remove("no-js")});var t=["focusin","keydown","mouseover"];this.click?(t.push("click"),this.menu.querySelectorAll(".submenu-list").forEach(function(e){return e.classList.add("click-menu")})):t.push("mouseout");for(var n=0;n<t.length;n++)document.addEventListener(t[n],function(t){e.eventDispatcher(t)})}},{key:"setSubmenuIcon",value:function(){var e=this,t=this.fontFamily;this.fontFamilies.includes(t)||(t="");var n=this.menu.querySelectorAll(".submenu-icon"),s="\n      nav ul li span::before {\n        content: '"+this.chevronDown+"';\n        font-family: '"+t+"';\n        font-weight: bold;\n      }\n      nav ul.click-menu li > button[aria-expanded=\"true\"] span::before,\n      nav ul:not(.click-menu) li:hover > button span::before,\n      nav ul li:focus > button span::before { \n        content: '"+this.chevronUp+"';\n        font-family: '"+t+"'; \n        font-weight: bold;\n      }",a=document.createElement("style");a.styleSheet?a.styleSheet.cssText=s:a.appendChild(document.createTextNode(s)),document.getElementsByTagName("head")[0].appendChild(a),n.forEach(function(t){t.setAttribute("data-before",e.chevronDown)})}},{key:"init",value:function(){this.menu=document.getElementById(this.menuId),this.setEventListeners(),this.setSubmenuIcon()}}]),e}();
//# sourceMappingURL=Navigation.js.map
