import {describe, it, expect} from 'vitest';
import {render} from '@testing-library/react';
import {RadarChart} from './radar';
import type {Coordinates} from '../../types/attack.types';

const coordinates: Coordinates[] = [
    {x: 0, y: 0},
    {x: 100, y: 100},
    {x: -100, y: -100},
];

describe('RadarChart', () => {
    it('should render the radar chart', () => {
        const {container} = render(<RadarChart coordinates={coordinates} />);
        expect(container).toBeTruthy();
    });

}); 