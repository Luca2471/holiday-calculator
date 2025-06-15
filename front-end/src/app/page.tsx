import React from 'react';
import { Banner, HolidayCalculatorContainer, Footer } from '@/components';

export const metadata = {
  title: "Smart Holidays",
  description: "Trip price calculator",
}

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Banner />
      <div style={{ flex: 1 }}>
        <HolidayCalculatorContainer />
      </div>
      <Footer />
    </div>
  );
}
