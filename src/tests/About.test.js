import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Teste About', () => {
  it('se tem um elemento h2 com o texto About Pokédex', () => {
    render(<About />);
    const about = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(about).toBeInTheDocument();
  });
  it('se tem dois paragrafos', () => {
    render(<About />);
    const p1 = screen.getByText(/This application/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/filter Pokémons/i);
    expect(p2).toBeInTheDocument();
  });
  it('se utiliza o src correto', async () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /Pokédex/i });
    expect(img).toHaveAttribute('src', url);
  });
});
