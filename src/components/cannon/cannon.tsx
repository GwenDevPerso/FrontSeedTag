import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Badge} from "../ui/badge";
import {Circle} from "lucide-react";

export const Cannon = ({
    name,
    generation,
    status,
}: {
    name: string;
    generation: number;
    status: string;
}) => {
    const isAvailable = status === "Available";

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-neon">{name}</CardTitle>
                <CardDescription>Generation {generation}</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge variant="outline" className="flex items-center gap-2">
                    <Circle
                        data-testid="cannon-status-icon"
                        className={`w-4 h-4 ${isAvailable ? "text-primary fill-primary glow-neon" : "text-destructive fill-destructive glow-red"
                            }`}
                    />
                    <span>{status}</span>
                </Badge>
            </CardContent>
        </Card>
    );
};