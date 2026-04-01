// app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { BarChart, CheckCircle, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-trueGray-900 dark:via-trueGray-900 dark:to-trueGray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your productivity hub - coming soon!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: CheckCircle, label: "Completed Tasks", value: "0", color: "text-green-500" },
            { icon: Clock, label: "In Progress", value: "0", color: "text-blue-500" },
            { icon: TrendingUp, label: "Completion Rate", value: "0%", color: "text-purple-500" },
            { icon: BarChart, label: "Total Tasks", value: "0", color: "text-sky-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/70 dark:bg-trueGray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-trueGray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Go to Tasks
          </Link>
        </motion.div>
      </div>
    </div>
  );
}