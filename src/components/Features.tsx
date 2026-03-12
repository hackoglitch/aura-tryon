import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Crosshair, Layers, Target, RotateCcw, Activity } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "Sub-millimeter Body Tracking",
    description: "Precision mesh mapping captures your body contours with sub-millimeter accuracy for perfect garment alignment.",
  },
  {
    icon: Layers,
    title: "Physics-based Fabric Simulation",
    description: "Real-time cloth dynamics simulate how every fabric drapes, stretches, and folds naturally on your body.",
  },
  {
    icon: Target,
    title: "99.2% Size Accuracy",
    description: "AI-powered measurement engine delivers near-perfect sizing recommendations across 200+ brand patterns.",
  },
  {
    icon: RotateCcw,
    title: "Natural Rotation Tracking",
    description: "360° body tracking maintains garment fidelity as you turn, twist, and move in real-time.",
  },
  {
    icon: Activity,
    title: "Smart Motion Stability",
    description: "Advanced stabilization algorithms ensure smooth, jitter-free rendering even during rapid movement.",
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

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
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.6, 0, 0.4, 1] }}
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
      {isHovered && (
        <motion.div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, hsl(210 100% 65% / 0.08), transparent 60%)`,
          }}
        />
      )}

      <div className="glass-panel rounded-2xl p-8 h-full shadow-xl shadow-background/50 relative overflow-hidden">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500">
          <Icon size={22} className="text-accent" />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
            Technology
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mt-4 text-foreground">
            Intelligent by Design
          </h2>
        </motion.div>

        {/* Feature grid — offset layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={feature.title} className={i === 3 ? "lg:col-start-1" : i === 4 ? "lg:col-start-2" : ""}>
              <FeatureCard feature={feature} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
