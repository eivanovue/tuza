import calculateCountdown from "./calculateCountdown";

const NOW = 1638381600000; // January 1, 2022, 12:00:00 UTC

jest.useFakeTimers(undefined);
jest.setSystemTime(new Date(NOW));

describe("calculateCountdown function", () => {
  it("should return 'Due' when the remaining minutes are 0", () => {
    const result = calculateCountdown("2022-01-01T12:00:00");
    expect(result).toBe("Due");
  });

  it("should return the remaining minutes when there are minutes remaining", () => {
    const result = calculateCountdown("2022-01-01T12:30:00");
    expect(result).toBe("30 min");
  });

  it("should return the remaining minutes when there are days, hours, and minutes remaining", () => {
    const result = calculateCountdown("2022-01-03T14:45:00");
    expect(result).toBe("45 min");
  });

  it("should throw an error for an invalid date format", () => {
    expect(() => {
      calculateCountdown("invalid-date");
    }).toThrow("Invalid date format");
  });
});
