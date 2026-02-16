import {describe, it, expect, vi, beforeAll} from 'vitest';
import {renderHook} from '@testing-library/react';
import {useCannonStatus} from './useCannonStatus';
import useWebSocket from 'react-use-websocket';
import {ReadyState} from 'react-use-websocket';
import type {CannonsStatusResponse} from '@/types/cannon.types';
import {mockUseWebSocket} from './useCannonStatus.mock';

vi.mock('react-use-websocket', () => ({
    default: vi.fn(),
    ReadyState: {
        CONNECTING: 0,
        OPEN: 1,
        CLOSED: 2,
        CLOSING: 3,
    },
}));


describe('useCannonStatus', () => {

    beforeAll(() => {
        vi.mocked(useWebSocket).mockReturnValue(mockUseWebSocket);
    });

    it('should return the cannon status when not connected', () => {
        const {result} = renderHook(() => useCannonStatus());
        const {isConnected, cannons, error} = result.current;
        expect(isConnected).toBe(false);
        expect(cannons).toEqual([]);
        expect(error).toBeNull();
    });

    it('should return the cannon status when the connection is open', () => {
        const mockCannons: CannonsStatusResponse = {
            cannons: [
                {generation: 1, available: true},
            ],
        };
        vi.mocked(useWebSocket).mockReturnValue({...mockUseWebSocket, lastJsonMessage: mockCannons, readyState: ReadyState.OPEN});

        const {result} = renderHook(() => useCannonStatus());
        const {isConnected, cannons, error} = result.current;
        expect(isConnected).toBe(true);
        expect(cannons).toEqual(mockCannons.cannons);
        expect(error).toBeNull();
    });
}); 