import React from 'react';
import { render, waitForElement, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('Home work as expected', async () => {
    const {container} = render(<App />);
    const gifLink = await waitForElement(() => container.querySelector('.Gif-link'));
    expect(gifLink).toBeVisible();
});

test('Search form could be used', async () => {
    render(<App />);
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, {target :{value: 'matrix'}});

    
    const button = await screen.findByRole('button');
    fireEvent.click(button);

    const title = await screen.findByText('matrix');
    expect(title).toBeVisible();
});
