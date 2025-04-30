"use strict";
import KWM_Component from '../core/kwm-component.js';
import {obs} from '../core/kwm-observable.js';
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

        this.categories = quizModelInstance.categories;
        this.questions = quizModelInstance.questions;

        quizModelInstance.fetchCategories();
        
        this.numberOfQuestions = obs(10);
        
        this.answers = obs([]);
        this.currentQuestion = obs(null);
        
        this.displaySolution = obs(false);
        this.isLoading = obs(false);

        this.registerRenderDependencies([this.categories, this.questions, this.currentQuestion, this.displaySolution, this.isLoading]);
    }

    nextQuestion() {
        const nextQuestionIndex = this.questions.value.findIndex(q => q.id === this.currentQuestion.value.id) + 1;
        if (nextQuestionIndex >= this.questions.value.length) {
            this.displaySolution.value = true;
            this.currentQuestion.value = null;
            return;
        }
        this.currentQuestion.value = this.questions.value[nextQuestionIndex];
    }

    /**
     * Listener functions
     */

    async startQuiz(category) {
        this.answers.value = []; // Reset answers
        this.displaySolution.value = false; // Hide Solution Summary
        
        this.isLoading.value = true;
        
        try {
            await quizModelInstance.fetchQuestions(category, this.numberOfQuestions.value);
            this.currentQuestion.value = this.questions.value[0]; // Make first question active
        } catch(e) {
            console.log(e);
        } finally {
            this.isLoading.value = false;
        }
    }

    reset() {
        this.answers.value = [];
        this.displaySolution.value = false;
    }

    answerQuestion(answer) {
        const question = this.currentQuestion.value;
        question.correct = question.answers.find(a => a.answer === answer).is_correct;
        question.answer = answer;
        this.answers.value = [...this.answers.value, question];
        this.nextQuestion();
    }

    /**
     * Template function
     */

    template() {
        return `
        <section id="main_content">
            <h1>Quiz</h1>

                <div kwm-if="this.currentQuestion.value">
                    <p><b>Category:</b> ${this.currentQuestion.value?.topic}</p>
                    <p>${this.answers.value.length + 1} of ${this.questions.value?.length}</p>
                    <p><i>${this.currentQuestion.value?.question}</i></p>
                    <button kwm-listen-click="this.answerQuestion('True')">✅True</button>
                    <button kwm-listen-click="this.answerQuestion('False')">❌False</button>
                </div>

                <div kwm-if="!this.currentQuestion.value && !this.displaySolution.value">
                    <label for="numQuestions">Number of questions:</label>
                    <input id="numQuestions" type="number" $value="numberOfQuestions" max="25" min="1" />
                    
                    <h2>To start choose a category</h2>
                    <div class="category-gallery">
                    ${this.categories.value.length === 0 ? `
                            <p>Loading...</p>
                        ` : this.categories.value.map(category => /*html*/`
                            <button kwm-listen-click="this.startQuiz('${category}')">🏷️${category}</button>
                        `).join('')
                    }
                    </div>

                    <p kwm-if="this.isLoading.value">Loading...</p>
                </div>

                <div kwm-if="this.displaySolution.value">
                    <h2>Solution</h2>
                    <p>${this.answers.value.filter(answer => answer.correct).length} correct out of ${this.answers.value.length}</p>
                    
                    ${this.answers.value.map(answer => /*html*/`
                        <div class="answer ${answer.correct ? 'correct' : 'wrong'}">
                            <b><i>${answer.question}</i></b>
                            <p>Your answer: ${answer.answer}, Solution: ${answer.correct ? '✅' : '❌'}</p>
                        </div>
                    `).join('')}

                    <button kwm-listen-click="reset">Start New Quiz</button>
                </div>
        </section>
    `;
    }
}

customElements.define('quiz-component', QuizComponent);
