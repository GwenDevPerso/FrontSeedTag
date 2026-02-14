import {useCannonStatus} from "@/hooks/useCannonStatus";
import {Cannon} from "./cannon";

export const CanonList = () => {
    const {isConnected, cannons} = useCannonStatus();

    // if (error) {
    //     return (
    //         <div className="text-red-500 text-sm">
    //             Error: {error}
    //         </div>
    //     );
    // }

    if (!isConnected) {
        return (
            <div className="text-yellow-500 text-sm">
                Connecting to WebSocket...
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-4 items-center justify-center">

            {cannons.map((cannon) => (
                <Cannon
                    key={cannon.generation}
                    name={`Canon ${cannon.generation}`}
                    generation={cannon.generation}
                    status={cannon.available ? "Available" : "Unavailable"}
                />
            ))}
        </div>
    );
};