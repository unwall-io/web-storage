<a href="https://github.com/unwall-io/web-storage" target="__blank"><img alt="web-storage" src="https://raw.githubusercontent.com/unwall-io/web-storage/master/logo.png" width="100" /></a>

# web-storage

[![npm (scoped)](https://img.shields.io/npm/v/unwall/web-storage)](https://www.npmjs.com/package/unwall/web-storage)
[![CircleCI Status](https://img.shields.io/circleci/build/github/unwall-io/web-storage)](https://circleci.com/gh/unwall-io/web-storage)
[![Coverage Status](https://coveralls.io/repos/github/unwall-io/web-storage/badge.svg)](https://coveralls.io/github/unwall-io/web-storage)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

web-storage mades use of reducers to provide access to <a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage">web storage</a> in modern web browsers. Reducer functions is a concept made popular by Redux which introduces reducers as the type of function you would pass to `Array.prototype.reduce(reducer, ?initialValue)`.

Redux emphasizes that the reducer function needs to stay pure and it should not perform the following operations in the reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

web-storage attempts to follow the recommendations but do not follow the rules strictly. In particular web-storage breaks the rule of mutating the store argument passed into the reducer. Although it follows the rules of the reducer returning the same results when providing the same parameters (Same state of store argument will always be returned if it has the same initial state).

## Motivation

web-storage is created with the ideas to provide the following:

1. Provide a common public API for accessing different storage types that expose different APIs
2. Encapsulate complexity of accessing storage like IndexedDB or CacheAPI that is asynchronous in nature and requires more complex code for access.
3. Allow integration with other javascript code that provide functionality outside of web storage. An example is web-storage-react a library that is created to provide web storage functionality to ReactJs applications.
4. Have a public API that is generic while being extensible for the individual web storage types that provide more complex functionality like querying for IndexedDB or manipulating binary objects like CacheAPI.

web-storage is not built for all types of applications and for certain consumers it will not be worth using it. Taking the use case of an application that needs to just access the local storage. To set a value in the store it is a simple 1 line of code like `window.localStorage.setItem("test", "value")`.

The same operation when using web-storage actually requires more code from the consumer. And this does not include the code bloat that required in the reducer functions.

```js
import { localStorageReducer } from "@unwall/web-storage";

localStorageReducer(window.localStorage, {
  type: "set",
  key: expectedKey,
  value: expectedValue
});
```

In summary, using web-storage requires the consumer to make the following tradeoffs:

1.  Initial congnitive load to understand an OpenSource public open API that has less resources compared to the heavily documented browser public APIs for web storage
2.  More lines of code compared to accessing the browser API directly in some use cases
3.  Increase complexity for application due to the need for bundlers

## Quick Start Guide

### Installation

#### Using npm

`npm install --save @unwall/web-storage`

#### Using yarn

`yarn add @unwall/web-storage`

### Usage

web-storage uses the common reducer function signature `reducer_name(storage, message)` for accessing the different storage types.

An example using the local storage will be the following

```js
import { localStorageReducer } from "@unwall/web-storage";

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
