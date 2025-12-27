import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  stats: string;
  icon: LucideIcon;
  status: "Completed" | "Ongoing" | "Periodic" | "Development";
  delay: number;
}

const statusColors = {
  Completed: "bg-green-500/10 text-green-500 border-green-500/20",
  Ongoing: "bg-primary/10 text-primary border-primary/20",
  Periodic: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Development: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const statusLabels = {
  Completed: "Zrealizowane",
  Ongoing: "W trakcie",
  Periodic: "Cykliczne",
  Development: "Rozwój",
};

export function ChallengeCard({ title, description, stats, icon: Icon, status, delay }: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative h-full bg-card border border-white/5 p-8 overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
        <Icon size={120} />
      </div>

      <div className={`inline-flex px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-6 border ${statusColors[status]}`}>
        {statusLabels[status]}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-3xl font-bold text-white/90 mb-4 font-display tracking-tight">
          {stats}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
