import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetail = screen.queryByRole('link', { name: /more Detail/i });
    userEvent.click(moreDetail);
  });

  it('se informações do pokemon selecionado são mostradas', () => {
    const name = screen.getByText(/Pikachu Details/i);
    expect(name).toBeInTheDocument();
    const moreDetail = screen.queryByRole('link', { name: /more Detail/i });
    expect(moreDetail).not.toBeInTheDocument();
    const text = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(text).toBeInTheDocument();
    const pokemonDetail = screen.getByText(/roasts hard berries with electricity/i);
    expect(pokemonDetail).toBeInTheDocument();
  });

  it('se informações sobre as localizações do pokemon são mostradas', () => {
    const textLocation = screen.getByRole('heading', { level: 2,
      name: 'Game Locations of Pikachu' });
    expect(textLocation).toBeInTheDocument();
    const locations = [{
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    }];
    locations.forEach(({ location, map }, index) => {
      const pokemonLocation = screen.getByText(location);
      expect(pokemonLocation).toBeInTheDocument();
      const img = screen.getAllByAltText(/Pikachu location/i);
      expect(img[index]).toHaveAttribute('src', map);
    });
  });

  it('se tem um checkbox que da para favoritar', () => {
    const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
