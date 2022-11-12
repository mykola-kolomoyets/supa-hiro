import { formatDate, isValidDate, or } from "@utils/functions";

describe("functions", () => {
  describe("or", () => {
    it("accepts empty array", () => {
      const args: boolean[] = [];

      expect(or(...args)).toBe(false);
    });

    it("all true -> true", () => {
      const args = [true, true, true];

      expect(or(...args)).toBe(true);
    });

    it("minimum 1 true -> true", () => {
      const args = [true, false, false];

      expect(or(...args)).toBe(true);
    });

    it("all false -> false", () => {
      const args = [false, false, false];

      expect(or(...args)).toBe(false);
    });
  });

  describe("isValidDate", () => {
    it("ISO date string -> true", () => {
      expect(isValidDate(new Date().toISOString())).toBe(true);
    });

    it("date object -> true", () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    it("number -> false", () => {
      expect(isValidDate(123)).toBe(false);
    });

    it("invalid string -> false", () => {
      expect(isValidDate("hello world")).toBe(false);
    });
  });

  describe("formatDate", () => {
    it("ISO date string -> dd-mm-yyyy date", () => {
      expect(formatDate(new Date(1995, 6, 2).toISOString())).toEqual(
        "02-07-1995"
      );
    });

    it("date object -> dd-mm-yyyy date", () => {
      expect(formatDate(new Date(1995, 6, 2))).toEqual("02-07-1995");
    });

    it("invalid string -> N/A", () => {
      expect(formatDate("Hello world")).toEqual("N/A");
    });
  });
});
