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

    it("should allow state.setItem with no datatype for string", () => {
      const key = "testKey";
      const value = "10.0";
      const expectedKey = key;
      const expectedValue = value.toString();

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

    it("should allow state.setItem with datatype string for string", () => {
      const key = "testKey";
      const value = "10.0";
      const datatype = "string";
      const expectedKey = key;
      const expectedValue = value.toString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for boolean", () => {
      const key = "testKey";
      const value = true;
      const expectedKey = key;
      const expectedValue = value.toString();

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

    it("should allow state.setItem with datatype number for boolean", () => {
      const key = "testKey";
      const value = true;
      const datatype = "boolean";
      const expectedKey = key;
      const expectedValue = value.toString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for bigint", () => {
      const key = "testKey";
      const value = 9007199254740992n;
      const expectedKey = key;
      const expectedValue = value.toString();

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

    it("should allow state.setItem with datatype bigint for bigint", () => {
      const key = "testKey";
      const value = BigInt(Number.MAX_SAFE_INTEGER + 1);
      const datatype = "number";
      const expectedKey = key;
      const expectedValue = value.toString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for integer", () => {
      const key = "testKey";
      const value = 10;
      const expectedKey = key;
      const expectedValue = value.toString();

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

    it("should allow state.setItem with datatype number for integer", () => {
      const key = "testKey";
      const value = 10;
      const datatype = "number";
      const expectedKey = key;
      const expectedValue = value.toString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for decimal", () => {
      const key = "testKey";
      const value = 10.0;
      const expectedKey = key;
      const expectedValue = value.toString();

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

    it("should allow state.setItem with datatype number for decimal", () => {
      const key = "testKey";
      const value = 10.0;
      const datatype = "number";
      const expectedKey = key;
      const expectedValue = value.toString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for date", () => {
      const key = "testKey";
      const value = new Date();
      const expectedKey = key;
      const expectedValue = value.toISOString();

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

    it("should allow state.setItem with datatype date for date", () => {
      const key = "testKey";
      const value = new Date();
      const datatype = "date";
      const expectedKey = key;
      const expectedValue = value.toISOString();

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for object", () => {
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

    it("should allow state.setItem with datatype object for object", () => {
      const key = "testKey";
      const value = { a: 10.0 };
      const datatype = "object";
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for array", () => {
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

    it("should allow state.setItem with datatype array for array", () => {
      const key = "testKey";
      const value = [10.0, "a"];
      const datatype = "array";
      const expectedKey = key;
      const expectedValue = JSON.stringify(value);

      const action = { type: "set", key, value, datatype };

      reducer(storage, action);

      expect(storage.setItem).toHaveBeenCalledTimes(1);
      expect(storage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(storage.__STORE__[expectedKey]).toEqual(expectedValue);
      expect(Object.keys(storage.__STORE__).length).toEqual(1);
    });

    it("should allow state.setItem with no datatype for null", () => {
      const key = "testKey";
      const value = null;
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

    it("should allow state.setItem with no datatype for null", () => {
      const key = "testKey";
      const value = null;
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

    it("should error out on state.setItem with value as undefined", () => {
      const key = "testKey";
      const value = undefined;

      const action = { type: "set", key, value };

      expect(() => reducer(storage, action)).toThrowError(
        `setItem does not support value: ${value}`
      );
    });

    it("should error out on state.setItem with value as function", () => {
      const key = "testKey";
      const value = function() {};

      const action = { type: "set", key, value };

      expect(() => reducer(storage, action)).toThrowError(
        `setItem does not support value: ${value}`
      );
    });

    describe.each([undefined, null, "", "  ", NaN, "invalid", "symbol"])(
      "setItem invalid datatypes",
      datatype => {
        beforeEach(() => initializeStorage(storage));

        it(`should error out for invalid datatype "${datatype}"`, () => {
          const action = {
            type: "set",
            key: "testkey",
            value: "testvalue",
            datatype
          };
          expect(() => reducer(storage, action)).toThrowError(
            new Error(`setItem does support datatype: ${datatype}`)
          );
        });
      }
    );

    it("should return boolean value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = "true";
      const expectedValue = "true";
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return boolean value as boolean for state.getItem with datatype boolean", () => {
      const key = "testKey";
      const value = "true";
      const datatype = "boolean";
      const expectedValue = true;
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return date value as string for state.getItem with no datatype", () => {
      const date = new Date();
      const key = "testKey";
      const value = date.toISOString();
      const expectedValue = date.toISOString();
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return date value as date for state.getItem with datatype date", () => {
      const date = new Date();
      const key = "testKey";
      const value = date.toISOString();
      const datatype = "date";
      const expectedValue = date;
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return bigint value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = BigInt(Number.MAX_SAFE_INTEGER + 1).toString();
      const expectedValue = value;
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return integer value as number for state.getItem with datatype bigint", () => {
      const key = "testKey";
      const value = BigInt(Number.MAX_SAFE_INTEGER + 1);
      const datatype = "bigint";
      const expectedValue = value;
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);
      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return integer value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = "10";
      const expectedValue = "10";
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return integer value as number for state.getItem with datatype number", () => {
      const key = "testKey";
      const value = "10";
      const datatype = "number";
      const expectedValue = 10;
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return decimal value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = "10.0";
      const expectedValue = "10.0";
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return decimal value as number for state.getItem with datatype number", () => {
      const key = "testKey";
      const value = "10.0";
      const datatype = "number";
      const expectedValue = 10.0;
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return string value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = "10.0";
      const expectedValue = "10.0";
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return string value as string for state.getItem with datatype string", () => {
      const key = "testKey";
      const value = "10.0";
      const datatype = "string";
      const expectedValue = "10.0";
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return array value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = JSON.stringify(["10.0", 10, 10.0]);
      const expectedValue = JSON.stringify(["10.0", 10, 10.0]);
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return array value as array for state.getItem with datatype array", () => {
      const key = "testKey";
      const value = JSON.stringify(["10.0", 10, 10.0]);
      const datatype = "array";
      const expectedValue = ["10.0", 10, 10.0];
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return object value as string for state.getItem with no datatype", () => {
      const key = "testKey";
      const value = JSON.stringify({ a: "10.0" });
      const expectedValue = JSON.stringify({ a: "10.0" });
      const action = { type: "get", key };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    it("should return object value as object for state.getItem with datatype object", () => {
      const key = "testKey";
      const value = JSON.stringify({ a: "10.0" });
      const datatype = "object";
      const expectedValue = { a: "10.0" };
      const action = { type: "get", key, datatype };
      storage.getItem.mockReturnValueOnce(value);

      const actualValue = reducer(storage, action);

      expect(storage.getItem).toHaveBeenCalledTimes(1);
      expect(storage.getItem).toHaveBeenLastCalledWith(key);
      expect(actualValue).toEqual(expectedValue);
    });

    describe.each([undefined, null, "", "  ", NaN, "invalid", "symbol"])(
      "getItem invalid datatypes",
      datatype => {
        beforeEach(() => initializeStorage(storage));

        it(`should error out for invalid datatype "${datatype}"`, () => {
          const action = {
            type: "get",
            key: "testkey",
            datatype
          };
          expect(() => reducer(storage, action)).toThrowError(
            new Error(`getItem does support datatype: ${datatype}`)
          );
        });
      }
    );

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
