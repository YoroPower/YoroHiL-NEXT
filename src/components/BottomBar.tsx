"use client"

import type React from "react"
import {useState, useEffect} from "react"
import {Activity, Zap, Check, X, Settings, Grid, Maximize, Minimize, Sun, Moon, ChevronUp} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Slider} from "@/components/ui/slider"
import {Toggle} from "@/components/ui/toggle"
import {Separator} from "@/components/ui/separator"
import {useTheme} from "next-themes"
import {cn} from "@/lib/utils"

// VS Code 状态栏颜色 - 深色模式
const darkModeStatusColors = {
    default: "bg-[#007ACC]", // VS Code 默认蓝色
    ready: "bg-[#007ACC]", // VS Code 默认蓝色
    running: "bg-[#388A34]", // VS Code 成功绿色
    error: "bg-[#A1260D]", // VS Code 错误红色
    warning: "bg-[#8C6C41]", // VS Code 警告黄色
}

// VS Code 状态栏颜色 - 浅色模式
const lightModeStatusColors = {
    default: "bg-[#007ACC]", // VS Code 默认蓝色
    ready: "bg-[#007ACC]", // VS Code 默认蓝色
    running: "bg-[#388A34]", // VS Code 成功绿色
    error: "bg-[#A1260D]", // VS Code 错误红色
    warning: "bg-[#8C6C41]", // VS Code 警告黄色
}

// VS Code 状态栏文本颜色
const darkModeTextColors = {
    default: "text-white", // VS Code 状态栏文本颜色
    ready: "text-white", // VS Code 状态栏文本颜色
    running: "text-white", // VS Code 状态栏文本颜色
    stopped: "text-white/80", // VS Code 状态栏次要文本颜色
    error: "text-white", // VS Code 状态栏文本颜色
    warning: "text-white", // VS Code 状态栏文本颜色
}

// VS Code 状态栏文本颜色 - 浅色模式也使用白色文本
const lightModeTextColors = {
    default: "text-white", // VS Code 状态栏文本颜色
    ready: "text-white", // VS Code 状态栏文本颜色
    running: "text-white", // VS Code 状态栏文本颜色
    stopped: "text-white/80", // VS Code 状态栏次要文本颜色
    error: "text-white", // VS Code 状态栏文本颜色
    warning: "text-white", // VS Code 状态栏文本颜色
}

// 可配置的状态文本
const statusText = {
    ready: "就绪",
    running: "运行中",
    stopped: "已停止",
    connected: "已连接",
    disconnected: "未连接",
    verified: "已验证",
    warnings: "有警告",
    error: "错误",
}

// 单位选项
const unitOptions = [
    {value: "SI", label: "国际单位"},
    {value: "Imperial", label: "英制单位"},
    {value: "Scientific", label: "科学计数"},
]

// 网格大小选项
const gridSizeOptions = [
    {value: "Small", label: "小"},
    {value: "Medium", label: "中"},
    {value: "Large", label: "大"},
    {value: "None", label: "无"},
]

interface StatusBarItemProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

