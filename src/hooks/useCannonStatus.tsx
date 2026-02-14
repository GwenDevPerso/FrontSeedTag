import useWebSocket, {ReadyState} from "react-use-websocket";
import {useMemo} from "react";
import type {CannonsStatusResponse, CannonStatus} from "@/types/cannon";


export function useCannonStatus() {
    const {lastJsonMessage, readyState} = useWebSocket(
        "ws://localhost:3000/cannons/status",
        {
            shouldReconnect: () => true,
            reconnectInterval: 5000,
            share: true, // important si plusieurs composants écoutent
        }
    );

    const cannons = useMemo<CannonStatus[]>(() => {
        if (!lastJsonMessage) return [];

        try {
            const event = lastJsonMessage as CannonsStatusResponse;

            // Vérifier que la structure est correcte
            if (event && Array.isArray(event.cannons)) {
                console.log("Last JSON message", event.cannons);
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
