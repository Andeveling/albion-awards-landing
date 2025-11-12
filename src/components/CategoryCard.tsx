import {
  IconBook,
  IconCamera,
  IconCrown,
  IconDeviceGamepad2,
  IconMoodAngry,
  IconMoodHappy,
  IconMovie,
  IconStar,
  IconSword,
  IconTrophy,
} from "@tabler/icons-react";
import React from "react";
import type { Category } from "../types/category";

interface CategoryCardProps {
  category: Category;
  index: number;
}

/**
 * Mapeo de iconos de Tabler
 */
const iconComponents: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  IconDeviceGamepad2,
  IconCamera,
  IconStar,
  IconCrown,
  IconTrophy,
  IconBook,
  IconMovie,
  IconSword,
  IconMoodHappy,
  IconMoodAngry,
};

/**
 * Card para mostrar una categoría individual con efecto glassmorphism
 */
export function CategoryCard({ category, index }: CategoryCardProps) {
  // Colores por categoría para variedad visual
  const colors = [
    'from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:border-amber-400/50',
    'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 hover:border-cyan-400/50',
    'from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400/50',
    'from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-400/50',
    'from-red-500/20 to-rose-500/20 border-red-500/30 hover:border-red-400/50',
    'from-blue-500/20 to-indigo-500/20 border-blue-500/30 hover:border-blue-400/50',
  ]

  // Gradientes de texto monocolor para cada tarjeta
  const textGradients = [
    'from-amber-400 to-orange-400',
    'from-cyan-400 to-blue-400',
    'from-purple-400 to-pink-400',
    'from-green-400 to-emerald-400',
    'from-red-400 to-rose-400',
    'from-blue-400 to-indigo-400',
  ]

  // Colores de iconos sólidos (sin bg-clip-text porque son SVG)
  const iconColors = [
    'text-amber-400',
    'text-cyan-400',
    'text-purple-400',
    'text-green-400',
    'text-red-400',
    'text-blue-400',
  ]

  const colorClass = colors[ index % colors.length ]
  const textGradient = textGradients[ index % textGradients.length ]
  const iconColor = iconColors[ index % iconColors.length ]

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-black/30 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/40 animate-slideInUp ${colorClass}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${colorClass.split(" ")[ 0 ]}`}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 bg-linear-to-br ${colorClass.split(" ")[ 0 ]} ${colorClass.split(" ")[ 1 ]}`}>
          {iconComponents[category.icon as keyof typeof iconComponents] ?
            React.createElement(iconComponents[category.icon as keyof typeof iconComponents], {
              size: 40,
              className: iconColor
            })
            : <span className="text-3xl">{category.icon}</span>
          }
        </div>

        {/* Name */}
        <h3 className={`text-xl font-bold uppercase tracking-wide text-transparent bg-linear-to-br ${textGradient} bg-clip-text md:text-2xl`}>
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 md:text-base">
          {category.description}
        </p>
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
