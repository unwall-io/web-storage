<a href="https://github.com/w3cwebstorage/w3cwebstorage" target="__blank"><img alt="w3cwebstorage" src="https://raw.githubusercontent.com/w3cwebstorage/w3cwebstorage/master/logo.png" width="100" /></a>

# w3cwebstorage

[![npm (scoped)](https://img.shields.io/npm/v/@w3cwebstorage/w3cwebstorage)](https://www.npmjs.com/package/@w3cwebstorage/w3cwebstorage)
[![CircleCI Status](https://img.shields.io/circleci/build/github/w3cwebstorage/w3cwebstorage)](https://circleci.com/gh/w3cwebstorage/w3cwebstorage)
[![Coverage Status](https://coveralls.io/repos/github/w3cwebstorage/w3cwebstorage/badge.svg)](https://coveralls.io/github/w3cwebstorage/w3cwebstorage)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

w3cwebstorage mades use of reducers to provide access to <a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage">web storage</a> in modern web browsers. Reducer functions is a concept made popular by Redux which introduces reducers as the type of function you would pass to `Array.prototype.reduce(reducer, ?initialValue)`.

Redux emphasizes that the reducer function needs to stay pure and it should not perform the following operations in the reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

w3cwebstorage attempts to follow the recommendations but do not follow the rules strictly. In particular w3cwebstorage breaks the rule of mutating the store argument passed into the reducer. Although it follows the rules of the reducer returning the same results when providing the same parameters (Same state of store argument will always be returned if it has the same initial state).

## Motivation

w3cwebstorage is created with the ideas to provide the following:

1. Provide a common public API for accessing different storage types that expose different APIs
2. Encapsulate complexity of accessing storage like IndexedDB or CacheAPI that is asynchronous in nature and requires more complex code for access.
3. Allow integration with other javascript code that provide functionality outside of web storage. An example is w3cwebstorage-react a library that is created to provide web storage functionality to ReactJs applications.
4. Have a public API that is generic while being extensible for the individual web storage types that provide more complex functionality like querying for IndexedDB or manipulating binary objects like CacheAPI.

w3cwebstorage is not built for all types of applications and for certain consumers it will not be worth using it. Taking the use case of an application that needs to just access the local storage. To set a value in the store it is a simple 1 line of code like `window.localStorage.setItem("test", "value")`.

The same operation when using w3cwebstorage actually requires more code from the consumer. And this does not include the code bloat that required in the reducer functions.

```js
import { localStorageReducer } from "@w3cwebstorage/w3cwebstorage";

localStorageReducer(window.localStorage, {
  type: "set",
  key: expectedKey,
  value: expectedValue
});
```

In summary, using w3cwebstorage requires the consumer to make the following tradeoffs:

1.  Initial congnitive load to understand an OpenSource public open API that has less resources compared to the heavily documented browser public APIs for web storage
2.  More lines of code compared to accessing the browser API directly in some use cases
3.  Increase complexity for application due to the need for bundlers

## Quick Start Guide

### Installation

#### Using npm

`npm install --save @w3cwebstorage/w3cwebstorage`

#### Using yarn

`yarn add @w3cwebstorage/w3cwebstorage`

### Usage

w3cwebstorage uses the common reducer function signature `reducer_name(storage, message)` for accessing the different storage types.

An example using the local storage will be the following

```js
import { localStorageReducer } from "@w3cwebstorage/w3cwebstorage";

localStorageReducer(window.localStorage, {
  type: "set",
  key: expectedKey,
  value: expectedValue
});
```

The exact message signature and usage will be found in the documentation of the indiviual storage type

1. How to use [Local Storage](/src/localStorageReducer/README.md)
2. How to use Session Storage (To be implemented)
3. How to use Cookies (To be implemented)
4. How to use IndexedDB (To be implemented)
5. How to use Cache API (To be implemented)

## License

[MIT](LICENSE.md)
