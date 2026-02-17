export type Coordinates = { x: number; y: number };

export type Enemies = { type: EnemyTypes; number: number };

export type EnemyTypes = "soldier" | "mech";

export type ScanPoint = {
  coordinates: Coordinates;
  enemies: Enemies;
  allies?: number;
};

export type AttackRequestPayload = {
  protocols: string[];
  scan: ScanPoint[];
};

export type AttackResponsePayload = {
  casualties: number;
  generation: number;
  target: Coordinates;
};

export const ATTACK_PROTOCOLS = [
  "closest-enemies",
  "furthest-enemies",
  "assist-allies",
  "avoid-crossfire",
  "prioritize-mech",
  "avoid-mech",
] as const;

export type AttackProtocol = (typeof ATTACK_PROTOCOLS)[number];