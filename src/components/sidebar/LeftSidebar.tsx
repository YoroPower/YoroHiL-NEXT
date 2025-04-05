"use client"

import {useState} from "react"
import {ChevronDown, ChevronRight, FileInput, Upload, Info} from "lucide-react"
import {cn} from "@/lib/utils"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {Badge} from "@/components/ui/badge"
import {Label} from "@/components/ui/label"
import {Tab, TabList} from "@fluentui/react-components";
import BundledList from "@/components/sidebar/BundledList";
import {ScrollArea} from "@/components/ui/scroll-area";

// 组件选项
const componentOptions = [
    {id: 1, name: "电阻", symbol: "R"},
    {id: 2, name: "电容", symbol: "C"},
    {id: 3, name: "电感", symbol: "L"},
    {id: 4, name: "二极管", symbol: "D"},
    {id: 5, name: "晶体管", symbol: "Q"},
    {id: 6, name: "运算放大器", symbol: "U"},
]

export function LeftSidebar() {
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
        <div className="flex h-full">
            {/* 左侧拓扑选择面板 */}
            <div
                className={cn(
                    "w-full h-full border-r",
                    isDarkMode ? "bg-[#202020] border-[#323232] text-white" : "bg-[#FAFAFA] border-[#E6E6E6] text-black",
                )}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-semibold">拓扑选择</h2>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Info className="h-4 w-4"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>选择预定义拓扑或导入文件</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="mb-6">
                        <TabList size="small" appearance="subtle" className="w-full mb-4"
                                 defaultSelectedValue={importMethod}
                                 onTabSelect={(_, data) => {
                                     setImportMethod(data.value as string);
                                 }}
                        >
                            <Tab value="bundled">固有拓扑</Tab>
                            <Tab value="pspice">PSpice导入</Tab>
                            <Tab value="psim">PSim导入</Tab>
                        </TabList>

                        <ScrollArea className="w-full h-full">
                            {importMethod === "bundled" && (
                                <BundledList/>
                            )}

                            {(importMethod === "pspice" || importMethod === "psim") && (
                                <div
                                    className={cn(
                                        "p-4 rounded-[0.3em] border",
                                        isDarkMode ? "border-[#323232] bg-[#252525]" : "border-[#E6E6E6] bg-[#F5F5F5]",
                                    )}
                                >
                                    <p className={cn("text-sm mb-3", isDarkMode ? "text-[#CCCCCC]" : "text-[#616161]")}>
                                        导入 {importMethod === "pspice" ? "PSpice" : "PSim"} 文件：
                                    </p>
                                    <div className="grid gap-3">
                                        <Button
                                            className={cn(
                                                "w-full justify-start",
                                                isDarkMode
                                                    ? "bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white"
                                                    : "bg-white hover:bg-[#F5F5F5] text-black border border-[#E6E6E6]",
                                            )}
                                        >
                                            <FileInput className="w-4 h-4 mr-2"/>
                                            浏览文件...
                                        </Button>
                                        <div
                                            className={cn(
                                                "relative rounded-[0.3em] border-2 border-dashed h-24 flex flex-col items-center justify-center",
                                                isDarkMode ? "border-[#323232] bg-[#202020]" : "border-[#E6E6E6] bg-white",
                                            )}
                                        >
                                            <Upload
                                                className={cn("w-6 h-6 mb-2", isDarkMode ? "text-[#CCCCCC]" : "text-[#616161]")}/>
                                            <p className={cn("text-sm", isDarkMode ? "text-[#CCCCCC]" : "text-[#616161]")}>拖放文件到此处</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    <div
                        className={cn(
                            "p-3 rounded-[0.3em] text-sm",
                            isDarkMode ? "bg-[#0078D4]/10 text-[#CCCCCC]" : "bg-[#0078D4]/10 text-[#616161]",
                        )}
                    >
                        <div className="flex items-start">
                            <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"/>
                            <p>选择拓扑后，可以在右侧配置输入端口和输出数据参数。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

