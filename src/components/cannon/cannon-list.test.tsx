import {render} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {CannonList} from './cannon-list';
import {useCannonStatus} from '@/hooks/useCannonStatus';

vi.mock('@/hooks/useCannonStatus');

describe('CannonList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the cannon list', () => {
        vi.mocked(useCannonStatus).mockReturnValue({
            isConnected: true,
            cannons: [],
            error: null,
        });

        const {container} = render(<CannonList />);
        expect(container).toBeTruthy();
    });

    it('should render the cannon list when the connection is open', () => {
        vi.mocked(useCannonStatus).mockReturnValue({
            isConnected: true,
            cannons: [
                {generation: 1, available: true},
                {generation: 2, available: false},
            ],
            error: null,
        });

        const {getByTestId} = render(<CannonList />);
        expect(getByTestId('cannon-list')).toBeInTheDocument();
    });

    it('should render the cannon list when the connection is closed', () => {
        vi.mocked(useCannonStatus).mockReturnValue({
            isConnected: false,
            cannons: [],
            error: null,
        });

        const {getByTestId} = render(<CannonList />);
        expect(getByTestId('cannon-list-connecting')).toBeInTheDocument();
    });

    it('should render the cannon list when there is an error', () => {
        vi.mocked(useCannonStatus).mockReturnValue({
            isConnected: false,
            cannons: [],
            error: 'Connection failed',
        });

        const {getByTestId} = render(<CannonList />);
        expect(getByTestId('cannon-list-error')).toBeInTheDocument();
    });
}); 