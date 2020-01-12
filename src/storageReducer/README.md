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

The other observation is that the interface declares the value returned by getItem to be a DOMString and the value accepted by setItem to be a DOMString. And based on the testing performed on the following browsers, the setItem calls the toString of the supplied value before storage. The storageReducer uses `JSON.parse` and `JSON.stringify` to transform the value before storage. This allows the consumer to maintain the data type of the value during both storage and retrieval. This means that a value that was stored as an object when keep it's type during retrieval.

1. Chrome - 79.0.3945.88
2. Firefox - 72.0.1
3. Safari - 13.0.4

## Usage

### Message options

| Property | Description                                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`   | Indicates the type of operation to be performed **_*(Required)*_** <br /> Supports :<ul><li>get</li><li>set</li><li>remove</li><li>clear</li></ul>                                                                                                                                                                                                                                                 |
| `key`    | String value indicating the identifier of the value in the storage to be manipulated.                                                                                                                                                                                                                                                                                                              |
| `value`  | Represents the value that is stored in the storage. localStorageReducer applies `JSON.stringify` on the value when setting values and `JSON.parse` when getting values. <br /> Supports javascript datatypes <ul><li>number</li><li>string</li><li>boolean</li><li>object</li><li>array</li><li>null</li></ul><br /> Unsupported javascript datatypes <ul><li>function</li><li>undefined</li></ul> |

#### Example usage

##### Get a value

###### local storage

```js
import { storageReducer } from "@unwall/web-storage";

const value = storageReducer(window.localStorage, {
  type: "get",
  key: "key"
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

##### Set a value

###### local storage

```js
import { storageReducer } from "@unwall/web-storage";

storageReducer(window.localStorage, {
  type: "set",
  key: "key",
  value: "value"
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

##### Remove a value

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

#### Implementation Detail

storageReducer uses adds a prefix of `unwall` to the keys when storing or retreving data from the storage types. This is internal to the implementation and is used by localStorageReducer to differentiate between localStorage manipulated outside the module. This lowers the risks of an externally set value causing bugs due to tranformations done by localStorageReducer during the data manipulation process.
