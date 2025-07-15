import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}
export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      {" "}
      <TooltipPrimitive.Root>
        {" "}
        <TooltipPrimitive.Trigger asChild>
          {" "}
          {children}{" "}
        </TooltipPrimitive.Trigger>{" "}
        <TooltipPrimitive.Portal>
          {" "}
          <TooltipPrimitive.Content
            side={side}
            align={align}
            className="z-50 overflow-hidden rounded-lg bg-black/90 px-3 py-2 text-sm text-gray-900 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            {" "}
            {content} <TooltipPrimitive.Arrow className="fill-black/90" />{" "}
          </TooltipPrimitive.Content>{" "}
        </TooltipPrimitive.Portal>{" "}
      </TooltipPrimitive.Root>{" "}
    </TooltipPrimitive.Provider>
  );
}
