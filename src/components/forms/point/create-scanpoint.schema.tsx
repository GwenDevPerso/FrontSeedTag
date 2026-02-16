import * as z from "zod";

export const ENEMY_TYPES = ["soldier", "mech"] as const;

export const CreateScanPointSchema = z.object({
    x: z.coerce
        .number("X must be a number")
        .min(-100, "X must be between -100 and 100")
        .max(100, "X must be between -100 and 100"),
    y: z.coerce
        .number("Y must be a number")
        .min(-100, "Y must be between -100 and 100")
        .max(100, "Y must be between -100 and 100"),
    enemyType: z.enum(ENEMY_TYPES, {
        message: `The type must be one of: ${ENEMY_TYPES.join(", ")}`,
    }),
    enemyNumber: z.coerce
        .number("The number of enemies must be a number")
        .int("The number of enemies must be an integer")
        .min(0, "The number of enemies must be positive or null"),
    allies: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : val),
        z.coerce
            .number("The number of allies must be a number")
            .int("The number of allies must be an integer")
            .min(0, "The number of allies must be positive or null")
            .optional()
    ),
});

export type ScanPointFormValues = z.infer<typeof CreateScanPointSchema>;