// 修改 StatusBarItem 组件的 hover 效果，使其更接近 VS Code
const StatusBarItem: React.FC<StatusBarItemProps> = ({children, onClick, className}) => {
    return (
        <div
            className={`flex items-center px-2 h-full text-xs hover:bg-white/20 cursor-pointer ${className || ""}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

// 状态类型
type StatusType = "default" | "ready" | "running" | "error" | "warning"

const BottomStatusBar = () => {
    const {theme, setTheme} = useTheme()
    const isDarkMode = theme === "dark"

    const [status, setStatus] = useState<StatusType>("ready")
    const [simulationRunning, setSimulationRunning] = useState(false)
    const [connected, setConnected] = useState(true)
    const [verified, setVerified] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [simulationSpeed, setSimulationSpeed] = useState([50])
    const [gridSize, setGridSize] = useState("Medium")
    const [zoomLevel, setZoomLevel] = useState(100)
    const [unit, setUnit] = useState("SI")

    // 根据当前状态更新底栏颜色
    useEffect(() => {
        if (hasError) {
            setStatus("error")
        } else if (simulationRunning) {
            setStatus("running")
        } else if (!verified) {
            setStatus("warning")
        } else {
            setStatus("ready")
        }
    }, [simulationRunning, verified, hasError])

    const toggleSimulation = () => {
        setSimulationRunning(!simulationRunning)
    }

    const toggleConnection = () => {
        setConnected(!connected)
    }

    const toggleTheme = () => {
        setTheme(isDarkMode ? "light" : "dark")
    }

    const toggleError = () => {
        setHasError(!hasError)
    }

    // 获取当前状态的背景颜色
    const getStatusBackgroundColor = () => {
        const colorSet = isDarkMode ? darkModeStatusColors : lightModeStatusColors
        return colorSet[status] || colorSet.default
    }

    // 获取当前文本颜色
    const getTextColor = (textStatus: keyof typeof darkModeTextColors) => {
        const colorSet = isDarkMode ? darkModeTextColors : lightModeTextColors
        return colorSet[textStatus] || colorSet.default
    }

    // 获取边框颜色
    const getBorderColor = () => {
        return "border-transparent"
    }

    return (
        <div
            className={cn(
                "flex items-center justify-between h-6 border-t transition-colors duration-300 bottom-0 fixed w-full z-50",
                getStatusBackgroundColor(),
                getBorderColor(),
            )}
        >
            {/* 左侧状态指示 */}
            <div className="flex h-full">
                <StatusBarItem
                    onClick={toggleSimulation}
                    className={simulationRunning ? getTextColor("running") : getTextColor("stopped")}
                >
                    <Zap className="w-3.5 h-3.5 mr-1"/>
                    <span>{simulationRunning ? statusText.running : statusText.stopped}</span>
                </StatusBarItem>

                <Separator orientation="vertical" className="h-4 my-auto mx-0.5 bg-white/30"/>

                <StatusBarItem
                    onClick={toggleConnection}
                    className={connected ? getTextColor("running") : getTextColor("error")}
                >
                    {connected ? <Check className="w-3.5 h-3.5 mr-1"/> : <X className="w-3.5 h-3.5 mr-1"/>}
                    <span>{connected ? statusText.connected : statusText.disconnected}</span>
                </StatusBarItem>

                <Separator orientation="vertical" className="h-4 my-auto mx-0.5 bg-white/30"/>

                <StatusBarItem
                    className={verified ? getTextColor("running") : getTextColor("warning")}
                    onClick={() => setVerified(!verified)}
                >
                    {verified ? <Check className="w-3.5 h-3.5 mr-1"/> : <Activity className="w-3.5 h-3.5 mr-1"/>}
                    <span>{verified ? statusText.verified : statusText.warnings}</span>
                </StatusBarItem>

                <Separator orientation="vertical" className="h-4 my-auto mx-0.5 bg-white/30"/>

                <StatusBarItem className={getTextColor("error")} onClick={toggleError}>
                    <X className={cn("w-3.5 h-3.5 mr-1", hasError ? "opacity-100" : "opacity-40")}/>
                    <span className={hasError ? "opacity-100" : "opacity-40"}>{statusText.error}</span>
                </StatusBarItem>
            </div>

            {/* 右侧设置项 */}
            <div className="flex h-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-full">
                            <StatusBarItem>
                                <span
                                    className="mr-1">{unitOptions.find((opt) => opt.value === unit)?.label || unit}</span>
                                <ChevronUp className="w-3 h-3"/>
                            </StatusBarItem>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        {unitOptions.map((option) => (
                            <DropdownMenuItem key={option.value} onClick={() => setUnit(option.value)}>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-full">
                            <StatusBarItem>
                                <Grid className="w-3.5 h-3.5 mr-1"/>
                                <span>{gridSizeOptions.find((opt) => opt.value === gridSize)?.label || gridSize}</span>
                            </StatusBarItem>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        {gridSizeOptions.map((option) => (
                            <DropdownMenuItem key={option.value} onClick={() => setGridSize(option.value)}>
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <StatusBarItem onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="w-3.5 h-3.5"/> : <Moon className="w-3.5 h-3.5"/>}
                </StatusBarItem>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-full">
                            <StatusBarItem>
                                <span>{zoomLevel}%</span>
                            </StatusBarItem>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 p-2">
                        <div className="flex items-center gap-2 px-2 py-1">
                            <Minimize className="w-3.5 h-3.5"/>
                            <Slider
                                value={[zoomLevel]}
                                min={25}
                                max={200}
                                step={5}
                                onValueChange={(value) => setZoomLevel(value[0])}
                                className="w-24"
                            />
                            <Maximize className="w-3.5 h-3.5"/>
                        </div>
                        <DropdownMenuItem onClick={() => setZoomLevel(100)}>重置缩放 (100%)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="h-full">
                            <StatusBarItem>
                                <Settings className="w-3.5 h-3.5"/>
                            </StatusBarItem>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2">
                        <div className="px-2 py-1.5 text-xs font-medium">模拟速度</div>
                        <div className="flex items-center gap-2 px-2 py-1 mb-2">
                            <Zap className="w-3.5 h-3.5 text-muted-foreground"/>
                            <Slider
                                value={simulationSpeed}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={setSimulationSpeed}
                                className="w-36"
                            />
                            <Zap className="w-3.5 h-3.5"/>
                        </div>
                        <Separator className="my-1"/>
                        <div className="px-2 py-1.5 text-xs font-medium">模拟选项</div>
                        <div className="grid grid-cols-2 gap-1 px-2 py-1">
                            <Toggle size="sm" aria-label="实时分析">
                                实时分析
                            </Toggle>
                            <Toggle size="sm" aria-label="显示电压">
                                显示电压
                            </Toggle>
                            <Toggle size="sm" aria-label="显示电流">
                                显示电流
                            </Toggle>
                            <Toggle size="sm" aria-label="自动验证">
                                自动验证
                            </Toggle>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default BottomStatusBar

