import { act, renderHook } from "@testing-library/react-hooks";

import useForm from "./hook";

test("should change keyword", () => {
    const {result} = renderHook(() => useForm());

    act(() => {
        result.current.updateKeyword('matrix');
    });

    expect(result.current.keyword).toBe('matrix');
});

test("should use initial values", () => {
    const {result} = renderHook(() => useForm({
        initialKeyword: 'matrix',
    }));

    expect(result.current.keyword).toBe('matrix');
});

test("should change rating", () => {
    const {result} = renderHook(() => useForm());

    act(() => {
        result.current.updateRating(5);
    });

    expect(result.current.rating).toBe(5);
});

test("should change times", () => {
    const {result} = renderHook(() => useForm());

    act(() => {
        result.current.updateKeyword('m');
    });

    expect(result.current.times).toBe(1);
});

test("should change keyword and times", () => {
    const {result} = renderHook(() => useForm());

    act(() => {
        result.current.updateKeyword('m');
        result.current.updateKeyword('ma');
    });

    expect(result.current.keyword).toBe('ma');
    expect(result.current.times).toBe(2);
});
