<a href="https://github.com/unwall-io/web-storage" target="__blank"><img alt="web-storage" src="https://raw.githubusercontent.com/unwall-io/web-storage/master/logo.png" width="100" /></a>

# web-storage

[![npm (scoped)](https://img.shields.io/npm/v/unwall/web-storage)](https://www.npmjs.com/package/unwall/web-storage)
[![CircleCI Status](https://img.shields.io/circleci/build/github/unwall-io/web-storage)](https://circleci.com/gh/unwall-io/web-storage)
[![Coveralls Status](https://img.shields.io/coveralls/github/unwall-io/web-storage/master)](https://coveralls.io/github/unwall-io/web-storage?branch=master)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

web-storage provides a common way to access W3C <a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage">web storage</a> in modern web browsers using reducers.

## Requirements

web-storage provides access to W3C web storage so it needs to be ran on environments that provides the implementation to the underlying storage. Some good references to verify your environment will be `https://caniuse.com/` or `https://developer.mozilla.org/en-US/`.

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
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.localStorage, {
  type: "set",
  key: "testkey",
  value: "testvalue"
});
```

The exact message signature and usage will be found in the documentation of the indiviual storage type

1. How to use [Local Storage](/src/storageReducer/README.md)
2. How to use [Session Storage](/src/storageReducer/README.md)
3. How to use Cookies (To be implemented)
4. How to use IndexedDB (To be implemented)
5. How to use Cache API (To be implemented)

## Motivation

web-storage is created with the ideas to provide the following:

1. Provide a common public API for accessing different storage types that expose different APIs
2. Encapsulate code that is required to access or manipulate data from the storage like:
   1. Handle asynchronous code in accessing storage like IndexedDB or CacheAPI
   2. Provide data transformation for accessing storage like LocalStorage and SessionStorage that requires the value to be store as strings.
3. Allow integration with other javascript code that provide functionality outside of web storage. An example is web-storage-react a library that is created to provide web storage functionality to ReactJS applications.
4. Have a public API that is generic while being extensible for the individual web storage types that provide more complex functionality like querying for IndexedDB or manipulating binary objects like CacheAPI.
5. Handle transformation of data types for storage type like localStorage that only manipulate values in strings

web-storage is not built for all types of applications and for certain consumers it will not be worth using it. Taking the use case of an application that needs to just access the local storage and only manipulates string values. To set a value in the store it is a simple 1 line of code like `window.localStorage.setItem("test", "value")`.

The same operation when using web-storage actually requires more code from the consumer. And this does not include the code bloat that required in the reducer functions.

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.localStorage, {
  type: "set",
  key: "testkey",
  value: "testvalue"
});
```

In summary, using web-storage requires the consumer to make the following tradeoffs:

1.  Initial congnitive load to understand an OpenSource public open API that has less resources compared to the heavily documented browser public APIs for web storage
2.  More lines of code compared to accessing the browser API directly in some use cases
3.  Increase complexity for application due to the need for bundlers
4.  For use cases that is not covered by the implementation team, the consumer has 2 choices
    1.  File issues with the repository and wait for the maintainers or other contributors to provide the implementation
    2.  Understand the internal workings of repository and become a contributor for the implementation

## Design

web-storage mades use of reducer functions a concept made popular by Redux which introduces reducers as the type of function you would pass to `Array.prototype.reduce(reducer, ?initialValue)`.

Redux emphasizes that the reducer function needs to stay pure and it should not perform the following operations in the reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

web-storage attempts to follow the recommendations but do not follow the rules strictly. In particular web-storage breaks the rule of mutating the store argument passed into the reducer. Although it follows the rules of the reducer returning the same results when providing the same parameters (Same state of store argument will always be returned if it has the same initial state).

## License

[MIT](LICENSE.md)
