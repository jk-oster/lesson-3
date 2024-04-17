"use strict";

import KWM_Component from "../core/kwm-component.js";

export default class NotFoundComponent extends KWM_Component {
  constructor() {
    super();

    // Any component data goes here in the constructor
    this.text = "⚠️ Ooops! It seems we have lost this page";
  }

  // Template function = shape of the component
  template() {
    return /*html*/ `
        <section id="main_content">
            <h1>${this.text}</h1>
            <img class="not-found" src="https://mailchimp.com/static/images/404Horse.gif?w=780&fm=png&q=70" />
            <p><a href="#/">Back to Home</a></p>
        </section>
        `;
  }
}

customElements.define("not-found-component", NotFoundComponent);
