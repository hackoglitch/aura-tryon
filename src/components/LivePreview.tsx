import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, ZoomIn, Maximize2, Sparkles, ChevronUp, ChevronDown, Heart, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const controls = [
  { icon: Camera, label: "Capture", pos: "top-6 left-6" },
  { icon: RotateCcw, label: "Rotate", pos: "top-1/2 -translate-y-1/2 left-6" },
  { icon: ZoomIn, label: "Zoom", pos: "bottom-6 left-6" },
  { icon: Maximize2, label: "Fullscreen", pos: "bottom-6 left-20" },
  { icon: Sparkles, label: "AI Enhance", pos: "top-20 left-6" },
];

const dresses = [
  { id: 1, name: "Midnight Velvet Gown", category: "Evening", gradient: "from-accent/30 via-secondary to-accent/10", price: "$1,280" },
  { id: 2, name: "Silk Drape Midi", category: "Cocktail", gradient: "from-muted via-accent/15 to-secondary", price: "$890" },
  { id: 3, name: "Structured Blazer Dress", category: "Formal", gradient: "from-secondary via-muted to-accent/20", price: "$1,150" },
  { id: 4, name: "Flowing Chiffon Maxi", category: "Casual", gradient: "from-accent/20 via-card to-muted", price: "$720" },
  { id: 5, name: "Asymmetric Wrap", category: "Modern", gradient: "from-card via-accent/15 to-secondary", price: "$960" },
  { id: 6, name: "Pleated Satin Mini", category: "Party", gradient: "from-accent/25 via-muted to-card", price: "$680" },
  { id: 7, name: "Embroidered Tulle", category: "Bridal", gradient: "from-muted via-secondary to-accent/15", price: "$2,400" },
  { id: 8, name: "Tech-Knit Bodycon", category: "Active", gradient: "from-secondary via-accent/20 to-muted", price: "$540" },
  { id: 9, name: "Oversized Shirt Dress", category: "Casual", gradient: "from-card via-muted to-accent/10", price: "$480" },
  { id: 10, name: "Sequin Column Gown", category: "Gala", gradient: "from-accent/30 via-secondary to-card", price: "$3,200" },
  { id: 11, name: "Linen A-Line", category: "Summer", gradient: "from-muted via-card to-accent/15", price: "$420" },
  { id: 12, name: "Leather Corset Dress", category: "Edgy", gradient: "from-secondary via-accent/20 to-muted", price: "$1,580" },
];

