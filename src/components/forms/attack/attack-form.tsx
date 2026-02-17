import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Loader2} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  FieldError,
  FieldLegend,
  FieldSet,
  Field,
} from "@/components/ui/field";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {ATTACK_PROTOCOLS} from "@/types/attack.types";
import type {
  AttackRequestPayload,
  AttackResponsePayload,
  ScanPoint,
} from "@/types/attack.types";
import {AttackFormSchema, type AttackFormValues} from "./attack-form.schema";
import {fetchJson} from "@/lib/utils";
import {getAttackUrl} from "@/lib/config";
import {triggerMusicPlay} from "@/lib/music-control";

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
