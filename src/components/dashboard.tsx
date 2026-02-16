import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {CannonList} from "./cannon/cannon-list";
import {RadarChart} from "./radar";
import {RadarScanOverlay} from "./scan";
import {useState} from "react";
import type {AttackResponsePayload, Coordinates, ScanPoint} from "../types/attack.types";
import {DestructionEffect} from "./destruction-effect";
import {CreateScanPointForm} from "./forms/create-scanpoint-form";
import {AttackForm} from "./forms/attack-form";

export const Dashboard = () => {
    const [scanPoints, setScanPoints] = useState<ScanPoint[]>([]);
    const [destroyedTarget, setDestroyedTarget] = useState<Coordinates | null>(null);
    const [attackError, setAttackError] = useState<string | null>(null);

    const handleAttackSuccess = (data: AttackResponsePayload) => {
        setAttackError(null);
        const target = data.target;
        setDestroyedTarget(target);
        setScanPoints((prev) =>
            prev.filter(
                (p) => p.coordinates.x !== target.x || p.coordinates.y !== target.y
            )
        );
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
                <div className="flex flex-row gap-4 items-center justify-center">
                    <CannonList />
                    <AttackForm
                        scanPoints={scanPoints}
                        onAttackSuccess={handleAttackSuccess}
                        onAttackError={handleAttackError}
                    />
                    {attackError !== null && (
                        <p className="text-sm text-destructive">{attackError}</p>
                    )}
                </div>
                <div className="grid grid-cols-2 w-full gap-4 mt-10">
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

                    <CreateScanPointForm
                        onAddScanPoint={(point) => setScanPoints((prev) => [...prev, point])}
                    />
                </div>
            </CardContent>
        </Card>
    );
};