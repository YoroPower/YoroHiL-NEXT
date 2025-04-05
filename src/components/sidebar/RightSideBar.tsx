"use client";

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {ChevronDown, ChevronRight} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";

// 组件选项
const componentOptions = [
    {id: 1, name: "电阻", symbol: "R"},
    {id: 2, name: "电容", symbol: "C"},
    {id: 3, name: "电感", symbol: "L"},
    {id: 4, name: "二极管", symbol: "D"},
    {id: 5, name: "晶体管", symbol: "Q"},
    {id: 6, name: "运算放大器", symbol: "U"},
]

const RightSideBar = () => {
    const {theme, setTheme} = useTheme()
    const isDarkMode = theme === "dark"

    const [importMethod, setImportMethod] = useState<string>("bundled")
    const [expandedSections, setExpandedSections] = useState({
        inputPorts: true,
        outputData1: true,
        outputData2: true,
    })

    // 切换部分的展开/折叠状态
    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }
    return (
        <div>
            {/* 右侧配置面板 */}
            <div
                className={cn(
                    "flex-1 h-full overflow-y-auto",
                    isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-[#F5F5F5] text-black",
                )}
            >
                <div className="p-5 space-y-4">
                    {/* 输入端口部分 */}
                    <div
                        className={cn(
                            "rounded-[0.3em] overflow-hidden border",
                            isDarkMode ? "border-[#323232] bg-[#252525]" : "border-[#E6E6E6] bg-white",
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between px-4 py-3",
                                isDarkMode ? "bg-[#2D2D2D]" : "bg-[#F9F9F9]",
                            )}
                        >
                            <div className="flex items-center">
                                <h3 className="text-sm font-medium">输入端口</h3>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "ml-2 text-xs",
                                        isDarkMode ? "border-[#323232] bg-[#323232]" : "border-[#E6E6E6] bg-[#F0F0F0]",
                                    )}
                                >
                                    端口映射
                                </Badge>
                            </div>
                            <button
                                className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-md transition-colors",
                                    isDarkMode ? "hover:bg-[#3D3D3D]" : "hover:bg-[#F0F0F0]",
                                )}
                                onClick={() => toggleSection("inputPorts")}
                            >
                                {expandedSections.inputPorts ? (
                                    <ChevronDown className="w-4 h-4"/>
                                ) : (
                                    <ChevronRight className="w-4 h-4"/>
                                )}
                            </button>
                        </div>

                        {expandedSections.inputPorts && (
                            <div className="p-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="component-select" className="text-sm">
                                            器件选择
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="component-select"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="某个器件"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {componentOptions.map((option) => (
                                                        <SelectItem key={option.id} value={option.id.toString()}>
                              <span className="flex items-center">
                                <span className="mr-2 text-xs font-mono">{option.symbol}</span>
                                  {option.name}
                              </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="io-select" className="text-sm">
                                            IO 端口
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="io-select"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="选择IO"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="input1">输入端口1</SelectItem>
                                                    <SelectItem value="input2">输入端口2</SelectItem>
                                                    <SelectItem value="output1">输出端口1</SelectItem>
                                                    <SelectItem value="output2">输出端口2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 输出数据部分1 */}
                    <div
                        className={cn(
                            "rounded-[0.3em] overflow-hidden border",
                            isDarkMode ? "border-[#323232] bg-[#252525]" : "border-[#E6E6E6] bg-white",
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between px-4 py-3",
                                isDarkMode ? "bg-[#2D2D2D]" : "bg-[#F9F9F9]",
                            )}
                        >
                            <div className="flex items-center">
                                <h3 className="text-sm font-medium">输出数据</h3>
                                <Badge
                                    className={cn("ml-2 text-xs", isDarkMode ? "bg-[#0078D4] text-white" : "bg-[#0078D4] text-white")}
                                >
                                    暂定 Redis
                                </Badge>
                            </div>
                            <button
                                className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-md transition-colors",
                                    isDarkMode ? "hover:bg-[#3D3D3D]" : "hover:bg-[#F0F0F0]",
                                )}
                                onClick={() => toggleSection("outputData1")}
                            >
                                {expandedSections.outputData1 ? (
                                    <ChevronDown className="w-4 h-4"/>
                                ) : (
                                    <ChevronRight className="w-4 h-4"/>
                                )}
                            </button>
                        </div>

                        {expandedSections.outputData1 && (
                            <div className="p-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="output-component" className="text-sm">
                                            器件选择
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="output-component"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="选择器件"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {componentOptions.map((option) => (
                                                        <SelectItem key={option.id} value={option.id.toString()}>
                              <span className="flex items-center">
                                <span className="mr-2 text-xs font-mono">{option.symbol}</span>
                                  {option.name}
                              </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="measurement-type" className="text-sm">
                                            电压/电流
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="measurement-type"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="选择类型"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="voltage">电压 (V)</SelectItem>
                                                    <SelectItem value="current">电流 (A)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="input-value" className="text-sm">
                                            输入值
                                        </Label>
                                        <div className="col-span-2">
                                            <Input
                                                id="input-value"
                                                placeholder="输入值"
                                                className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="data-name" className="text-sm">
                                            数据名称
                                        </Label>
                                        <div className="col-span-2">
                                            <Input
                                                id="data-name"
                                                placeholder="数据名称"
                                                className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 输出数据部分2 */}
                    <div
                        className={cn(
                            "rounded-[0.3em] overflow-hidden border",
                            isDarkMode ? "border-[#323232] bg-[#252525]" : "border-[#E6E6E6] bg-white",
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-between px-4 py-3",
                                isDarkMode ? "bg-[#2D2D2D]" : "bg-[#F9F9F9]",
                            )}
                        >
                            <div className="flex items-center">
                                <h3 className="text-sm font-medium">输出数据</h3>
                            </div>
                            <button
                                className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-md transition-colors",
                                    isDarkMode ? "hover:bg-[#3D3D3D]" : "hover:bg-[#F0F0F0]",
                                )}
                                onClick={() => toggleSection("outputData2")}
                            >
                                {expandedSections.outputData2 ? (
                                    <ChevronDown className="w-4 h-4"/>
                                ) : (
                                    <ChevronRight className="w-4 h-4"/>
                                )}
                            </button>
                        </div>

                        {expandedSections.outputData2 && (
                            <div className="p-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="output2-component" className="text-sm">
                                            器件选择
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="output2-component"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="选择器件"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {componentOptions.map((option) => (
                                                        <SelectItem key={option.id} value={option.id.toString()}>
                              <span className="flex items-center">
                                <span className="mr-2 text-xs font-mono">{option.symbol}</span>
                                  {option.name}
                              </span>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="measurement2-type" className="text-sm">
                                            电压/电流
                                        </Label>
                                        <div className="col-span-2">
                                            <Select>
                                                <SelectTrigger
                                                    id="measurement2-type"
                                                    className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                                >
                                                    <SelectValue placeholder="选择类型"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="voltage">电压 (V)</SelectItem>
                                                    <SelectItem value="current">电流 (A)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="input2-value" className="text-sm">
                                            输入值
                                        </Label>
                                        <div className="col-span-2">
                                            <Input
                                                id="input2-value"
                                                placeholder="输入值"
                                                className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label htmlFor="data2-name" className="text-sm">
                                            数据名称
                                        </Label>
                                        <div className="col-span-2">
                                            <Input
                                                id="data2-name"
                                                placeholder="数据名称"
                                                className={cn(isDarkMode ? "bg-[#2D2D2D] border-[#323232]" : "bg-white border-[#E6E6E6]")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 底部操作按钮 */}
                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                            variant="outline"
                            className={cn(
                                isDarkMode
                                    ? "bg-[#2D2D2D] border-[#323232] hover:bg-[#3D3D3D] text-white"
                                    : "bg-white border-[#E6E6E6] hover:bg-[#F5F5F5] text-black",
                            )}
                        >
                            重置
                        </Button>
                        <Button className="bg-[#0078D4] hover:bg-[#106EBE] text-white">应用</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSideBar;