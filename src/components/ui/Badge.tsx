import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "metric" | "tech";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    metric: "bg-violet-100 text-violet-700 font-semibold",
    tech: "bg-gray-50 text-gray-600 border border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
