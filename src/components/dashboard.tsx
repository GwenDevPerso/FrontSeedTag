import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {CannonList} from "./cannon/cannon-list";
import {RadarChart} from "./radar";
import {RadarScanOverlay} from "./scan";
import {useState} from "react";
import type {AttackResponsePayload, Coordinates, ScanPoint} from "../types/attack.types";
import {DestructionEffect} from "./destruction-effect";
import {CreateScanPointForm} from "./create-scanpoint-form";
import {AttackForm} from "./attack-form";

const DESTROY_DELAY_MS = 800;

export const Dashboard = () => {
    const [scanPoints, setScanPoints] = useState<ScanPoint[]>([]);
    const [destroyedTarget, setDestroyedTarget] = useState<Coordinates | null>(null);
    const [attackError, setAttackError] = useState<string | null>(null);

    const handleAttackSuccess = (data: AttackResponsePayload) => {
        setAttackError(null);
        const target = data.target;
        setDestroyedTarget(target);
        setTimeout(() => {
            setScanPoints((prev) =>
                prev.filter(
                    (p) => p.coordinates.x !== target.x || p.coordinates.y !== target.y
                )
            );
            setDestroyedTarget(null);
        }, DESTROY_DELAY_MS);
    };

    const handleAttackError = (error: Error) => {
        setAttackError(error.message);
    };



    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center justify-center">
                <CannonList />
                <div className="grid grid-cols-2 w-full gap-4">
                    <div className="radar-container w-[400px] h-[400px] overflow-hidden relative rounded-full bg-black border-2 border-green-500">
                        <RadarChart coordinates={scanPoints.map(point => point.coordinates)} />
                        <RadarScanOverlay />
                        {destroyedTarget !== null && (
                            <DestructionEffect
                                target={destroyedTarget}
                                onComplete={() => setDestroyedTarget(null)}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <CreateScanPointForm
                            onAddScanPoint={(point) => setScanPoints((prev) => [...prev, point])}
                        />
                        <AttackForm
                            scanPoints={scanPoints}
                            onAttackSuccess={handleAttackSuccess}
                            onAttackError={handleAttackError}
                        />
                        {attackError !== null && (
                            <p className="text-sm text-destructive">{attackError}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};