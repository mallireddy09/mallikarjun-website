import { fireEvent, render, screen } from '@testing-library/react';
import ProjectsPage from './ProjectsPage';

jest.mock('../Components/AnimatedSection', () => ({ children }) => children);

test('category buttons show matching projects and All restores the list', () => {
    render(<ProjectsPage />);
    const trackMoney = () => screen.queryByRole('heading', { name: 'Track My Money' });
    const spaceX = () => screen.queryByRole('heading', { name: 'Space X Falcon 9 First Stage Landing Prediction' });
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Machine Learning' }));
    expect(trackMoney()).not.toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'React Native / App Development' }));
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(trackMoney()).toBeInTheDocument();
    expect(spaceX()).toBeInTheDocument();
});
