import {ATTACK_PROTOCOLS} from "@/types/attack.types";
import * as z from "zod";

export const AttackFormSchema = z.object({
    protocols: z
        .array(z.enum(ATTACK_PROTOCOLS))
        .min(1, "Sélectionnez au moins un protocole"),
});


export type AttackFormValues = z.infer<typeof AttackFormSchema>;
