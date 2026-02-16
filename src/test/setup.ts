import '@testing-library/jest-dom';

// Mock ResizeObserver for jsdom environment
globalThis.ResizeObserver = class ResizeObserver {
    observe() {
        // Mock implementation
    }
    unobserve() {
        // Mock implementation
    }
    disconnect() {
        // Mock implementation
    }
} as unknown as typeof ResizeObserver;
