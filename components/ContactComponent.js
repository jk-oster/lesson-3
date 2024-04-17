"use strict";

import KWM_Component from "../core/kwm-component.js";

export default class ContactComponent extends KWM_Component {
  constructor() {
    super();
    this.text =
      "We are the hottest 🔥 company in the world. Contact us and become part of the team!";
  }

  template() {
    return /*html*/ `
        <section id="main_content">
            <h1>📨 Contact</h1>
            <p>${this.text}</p>
            <address>
                <a href="https://jakobosterberger.com/">Website</a>
                <a href="https://github.com/jk-oster">GitHub</a>
                <a href="https://www.linkedin.com/in/jakob.osterberger/">LinkedIn</a>
                <a href="https://www.instagram.com/jakobosterberger/">Instagram</a>
            </address>
        </section>
        `;
  }
}

customElements.define("contact-component", ContactComponent);
