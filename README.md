# <a href="" target="__blank"><img alt="w3cwebstorage" src="logo.svg" width="60" /></a> w3cwebstorage

## Overview

w3cwebstorage mades use of reducers to provide access to <a href="https://developers.google.com/web/fundamentals/instant-and-offline/web-storage">web storage</a> in modern web browsers. Reducer functions is a concept made popular by Redux which introduces reducers as the type of function you would pass to `Array.prototype.reduce(reducer, ?initialValue)`.

Redux emphasizes that the reducer function needs to stay pure and it should not perform the following operations in the reducer:

- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random().

w3cwebstorage attempts to follow the recommendations but do not follow the rules strictly. In particular w3cwebstorage breaks the rule of mutating the store argument passed into the reducer. Although it follows the rules of the reducer returning the same results when providing the same parameters (Same state of store argument will always be returned if it has the same initial state).

### Implemented Stores

1. Local Storage
2. Session Storage (Design Phase)
3. Cookies (Design Phase)
4. IndexedDB (Design Phase)
5. Cache API (Design Phase)

## Quick Start Guide

### Installation

#### Using npm

`npm install --save @w3cwebstorage/w3cwebstorage`

#### Using yarn

`yarn add @w3cwebstorage/w3cwebstorage`

### Usage

## License

[MIT](LICENSE.md)
