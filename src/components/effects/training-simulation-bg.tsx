import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TrainingSimulationBg — Shows rolling loss/accuracy logs.
 * Minimalist and high-impact.
 */

const TrainingSimulationBg = () => {
    const [logs, setLogs] = useState<{ id: number; text: string }[]>([]);
    const [epoch, setEpoch] = useState(1);
    const [loss, setLoss] = useState(0.854);
    const [acc, setAcc] = useState(0.12);

    useEffect(() => {
        const interval = setInterval(() => {
            setEpoch(prev => prev + 1);
            setLoss(prev => Math.max(0.012, prev - Math.random() * 0.05));
            setAcc(prev => Math.min(0.998, prev + Math.random() * 0.04));

            const newLog = {
                id: Date.now(),
                text: `Epoch ${epoch}: loss=${loss.toFixed(4)}, accuracy=${acc.toFixed(4)}`,
            };

            setLogs(prev => {
                const next = [...prev, newLog];
                if (next.length > 5) return next.slice(1);
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [epoch, loss, acc]);

    return (
        <div className="absolute top-32 right-10 pointer-events-none select-none text-left hidden lg:block">
            <div className="font-mono text-[10px] text-teal-500/40 uppercase tracking-widest mb-2">
                Running Simulation...
            </div>
            <div className="font-mono text-[11px] space-y-1">
                <AnimatePresence mode="popLayout">
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            className="text-purple-500/30"
                        >
                            {log.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Visual Progress Minibar */}
            <div className="mt-4 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-teal-500/20"
                    animate={{ width: `${acc * 100}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>
        </div>
    );
};

export default TrainingSimulationBg;
