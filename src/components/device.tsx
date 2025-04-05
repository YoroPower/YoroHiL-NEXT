"use client";

import { useEffect, useState } from 'react';
import { fetchDeviceData, onDeviceUpdate, offDeviceUpdate } from '@/api/socket';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { ThemeSwitcher } from '@/components/theme-switcher';

interface DeviceData {
    value: number;
}

interface ComPort {
    name: string;
    description: string;
}

export default function DeviceControl() {
    const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
    const [comPorts, setComPorts] = useState<ComPort[]>([]);
    const [selectedComPort, setSelectedComPort] = useState<string>("");

    const fetchComports = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/compots`);
        const data = await response.json();
        setComPorts(data);
        if (data.length > 0) {
            setSelectedComPort(data[0].name); // 默认选择第一个
        }
    };

    useEffect(() => {
        // 连接 WebSocket
        onDeviceUpdate((data: DeviceData) => {
            setDeviceData(data);
        });

        // 获取设备数据
        const getDeviceData = async () => {
            const data = await fetchDeviceData();
            setDeviceData(data);
        };

        getDeviceData();
        fetchComports();

        return () => {
            offDeviceUpdate();
        };
    }, []);

    const handleComPortChange = (value: string) => {
        setSelectedComPort(value);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/compots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ port: value })
        });
    };

    const handleSetDeviceData = async () => {
        const newValue = Math.floor(Math.random() * 100); // 随机生成一个值
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/device`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: newValue }),
        });
    };

    return (
        <div>
            <div className="flex items-start gap-4">
                <Card className="w-[350px] m-4">
                    <CardHeader>
                        <CardTitle>连接心跳</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Label>
                                {deviceData && <p>心跳 Value: {deviceData.value}</p>}
                            </Label>
                            <Button onClick={handleSetDeviceData}>随机测试心跳</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-[350px] m-4">
                    <CardHeader>
                        <CardTitle>串口选择</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Select
                                value={selectedComPort}
                                onValueChange={handleComPortChange}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="选择串口...">
                                        {selectedComPort || "未选择"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>可用串口</SelectLabel>
                                        {comPorts.map(port => (
                                            <SelectItem
                                                key={port.name}
                                                value={port.name}
                                            >
                                                {port.name} - {port.description}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/*<div className="mt-6 block text-center md:absolute md:bottom-0 md:right-0 md:mt-0">*/}
            {/*    <ThemeSwitcher />*/}
            {/*</div>*/}
            <Separator className="my-4" />
        </div>
    );
}