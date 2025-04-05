'use client'

import * as React from 'react'
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
    useTheme,
} from 'next-themes'
import {FluentProvider, webDarkTheme, webLightTheme} from "@fluentui/react-components";

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    const {resolvedTheme} = useTheme();
    const theme = resolvedTheme === 'dark' ? webDarkTheme : webLightTheme;

    return <NextThemesProvider {...props}>
        <FluentProvider theme={theme}>
            {children}
        </FluentProvider>
    </NextThemesProvider>
}