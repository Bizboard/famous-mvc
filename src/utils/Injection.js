/**
 * Created by tom on 28/06/16.
 */

import {Injector}                   from './di/Injector.js';

export class Injection {
    static injector = new Injector();

    /**
     * Requests an instance of the given class from the DI engine. If an instance
     * of that class with the same construction parameters already exists, a reference
     * to it is returned. Otherwise a new instance is created.
     *
     * Example usage:
     * get(HomeController, param1, param2);
     *
     * @param {Function} classConstructor The class of which an instance is wanted
     * @param {Array} constructionParams A list of parameters to be passed to the class constructor
     * @returns {Object} Instance of the given class
     */
    static get(classConstructor, ...constructionParams) {
        return this.injector.get(classConstructor, constructionParams);
    }

    /**
     * Requests instances of multiple classes at once.
     *
     * Example usage:
     * let instances = getAll(ArvaRouter, [HomeController, [param1, param2]], App);
     *
     * @param {Array} classContructorArray Array of classes to instantiate.
     * May also be an array where each item is an array containing the class as
     * its first element, and an array of parameters as its second element.
     *
     * @returns {Array} An array of instances of the requested classes
     */
    static getAll(...classContructorArray) {
        let results = [];
        for (let entry of classContructorArray) {
            let [constructor, params] = entry instanceof Array ? [entry[0], entry[1]] : [entry, []];
            results.push(this.get(constructor, ...params));
        }
        return results;
    }

    /**
     * Registers classes as the default provider for their Provide annotation (set by @provide decorator).
     *
     * Example usage:
     * addProviders(ArvaRouter, FamousContext);
     *
     * @param {Array} classConstructors
     * @returns {void}
     */
    static addProviders(...classConstructors) {
        for (let constructor of classConstructors) {
            this.injector._loadFnOrClass(constructor);
        }
    }
}