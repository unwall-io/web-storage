const localStorageReducer = (state, action) => {
  switch (action.type) {
    case "clear": {
      state.clear();
      break;
    }
    case "get": {
      return state.getItem(action.key);
    }
    case "remove": {
      state.removeItem(action.key);
      break;
    }
    case "set": {
      state.setItem(action.key, action.value);
      break;
    }
    default: {
      throw new Error(`Unsupported type: ${action.type}`);
    }
  }
};

export default localStorageReducer;
