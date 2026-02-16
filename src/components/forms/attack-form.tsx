"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm, useWatch} from "react-hook-form";
import * as z from "zod";
import {Button} from "../ui/button";
import {
  FieldError,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import type {
  AttackRequestPayload,
  AttackResponsePayload,
  ScanPoint,
} from "../../types/attack.types";
import {ATTACK_PROTOCOLS} from "../../types/attack.types";
import {fetchJson} from "@/lib/utils";
import {getAttackUrl} from "@/lib/config";
import {Label} from "../ui/label";
import {Checkbox} from "../ui/checkbox";
import {Field} from "../ui/field";
import {Loader2} from "lucide-react";
import {triggerMusicPlay} from "@/lib/music-control";

const AttackFormSchema = z.object({
  protocols: z
    .array(z.enum(ATTACK_PROTOCOLS))
    .min(1, "Sélectionnez au moins un protocole"),
});


export type AttackFormValues = z.infer<typeof AttackFormSchema>;


type AttackFormProps = {
  scanPoints: ScanPoint[];
  onAttackSuccess: (payload: AttackResponsePayload) => void;
  onAttackError: (error: Error) => void;
};

export const AttackForm = ({
  scanPoints,
  onAttackSuccess,
  onAttackError,
}: AttackFormProps) => {
  const form = useForm<AttackFormValues>({
    resolver: zodResolver(AttackFormSchema),
    defaultValues: {
      protocols: [],
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const protocols = useWatch({
    control: form.control,
    name: "protocols",
    defaultValue: [],
  });

  async function onSubmit(data: AttackFormValues) {
    if (scanPoints.length === 0) {
      onAttackError(new Error("Ajoutez au moins un point de scan"));
      return;
    }

    triggerMusicPlay();

    const payload: AttackRequestPayload = {
      protocols: data.protocols,
      scan: scanPoints,
    };

    try {
      const response = await fetchJson<AttackResponsePayload>(getAttackUrl(), {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      onAttackSuccess(response);
      form.reset();
    } catch (err) {
      onAttackError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-row gap-4 justify-center"
    >
      <Controller
        name="protocols"
        control={form.control}
        render={({field, fieldState}) => (
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant="label">Protocols</FieldLegend>
            <div className="grid grid-cols-2 gap-2">
              {ATTACK_PROTOCOLS.map((protocol) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid} key={protocol}>
                  <Checkbox id={`protocol-checkbox-${protocol}`} name={`protocol-checkbox-${protocol}`} checked={field.value.includes(protocol)}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        field.onChange([...field.value, protocol]);
                      } else {
                        field.onChange(field.value.filter((p) => p !== protocol));
                      }
                    }} />
                  <Label htmlFor={`protocol-checkbox-${protocol}`} className="text-xs text-muted-foreground">{protocol}</Label>
                </Field>
              ))}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )}
      />
      <div className="flex justify-center items-center">
        <Button
          type="submit"
          variant="destructive"
          disabled={scanPoints.length === 0 || protocols.length === 0 || isSubmitting}
          className="rounded-full h-16 w-16 cursor-pointer hover:scale-105 transition-all duration-300 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <span className="relative z-10">Fire</span>
          )}
        </Button>
      </div>
    </form>
  );
};
