import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import type {ScanPoint} from "../types/attack.types";
import {cn} from "@/lib/utils";

const ENEMY_TYPES = ["soldier", "mech"] as const;

/** Shared field styling for inputs and select (matches Input component). */
const fieldClassName =
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive md:text-sm";

type CreateScanPointFormProps = {
  onAddScanPoint: (point: ScanPoint) => void;
  className?: string;
};

export const CreateScanPointForm = ({
  onAddScanPoint,
  className,
}: CreateScanPointFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));
    const enemyType = formData.get("enemyType") as string;
    const enemyNumber = Number(formData.get("enemyNumber"));
    const alliesRaw = formData.get("allies");

    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error("Coordinates x and y must be numbers");
    }
    if (!ENEMY_TYPES.includes(enemyType as (typeof ENEMY_TYPES)[number])) {
      throw new Error(`Enemy type must be one of: ${ENEMY_TYPES.join(", ")}`);
    }
    if (Number.isNaN(enemyNumber) || enemyNumber < 0) {
      throw new Error("Enemy number must be a non-negative number");
    }

    const point: ScanPoint = {
      coordinates: {x, y},
      enemies: {type: enemyType, number: enemyNumber},
    };

    if (alliesRaw !== null && alliesRaw !== "") {
      const allies = Number(alliesRaw);
      if (!Number.isNaN(allies) && allies >= 0) {
        point.allies = allies;
      }
    }

    onAddScanPoint(point);
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3", className)}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="scanpoint-x" className="text-xs text-muted-foreground">
            X
          </Label>
          <Input
            id="scanpoint-x"
            type="number"
            name="x"
            required
            placeholder="0"
            max={100}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="scanpoint-y" className="text-xs text-muted-foreground">
            Y
          </Label>
          <Input
            id="scanpoint-y"
            type="number"
            name="y"
            required
            placeholder="0"
            max={100}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="scanpoint-enemyType"
          className="text-xs text-muted-foreground"
        >
          Type ennemi
        </Label>
        <select
          id="scanpoint-enemyType"
          name="enemyType"
          required
          className={cn(fieldClassName, "cursor-pointer")}
        >
          {ENEMY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="scanpoint-enemyNumber"
          className="text-xs text-muted-foreground"
        >
          Nombre d&apos;ennemis
        </Label>
        <Input
          id="scanpoint-enemyNumber"
          type="number"
          name="enemyNumber"
          min={0}
          required
          placeholder="0"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="scanpoint-allies"
          className="text-xs text-muted-foreground"
        >
          Alliés (optionnel)
        </Label>
        <Input
          id="scanpoint-allies"
          type="number"
          name="allies"
          min={0}
          placeholder="—"
        />
      </div>

      <Button type="submit" className="w-full">
        Ajouter le point de scan
      </Button>
    </form>
  );
};
