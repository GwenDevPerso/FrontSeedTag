import {render, screen} from "@testing-library/react";
import {describe, it, expect} from 'vitest';
import {AttackForm} from "./attack-form";

describe('AttackForm', () => {
    it('should disable the submit button when no protocols are selected', () => {
        render(<AttackForm scanPoints={[{coordinates: {x: 0, y: 0}, enemies: {type: 'soldier', number: 1}}]} onAttackSuccess={() => { }} onAttackError={() => { }} />);
        const submitButton = screen.getByRole('button', {name: /fire/i});
        expect(submitButton).toBeDisabled();
    });

    it('should disable submit button when no scan points are provided', () => {
        render(<AttackForm scanPoints={[]} onAttackSuccess={() => { }} onAttackError={() => { }} />);
        const submitButton = screen.getByRole('button', {name: /fire/i});
        expect(submitButton).toBeDisabled();
    });
});