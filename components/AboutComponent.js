"use strict";

import KWM_Component from "../core/kwm-component.js";

export default class AboutComponent extends KWM_Component {
  constructor() {
    super();
    this.text = "We are the best 🔥 study course in the world!";
  }

  template() {
    return /*html*/ `
        <section id="main_content">
            <h1>💡 About us</h1>
            <p>${this.text} <a href="#/contact">Contact us</a></p>
        </section>
        `;
  }
}

customElements.define("about-component", AboutComponent);
