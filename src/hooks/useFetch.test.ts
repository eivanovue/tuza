import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import useFetch from "./useFetch";

jest.mock("axios");

describe("useFetch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data from API", async () => {
    const mockData = { id: 1, name: "Test" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetch("/api/data"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBe(null);
      },
      { timeout: 1500 }
    );
  });

  it("handles API error", async () => {
    const errorMessage = "Request failed";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFetch("/api/data"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error?.message).toBe(errorMessage);
      },
      { timeout: 1500 }
    );
  });

  it("refetches data", async () => {
    const mockData = { id: 1, name: "Test" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetch("/api/data"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBe(null);
      },
      { timeout: 1500 }
    );

    // Mock a different response for refetch
    const updatedMockData = { id: 2, name: "Updated Test" };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: updatedMockData });

    // Simulate refetch
    await act(async () => {
      result.current.refetch();
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(updatedMockData);
        expect(result.current.error).toBe(null);
      },
      { timeout: 1500 }
    );
  });
});
