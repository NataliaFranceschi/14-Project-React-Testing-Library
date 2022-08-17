import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste Pokedex', () => {
  it('se tem um elemento h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2,
      name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  it('se aparece apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByText(/More details/i);
    expect(pokemon.length).toBe(1);
  });
  it('se quando clicado no botão all não há separação por tipo', async () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const pikachu = await screen.findByTestId('pokemon-type', { name: /Electric/i });
    expect(pikachu).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);
    const charmander = await screen.findByTestId('pokemon-type', { name: /Fire/i });
    expect(charmander).toBeInTheDocument();
  });
  it('testa se tem um botão para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const type = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    const button = screen.getAllByTestId('pokemon-type-button');
    type.forEach((pokemon, index) => {
      expect(button[index]).toHaveTextContent(pokemon);
    });
  });
});
