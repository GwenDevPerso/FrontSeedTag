import {describe, it, expect} from 'vitest';
import {AttackFormSchema} from './attack-form.schema';

describe('AttackFormSchema', () => {
    it('should validate a correct payload', () => {
        const result = AttackFormSchema.safeParse({
            protocols: ['closest-enemies'],

        });

        expect(result.success).toBe(true);
    });
});
