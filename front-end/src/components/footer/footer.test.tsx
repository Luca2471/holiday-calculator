import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

jest.mock('./footer.module.scss', () => ({
  footer: 'footer',
}));

const renderFooter = () => {
  return render(<Footer />);
};

describe('Footer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the footer element with the correct styles', () => {
    renderFooter();
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveStyle('width: 100%');
    expect(footer).toHaveStyle('background: #f5f5f5');
    expect(footer).toHaveStyle('color: #555');
  });

  it('contains the email', () => {
    renderFooter();
    const emailLink = screen.getByTestId('email');;
    expect(emailLink).toBeInTheDocument();
  });
});