
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-[350px] w-full", className)}
    {...props}
  />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, any>
  }
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-[350px] w-full", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: any[]
    label?: string
  }
>(({ className, active, payload, label, ...props }, ref) => {
  if (!active || !payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      {label && (
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">{label}</span>
        </div>
      )}
      {payload.map((item: any, index: number) => (
        <div key={index} className="grid grid-cols-2 gap-2">
          <span className="text-muted-foreground">
            {item.name || item.dataKey}:
          </span>
          <span className="font-medium text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: any[]
    label?: string
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(({ 
  className, 
  active, 
  payload, 
  label, 
  hideLabel = false,
  hideIndicator = false,
  ...props 
}, ref) => {
  if (!active || !payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      {!hideLabel && label && (
        <div className="mb-2 font-medium">{label}</div>
      )}
      <div className="grid gap-2">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            {!hideIndicator && (
              <div 
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-muted-foreground">
                {item.name || item.dataKey}
              </span>
              <span className="font-medium text-foreground">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: any[]
  }
>(({ className, payload, ...props }, ref) => {
  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: any[]
    nameKey?: string
    hideIcon?: boolean
  }
>(({ className, payload, hideIcon = false, ...props }, ref) => {
  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {!hideIcon && (
            <div 
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span className="text-sm text-muted-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}
