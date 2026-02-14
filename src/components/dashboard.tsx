import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {CanonList} from "./cannon/cannon-list";
import {Radar} from "./radar";

export const Dashboard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CanonList />
                <Radar />
            </CardContent>
        </Card>
    );
};