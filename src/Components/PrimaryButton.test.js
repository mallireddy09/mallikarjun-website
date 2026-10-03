import { fireEvent, render, screen } from '@testing-library/react';
import PrimaryButton from './PrimaryButton';

test('section links preserve the GitHub Pages repository path', () => {
    window.history.replaceState(null, '', '/website/');
    render(<><PrimaryButton title="Read more" href="#about" /><div id="about" /></>);
    const target = document.getElementById('about');
    target.scrollIntoView = jest.fn();
    fireEvent.click(screen.getByRole('link', { name: 'Read more' }));
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(window.location.pathname).toBe('/website/');
    expect(window.location.hash).toBe('#about');
    window.history.replaceState(null, '', '/');
});
