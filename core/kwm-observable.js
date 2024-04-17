'use strict';

/**
 * KWM Observable
 *
 * A object that can be observed for changes. When the value changes, all subscribers are notified.
 *
 * @example
 * const name = new KWM_Observable("Jeremy");
 * name.subscribe((newVal) => console.log(`Name changed to ${newVal}`));
 * name.value = "Doreen";
 * // logs "Name changed to Doreen" to the console
 *
 * @param value - Give me the initial value for your Observable
 *
 * @author Jakob Osterberger - 2023
 * @reference inspired by https://blog.jeremylikness.com/blog/client-side-javascript-databinding-without-a-framework/
 */
export default class KWM_Observable {

    _value = null;

    constructor(value = "") {
        this._listeners = [];
        this._value = value;
    }

    // Notify listener Function and call them all with the new value as argument
    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }

    // Register a new listener function
    subscribe(listener) {
        this._listeners.push(listener);
    }

    get value() {
        return this._value;
    }

    set value(val) {
        if (val !== this._value) {
            this._value = val;
            this.notify();
        }
    }
}

// Convenience shorthand method
export const obs = (value = "") => new KWM_Observable(value);