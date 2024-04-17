"use strict";

/**
 * KWM_Route
 *
 * Hash-based Route for Single Page Applications.
 * Each route has a component that is rendered when the route is active.
 *
 * @param {Object} options - The options for the route.
 * @param {string} options.slug - Give me the slug of the route. This is the part after the '#' in the url.
 * @param {string} options.name - Give me the name of the route. This is the part that is displayed in the navigation.
 * @param {KWM_Component} options.component - Give me the component that is rendered when the route is active.
 * @param {function} options.canRender - (Bonus) A function that is called before the component is rendered. If it returns false, the component will not be rendered.
 *
 * @author You - 2024
 */
export default class KWM_Route {
  constructor({ slug, name, component, canRender }) {
    this.slug = slug;
    this.component = component;
    this.name = name;
    this.canRender = canRender; // (bonus)
  }

  displayRoute(container) {
    if (this.canRender && !this.canRender()) return; // (bonus)
    this.component.render(container);
  }

  static getSlugFromHash() {
    return window.location.hash
      .slice(1) // Remove the '#' from the hash
      .split("?")[0]; // Remove the query parameters '?...'
  }

  isCurrent() {
    return KWM_Route.getSlugFromHash() === this.slug;
  }
}
