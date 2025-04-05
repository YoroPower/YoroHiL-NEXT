import type {Metadata} from 'next'
import '@/common/style/globals.css'
import {ThemeProvider} from '@/components/theme-provider';
import ClientOnly from '@/components/theme-switcher/ClientOnly';
import BottomBar from "@/components/BottomBar";
import {LeftSidebar} from "@/components/sidebar/LeftSidebar";
import React from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import RightSideBar from "@/components/sidebar/RightSideBar";
import {ScrollArea} from "@/components/ui/scroll-area";

export const metadata: Metadata = {
    title: 'v0 App',
    description: 'Created with v0',
    generator: 'v0.dev',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                {/*<ClientOnly>*/}
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <main className="w-full h-screen">
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="w-full h-full"
                        >
                            <ResizablePanel defaultSize={20}>
                                <LeftSidebar/>
                            </ResizablePanel>
                            <ResizableHandle/>
                            <ResizablePanel defaultSize={80}>
                                <ResizablePanelGroup direction="vertical">
                                    <ResizablePanel defaultSize={75}>
                                        <ResizablePanelGroup direction="horizontal">
                                            <ResizablePanel defaultSize={80}>
                                                {children}
                                            </ResizablePanel>
                                            <ResizableHandle/>
                                            <ResizablePanel defaultSize={20}>
                                                <RightSideBar/>
                                            </ResizablePanel>
                                        </ResizablePanelGroup>
                                    </ResizablePanel>
                                    <ResizableHandle/>
                                    <ResizablePanel defaultSize={25}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Three</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </main>
                    <BottomBar/>
                </ThemeProvider>
                {/*</ClientOnly>*/}
            </body>
        </html>
    )
}
