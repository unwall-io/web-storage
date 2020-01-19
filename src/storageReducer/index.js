const getItem = (state, action) => {
  const { key, datatype } = action;
  const value = state.getItem(key);
  switch (datatype) {
    case "boolean": {
      return Boolean(value);
    }
    case "date": {
      return new Date(value);
    }
    case "number": {
      return Number(value);
    }
    case "array":
    case "object": {
      return JSON.parse(value);
    }
  }
  return value;
};

const setItem = (state, action) => {
  const { key, value } = action;
  let { datatype } = action;
  if (!("datatype" in action)) {
    // when data type is not provided use value inspection to determine the datatype.
    let type = typeof value;
    if (type === "undefined" || type == "function" || value === null) {
      throw new Error(`setItem does not support value: ${value}`);
    }

    if (type === "object") {
      if (value instanceof Array) {
        type = "array";
      } else if (value instanceof Date) {
        type = "date";
      }
    }
    datatype = type;
  }

  switch (datatype) {
    case "boolean":
    case "number":
    case "string": {
      state.setItem(key, value.toString());
      break;
    }
    case "date": {
      state.setItem(key, value.toISOString());
      break;
    }
    case "array":
    case "object": {
      state.setItem(key, JSON.stringify(value));
      break;
    }
    default: {
      throw new Error(`setItem does support datatype: ${datatype}`);
    }
  }
};

const storageReducer = (state, action) => {
  switch (action.type) {
    case "clear": {
      state.clear();
      break;
    }
    case "get": {
      return getItem(state, action);
    }
    case "remove": {
      state.removeItem(action.key);
      break;
    }
    case "set": {
      setItem(state, action);
      break;
    }
    default: {
      throw new Error(`Unsupported type: ${action.type}`);
    }
  }
};

export default storageReducer;
