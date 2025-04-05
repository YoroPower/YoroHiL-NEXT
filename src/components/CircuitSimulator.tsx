"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// 定义选项数组
const TopOptions = [
    { value: '1', label: '拓扑 1', image: '/test/1.png' },
    { value: '2', label: '拓扑 2', image: '/test/2.png' },
];

const CircuitSimulator = () => {
    const [selectedOption, setSelectedOption] = useState(TopOptions[0].value);
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    const handleOptionChange1 = (value: string) => {
        setSelectedOption(value);
    };

    const handleSimulate = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test/set/topology`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: selectedOption }),
        });
        const result = await response.json();
        console.log(result);
    };

    const displayOption = hoveredOption || selectedOption;
    const displayImage = TopOptions.find(option => option.value === displayOption)?.image;

    return (
        <div>
            <Card className="w-[450px] m-4">
                <CardHeader>
                    <CardTitle>拓扑选择</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col w-full items-start gap-4">
                        <Select defaultValue={selectedOption} onValueChange={handleOptionChange1}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="选择合适的拓扑" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>固有拓扑</SelectLabel>
                                    {TopOptions.map(option => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            onMouseEnter={() => setHoveredOption(option.value)}
                                            onMouseLeave={() => setHoveredOption(null)}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {displayImage && (
                            <Image
                                src={displayImage}
                                alt={`Option ${displayOption}`}
                                width={500}
                                height={500}
                                className="object-contain h-auto"
                            />
                        )}
                        <Button onClick={handleSimulate}>Simulate</Button>
                    </div>
                </CardContent>
            </Card>
            <Separator className="m-4" />
        </div>
    );
};

export default CircuitSimulator;