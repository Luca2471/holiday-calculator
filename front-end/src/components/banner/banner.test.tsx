import React from 'react';
import Banner from './banner';
import { render, screen } from '@testing-library/react';

jest.mock('./banner.module.scss', () => ({
  container: 'banner-container',
  title: 'banner-title',
  subtitle: 'banner-subtitle',
}));

const renderBanner = () => {
  return render(<Banner />);
};

describe('Banner', () => {
    afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the container with correct class', () => {
    const { container } = render(<Banner />);
    expect(container.firstChild).toHaveClass('banner-container');
  });

  it('renders the title text with the correct class', () => {
    renderBanner();
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('banner-title');
  });

  it('renders the subtitle text with the correct class', () => {
    renderBanner();
    const subtitle = screen.getByTestId("subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('banner-subtitle');
  });
});