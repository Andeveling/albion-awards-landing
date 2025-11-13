import { motion, useScroll, useTransform } from "motion/react";

/**
 * Parallax background component for the entire page
 * - Covers the full viewport
 * - Moves slower than content (parallax effect)
 * - Scales up on scroll
 * - Overlay darkens on scroll
 */
export function ParallaxBackground() {
  // Use page scroll instead of target ref to avoid hydration issues
  const { scrollY } = useScroll();

  // Transform values based on scroll position
  const backgroundY = useTransform(scrollY, [ 0, 2000 ], [ "0%", "7%" ]);
  const backgroundScale = useTransform(scrollY, [ 0, 1000 ], [ 1, 1.15 ]);
  const overlayOpacity = useTransform(scrollY, [ 0, 500, 1000 ], [ 0.6, 0.75, 0.85 ]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/bg-albion.webp)",
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        {/* Overlay with dynamic opacity */}
        <motion.div
          className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80"
          style={{
            opacity: overlayOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}
