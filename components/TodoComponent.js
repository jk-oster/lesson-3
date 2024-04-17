'use strict';

import KWM_Component from '../core/kwm-component.js';
import KWM_Observable from '../core/kwm-observable.js';

export default class TodoComponent extends KWM_Component {
    constructor() {
        super();
        this.newTodoText = new KWM_Observable('');
        this.todos = new KWM_Observable([]);

        this.registerRenderDependencies([this.todos]); // Register the observables that when changed trigger a rerender
    }
    addTodo() {
        const newTodoText = this.newTodoText.value;
        this.todos.value = [...this.todos.value, newTodoText];
    }

    template() {
        return /*html*/`
        <section id="todo_app">
          <input type="text" kwm-bind-value="newTodoText" />
          <button kwm-listen-click="addTodo">
              Add Todo
          </button>
          <ul>
          ${ this.todos.value.map(todo => /*html*/`<li>${todo}</li>`).join('') }
          </ul>
        </section>`;
    }
}
customElements.define('todo-component', TodoComponent);