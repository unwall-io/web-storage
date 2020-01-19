<a href="https://github.com/unwall-io/web-storage" target="__blank"><img alt="web-storage" src="https://raw.githubusercontent.com/unwall-io/web-storage/master/logo.png" width="100" /></a>

# web-storage: storageReducer

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

The storageReducer takes advantage of this implementation with its signature `storageReducer(state, message)`. This allows the consumer to pass in the `localStorage` or `sessionStorage` based on application requirements using the same API to manipulate different storage types.

The other observation is that the interface declares the value returned by getItem to be a DOMString and the value accepted by setItem to be a DOMString. And based on the testing performed on the following browsers, the setItem calls the toString of the supplied value before storage. The storageReducer uses `JSON.parse` and `JSON.stringify` to transform the value before storage. This allows the consumer to maintain the data type of the value during both storage and retrieval. This means that a value that was stored as an object will keep it's type during retrieval.

1. Chrome - 79.0.3945.88
2. Firefox - 72.0.1
3. Safari - 13.0.4

## Usage

### Message options

| Property   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | Indicates the type of operation to be performed **_*(Required)*_** <br /> Supports :<ul><li>get</li><li>set</li><li>remove</li><li>clear</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `key`      | String value indicating the identifier of the value in the storage to be manipulated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `value`    | Represents the value that is stored in the storage. localStorageReducer transforms the value when retrieving and storing in the storage. The transformation applied depends on the supplied `type`, `datatype` or `value`. <br /> Supports javascript datatypes <ul><li>number</li><li>string</li><li>boolean</li><li>date</li><li>object</li><li>array</li></ul><br /> Unsupported javascript datatypes <ul><li>function</li><li>undefined</li><li>null</li><li>NaN</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `datatype` | Type of the value to be manipulated. Used by `type`: `get` or `type`: `set` to convert between string values and typed values. If value is not supplied the datatype will default to `string` for `type`: `get` and for `type`: `set` the type will be best guess using javascripts' `typeof` and `instanceof` commands. The following are the accepted values: <ul><li>string<br />- transform for set: (value) => value.toString()<br />- transform for get: NA</li><li>boolean<br />- transform for set: (value) => value.toString()<br />- transform for get: transform for get: (value) => value === "true"</li> <li>date<br />- transform for set: (value) => value.toISOString()<br />- transform for get: value => new Date(value)</li><li>number<br />- transform for set: (value) => value.toString()<br />- transform for get: (value) => Number(value)</li><li>array<br />- transform for set: (value) => JSON.stringify(value)<br />- transform for get: (value) => JSON.parse(value)</li><li>object<br />- transform for set: (value) => JSON.stringify(value)<br />- transform for get: (value) => JSON.parse(value)</li></ul> |

#### Example usage

##### Get a value

The message type `get` will retrieve a value from the storage that is identified by the key. It returns null if the key is not found. This message type will perform conversion from the underlying storage type which is a `string` to the type defined in the message `datatype` property. By default, the datatype is set to `string` which will return the value from the storage without conversion. The consumer needs to handle errors if the requested datatype does not match the value stored.

###### local storage

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

###### session storage

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

##### Set a value

The message type `set` will set a value in the storage that is identified by the key. This message type will perform conversion from the type defined in the message `datatype` property to the underlying storage type which is a `string`. If not supplied the datatype will be obtained from the value using `typeof value`. The consumer needs to handle errors if the requested datatype does not match the value stored. Setting the value of an existing `key` in the storage will override the existing value.

###### local storage

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

###### session storage

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

##### Remove a value

The message type `remove` will remove a value in the storage that is identified by the key. If the key provided is not found in the storage, it will just return with no action performed.

###### local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "remove",
  key: "key"
});
```

###### session storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "remove",
  key: "key"
});
```

##### Clear all values

The message type `clear` will remove all value in the storage. If the storage is empty, it will just return with no action performed. This action will also remove all values in the storage that is not set using `@unwall/web-storage`

###### local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "clear"
});
```

###### session storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.sessionStorage, {
  type: "clear"
});
```
