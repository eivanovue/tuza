import groupDataByProperty from "./groupDataByProperty";

describe("groupDataByProperty", () => {
  const testData = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
    { id: 4, name: "Alice", age: 40 },
    { id: 5, name: "John", age: 45 },
  ];

  it("should group data by property correctly", () => {
    const groupedData = groupDataByProperty(testData, "name");
    expect(Object.keys(groupedData)).toEqual(["John", "Alice", "Bob"]);
    expect(groupedData["John"]).toEqual([
      { id: 1, name: "John", age: 30 },
      { id: 5, name: "John", age: 45 },
    ]);
    expect(groupedData["Alice"]).toEqual([
      { id: 2, name: "Alice", age: 25 },
      { id: 4, name: "Alice", age: 40 },
    ]);
    expect(groupedData["Bob"]).toEqual([{ id: 3, name: "Bob", age: 35 }]);
  });

  it("should return an empty object for empty data", () => {
    const groupedData = groupDataByProperty([], "name");
    expect(groupedData).toEqual({});
  });

  it("should handle missing property in some items", () => {
    const testDataWithMissingProperty = [
      { id: 1, name: "John", age: 30 },
      { id: 2, age: 25 },
      { id: 3, name: "Bob", age: 35 },
    ];
    const groupedData = groupDataByProperty(
      testDataWithMissingProperty,
      "name"
    );
    expect(Object.keys(groupedData)).toEqual(["John", "Bob"]);
    expect(groupedData["John"]).toEqual([{ id: 1, name: "John", age: 30 }]);
    expect(groupedData["Bob"]).toEqual([{ id: 3, name: "Bob", age: 35 }]);
  });
});
