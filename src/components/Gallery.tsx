import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const galleryItems = [
  { name: "Structured Blazer", category: "Outerwear", color: "from-accent/20 to-secondary", aiScore: "97.3%" },
  { name: "Draped Silk Top", category: "Tops", color: "from-muted to-accent/10", aiScore: "98.1%" },
  { name: "Tailored Trousers", category: "Bottoms", color: "from-secondary to-muted", aiScore: "96.8%" },
  { name: "Oversized Coat", category: "Outerwear", color: "from-accent/15 to-card", aiScore: "99.2%" },
  { name: "Knit Dress", category: "Dresses", color: "from-card to-accent/10", aiScore: "97.9%" },
  { name: "Technical Jacket", category: "Outerwear", color: "from-muted to-secondary", aiScore: "98.5%" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium inline-flex items-center gap-2">
            <Sparkles size={12} />
            Collection
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mt-4 text-foreground">
            Explore Styles
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.6, 0, 0.4, 1] }}
              whileHover={{ y: -5 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-border/20 hover:border-accent/20 transition-colors duration-500"
            >
              {/* Placeholder gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:scale-105 transition-transform duration-700 ease-out`} />
              
              {/* Abstract fashion shape */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-700">
                <div className="w-28 h-44 rounded-[40%] border border-foreground/20 rotate-12 group-hover:rotate-3 transition-transform duration-700" />
              </div>

              {/* AI badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="absolute top-4 left-4 glass-panel rounded-full px-3 py-1 flex items-center gap-1.5 border border-border/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Sparkles size={10} className="text-accent" />
                <span className="text-[10px] text-accent font-medium">{item.aiScore} fit</span>
              </motion.div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Product info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {item.name}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-3 px-4 py-2 rounded-full bg-accent/20 text-accent text-xs font-medium tracking-wide border border-accent/30 hover:bg-accent/30 transition-colors"
                >
                  Try On
                </motion.button>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-accent/0 group-hover:border-accent/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
