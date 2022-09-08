import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste FavoritePokemon', () => {
  it('se é exibida a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const mensagem = screen.getByText(/No favorite pokemon found/i);
    expect(mensagem).toBeInTheDocument();
  });

  it('se são exibidos todos os cards de pokémons favoritados', () => {
    const pokemons = [{ id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },
    { id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png' }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favorites = screen.getAllByText(/More details/i);
    expect(favorites.length).toBe(2);
  });
});
