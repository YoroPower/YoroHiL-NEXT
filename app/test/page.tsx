import * as React from "react"
import { ThemeProvider } from 'next-themes'
import { ThemeSwitcher } from '@/components/theme-switcher'

function SelectDemo() {
  return (
    <ThemeProvider attribute="class">
      <ThemeSwitcher />
    </ThemeProvider>
  )
}

export default SelectDemo