import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionHeading({ title, subtitle, alignment = "left" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-20 ${
      alignment === "center" ? "text-center" : 
      alignment === "right" ? "text-right" : "text-left"
    }`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase leading-tight"
      >
        {title}
        <span className="block w-24 h-1 bg-primary mt-4" style={{
          marginLeft: alignment === "center" ? "auto" : 0,
          marginRight: alignment === "center" ? "auto" : alignment === "right" ? 0 : "auto"
        }} />
      </motion.h2>
    </div>
  );
}
