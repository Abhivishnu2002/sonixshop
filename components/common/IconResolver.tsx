"use client";

import React from "react";
import * as Icons from "lucide-react";

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({
  name,
  className = "w-5 h-5",
  size,
}) => {
  // Safe resolver from all imported icons
  const LucideIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];

  if (!LucideIcon) {
    // Return standard Sparkles as fallback
    return <Icons.Sparkles className={className} size={size} />;
  }

  return <LucideIcon className={className} size={size} />;
};

export default IconResolver;
