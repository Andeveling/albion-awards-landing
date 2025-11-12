import { motion } from "motion/react";

/**
 * Creator Program Badge - Static centered with light effects
 * - Centered position
 * - Background light effects
 * - Multiple rotating particles around the badge
 */
export function CreatorBadge() {
  return (
    <div className="relative mb-6 flex justify-center md:mb-8">
      <div className="relative">
        {/* Background Light Effects - Layer 1 */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-56 md:w-56 lg:h-64 lg:w-64"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 30%, rgba(217, 119, 6, 0.1) 60%, transparent 100%)",
            filter: "blur(20px)",
          }}
          animate={{
            scale: [ 1, 1.2, 1 ],
            opacity: [ 0.4, 0.7, 0.4 ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Background Light Effects - Layer 2 */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-48 md:w-48 lg:h-52 lg:w-52"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(245, 158, 11, 0.3) 40%, transparent 70%)",
            filter: "blur(15px)",
          }}
          animate={{
            scale: [ 1.1, 1.3, 1.1 ],
            opacity: [ 0.5, 0.8, 0.5 ],
            rotate: [ 0, 180, 360 ],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Background Light Effects - Layer 3 - Pulse */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-40 md:w-40"
          style={{
            background:
              "radial-gradient(circle, rgba(253, 224, 71, 0.6) 0%, rgba(251, 191, 36, 0.4) 30%, transparent 60%)",
            filter: "blur(10px)",
          }}
          animate={{
            scale: [ 1, 1.5, 1 ],
            opacity: [ 0.6, 0.9, 0.6 ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Main Badge */}
        <motion.figure
          className="relative z-10 max-w-32 md:max-w-40"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1.2,
          }}
        >
          <motion.img
            src="/creator_badge.webp"
            alt="Creator Program Badge"
            className="relative z-10 drop-shadow-2xl"
            whileHover={{
              scale: 1.1,
              rotate: [ 0, -5, 5, -5, 0 ],
              filter:
                "brightness(1.2) drop-shadow(0 0 25px rgba(251, 191, 36, 0.8))",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          />

          {/* Inner Glow around badge */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)",
            }}
            animate={{
              scale: [ 1, 1.2, 1 ],
              opacity: [ 0.4, 0.7, 0.4 ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.figure>

        {/* Sparkle particles - Ring 1 (Close) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 md:h-48 md:w-48"
          animate={{
            rotate: [ 0, 360 ],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
          <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50" />
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/50" />
          <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
        </motion.div>

        {/* Sparkle particles - Ring 2 (Medium) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 md:h-60 md:w-60"
          animate={{
            rotate: [ 360, 0 ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-amber-500 opacity-80 shadow-md shadow-amber-500/40" />
          <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-yellow-400 opacity-70 shadow-md shadow-yellow-400/40" />
          <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-amber-400 opacity-75 shadow-md shadow-amber-400/40" />
          <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-yellow-300 opacity-80 shadow-md shadow-yellow-300/40" />
          <div className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-300 opacity-60 shadow-sm shadow-amber-300/30" />
          <div className="absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yellow-200 opacity-70 shadow-sm shadow-yellow-200/30" />
        </motion.div>

        {/* Sparkle particles - Ring 3 (Outer) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 md:h-72 md:w-72"
          animate={{
            rotate: [ 0, 360 ],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute left-0 top-1/3 h-1 w-1 rounded-full bg-amber-400 opacity-50 shadow-sm shadow-amber-400/30" />
          <div className="absolute right-0 top-2/3 h-1.5 w-1.5 rounded-full bg-yellow-300 opacity-60 shadow-sm shadow-yellow-300/30" />
          <div className="absolute left-1/3 top-0 h-1 w-1 rounded-full bg-amber-300 opacity-40 shadow-sm shadow-amber-300/20" />
          <div className="absolute bottom-0 right-1/3 h-1.5 w-1.5 rounded-full bg-yellow-400 opacity-55 shadow-sm shadow-yellow-400/30" />
          <div className="absolute right-8 top-8 h-1 w-1 rounded-full bg-amber-200 opacity-50" />
          <div className="absolute bottom-8 left-8 h-1 w-1 rounded-full bg-yellow-200 opacity-45" />
        </motion.div>

        {/* Random floating sparkles */}
        <motion.div
          className="pointer-events-none absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-amber-400"
          animate={{
            y: [ 0, -10, 0 ],
            opacity: [ 0, 0.8, 0 ],
            scale: [ 0, 1, 0 ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-1/4 right-1/4 h-1.5 w-1.5 rounded-full bg-yellow-300"
          animate={{
            y: [ 0, -15, 0 ],
            opacity: [ 0, 0.9, 0 ],
            scale: [ 0, 1.2, 0 ],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      </div>
    </div>
  );
}
