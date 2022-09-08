import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste NotFound', () => {
  it('se tem um elemento h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const pageNotFound = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(pageNotFound).toBeInTheDocument();
  });

  it('se utiliza o src correto', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(img).toHaveAttribute('src', url);
  });
});
