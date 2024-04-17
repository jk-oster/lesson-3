"use strict";

/**
 * KWM_Router
 *
 * = The Navigator - a Hash-based router for Single Page Applications.
 * Handles Routes behind a '/#/' to your convenience.
 * Renders the active route into the specified container.
 *
 * @param {Object} options - The options for the router.
 * @param {HTMLElement} options.container - Give me the container where the views are rendered into
 * @param {Array} options.routes - Give me all the routes you have in your application
 * @param {string} options.slugHome - Default slug for first page load
 * @param {string} options.slugNotFound - Default slug when unknown slug is put into URL
 *
 * @author You - 2024
 */
export default class KWM_Router {
  constructor({ container, routes, slugHome, slugNotFound }) {
    this.routes = routes;
    this.slugHome = slugHome ?? "/";
    this.slugNotFound = slugNotFound ?? "/404";
    this.container = container;
    this.activeRoute = null;
  }

  init() {
    window.addEventListener("hashchange", this.changeView.bind(this));
    this.changeView();
  }

  // forwards the user to the route / page of the application with the specified slug
  // (like clicking on a link in the browser)
  static redirect(slug = "") {
    location.hash = slug;
  }

  changeView() {
    // if hash is only '' or '#' forward to home route
    if (/^$|^#$/.test(location.hash)) {
      KWM_Router.redirect(this.slugHome);
      return;
    }

    // Handle view change
    // activate current route
    this.activeRoute = this.routes.find((route) => route.isCurrent());
    if (this.activeRoute) {
      this.activeRoute.displayRoute(this.container);
    }

    // if no route found redirect to 404
    else {
      console.error(`Page '${location.hash}' could not be found`);
      KWM_Router.redirect(this.slugNotFound);
    }
  }

  // (Bonus) Get the search/get parameters of the current URL
  static getGetUrlSearchParams() {
    return new URLSearchParams(
      window.location.href.split("?")[1] ?? // extract the parameter string (the part after the '?')
        "", // as default return an empty string
    );
  }
}
