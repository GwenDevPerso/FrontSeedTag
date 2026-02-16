import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {Dashboard} from './dashboard';

describe('Dashboard', () => {
    it('should render the dashboard title', () => {
        render(<Dashboard />);
        const title = screen.getByText('Dashboard');
        expect(title).toBeInTheDocument();
    });

    it('should render without errors', () => {
        const {container} = render(<Dashboard />);
        expect(container).toBeTruthy();
    });

});
