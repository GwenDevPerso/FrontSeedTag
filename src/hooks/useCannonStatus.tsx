import useWebSocket, {ReadyState} from "react-use-websocket";
import {useMemo} from "react";
import type {CannonsStatusResponse} from "@/types/cannon.types";
import {getCannonsStatusWsUrl} from "@/lib/config";

export function useCannonStatus() {

    const {lastJsonMessage, readyState, } = useWebSocket(
        getCannonsStatusWsUrl(),
        {
            shouldReconnect: () => true,
            reconnectInterval: 5000,
            share: true,
        }
    );

    const {cannons, error} = useMemo(() => {
        if (!lastJsonMessage) {
            return {cannons: [], error: null};
        }

        try {
            const event = lastJsonMessage as CannonsStatusResponse;

            if (event && Array.isArray(event.cannons)) {
                return {cannons: event.cannons, error: null};
            }

            const errorMsg = `Invalid WebSocket message structure: ${JSON.stringify(event)}`;
            console.error(errorMsg);
            return {cannons: [], error: errorMsg};
        } catch (err) {
            const errorMsg = `Error parsing WebSocket message: ${err}`;
            console.error(errorMsg);
            return {cannons: [], error: errorMsg};
        }
    }, [lastJsonMessage]);


    return {
        isConnected: readyState === ReadyState.OPEN,
        cannons,
        error
    };
}
