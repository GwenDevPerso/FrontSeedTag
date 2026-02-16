import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {CreateScanPointForm} from "./create-scanpoint-form";

describe('CreateScanPointForm', () => {
    beforeEach(() => {
        HTMLElement.prototype.scrollIntoView = vi.fn();
    });
    it('should render the form with all fields', () => {
        const mockOnAddScanPoint = vi.fn();
        render(<CreateScanPointForm onAddScanPoint={mockOnAddScanPoint} />);

        expect(screen.getByLabelText(/^x$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^y$/i)).toBeInTheDocument();
        expect(screen.getByTestId('scanpoint-enemyType')).toBeInTheDocument();
        expect(screen.getByLabelText(/number of enemies/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/allies/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /add scan point/i})).toBeInTheDocument();
    });

    it('should submit form with valid data without allies', async () => {
        const mockOnAddScanPoint = vi.fn();
        render(<CreateScanPointForm onAddScanPoint={mockOnAddScanPoint} />);

        const xInput = screen.getByLabelText(/^x$/i);
        const yInput = screen.getByLabelText(/^y$/i);
        const enemyNumberInput = screen.getByLabelText(/number of enemies/i);
        const submitButton = screen.getByRole('button', {name: /add scan point/i});

        fireEvent.change(xInput, {target: {value: '10'}});
        fireEvent.change(yInput, {target: {value: '20'}});
        fireEvent.change(enemyNumberInput, {target: {value: '5'}});

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnAddScanPoint).toHaveBeenCalledWith({
                coordinates: {x: 10, y: 20},
                enemies: {type: 'soldier', number: 5},
            });
        });
    });

    it('should submit form with valid data including allies', async () => {
        const mockOnAddScanPoint = vi.fn();
        render(<CreateScanPointForm onAddScanPoint={mockOnAddScanPoint} />);

        const xInput = screen.getByLabelText(/^x$/i);
        const yInput = screen.getByLabelText(/^y$/i);
        const enemyNumberInput = screen.getByLabelText(/number of enemies/i);
        const alliesInput = screen.getByLabelText(/allies/i);
        const submitButton = screen.getByRole('button', {name: /add scan point/i});

        fireEvent.change(xInput, {target: {value: '10'}});
        fireEvent.change(yInput, {target: {value: '20'}});
        fireEvent.change(enemyNumberInput, {target: {value: '5'}});
        fireEvent.change(alliesInput, {target: {value: '3'}});

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnAddScanPoint).toHaveBeenCalledWith({
                coordinates: {x: 10, y: 20},
                enemies: {type: 'soldier', number: 5},
                allies: 3,
            });
        });
    });

    it('should reset form after successful submission', async () => {
        const mockOnAddScanPoint = vi.fn();
        render(<CreateScanPointForm onAddScanPoint={mockOnAddScanPoint} />);

        const xInput = screen.getByLabelText(/^x$/i) as HTMLInputElement;
        const yInput = screen.getByLabelText(/^y$/i) as HTMLInputElement;
        const enemyNumberInput = screen.getByLabelText(/number of enemies/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', {name: /add scan point/i});

        fireEvent.change(xInput, {target: {value: '10'}});
        fireEvent.change(yInput, {target: {value: '20'}});
        fireEvent.change(enemyNumberInput, {target: {value: '5'}});

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnAddScanPoint).toHaveBeenCalled();
        });

        expect(xInput.value).toBe('');
        expect(yInput.value).toBe('');
        expect(enemyNumberInput.value).toBe('');
    });


    it('should accept mech as enemy type', async () => {
        const mockOnAddScanPoint = vi.fn();
        render(<CreateScanPointForm onAddScanPoint={mockOnAddScanPoint} />);

        const xInput = screen.getByLabelText(/^x$/i);
        const yInput = screen.getByLabelText(/^y$/i);
        const enemyNumberInput = screen.getByLabelText(/number of enemies/i);
        const submitButton = screen.getByRole('button', {name: /add scan point/i});

        fireEvent.change(xInput, {target: {value: '10'}});
        fireEvent.change(yInput, {target: {value: '20'}});
        fireEvent.change(enemyNumberInput, {target: {value: '5'}});

        const enemyTypeSelect = screen.getByTestId('scanpoint-enemyType');
        fireEvent.click(enemyTypeSelect);

        await waitFor(() => {
            expect(screen.getByTestId('scanpoint-enemyType-mech')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('scanpoint-enemyType-mech'));

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnAddScanPoint).toHaveBeenCalledWith({
                coordinates: {x: 10, y: 20},
                enemies: {type: 'mech', number: 5},
            });
        });
    });
});