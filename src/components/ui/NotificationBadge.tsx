import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[11px] font-medium",
  {
    variants: {
      variant: {
        default: "bg-purple-500 text-white",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface NotificationBadgeProps extends VariantProps<typeof badgeVariants> {
  count: number;
  className?: string;
}

export function NotificationBadge({
  count,
  variant,
  className,
}: NotificationBadgeProps) {
  if (!count) return null;

  return (
    <div className={cn(badgeVariants({ variant }), className)}>
      {count > 99 ? "99+" : count}
    </div>
  );
}
