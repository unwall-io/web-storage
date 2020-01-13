import reducer from ".";

const initializeStorage = storage => {
  // values stored in tests will also be available in other tests unless you run
  storage.clear();
  jest.clearAllMocks();
};

describe.each([
  { name: "localStorage", storage: localStorage },
  { name: "sessionStorage", storage: sessionStorage }
])("Storage", ({ name, storage }) => {
  describe(`${name}`, () => {
    beforeEach(() => initializeStorage(storage));

    it("should allow state.setItem with integer", () => {
      const key = "testKey";
      const value = 10;
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with decimal", () => {
      const key = "testKey";
      const value = 10.0;
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with string", () => {
      const key = "testKey";
      const value = "10.0";
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with object", () => {
      const key = "testKey";
      const value = { a: 10.0 };
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with array", () => {
      const key = "testKey";
      const value = [10.0, "a"];
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with null", () => {
      const key = "testKey";
      const value = null;
      const expectedKey = `${key}`;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should error out on state.setItem with undefined", () => {
      const key = "testKey";
      const value = undefined;

      const action = { type: "set", key, value };

      expect(() => reducer(storage, action)).toThrowError(
        "setItem does not accept values of type undefined or function"
      );
    });

    it("should error out on state.setItem with function", () => {
      const key = "testKey";
      const value = function() {};

      const action = { type: "set", key, value };

      expect(() => reducer(storage, action)).toThrowError(
        "setItem does not accept values of type undefined or function"
      );
    });

    it("should return integer value for state.getItem", () => {
      const key = "testKey";
      const expectedKey = key;
      const expectedValue = 10;
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(JSON.stringify(expectedValue));

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return decimal value for state.getItem", () => {
      const key = "testKey";
      const expectedKey = key;
      const expectedValue = 10.0;
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(JSON.stringify(expectedValue));

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return string value for state.getItem", () => {
      const key = "testKey";
      const expectedKey = key;
      const expectedValue = "10.0";
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(JSON.stringify(expectedValue));

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return object value for state.getItem", () => {
      const key = "testKey";
      const expectedKey = key;
      const expectedValue = { a: "10.0" };
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(JSON.stringify(expectedValue));

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return array value for state.getItem", () => {
      const key = "testKey";
      const expectedKey = key;
      const expectedValue = ["10.0", 10, 10.0];
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(JSON.stringify(expectedValue));

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should call state.clear", () => {
      storage.__STORE__["keyToRemove1"] = "data 1 to be cleared";
      storage.__STORE__["keyToRemove2"] = "data 2 to be cleared";
      const action = { type: "clear" };

      reducer(storage, action);
      expect(storage.clear).toHaveBeenCalledTimes(1);
      expect(Object.keys(storage.__STORE__).length).toBe(0);
    });

    it("should call state.remove", () => {
      const key = "keyToRemove";
      const expectedKey = key;
      storage.__STORE__[expectedKey] = "data to be cleared";
      storage.__STORE__["keyToRemain"] = "data to remain";
      const action = { type: "remove", key };

      reducer(storage, action);
      expect(storage.removeItem).toHaveBeenCalledTimes(1);
      expect(storage.removeItem).toHaveBeenLastCalledWith(expectedKey);
      expect(Object.keys(storage.__STORE__).length).toBe(1);
    });

    describe.each([undefined, null, "", "  ", "invalid"])(
      "action invalid types",
      type => {
        beforeEach(() => initializeStorage(storage));

        it(`should error out for invalid action type "${type}"`, () => {
          const action = { type };
          expect(() => reducer(storage, action)).toThrowError(
            new Error(`Unsupported type: ${type}`)
          );
        });
      }
    );
  });
});
