"use strict";
import KWM_Component from '../core/kwm-component.js';
import KWM_Observable from '../core/kwm-observable.js';

import { aiChatModelInstance } from '../models/AiChatModel.js';

// --- Example for messages from OpenAI ---
// [
//     {
//         "role": "user",
//         "content": "Hello"
//     },
//     {
//         "role": "assistant",
//         "content": "Hello! How can I assist you today?"
//     }
// ]

/**
 * AiChat Component
 * 
 * This component is responsible for rendering the chat page. It fetches the messages from the API using a model and renders them.
 */
export default class AiChatComponent extends KWM_Component {

    constructor() {
        super();

        this.messages = aiChatModelInstance.messages;
        this.openAiApiKey = aiChatModelInstance.openAiApiKey;
        this.newMessage = new KWM_Observable('');
        this.warningText = new KWM_Observable('');
        this.newOpenAiApiKey = new KWM_Observable('');
        this.isLoading = new KWM_Observable(false);
        this.chatElem = null;

        this.registerRenderDependencies([this.messages, this.openAiApiKey, this.isLoading]);
    }

    /**
     * Listener functions
     */
    async sendMessage() {
        if (this.newMessage.value === '') {
            this.warningText.value = 'Please enter a message';
            return;
        }

        this.warningText.value = '';
        this.isLoading.value = true;

        try {
            await aiChatModelInstance.getAnswer(this.newMessage.value);
        }
        catch (error) {
            console.error(error);
            this.warningText.value = 'Oh oh! Ein Fehler ist aufgetreten 😞. Bitte versuche es erneut oder schau in die Konsole für mehr Informationen.';
        }
        finally {
            this.isLoading.value = false;
        }
        this.newMessage.value = '';
    }

    sendOnEnter(event) {
        if(event.key === 'Enter') {
            this.sendMessage();
        }
    }

    setApiKey() {
        aiChatModelInstance.setApiKey(this.newOpenAiApiKey.value);
    }

    resetChat() {
        aiChatModelInstance.resetChat();
    }

    /**
     * Template functions
     */
    template() {
        return `
        <section id="main_content">
            <h1>KWM Ai Chat</h1>

                <div kwm-if="this.openAiApiKey.value === ''">
                    <p>Please enter your OpenAI API key to start chatting</p>
                    <input id="openai_key" type="text" kwm-model-value="newOpenAiApiKey" placeholder="OpenAI API Key" />
                    <button id="set_key" kwm-listen-click="setApiKey">Set Key</button>
                </div>

                <div kwm-if="this.openAiApiKey.value" class="chat">
                    <p kwm-if="this.messages.value.length === 0">Hi, ich bin dein AI Chat Bot 🤖. Frag mich was!</p>

                    ${ this.messages.value.map((message) => `
                            <div class="message ${message.role}">
                                <p>${message.role === 'user' ? '👨‍💻 Du' : '🤖 AI'}: ${message.content}</p>
                            </div>
                        `).join('')
                    }
                    
                    <div kwm-if="this.isLoading" class="message assistant loading">
                        <p>🤖 AI: ... schreibt gerade ...</p>
                    </div>
                    
                    <p id="warning_text">${this.warningText.value}</p>
                </div>

                <div kwm-if="this.openAiApiKey.value">
                    <textarea id="new_message" type="text" kwm-listen-keydown="sendOnEnter" kwm-model-value="newMessage" placeholder="Type a message..." kwm-bind-disabled="isLoading" ></textarea>
                    <button id="send_message" kwm-listen-click="sendMessage" kwm-bind-disabled="isLoading">📝Senden</button>
                    <button kwm-if="this.messages.value.length !== 0" id="reset_chat" kwm-listen-click="resetChat">🗑️ Chat Löschen</button>
                </div>

        </section>
    `;
    }
}

customElements.define('ai-chat-component', AiChatComponent);
