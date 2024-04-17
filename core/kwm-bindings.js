'use strict';

/**
 * KWM Bindings
 *
 * enables declarative 2-way data-binding of attributes of HtmlElements to Observables
 *
 * @param objObservables - Give me an object containing Observables with their keys corresponding to your data-bind properties
 * @param container - Give me the container where to apply the bindings

 * @example 'new KWM_Bindings({lastName: new Observable('Osterberger')}' in template <input kwm-bind-value="lastName" />
 * binds the HtmlElement Attribute 'value' to the observable
 *
 * @author Jakob Osterberger - 2023
 * @reference inspired by https://blog.jeremylikness.com/blog/client-side-javascript-databinding-without-a-framework/,
 * https://dev.to/proticm/vanilla-js-data-binding-with-classes-from-scratch-48b1 and
 * https://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript
 */
export default class KWM_Bindings {
    constructor(objObservables, container) {
        this.bindingData = objObservables; // The State / Data
        this.container = container;        // The UI / View

        // Pattern: kwm-bind-attributeName="variableName"
        this.valueBindRegex = /(kwm-bind-([a-zA-Z]+))=\"(\w+)\"/g;
        // Pattern: kwm-listen-listenerType="listenerFunctionName"
        this.listenerBindRegex = /(kwm-listen-([a-zA-Z]+))=\"(\w+)\"/g;
    }

    bind() {
        this.applyBindings(this.container);
    }

    // Need to run AFTER the template / component was rendered
    applyBindings(container) {
        const containerHtml = container.innerHTML;

        // Bind values
        for (let [x, selector, attributeName, variableName] of containerHtml.matchAll(this.valueBindRegex)) {
            container.querySelectorAll(`[${selector}="${variableName}"]`).forEach(elem => {
                const observable = this.bindingData[variableName.trim()];
                if (observable) {
                    KWM_Bindings.bindAttribute(elem, observable, attributeName);
                } else console.warn(`No observable found with name "${variableName}" found in bindings:`, this.bindingData, elem);
            })
        }

        // (Bonus) Bind Listeners
        for (let [x, selector, listenerType, listenerFunctionName] of containerHtml.matchAll(this.listenerBindRegex)) {
            container.querySelectorAll(`[${selector}="${listenerFunctionName}"]`).forEach(elem => {
                const listenerFunction = this.bindingData[listenerFunctionName.trim()];
                if (listenerFunction) {
                    elem.addEventListener(listenerType, listenerFunction.bind(this.bindingData));
                } else console.warn(`No listenerFunction with name "${listenerFunctionName}" found in bindings:`, this.bindingData, elem);
            })
        }
    }

    static bindAttribute(elem, observable, attribute = 'value') {
        KWM_Bindings.setAttribute(elem, observable, attribute);
        observable.subscribe(() => KWM_Bindings.setAttribute(elem, observable, attribute));

        // (Bonus) 2-way-data-binding - if applicable register input listeners
        if (
            (elem.tagName === 'SELECT' || elem.tagName === 'INPUT') &&
            (attribute === 'value' || attribute === 'checked')
        ) {
            KWM_Bindings.applyInputListeners(elem, observable, attribute);
        }
    }

    // (Bonus)
    static setAttribute(elem, observable, attribute) {
        // All other attributes e.g. src, href, value,... need no mapping
        const mapping = {
            text: "innerText", // kwm-bind-text="..." -> binds innerText
            innertext: "innerText", // kwm-bind-innertext="..." -> binds innerText
            html: "innerHTML",  // kwm-bind-html="..." -> binds innerHTML
            innerhtml: "innerHTML", // kwm-bind-innerhtml="..." -> binds innerHTML
        };

        const attributeName = mapping[attribute] ?? attribute;
        elem[attributeName] = observable.value;
    }

    // (Bonus)
    static applyInputListeners(inputElem, observable) {
        if (inputElem.tagName === 'SELECT') {
            inputElem.addEventListener('change', () => observable.value = inputElem.options[inputElem.selectedIndex].value);
        } else if (inputElem.type === 'checkbox' || inputElem.type === 'radio') {
            inputElem.addEventListener('change', () => observable.value = inputElem.checked);
        } else {
            inputElem.addEventListener('keyup', () => observable.value = inputElem.value);
            inputElem.addEventListener('change', () => observable.value = inputElem.value);
        }
    }
}