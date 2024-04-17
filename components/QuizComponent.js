"use strict";
import KWM_Component from '../core/kwm-component.js';
import KWM_Observable from '../core/kwm-observable.js';

import { quizModelInstance } from '../models/QuizModel.js';

/**
 * Quiz Component
 * 
 * This component is responsible for rendering the quiz page.
 * It fetches the questions from the API using a model and renders them.
 */
export default class QuizComponent extends KWM_Component {

    constructor() {
        super();

    }

    template() {
        return /*html*/`

    `;
    }
}

customElements.define('quiz-component', QuizComponent);