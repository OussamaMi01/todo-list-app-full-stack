// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Heart, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-trueGray-900 dark:via-trueGray-900 dark:to-trueGray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            About Checki
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're on a mission to help people achieve more with less stress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: Rocket, title: "Our Mission", description: "To simplify task management and boost productivity for everyone." },
            { icon: Users, title: "Our Team", description: "Passionate developers and designers creating tools you'll love." },
            { icon: Heart, title: "Our Values", description: "Simplicity, reliability, and user-first design." },
            { icon: Zap, title: "Our Vision", description: "To become the most trusted task management platform." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}