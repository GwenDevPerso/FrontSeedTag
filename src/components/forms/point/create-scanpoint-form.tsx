import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type {ScanPoint} from "@/types/attack.types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CreateScanPointSchema, ENEMY_TYPES, type ScanPointFormValues} from "./create-scanpoint.schema";


type CreateScanPointFormProps = {
  onAddScanPoint: (point: ScanPoint) => void;
};

export const CreateScanPointForm = ({
  onAddScanPoint,
}: CreateScanPointFormProps) => {
  const form = useForm({
    resolver: zodResolver(CreateScanPointSchema),
    defaultValues: {
      x: "",
      y: "",
      enemyType: ENEMY_TYPES[0],
      enemyNumber: "",
      allies: "",
    },
  });

  function onSubmit(data: ScanPointFormValues) {
    const point: ScanPoint = {
      coordinates: {x: data.x, y: data.y},
      enemies: {type: data.enemyType, number: data.enemyNumber},
    };

    if (data.allies !== undefined) {
      point.allies = data.allies;
    }

    onAddScanPoint(point);
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            name="x"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="scanpoint-x" className="text-xs text-muted-foreground">
                  X
                </FieldLabel>
                <Input
                  {...field}
                  id="scanpoint-x"
                  type="number"
                  value={String(field.value ?? "")}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  max={100}
                  min={-100}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="y"
            control={form.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="scanpoint-y" className="text-xs text-muted-foreground">
                  Y
                </FieldLabel>
                <Input
                  {...field}
                  id="scanpoint-y"
                  type="number"
                  value={String(field.value ?? "")}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  max={100}
                  min={-100}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="enemyType"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="scanpoint-enemyType"
                className="text-xs text-muted-foreground"
              >
                Enemy type
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger data-testid="scanpoint-enemyType">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {ENEMY_TYPES.map((t) => (
                    <SelectItem key={t} value={t} data-testid={`scanpoint-enemyType-${t}`}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="enemyNumber"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="scanpoint-enemyNumber"
                className="text-xs text-muted-foreground"
              >
                Number of enemies
              </FieldLabel>
              <Input
                {...field}
                id="scanpoint-enemyNumber"
                type="number"
                value={String(field.value ?? "")}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                min={0}
                placeholder="0"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="allies"
          control={form.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="scanpoint-allies"
                className="text-xs text-muted-foreground"
              >
                Allies (optional)
              </FieldLabel>
              <Input
                {...field}
                id="scanpoint-allies"
                type="number"
                value={String(field.value ?? "")}
                onChange={(e) => {
                  field.onChange(e.target.value === "" ? "" : e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                min={0}
                placeholder="—"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="w-full">
        Add scan point
      </Button>
    </form >
  );
};
