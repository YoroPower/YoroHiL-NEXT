import * as React from "react";
import DeviceControl from '@/components/device';
import CircuitSimulator from '@/components/CircuitSimulator';

export default function Home() {
    return (
        <div className="m-4">
            <DeviceControl/>
            <CircuitSimulator/>
        </div>
    );
}