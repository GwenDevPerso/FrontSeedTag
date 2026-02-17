import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {CannonList} from "../cannon/cannon-list";
import {RadarChart} from "../radar/radar";
import {RadarScanOverlay} from "../scan/scan";
import {useState} from "react";
import type {AttackResponsePayload, Coordinates, ScanPoint} from "../../types/attack.types";
import {DestructionEffect} from "../destruction-effect";
import {CreateScanPointForm} from "../forms/point/create-scanpoint-form";
import {AttackForm} from "../forms/attack/attack-form";

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
                <CardTitle className="text-neon">Dashboard</CardTitle>
            </CardHeader>
            {attackError !== null && (
                <p data-testid="attack-error" className="mx-auto text-sm text-destructive glow-red bg-transparent rounded-md p-2 max-w-[400px] text-center">{attackError}</p>
            )}
            <CardContent className="flex flex-col gap-4 items-center justify-center">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-around w-full">
                    <CannonList />

                    <AttackForm
                        scanPoints={scanPoints}
                        onAttackSuccess={handleAttackSuccess}
                        onAttackError={handleAttackError}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mt-10">
                    <div className="radar-container w-full max-w-[400px] h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden relative rounded-full bg-black border-2 border-neon glow-neon mx-auto">
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