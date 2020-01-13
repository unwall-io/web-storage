const getItem = (state, action) => {
  const value = state.getItem(action.key);
  return JSON.parse(value);
};

const setItem = (state, action) => {
  const { key, value } = action;
  const type = typeof value;
  switch (type) {
    case "function":
    case "undefined": {
      throw new Error(
        "setItem does not accept values of type undefined or function"
      );
    }
    default:
      state.setItem(key, JSON.stringify(value));
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
