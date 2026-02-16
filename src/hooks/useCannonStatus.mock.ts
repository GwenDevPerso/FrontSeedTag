import {ReadyState} from "react-use-websocket";
import {vi} from "vitest";

export const mockUseWebSocket = {
    lastJsonMessage: null,
    readyState: ReadyState.CLOSED,
    sendMessage: vi.fn(),
    sendJsonMessage: vi.fn(),
    lastMessage: null,
    getWebSocket: vi.fn(),
};