/*
 * notion-enhancer: api
 * (c) 2021 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * (https://notion-enhancer.github.io/) under the MIT license
 */

'use strict';

/** @module notion-enhancer/api */

/** environment-specific methods and constants */
export * as env from './env.mjs';
/** helpers for formatting or parsing text */
export * as fmt from './fmt.mjs';
/** environment-specific filesystem reading */
export * as fs from './fs.mjs';
/** interactions with the enhancer's repository of mods */
export * as registry from './registry.mjs';
/** environment-specific data persistence */
export * as storage from './storage.mjs';
/** pattern and type validators */
export * as validation from './validation.mjs';
/** helpers for manipulation of a webpage */
export * as web from './web.mjs';