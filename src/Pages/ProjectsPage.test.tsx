import { vi } from "vitest";
import type { PropsWithChildren } from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectsPage from './ProjectsPage';
import projects from '../data/projects';

vi.mock('../Components/AnimatedSection', () => ({ default: ({ children }: PropsWithChildren) => children }));

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

test('each project image and title share one link to the correct destination', () => {
    render(<ProjectsPage />);
    for (const project of projects) {
        const link = screen.getByRole('link', { name: `${project.title} (opens in a new tab)` });
        expect(link).toHaveAttribute('href', project.store || project.github || project.demo);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link.querySelector('img')).toHaveAttribute('src', project.image);
        expect(link.querySelector('h3')).toHaveTextContent(project.title);
        expect(Array.from(link.children).map(child => child.tagName)).toEqual(['DIV', 'H3']);
    }
    expect(screen.queryByText('View on Google Play')).not.toBeInTheDocument();
    expect(screen.queryByText('View on GitHub')).not.toBeInTheDocument();
});
