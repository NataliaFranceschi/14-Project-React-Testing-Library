import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Teste Pokemon', () => {
  const pokemon = { id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' };

  it('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = screen.getByText(/Electric/i);
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = screen.getByText(/6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImage).toBeInTheDocument();
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImage).toHaveAttribute('src', url);
  });
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('se existe um ícone de estrela nos pokémons favoritados ', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const src = '/star-icon.svg';
    const img = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(img).toHaveAttribute('src', src);
  });
});
