import useWebSocket, {ReadyState} from "react-use-websocket";
import {useMemo} from "react";
import type {CannonsStatusResponse, CannonStatus} from "@/types/cannon.types";
import {getCannonsStatusWsUrl} from "@/lib/config";

export function useCannonStatus() {
    const {lastJsonMessage, readyState} = useWebSocket(
        getCannonsStatusWsUrl(),
        {
            shouldReconnect: () => true,
            reconnectInterval: 5000,
            share: true,
        }
    );

    const cannons = useMemo<CannonStatus[]>(() => {
        if (!lastJsonMessage) return [];

        try {
            const event = lastJsonMessage as CannonsStatusResponse;

            if (event && Array.isArray(event.cannons)) {
                return event.cannons;
            }

            console.warn("Invalid WebSocket message structure:", event);
            throw new Error("Invalid WebSocket message structure");
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
            throw new Error("Error parsing WebSocket message");
        }
    }, [lastJsonMessage]);


    return {
        isConnected: readyState === ReadyState.OPEN,
        cannons,
    };
}
