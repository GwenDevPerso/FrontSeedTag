import {render} from "@testing-library/react";
import {describe, it, expect} from 'vitest';
import {Cannon} from './cannon';

describe('Cannon', () => {
    it('should render the cannon', () => {
        const {container, getByText, getByTestId} = render(<Cannon name="Cannon 1" generation={1} status="Available" />);
        expect(container).toBeTruthy();
        expect(getByText('Cannon 1')).toBeInTheDocument();
        expect(getByText('Generation 1')).toBeInTheDocument();
        expect(getByText('Available')).toBeInTheDocument();
        expect(getByTestId('cannon-status-icon')).toHaveClass('text-primary fill-primary glow-neon');
    });

    it('should render the cannon with the correct status', () => {
        const {getByText, getByTestId} = render(<Cannon name="Cannon 1" generation={1} status="Unavailable" />);
        expect(getByText('Unavailable')).toBeInTheDocument();
        expect(getByTestId('cannon-status-icon')).toHaveClass('text-destructive fill-destructive glow-red');
    });
}); 