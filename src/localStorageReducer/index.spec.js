import reducer from ".";

const initializeStorage = () => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
  jest.clearAllMocks();
};

describe("localStorageReducer", () => {
  describe("get", () => {
    beforeEach(() => initializeStorage());

    it("should call state.getItem", () => {
      const expectedKey = "testKey";
      const expectedValue = 10;
      const action = { type: "get", key: expectedKey };
      localStorage.getItem.mockReturnValueOnce(expectedValue);

      const actualValue = reducer(localStorage, action);

      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(expectedKey);
      expect(actualValue).toEqual(10);
    });
  });

  describe("set", () => {
    beforeEach(() => initializeStorage());

    it("should call state.setItem", () => {
      const expectedKey = "testKey";
      const expectedValue = 10;
      const action = { type: "set", key: expectedKey, value: expectedValue };

      reducer(localStorage, action);

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        expectedKey,
        expectedValue
      );
      expect(localStorage.__STORE__[expectedKey]).toBe(`${expectedValue}`);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });
  });

  describe("clear", () => {
    beforeEach(() => initializeStorage());

    it("should call state.clear", () => {
      localStorage.__STORE__["keyToRemove1"] = "data 1 to be cleared";
      localStorage.__STORE__["keyToRemove2"] = "data 2 to be cleared";
      const action = { type: "clear" };

      reducer(localStorage, action);
      expect(localStorage.clear).toHaveBeenCalledTimes(1);
      expect(Object.keys(localStorage.__STORE__).length).toBe(0);
    });
  });

  describe("remove", () => {
    beforeEach(() => initializeStorage());

    it("should call state.remove", () => {
      const expectedKeyToRemove = "keyToRemove";
      localStorage.__STORE__["keyToRemove"] = "data to be cleared";
      localStorage.__STORE__["keyToRemain"] = "data to remain";
      const action = { type: "remove", key: expectedKeyToRemove };

      reducer(localStorage, action);
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(localStorage.removeItem).toHaveBeenLastCalledWith(
        expectedKeyToRemove
      );
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });
  });

  describe.each([undefined, null, "", "  ", "invalid"])(
    "invalid types",
    type => {
      beforeEach(() => initializeStorage());

      it("should call throw an error", () => {
        const action = { type };
        expect(() => reducer(localStorage, action)).toThrowError(
          new Error(`Unsupported type: ${type}`)
        );
      });
    }
  );
});
