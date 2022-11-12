import { formatDate, getPagination, isValidDate, or } from "@utils/functions";

describe("functions", () => {
  describe("getPagination", () => {
    it("with page:1, limit:10 -> {from: 0, to: 10}", () => {
      const page = 1;
      const limit = 10;

      const { from, to } = getPagination(page, limit);

      expect(from).toEqual(0);
      expect(to).toEqual(10);
    });

    it("with page:2, limit:10 -> {from: 10, to: 20}", () => {
      const page = 2;
      const limit = 10;

      const { from, to } = getPagination(page, limit);

      expect(from).toEqual(10);
      expect(to).toEqual(20);
    });
  });

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
