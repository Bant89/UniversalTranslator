const translator = require("./index");

test("With 4 correct input values", () => {
  expect(
    translator.translate(
      [
        ["105", "C", "K"],
        ["68", "C", "F"],
        ["90", "F", "C"],
        ["100", "K", "F"]
      ],
      "",
      true
    )
  ).toStrictEqual([
    ["105", "C", "K", 378.15],
    ["68", "C", "F", 154.4],
    ["90", "F", "C", 32.22],
    ["100", "K", "F", -359.67]
  ]);
});

test("With 9 correct input values", () => {
  expect(
    translator.translate(
      [
        ["10", "C", "K"],
        ["30", "C", "F"],
        ["60", "F", "C"],
        ["90", "K", "F"],
        ["50", "K", "C"],
        ["150", "F", "C"],
        ["80", "C", "F"],
        ["101", "F", "K"],
        ["100", "C", "C"]
      ],
      "",
      true
    )
  ).toStrictEqual([
    ["10", "C", "K", 283.15],
    ["30", "C", "F", 86],
    ["60", "F", "C", 15.56],
    ["90", "K", "F", -369.67],
    ["50", "K", "C", -223.15],
    ["150", "F", "C", 65.56],
    ["80", "C", "F", 176],
    ["101", "F", "K", 311.48],
    ["100", "C", "C", 100]
  ]);
});

test("With invalid temperature system", () => {
  expect(() => {
    translator.translate(
      [["10", "C", "K"], ["30", "C", "F"], ["40", "Q", "Z"]],
      "",
      true
    );
  }).toThrow();
});

test("With empty input", () => {
  expect(() => {
    translator.translate([], "", true);
  }).toThrow();
});

test("With negative correct input values", () => {
  expect(
    translator.translate(
      [["-40", "C", "K"], ["-25", "C", "F"], ["-70", "F", "C"]],
      "",
      true
    )
  ).toStrictEqual([
    ["-40", "C", "K", 233.15],
    ["-25", "C", "F", -13],
    ["-70", "F", "C", -56.67]
  ]);
});
