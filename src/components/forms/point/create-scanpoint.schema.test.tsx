import {describe, it, expect} from 'vitest';
import {CreateScanPointSchema} from "./create-scanpoint.schema";

describe('CreateScanPointSchema', () => {
    it('should validate a correct payload', () => {
        const result = CreateScanPointSchema.safeParse({
            x: 10,
            y: 20,
            enemyType: 'soldier',
            enemyNumber: 1,
        });
        expect(result.success).toBe(true);
    });

    it('should validate a correct payload with allies', () => {
        const result = CreateScanPointSchema.safeParse({
            x: 10,
            y: 20,
            enemyType: 'soldier',
            enemyNumber: 1,
            allies: 10,
        });
        expect(result.success).toBe(true);
    });

    it('should not validate a payload with an invalid enemy type', () => {
        const result = CreateScanPointSchema.safeParse({
            x: 10,
            y: 20,
            enemyType: 'invalid',
            enemyNumber: 1,
        });
        expect(result.success).toBe(false);
    });

    it('should not validate a payload with a x out of range', () => {
        const result = CreateScanPointSchema.safeParse({
            x: 101,
            y: 20,
            enemyType: 'soldier',
            enemyNumber: 1,
        });
        expect(result.success).toBe(false);
    });

    it('should not validate a payload with a y out of range', () => {
        const result = CreateScanPointSchema.safeParse({
            x: 10,
            y: 101,
            enemyType: 'soldier',
            enemyNumber: 1,
        });
        expect(result.success).toBe(false);
    });
});