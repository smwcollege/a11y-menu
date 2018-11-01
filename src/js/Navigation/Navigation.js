class Navigation {
    constructor({
        menuId = 'main-menu',
        fontFamily = 'Font Awesome 5 Free',
        chevronDown = '\\f078',
        chevronUp = '\\f077',
        click = false
    } = {}) {
        this.chevronDown = chevronDown;
        this.chevronUp = chevronUp;
        this.fontFamilies = ['FontAwesome', 'Font Awesome 5 Free', 'Glyphicons Halflings'];
        this.fontFamily = fontFamily;
        this.hasNestedSubmenu = false;
        this.menu = null;
        this.menuId = menuId;
        this.click = click;
    }
    clickHandlerOld(evt) {
        console.log(evt.type, 'click')
        
        let { target } = evt;
        let submenuList = null;
        // people might click on the icon instead of the button.
        // if so, set the target to the parent (button)
        if (target.localName === 'span') {
            target = target.parentElement;
        }

        // let's open and close the menu


            // if the submenu is open and we click on something else like the body
            // close it and set aria-expanded to false
        if (document.getElementsByClassName('submenu-list-open').length > 0 && !document.getElementsByClassName('submenu-list-open')[0].contains(target)) {

            // there's an open submenu somewhere... we need to close it

            // the submenu <ul>
            submenuList = document.getElementsByClassName('submenu-list-open')[0];

            // open the next menu immediately.
            const nextMenu = target.nextSibling;
            nextMenu.classList.add('submenu-list-open');
            target.setAttribute('aria-expanded', 'true');

            // remove the class that displays the submenu
            submenuList.classList.remove('submenu-list-open');

            // set aria-expanded to false to switch the icon
            submenuList.previousSibling.setAttribute('aria-expanded', 'false')
            return;
        } else {

            // we're near a submenu by clicking on a button
            submenuList = target.nextSibling;

            // check if there's a nested submenu
            submenuList.getElementsByTagName('ul').length 
                ? this.hasNestedSubmenu = true 
                : this.hasNestedSubmenu = false;

            // toggle the submenu display class
            submenuList.classList.toggle('submenu-list-open');

            // toggle the aria-expanded attribute
            submenuList.classList.contains('submenu-list-open') 
                ? target.setAttribute('aria-expanded', 'true') 
                : target.setAttribute('aria-expanded', 'false');

            return;
        }
    }
    focusInHandlerOld(evt) {
        const { target } = evt;
        this.toggleMenu(target);
        evt.preventDefault();
    }
    keyDownHandlerOld(evt) {
        const { keyCode } = evt;
        const expandedElementCollection = document.querySelectorAll('[aria-expanded="true"]')[0];
        const openSubmenu = document.getElementsByClassName('submenu-list-open')[0];

        if (keyCode === 27 && openSubmenu) {
            expandedElementCollection.setAttribute('aria-expanded', 'false');
            openSubmenu.classList.remove('submenu-list-open');
        }
    }
    mouseDownHandler(evt) {
        evt.preventDefault();
    }
    hoverHandler(evt) {
        const { type, target } = evt;
        if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
            target.setAttribute('aria-expanded', 'false');
        } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === "false") {
            target.setAttribute('aria-expanded', 'true');
        }
    }
    toggleMenuOld(target) {
        
        const { offsetParent: { parentNode } } = target;
        let expandedElementCollection = this.menu.querySelectorAll('[aria-expanded="true"]');
        let openElementCollection = this.menu.getElementsByClassName('submenu-list-open')


        if (!this.menu.contains(target) && expandedElementCollection.length) {
            // if the menu doesn't contain the target, close all the submenus.
            // this is only needed for tabbing out of open submenus into something out of the nav.
            expandedElementCollection[0].setAttribute('aria-expanded', 'false');
            openElementCollection[0].classList.remove('submenu-list-open')

        } else {
            // close the submenu when you leave by checking if focus has returned to the parentNode
            expandedElementCollection = parentNode.querySelectorAll('[aria-expanded="true"]');
            openElementCollection = parentNode.getElementsByClassName('submenu-list-open');

            if ((parentNode.id === this.menuId || parentNode.localName === 'ul') &&
                expandedElementCollection.length) {
                expandedElementCollection[0].setAttribute('aria-expanded', 'false');
                openElementCollection[0].classList.remove('submenu-list-open');
            }
        }
        console.log({ target, expandedElementCollection, openElementCollection })
        return;
    }

    clickHandler(evt) {
        let { target } = evt;
        let submenuList = null;

        // people might click on the icon instead of the button.
        // if so, set the target to the parent (button)
        if (target.localName === 'span') {
            target = target.parentElement;
        }
        
        // if there's an open submenu with sub-submenus...
        if (document.querySelectorAll('.submenu-list-open').length > 0 && !document.querySelectorAll('.submenu-list-open')[0].contains(target)) {
            
            const submenuNodeList = document.querySelectorAll('.submenu-list-open');
            console.log(submenuNodeList, 'if')

            if (target.nextSibling && target.nextSibling.localName === 'ul') {
                // if you click from one menu item to another, open the next menu and close the previous one immediately.
                const nextMenu = target.nextSibling;
                nextMenu.classList.add('submenu-list-open');    
            }
            
            submenuNodeList.forEach((el) => {
                // toggle all the menus in the NodeList
                this.toggleSubmenuMenuClass(el);
                this.toggleButtonAria(target);
            })


    
        } else {
            // we're near a submenu by clicking on a button but the menu isn't initially open.
            if (target.nextSibling !== null) {
                submenuList = target.nextSibling;
                console.log(submenuList, 'else...')
                // check if there's a nested submenu
                submenuList.getElementsByTagName('ul').length ?
                    this.hasNestedSubmenu = true :
                    this.hasNestedSubmenu = false;
        
                this.toggleSubmenuMenuClass(submenuList);
                this.toggleButtonAria(target);
            } 
        }
    }

    escapeHandler(evt) {
        const { keyCode } = evt;
        console.log(keyCode, 'escape')
        const submenuNodeList = document.querySelectorAll('.submenu-list-open');
        // const buttonNodeList = document.querySelectorAll('[aria-expanded="true"]')
        submenuNodeList.forEach((el) => {
            // toggle all the menus in the NodeList
            this.toggleSubmenuMenuClass(el);
        })
        // buttonNodeList.forEach((el) => {
        //     this.toggleButtonAria(el);
        // })
    }

    focusInHandler(evt) {
        console.log(evt.target, 'focus!')
    }

    toggleButtonAria(target) {

        // const buttonNodeList = document.querySelectorAll('[aria-expanded="true"]');
        // console.log(buttonNodeList);
    
        console.log('expanded?', target.getAttribute('aria-expanded'), target);
        if (target.getAttribute('aria-expanded') === 'false') {
            target.setAttribute('aria-expanded', 'true');
        } else {
            target.setAttribute('aria-expanded', 'false');
        }
    }

    toggleSubmenuMenuClass(el) {
        if (el !== null) {
            el.classList.toggle('submenu-list-open');
            console.log(el)
        } else {
            const elNode = document.querySelectorAll('.submenu-list-open');
            elNode.forEach(el => {
                el.classList.toggle('submenu-list-open');
            })
        }
    }

    eventDispatcher(evt) {
        // dispatch event listeners to the correct functions.

        // mousedown focusin click
        // keydown focusin keydown click

        switch (evt.type) {
            case 'keydown':
                if (evt.keyCode === 9) {
                    // if the keydown is caused by the tab key, it should be a focusIn
                    this.focusInHandler(evt);
                } else if (evt.keyCode === 13) {
                    // if the keydown is caused by the return key, it should be a click
                    // evt.preventDefault();
                    this.clickHandler(evt);
                } else if (evt.keyCode === 27) {
                    // if the keydown is caused by the escape key, close the menus
                    this.escapeHandler(evt);
                } else {
                    // throw away all other events.
                    return;
                }
                break;
            
            case 'mousedown':
                // if the event was caused by the mouse, don't let the target gain focus.
                evt.preventDefault();
                this.clickHandler(evt);
                break;
            
            default:
                return;
        }
    }
    setEventListeners() {
        // if this script is running, remove the 'no-js' class from the elements.
        const listElements = Array.prototype.slice.call(this.menu.getElementsByClassName('no-js'));
        listElements.forEach(element => {
            element.classList.remove('no-js');
        });
        // define a list of possible event listeners
        let listeners = ['click', 'focusin', 'keydown', 'mouseover'];

        if (this.click) {
            listeners.push('mousedown', 'mouseup');
            
            const subMenuList = this.menu.querySelectorAll('.submenu-list');
            
            subMenuList.forEach(menu => menu.classList.add('click-menu'));

        } else {
            listeners.push('mouseout');
        }
        // attach them to the document.
        for (let i = 0; i < listeners.length; i++) {
            document.addEventListener(listeners[i], (evt) => {
                // dispatch the events to the class methods.
                this.eventDispatcher(evt);
            });
        }
    }
    setSubmenuIcon() {
        // possible font-family for the icons
        let fontFamily = this.fontFamily;

        if (!this.fontFamilies.includes(fontFamily)) {
            fontFamily = '';
        }

        // the list of all the submenu icons
        const icons = this.menu.querySelectorAll('.submenu-icon');
        // the css to inject into the page
        const hoverCss = `
            nav ul li span::before {
                content: '${this.chevronDown}';
                font-family: '${fontFamily}';
                font-weight: bold;
            }
            nav ul.click-menu li > button[aria-expanded="true"] span::before,
            nav ul:not(.click-menu) li:hover > button span::before,
            nav ul li:focus > button span::before { 
                content: '${this.chevronUp}';
                font-family: '${fontFamily}'; 
                font-weight: bold;
            }`;

        // create a style tag
        const style = document.createElement('style');

        // add the styles to the tag (or a stylesheet if it exists)
        if (style.styleSheet) {
            style.styleSheet.cssText = hoverCss;
        } else {
            style.appendChild(document.createTextNode(hoverCss));
        }

        // add the tag to the <head>
        document.getElementsByTagName('head')[0].appendChild(style);

        // set the data-before attribute to the values passed in the constructor.
        icons.forEach((icon) => icon.setAttribute('data-before', this.chevronDown));

        return;
    }
    init() {
        this.menu = document.getElementById(this.menuId);
        this.setEventListeners();
        this.setSubmenuIcon();
    }
}

/* strip-code */
module.exports = Navigation;
/* end-strip-code */