import { motion } from "framer-motion";
import { Camera, RotateCcw, ZoomIn, Maximize2 } from "lucide-react";

const controls = [
  { icon: Camera, label: "Capture", pos: "top-6 right-6" },
  { icon: RotateCcw, label: "Rotate", pos: "top-1/2 -translate-y-1/2 right-6" },
  { icon: ZoomIn, label: "Zoom", pos: "bottom-6 right-6" },
  { icon: Maximize2, label: "Fullscreen", pos: "bottom-6 left-6" },
];

const LivePreview = () => {
  return (
    <section id="experience" className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.6, 0, 0.4, 1] }}
        className="max-w-5xl mx-auto"
      >
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
            Live Experience
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] mt-4 text-foreground">
            Your AR Mirror
          </h2>
        </div>

        {/* AR Mirror Frame */}
        <div className="relative">
          {/* Animated border glow */}
          <div className="absolute -inset-[2px] rounded-[48px] bg-[conic-gradient(from_0deg,hsl(210_100%_65%/0.3),transparent_40%,transparent_60%,hsl(210_100%_65%/0.3))] animate-border-sweep opacity-60" />
          
          {/* Main frame */}
          <div className="relative bg-secondary/50 rounded-[48px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] border border-border/50">
            {/* Grid lines overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Center silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Body silhouette */}
                <div className="w-32 sm:w-48 h-64 sm:h-80 rounded-full bg-gradient-to-b from-accent/10 to-transparent border border-accent/20 flex items-center justify-center">
                  <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full border-2 border-accent/30 border-dashed animate-[spin_20s_linear_infinite]" />
                </div>
                {/* Scan lines */}
                <motion.div
                  animate={{ y: [-140, 140] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                />
              </div>
            </div>

            {/* Corner markers */}
            {[
              "top-8 left-8",
              "top-8 right-8 rotate-90",
              "bottom-8 left-8 -rotate-90",
              "bottom-8 right-8 rotate-180",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos}`}>
                <div className="w-6 h-6 border-l-2 border-t-2 border-accent/40" />
              </div>
            ))}

            {/* Floating controls */}
            {controls.map(({ icon: Icon, label, pos }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute ${pos} glass-panel rounded-2xl p-3 border border-border/30 hover:border-accent/40 transition-colors group`}
              >
                <Icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </motion.button>
            ))}

            {/* Status indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-panel rounded-full px-5 py-2 flex items-center gap-2 border border-border/30">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Ready</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LivePreview;
