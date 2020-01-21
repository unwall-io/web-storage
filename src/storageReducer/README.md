<a href="https://github.com/unwall-io/web-storage" target="__blank"><img alt="web-storage" src="https://raw.githubusercontent.com/unwall-io/web-storage/master/logo.png" width="100" /></a>

# web-storage: storageReducer

storageReducer provides the implementation to access and manipulate the localStorage and sessionStorage defined in the <a href="https://www.w3.org/TR/webstorage/">W3C</a> Web Storage recommendation document.

## Requirements

storageReducer provides access to W3C sessionStorage and localStorage. You can check for the support using

1. localStorage - https://caniuse.com/#search=localStorage
2. sessionStorage - https://caniuse.com/#search=sessionStorage

## Features

1. Type conversion
   1. setItem - transformation to string value via method associated with provided `datatype` property or via datatype derived from the type inpection of provided `value` property
   2. getItem - transformation to correct type via method associated with provided `datatype` property or value return as string if `datatype` property not provided.
2. Common interface to implement code used for both localStorage and sessionStorage

## Quick Start

### Usage

#### Message options

| Property   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | Indicates the type of operation to be performed **_*(Required)*_** <br /> Supports :<ul><li>get</li><li>set</li><li>remove</li><li>clear</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `key`      | String value indicating the identifier of the value in the storage to be manipulated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `value`    | Represents the value that is stored in the storage. localStorageReducer transforms the value when retrieving and storing in the storage. The transformation applied depends on the supplied `type`, `datatype` or `value`. <br /> Supports javascript datatypes <ul><li>number</li><li>string</li><li>boolean</li><li>date</li><li>object</li><li>array</li><li>null</li></ul><br /> Unsupported javascript datatypes <ul><li>function</li><li>undefined</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `datatype` | Type of the value to be manipulated. Used by `type`: `get` or `type`: `set` to convert between string values and typed values. If value is not supplied the datatype will default to `string` for `type`: `get` and for `type`: `set` the type will be best guess using javascripts' `typeof` and `instanceof` commands. The following are the accepted values: <ul><li>string<br />- transform for set: (value) => value.toString()<br />- transform for get: NA</li><li>boolean<br />- transform for set: (value) => value.toString()<br />- transform for get: transform for get: (value) => value === "true"</li> <li>date<br />- transform for set: (value) => value.toISOString()<br />- transform for get: value => new Date(value)</li><li>number<br />- transform for set: (value) => value.toString()<br />- transform for get: (value) => Number(value)</li><li>array<br />- transform for set: (value) => JSON.stringify(value)<br />- transform for get: (value) => JSON.parse(value)</li><li>object<br />- transform for set: (value) => JSON.stringify(value)<br />- transform for get: (value) => JSON.parse(value)</li></ul> |

##### Example usage

###### Get a value

The message type `get` will retrieve a value from the storage that is identified by the key. It returns null if the key is not found. This message type will perform conversion from the underlying storage type which is a `string` to the type defined in the message `datatype` property. By default, the datatype is set to `string` which will return the value from the storage without conversion. The consumer needs to handle errors if the requested datatype does not match the value stored.

- local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "get",
  key: "key"
});
```

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "get",
  key: "key",
  datatype: "array"
});
```

- session storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "get",
  key: "key"
});
```

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "get",
  key: "key",
  datatype: "date"
});
```

###### Set a value

The message type `set` will set a value in the storage that is identified by the key. This message type will perform conversion from the type defined in the message `datatype` property to the underlying storage type which is a `string`. If not supplied the datatype will be obtained from the value using `typeof value`. The consumer needs to handle errors if the requested datatype does not match the value stored. Setting the value of an existing `key` in the storage will override the existing value.

- local storage

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.localStorage, {
  type: "set",
  key: "key",
  value: "value"
});
```

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.localStorage, {
  type: "set",
  key: "key",
  value: "Thu Jan 16 2020 22:37:19 GMT-0500 (Eastern Standard Time)",
  datatype: "date"
});
```

- session storage

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.sessionStorage, {
  type: "set",
  key: "key",
  value: "value"
});
```

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.sessionStorage, {
  type: "set",
  key: "key",
  value: "{}",
  datatype: "object"
});
```

###### Remove a value

The message type `remove` will remove a value in the storage that is identified by the key. If the key provided is not found in the storage, it will just return with no action performed.

- local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "remove",
  key: "key"
});
```

- session storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "remove",
  key: "key"
});
```

###### Clear all values

The message type `clear` will remove all value in the storage. If the storage is empty, it will just return with no action performed. This action will also remove all values in the storage that is not set using `@unwall/web-storage`

- local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "clear"
});
```

- session storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "clear"
});
```

## Design

The <a href="https://www.w3.org/TR/webstorage/">W3C</a> Web Storage recommendation document declares the Storage interface which is implemented as an attribute of the SessionStorage and LocalStorage.

```
interface Storage {
  readonly attribute unsigned long length;
  DOMString? key(unsigned long index);
  getter DOMString? getItem(DOMString key);
  setter void setItem(DOMString key, DOMString value);
  deleter void removeItem(DOMString key);
  void clear();
};
```

### Common code extraction

storageReducer uses the common interface implemented `localStorage` or `sessionStorage` to use the same code implementation to handle both storage types. This is done with its signature `storageReducer(state, message)` that allows the consumer to pass in the based on application requirements using the same API to manipulate different storage types.

### Type conversion

The same W3C Storage Interface defines the value returned by getItem to be a DOMString and the value accepted by setItem to be a DOMString. This requires any consuming code to convert between the underlying type of the value and string. By default calls to setItem will call the toString of the supplied value before storage. This might cause the following issues

- `null`, `undefined`: throwing exceptions
- `new Date()`: losing accuracy of the value
- `{ a: "test" }` or `["a", 10, bool]`: storing the wrong value

<img alt="Calling toString on Javascript types" src="https://raw.githubusercontent.com/unwall-io/web-storage/master/src/storageReducer/toString.png" />

#### setItem

storageReducer handles type conversion via the use of the `datatype` property in the message (Recommended) or it will attempt to inspect the type of the value provided to guess the correct conversion method to use. Based on the datatype, storageReducer will perform the conversion to string using `toString`, `toISOString` or `JSON.stringify`. This is chosen over just using `JSON.stringify` on all values as `JSON.stringify` does not handle `BigInt` and `Date` values properly when converting the string back to the original type.

#### getItem

storageReducer handles type conversion via the use of the `datatype` property in the message or it will return the string retrieved from the store. Based on the datatype, storageReducer will perform the conversion to type using buildin functions (`Number, BigInt`), object contructors (`new Date()`)`toISOString` or `JSON.parse`. This is chosen over just using `JSON.parse` on all values as `JSON.parse` does not handle `BigInt` and `Date` values properly when converting the string back to the original type.
