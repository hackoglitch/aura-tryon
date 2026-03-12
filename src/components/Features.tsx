import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Crosshair, Layers, Target, RotateCcw, Activity, Brain, Cpu, Scan } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "Sub-millimeter Body Tracking",
    description: "Precision mesh mapping captures your body contours with sub-millimeter accuracy for perfect garment alignment.",
    stat: "0.3mm",
    statLabel: "Precision",
  },
  {
    icon: Layers,
    title: "Physics-based Fabric Simulation",
    description: "Real-time cloth dynamics simulate how every fabric drapes, stretches, and folds naturally on your body.",
    stat: "60fps",
    statLabel: "Render",
  },
  {
    icon: Target,
    title: "99.2% Size Accuracy",
    description: "AI-powered measurement engine delivers near-perfect sizing recommendations across 200+ brand patterns.",
    stat: "99.2%",
    statLabel: "Accuracy",
  },
  {
    icon: Brain,
    title: "Neural Style Transfer",
    description: "Deep learning models understand fabric texture, color, and pattern to render photorealistic garment previews.",
    stat: "4.2B",
    statLabel: "Parameters",
  },
  {
    icon: RotateCcw,
    title: "Natural Rotation Tracking",
    description: "360° body tracking maintains garment fidelity as you turn, twist, and move in real-time.",
    stat: "360°",
    statLabel: "Coverage",
  },
  {
    icon: Activity,
    title: "Smart Motion Stability",
    description: "Advanced stabilization algorithms ensure smooth, jitter-free rendering even during rapid movement.",
    stat: "<8ms",
    statLabel: "Latency",
  },
  {
    icon: Cpu,
    title: "Edge AI Processing",
    description: "On-device neural inference ensures privacy-first computing with zero cloud latency for instant results.",
    stat: "12T",
    statLabel: "TOPS",
  },
  {
    icon: Scan,
    title: "Adaptive Mesh Generation",
    description: "Dynamic polygon refinement creates optimal body meshes that adapt to posture and movement patterns.",
    stat: "50K",
    statLabel: "Polygons",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.6, 0, 0.4, 1] }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      {/* Radial glow following cursor */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(500px circle at ${x}% ${y}%, hsl(210 100% 65% / ${isHovered ? 0.1 : 0}), transparent 60%)`
          ),
        }}
      />

      <div className="glass-panel rounded-2xl p-7 h-full shadow-xl shadow-background/50 relative overflow-hidden border border-border/10 group-hover:border-accent/15 transition-colors duration-500">
        {/* Background circuit pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-accent">
            <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.3" />
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Icon + stat */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_-4px_hsl(210_100%_65%/0.3)] transition-all duration-500"
          >
            <Icon size={20} className="text-accent" />
          </motion.div>

          {/* Stat badge */}
          <div className="text-right">
            <div className="text-lg font-bold text-accent leading-none">{feature.stat}</div>
            <div className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">{feature.statLabel}</div>
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground mb-2.5 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 group-hover:via-accent/30 to-transparent transition-all duration-700" />
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6">
      {/* Background neural pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium inline-flex items-center gap-2">
            <Cpu size={12} />
            AI Technology
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mt-4 text-foreground">
            Intelligent by Design
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
            Eight core AI systems working in harmony to deliver the most realistic virtual try-on experience ever built.
          </p>
        </motion.div>

        {/* Feature grid — 4 columns on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
