import {useCannonStatus} from "@/hooks/useCannonStatus";
import {Cannon} from "./cannon";

export const CannonList = () => {
    const {isConnected, cannons, error} = useCannonStatus();

    if (error) {
        return (
            <div className="text-red-500 text-sm glow-red">
                {error}
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="bg-transparent rounded-md p-2 text-yellow-500 text-sm glow-neon">
                Connecting to WebSocket...
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            {cannons.map((cannon) => (
                <Cannon
                    key={cannon.generation}
                    name={`Cannon ${cannon.generation}`}
                    generation={cannon.generation}
                    status={cannon.available ? "Available" : "Unavailable"}
                />
            ))}
        </div>
    );
};