const LivePreview = () => {
  const [selectedDress, setSelectedDress] = useState(dresses[0]);
  const [isApplying, setIsApplying] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelectDress = (dress: typeof dresses[0]) => {
    setSelectedDress(dress);
    setIsApplying(true);
    setTimeout(() => setIsApplying(false), 1500);
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const scrollDresses = (direction: "up" | "down") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: direction === "down" ? 200 : -200, behavior: "smooth" });
    }
  };

  return (
    <section id="experience" className="relative py-32 px-6">
      {/* Background AI grid effect */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(hsl(210 100% 65%) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.6, 0, 0.4, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Section label */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-accent font-medium inline-flex items-center gap-2"
          >
            <Sparkles size={12} />
            AI-Powered Experience
            <Sparkles size={12} />
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] mt-4 text-foreground">
            Your AR Mirror
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm">
            Select a garment and watch AI fit it to your body in real-time
          </p>
        </div>

        {/* Main layout: AR Frame + Dress Panel */}
        <div className="flex gap-5 items-stretch">
          {/* AR Mirror Frame */}
          <div className="relative flex-1 min-w-0">
            {/* Animated border glow */}
            <div className="absolute -inset-[2px] rounded-[32px] sm:rounded-[48px] bg-[conic-gradient(from_0deg,hsl(210_100%_65%/0.4),transparent_30%,hsl(250_80%_60%/0.2)_50%,transparent_70%,hsl(210_100%_65%/0.4))] animate-border-sweep opacity-60" />
            
            {/* Main frame */}
            <div className="relative bg-secondary/30 rounded-[32px] sm:rounded-[48px] overflow-hidden aspect-[3/4] sm:aspect-[4/3] border border-border/50">
              {/* Grid lines overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Center silhouette with dress overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Body silhouette */}
                  <div className="w-28 sm:w-44 h-56 sm:h-72 rounded-[40%_40%_45%_45%] bg-gradient-to-b from-accent/8 to-transparent border border-accent/15 flex items-center justify-center relative overflow-hidden">
                    {/* Dress overlay effect */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedDress.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.6, 0, 0.4, 1] }}
                        className={`absolute inset-0 bg-gradient-to-b ${selectedDress.gradient} rounded-[40%_40%_45%_45%]`}
                      />
                    </AnimatePresence>

                    {/* Inner head circle */}
                    <div className="absolute top-3 sm:top-4 w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-accent/20 bg-accent/5" />

                    {/* Tracking circles */}
                    <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-accent/20 border-dashed animate-[spin_20s_linear_infinite]" />
                    
                    {/* Measurement points */}
                    {[
                      "top-1/4 left-0", "top-1/4 right-0",
                      "top-1/2 left-1", "top-1/2 right-1",
                      "bottom-1/3 left-2", "bottom-1/3 right-2",
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-accent`}
                      />
                    ))}
                  </div>

                  {/* Scan line */}
                  <motion.div
                    animate={{ y: [-130, 130] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/70 to-transparent"
                  />

                  {/* AI processing indicator */}
                  <AnimatePresence>
                    {isApplying && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 glass-panel rounded-full px-4 py-1.5 border border-accent/30 whitespace-nowrap"
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles size={12} className="text-accent" />
                          </motion.div>
                          <span className="text-[10px] uppercase tracking-[0.15em] text-accent">Fitting...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Corner markers */}
              {[
                "top-6 left-6",
                "top-6 right-6 rotate-90",
                "bottom-6 left-6 -rotate-90",
                "bottom-6 right-6 rotate-180",
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos}`}>
                  <div className="w-5 h-5 border-l-2 border-t-2 border-accent/40" />
                </div>
              ))}

              {/* Floating controls */}
              {controls.map(({ icon: Icon, label, pos }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px -4px hsl(210 100% 65% / 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute ${pos} glass-panel rounded-xl p-2.5 border border-border/30 hover:border-accent/40 transition-all duration-300 group hidden sm:flex`}
                >
                  <Icon size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.button>
              ))}

              {/* Status bar */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-5 py-2 flex items-center gap-3 border border-border/30">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  {isApplying ? "Processing" : "Ready"}
                </span>
                <div className="w-px h-3 bg-border/50" />
                <span className="text-[10px] text-accent tracking-widest uppercase">{selectedDress.category}</span>
              </div>

              {/* AI confidence */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-4 py-1.5 border border-border/30 flex items-center gap-3"
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Fit Score</span>
                <span className="text-xs text-accent font-semibold">98.7%</span>
                <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "98.7%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.6, 0, 0.4, 1] }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Dress Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.6, 0, 0.4, 1] }}
            className="w-56 sm:w-64 lg:w-72 flex-shrink-0 flex flex-col"
          >
            {/* Panel header */}
            <div className="glass-panel rounded-t-2xl border border-border/30 border-b-0 px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Collection</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{dresses.length} items</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => scrollDresses("up")}
                  className="p-1 rounded-md hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => scrollDresses("down")}
                  className="p-1 rounded-md hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Scrollable dress list */}
            <div className="glass-panel rounded-b-2xl border border-border/30 border-t-0 flex-1 min-h-0 overflow-hidden">
              <div
                ref={scrollRef}
                className="h-[500px] sm:h-[520px] overflow-y-auto scrollbar-thin pr-1"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "hsl(210 100% 65% / 0.3) transparent",
                }}
              >
                <div className="p-3 space-y-2.5">
                  {dresses.map((dress, i) => (
                    <motion.div
                      key={dress.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5, ease: [0.6, 0, 0.4, 1] }}
                      whileHover={{ scale: 1.02, x: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectDress(dress)}
                      className={`relative rounded-xl cursor-pointer overflow-hidden transition-all duration-300 group ${
                        selectedDress.id === dress.id
                          ? "ring-1 ring-accent/50 shadow-lg shadow-accent/10"
                          : "hover:ring-1 hover:ring-border/50"
                      }`}
                    >
                      {/* Dress preview card */}
                      <div className={`aspect-[4/3] bg-gradient-to-br ${dress.gradient} relative`}>
                        {/* Abstract dress shape */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-14 rounded-[30%] border border-foreground/10 group-hover:border-foreground/20 transition-colors" />
                        </div>

                        {/* Like button */}
                        <button
                          onClick={(e) => toggleLike(dress.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Heart
                            size={12}
                            className={liked.has(dress.id) ? "fill-accent text-accent" : "text-muted-foreground"}
                          />
                        </button>

                        {/* Quick view */}
                        <div className="absolute bottom-2 right-2 p-1.5 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                          <Eye size={12} className="text-muted-foreground" />
                        </div>

                        {/* Selected indicator */}
                        {selectedDress.id === dress.id && (
                          <motion.div
                            layoutId="selected-dress"
                            className="absolute inset-0 border-2 border-accent/40 rounded-xl"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-2.5 bg-card/80">
                        <p className="text-xs font-medium text-foreground truncate">{dress.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{dress.category}</span>
                          <span className="text-[10px] text-accent font-semibold">{dress.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Try on button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px -6px hsl(210 100% 65% / 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full bg-accent text-accent-foreground py-3 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <Sparkles size={14} className="group-hover:animate-[spin_1s_ease-in-out]" />
              Try On Now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LivePreview;
