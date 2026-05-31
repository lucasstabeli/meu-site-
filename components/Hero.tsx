"use client";

import { motion } from "framer-motion";
import { FloatingPaths } from "@/components/ui/background-paths";

const WORDS = ["Stabeli", "Studio."];

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />

            {/* Glow radial sutil no centro para o texto respirar */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.85) 0%, transparent 100%)" }} />

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-3xl mx-auto flex flex-col items-center gap-6"
                >
                    {/* Tag */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-[10px] font-semibold tracking-[3px] uppercase text-neutral-400"
                    >
                        Design · Desenvolvimento · Resultado
                    </motion.p>

                    {/* Título */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
                        {WORDS.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-3 last:mr-0">
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 60, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: wordIndex * 0.12 + letterIndex * 0.035,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block"
                                        style={{
                                            color: wordIndex === 0 ? "#0f0f0f" : "#a3a3a3",
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {/* Subtítulo */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.7 }}
                        className="text-base md:text-lg font-normal text-neutral-500 max-w-[440px] leading-relaxed"
                    >
                        Transformamos suas ideias em sites e aplicativos que impressionam,
                        convertem e escalam com seu negócio.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.05, duration: 0.7 }}
                        className="flex gap-3 justify-center flex-wrap"
                    >
                        <a
                            href="#services"
                            className="text-sm font-semibold text-white bg-black px-8 py-3.5 rounded-full
                                       hover:bg-neutral-800 transition-all duration-200 hover:scale-[1.04]
                                       inline-block no-underline"
                        >
                            Ver serviços
                        </a>
                        <a
                            href="#contact"
                            className="text-sm font-semibold text-neutral-800 bg-transparent px-8 py-3.5 rounded-full
                                       border border-neutral-300 hover:border-neutral-700
                                       transition-all duration-200 hover:scale-[1.04]
                                       inline-block no-underline"
                        >
                            Fale comigo
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
