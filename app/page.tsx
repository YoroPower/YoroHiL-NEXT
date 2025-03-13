import * as React from "react";
import { ThemeProvider } from 'next-themes';
import DeviceControl from 'app/device';
import CircuitSimulator from 'app/CircuitSimulator';

export default function Home() {
  return (
    <ThemeProvider attribute="class">
    <div className="m-4">
      <DeviceControl />
      <CircuitSimulator />
    </div>
    </ThemeProvider>
  );
}