"use strict";
import KWM_Component from '../core/kwm-component.js';
import KWM_Observable from '../core/kwm-observable.js';
import { todoModelInstance } from '../models/TodoModel.js';

export default class TodoComponent extends KWM_Component {
    constructor() {
        super();

        this.todos = todoModelInstance.todos;
        this.newTodoText = new KWM_Observable('');

        this.registerRenderDependencies([todoModelInstance.todos]);
    }

    addTodo() {
        if (this.newTodoText.value.trim() !== '') {
            todoModelInstance.add(this.newTodoText.value);
            this.newTodoText.value = '';
        }
    }

    removeTodo(event) {
        const todoId = event.target.dataset.id;
        todoModelInstance.remove(todoId);
    }

    toggleTodo(event) {
        const todoId = event.target.dataset.id;
        todoModelInstance.toggle(todoId);
    }

    template() {
        return /*html*/`
            <section id="todo_app">
                <h1>KWMJS Todo App</h1>
                <input type="text" kwm-bind-value="newTodoText" />
                <button kwm-listen-click="addTodo">Add Todo</button>
                <ul>
                    ${this.todos.value.map(todo => /*html*/`
                        <li>
                            <input type="checkbox" kwm-listen-click="toggleTodo" data-id="${todo.id}" ${todo.completed ? 'checked' : ''} />
                            <span class="${todo.completed ? 'done' : ''}">${todo.text}</span>
                            <button kwm-listen-click="removeTodo" data-id="${todo.id}">Remove</button>
                        </li>
                    `).join('')}
                </ul>
            </section>
        `;
    }
}

customElements.define('todo-component', TodoComponent);
