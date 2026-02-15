import {useState} from "react";
import {Button} from "./ui/button";
import type {
  AttackRequestPayload,
  AttackResponsePayload,
  ScanPoint,
} from "../types/attack.types";
import {ATTACK_PROTOCOLS} from "../types/attack.types";
import {fetchJson} from "@/lib/utils";
import {cn} from "@/lib/utils";
import {getAttackUrl} from "@/lib/config";

type AttackFormProps = {
  scanPoints: ScanPoint[];
  onAttackSuccess: (payload: AttackResponsePayload) => void;
  onAttackError: (error: Error) => void;
  className?: string;
};

export const AttackForm = ({
  scanPoints,
  onAttackSuccess,
  onAttackError,
  className,
}: AttackFormProps) => {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleProtocol = (protocol: string) => {
    setSelectedProtocols((prev) =>
      prev.includes(protocol)
        ? prev.filter((p) => p !== protocol)
        : [...prev, protocol]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProtocols.length === 0) {
      onAttackError(new Error("Sélectionnez au moins un protocole"));
      return;
    }
    if (scanPoints.length === 0) {
      onAttackError(new Error("Ajoutez au moins un point de scan"));
      return;
    }

    setIsSubmitting(true);
    const payload: AttackRequestPayload = {
      protocols: selectedProtocols,
      scan: scanPoints,
    };

    try {
      const data = await fetchJson<AttackResponsePayload>(getAttackUrl(), {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      });
      onAttackSuccess(data);
    } catch (err) {
      onAttackError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4", className)}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Protocoles</legend>
        <div className="flex flex-wrap gap-2">
          {ATTACK_PROTOCOLS.map((protocol) => (
            <label
              key={protocol}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer",
                selectedProtocols.includes(protocol)
                  ? "border-primary bg-primary/10"
                  : "border-input hover:bg-muted/50"
              )}
            >
              <input
                type="checkbox"
                checked={selectedProtocols.includes(protocol)}
                onChange={() => toggleProtocol(protocol)}
                className="h-4 w-4 rounded border-input"
              />
              <span>{protocol}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button
        type="submit"
        disabled={scanPoints.length === 0 || selectedProtocols.length === 0 || isSubmitting}
      >
        {isSubmitting ? "Envoi…" : "Envoyer l'attaque"}
      </Button>
    </form>
  );
};
