"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    CheckCircle,
    Rocket,
    Zap,
    Shield,
    Cloud,
    Users,
    ArrowRight,
    Star,
    Calendar,
    Bell,
    BarChart,
    Mail
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, type: "spring" as const, stiffness: 100 }
    }
};

// Hero Illustration Component
const HeroIllustration = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
    >
        <div className="relative w-full h-64 md:h-96">
            <svg
                className="w-full h-full"
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background circles */}
                <motion.circle
                    cx="250"
                    cy="200"
                    r="180"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                    cx="250"
                    cy="200"
                    r="140"
                    fill="url(#gradient2)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Checkmark */}
                <motion.path
                    d="M180 200 L230 250 L320 150"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Floating particles */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.circle
                        key={i}
                        cx={250 + Math.sin(i) * 120}
                        cy={200 + Math.cos(i * 2) * 100}
                        r="4"
                        fill="#0EA5E9"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    />
                ))}

                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay }: any) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-white dark:bg-trueGray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-trueGray-800 hover:border-sky-500/50"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </motion.div>
    );
};


export default function MarketingPage() {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const features = [
        { icon: Zap, title: "Lightning Fast", description: "Experience instant task creation and updates with our optimized GraphQL API." },
        { icon: Shield, title: "Secure & Private", description: "Your data is encrypted and protected with industry-standard security measures." },
        { icon: Cloud, title: "Cloud Sync", description: "Access your tasks from anywhere, anytime with automatic cloud synchronization." },
        { icon: Calendar, title: "Smart Scheduling", description: "Set due dates, get reminders, and never miss an important task again." },
        { icon: BarChart, title: "Analytics", description: "Track your productivity with detailed insights and progress reports." },
        { icon: Users, title: "Team Collaboration", description: "Share tasks and collaborate seamlessly with your team members." },
    ];

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-trueGray-900 dark:via-trueGray-900 dark:to-trueGray-800">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:bg-grid-slate-800" />
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        ref={heroRef}
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="flex flex-col lg:flex-row items-center gap-12"
                    >
                        <motion.div variants={fadeInUp} className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-6"
                            >
                                <Rocket className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                                <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Productivity Boost</span>
                            </motion.div>
                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
                            >
                                Master Your Tasks,
                                <br />
                                Master Your Life
                            </motion.h1>
                            <motion.p 
                                variants={fadeInUp} 
                                className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                            >
                                The ultimate todo list manager that helps you organize, prioritize, and accomplish your goals with ease.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/dashboard">
                                    <button className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group">
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </motion.div>
                           
                        </motion.div>
                        <motion.div variants={scaleIn} className="flex-1">
                            <HeroIllustration />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50/50 dark:bg-trueGray-900/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Features</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Everything you need to stay organized and productive
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

           
            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 p-12 text-center"
                    >
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                        <div className="relative">
                            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have already transformed their productivity
                            </p>
                            <Link href="/dashboard">
                                <button className="px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
                                    Start Your Free Trial
                                </button>
                            </Link>
                            <p className="text-sm text-white/80 mt-4">No credit card required. Free forever.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}