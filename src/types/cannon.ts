export interface CannonStatus {
    generation: number;
    available: boolean;
}

export interface CannonsStatusResponse {
    cannons: CannonStatus[];
}