import { fireEvent, render, screen } from '@testing-library/react';
import ProjectsPage from './ProjectsPage';

jest.mock('../Components/AnimatedSection', () => ({ children }) => children);

test('category buttons show matching projects and All restores the list', () => {
    render(<ProjectsPage />);
    const trackMoney = () => screen.queryByRole('heading', { name: 'Track My Money' });
    const spaceX = () => screen.queryByRole('heading', { name: 'Space X Falcon 9 First Stage Landing Prediction' });
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Machine Learning' }));
    expect(trackMoney()).not.toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Machine Learning' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'React Native / App Development' }));
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
});

test('project hover and mobile actions share destinations and omit unavailable links', () => {
    const { container } = render(<ProjectsPage />);
    for (const card of container.querySelectorAll('.grid-item')) {
        const actions = selector => Array.from(card.querySelectorAll(`${selector} a`)).map(a => ({
            href: a.getAttribute('href'), label: a.getAttribute('aria-label'),
        }));
        expect(actions('.overlay')).toEqual(actions('.mobile-links'));
        expect(actions('.overlay')).toHaveLength(1);
        for (const link of card.querySelectorAll('a')) {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
    }
});
