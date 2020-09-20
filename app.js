class Container {
    constructor(el) {
        this.el = el;
        this.findElements();
        this.listenEvents();
        this.isDisplayedText = false;
    }

    findElements() {
        this.elements = {
            container: this.el,
            form: this.el.querySelector('.js-form'),
            input: this.el.querySelector('.js-form-input')
        }
    }

    listenEvents() {
        this.elements.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.displayedOutputText();
            this.elements.form.reset();
            this.elements.input.focus();
        });
    }

    static isEmptyField(input) {
        return !input.value.trim();
    }

    static minLength(text, length) {
        return text.length >= length;
    }

    static pattern(text, pattern) {
        return pattern.test(text);
    }

    selectColor(text) {
        let colorText = '#000';
        if (Container.pattern(text, /[!@#\$%^&*\(\)\>\<\\\?]/)) {
            colorText = '#E00';
        } else {
            if
                (Container.minLength(text, 4)) {
                colorText = '#0A0';
            }
        };
        return colorText;
    }

    createOutputBlock() {
        let parentHtmlElement = document.createElement('div');
        parentHtmlElement.className = 'output';
        let childHtmlElement = document.createElement('p');
        childHtmlElement.className = 'output__txt';
        parentHtmlElement.appendChild(childHtmlElement);
        childHtmlElement = document.createElement('button');
        childHtmlElement.setAttribute('type', 'button');
        childHtmlElement.innerHTML = 'Clear'
        childHtmlElement.className = 'output__btn';
        childHtmlElement.addEventListener('click', () => {
            parentHtmlElement.parentNode.removeChild(parentHtmlElement);
            this.isDisplayedText = !this.isDisplayedText;
        });
        parentHtmlElement.appendChild(childHtmlElement);

        return parentHtmlElement;
    }

    displayedOutputText() {
        if (Container.isEmptyField(this.elements.input)) {
            alert('The input field must not be empty.');
            return;
        }

        let htmlElement = document.createElement('span');
        htmlElement.innerHTML = this.elements.input.value;
        htmlElement.style.color = this.selectColor(this.elements.input.value);

        if (!this.isDisplayedText) {
            this.elements.container.appendChild(this.createOutputBlock());
            this.isDisplayedText = !this.isDisplayedText;
        } else {
            this.el.querySelector('.output__txt').append('\u0020');
        }

        this.el.querySelector('.output__txt').appendChild(htmlElement);
    }
}

const container = new Container(document.querySelector('.js-container'));