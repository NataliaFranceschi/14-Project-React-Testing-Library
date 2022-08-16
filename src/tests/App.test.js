import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste App', () => {
  it('App contém um conjunto fixo de links de navegação', async () => {
    const links = ['Home', 'About', 'Favorite Pokémons'];
    renderWithRouter(<App />);
    links.forEach((link) => {
      const elementLink = screen.getByRole('link', { name: link });
      expect(elementLink).toBeInTheDocument();
    });
  });
  it('se o link Home redireciona para pagina inicial', async () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('se o link About redireciona para about', async () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  it('se o link Pokémons Favoritados redireciona para favorites', async () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('se url desconhecida redireciona para pagina NotFound', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste');
    const notFound = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
