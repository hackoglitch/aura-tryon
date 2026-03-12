import { motion } from "framer-motion";

const footerLinks = [
  { group: "Product", links: ["Virtual Try-On", "Size Guide", "How It Works"] },
  { group: "Company", links: ["About", "Careers", "Press"] },
  { group: "Support", links: ["Help Center", "Contact", "Privacy"] },
];

const socials = ["X", "IG", "LI"];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-[-0.04em] text-foreground font-[Space_Grotesk]">
              VTRYON
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">
              Next-generation AI fashion mirror. Try before you buy, reimagined.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.group}>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium block mb-4">
                {group.group}
              </span>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            © 2026 VTRYON. All rights reserved.
          </span>

          <div className="flex gap-4">
            {socials.map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-xs text-muted-foreground hover:text-accent hover:border-accent/40 hover:shadow-[0_0_16px_-4px_hsl(210_100%_65%/0.4)] transition-all duration-300"
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
