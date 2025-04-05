import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {useTheme} from "next-themes";
import {Tab, TabList} from "@fluentui/react-components";

// 拓扑选项
const topologyOptions = [
    {id: 1, name: "RC低通滤波器", category: "滤波器"},
    {id: 2, name: "RL高通滤波器", category: "滤波器"},
    {id: 3, name: "LC带通滤波器", category: "滤波器"},
    {id: 4, name: "运算放大器", category: "放大器"},
    {id: 5, name: "共射极放大器", category: "放大器"},
    {id: 6, name: "共基极放大器", category: "放大器"},
    {id: 7, name: "共集电极放大器", category: "放大器"},
    {id: 8, name: "差分放大器", category: "放大器"},
    {id: 9, name: "振荡器", category: "信号生成"},
    {id: 10, name: "整流器", category: "电源"},
    {id: 11, name: "稳压电源", category: "电源"},
    {id: 12, name: "开关电源", category: "电源"},
]

const BundledList = () => {
    const {theme} = useTheme()
    const isDarkMode = theme === "dark"
    const [selectedTopology, setSelectedTopology] = useState<number | null>(null)

    // 获取分组后的拓扑选项
    const getGroupedTopologies = () => {
        const grouped: Record<string, typeof topologyOptions> = {}

        topologyOptions.forEach((topology) => {
            if (!grouped[topology.category]) {
                grouped[topology.category] = []
            }
            grouped[topology.category].push(topology)
        })

        return grouped
    }

    const groupedTopologies = getGroupedTopologies()

    return (
        <div
            className={cn(
                "rounded-[0.3em] overflow-hidden border",
                isDarkMode ? "border-[#323232]" : "border-[#E6E6E6]",
            )}
        >
            {Object.entries(groupedTopologies).map(([category, topologies]) => (
                <TabList key={category} className="mb-1 last:mb-0" appearance="subtle" vertical={true}>
                    <div
                        className={cn(
                            "px-3 py-2 text-xs font-medium",
                            isDarkMode ? "bg-[#2D2D2D] text-[#CCCCCC]" : "bg-[#F0F0F0] text-[#616161]",
                        )}
                    >
                        {category}
                    </div>
                    {topologies.map((topology) => (
                        <Tab
                            key={topology.id}
                            className={cn("flex items-center justify-between my-0.5")}
                            value={topology.id}
                            onClick={() => setSelectedTopology(topology.id)}
                            icon={
                                <div
                                    className={cn(
                                        "mr-2 text-xs rounded-full w-3 h-3 flex items-center justify-center",
                                        isDarkMode ? "bg-[#3D3D3D] text-white" : "bg-[#E1E1E1] text-black",
                                    )}
                                >
                                    {topology.id}
                                </div>
                            }
                        >
                            <div className={selectedTopology === topology.id ? "font-bold" : ""}>{topology.name}</div>
                        </Tab>
                    ))}
                </TabList>
            ))}
        </div>
    );
};

export default React.memo(BundledList);