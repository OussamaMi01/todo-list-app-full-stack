// app/page.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import confetti from "canvas-confetti";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_STATUS,
} from "@/graphql/queries";
import type { Todo, FilterState, TodoFormData, Priority, Status } from "@/types/todo";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Empty State Illustration
const EmptyStateIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    <svg
      className="w-64 h-64 mx-auto"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeDasharray="5 5"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M70 100 L85 115 L130 70"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-4xl">✨</span>
    </motion.div>
  </motion.div>
);

// Loading Illustration
const LoadingIllustration = () => (
  <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
    <div className="loader" />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-gray-500 dark:text-gray-400"
    >
      Loading your tasks...
    </motion.p>
  </div>
);

// Success Illustration
const SuccessIllustration = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="relative"
  >
    <svg
      className="w-12 h-12"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#successGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M30 50 L45 65 L70 35"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <defs>
        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const config = {
    URGENT: { color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400", icon: "🔴", label: "Urgent" },
    HIGH: { color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", icon: "🔥", label: "High" },
    MEDIUM: { color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", icon: "📊", label: "Medium" },
    LOW: { color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400", icon: "💚", label: "Low" },
  };
  
  const { color, icon, label } = config[priority];
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
      {icon} {label}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: Status }) => {
  const config = {
    PENDING: { color: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400", icon: "⏳", label: "Pending", action: "Start" },
    IN_PROGRESS: { color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", icon: "🔄", label: "In Progress", action: "Complete" },
    COMPLETED: { color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400", icon: "✅", label: "Completed", action: "Reset" },
  };
  
  const { color, icon, label } = config[status];
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
      {icon} {label}
    </span>
  );
};

// Format date helper
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString();
  }
};

// Check if due date is overdue
const isOverdue = (dueDate: string | null | undefined) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
};

export default function Home() {
  const [filter, setFilter] = useState<FilterState>({ priority: null, status: null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { loading, error, data, refetch } = useQuery<{ todos: Todo[] }>(GET_TODOS, {
    variables: filter,
  });

  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleStatus] = useMutation(TOGGLE_STATUS);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0EA5E9', '#6366F1', '#8B5CF6'],
    });
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleToggleStatus = async (id: string, currentStatus: Status) => {
    try {
      const result = await toggleStatus({ variables: { id } });
      const newStatus = (result.data as { toggleStatus: { status: Status } }).toggleStatus.status;
      refetch();
      
      if (newStatus === 'COMPLETED') {
        triggerConfetti();
        showSuccessMessage("Task completed! 🎉");
      } else if (newStatus === 'IN_PROGRESS') {
        showSuccessMessage("Task started! 🚀");
      } else if (currentStatus === 'COMPLETED' && newStatus === 'PENDING') {
        showSuccessMessage("Task reopened! 📝");
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        await updateTodo({
          variables: {
            id: editingTodo.id,
            input: {
              title: formData.title,
              description: formData.description || null,
              priority: formData.priority,
              dueDate: formData.dueDate || null,
            },
          },
        });
        showSuccessMessage("Task updated successfully! ✏️");
        setEditingTodo(null);
      } else {
        await createTodo({
          variables: {
            input: {
              title: formData.title,
              description: formData.description || null,
              priority: formData.priority,
              dueDate: formData.dueDate || null,
            },
          },
        });
        showSuccessMessage("Task created successfully! 🎯");
      }

      setFormData({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
      setShowAddForm(false);
      refetch();
    } catch (err) {
      console.error("Error saving todo:", err);
      showSuccessMessage("Error saving task. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTodo({ variables: { id } });
        refetch();
        showSuccessMessage("Task deleted successfully! 🗑️");
      } catch (err) {
        console.error("Error deleting todo:", err);
        showSuccessMessage("Error deleting task. Please try again.");
      }
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority,
      dueDate: todo.dueDate || "",
    });
    setShowAddForm(true);
  };

  if (loading) return <LoadingIllustration />;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error.message}</div>;

  const todos: Todo[] = data?.todos || [];
  const completedCount = todos.filter(t => t.status === 'COMPLETED').length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-trueGray-900 dark:via-trueGray-900 dark:to-trueGray-800">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50"
          >
            <div className="bg-white/90 dark:bg-trueGray-900/90 backdrop-blur-md rounded-lg px-6 py-3 flex items-center gap-3 shadow-xl border border-gray-200 dark:border-trueGray-700">
              <SuccessIllustration />
              <span className="text-green-600 dark:text-green-400 font-medium">
                {successMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              Task Manager
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organize your tasks, boost your productivity
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {completedCount}/{todos.length} tasks completed
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-trueGray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 dark:bg-trueGray-900/70 backdrop-blur-md rounded-xl p-4 mb-8 border border-white/20 dark:border-trueGray-800/50"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <select
                onChange={(e) => setFilter({ ...filter, priority: e.target.value === "all" ? null : e.target.value as Priority })}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={filter.priority || "all"}
              >
                <option value="all">All Priorities</option>
                <option value="URGENT">🔴 Urgent</option>
                <option value="HIGH">🔥 High</option>
                <option value="MEDIUM">📊 Medium</option>
                <option value="LOW">💚 Low</option>
              </select>
              <select
                onChange={(e) => setFilter({ ...filter, status: e.target.value === "all" ? null : e.target.value as Status })}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={filter.status || "all"}
              >
                <option value="all">All Status</option>
                <option value="PENDING">⏳ Pending</option>
                <option value="IN_PROGRESS">🔄 In Progress</option>
                <option value="COMPLETED">✅ Completed</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingTodo(null);
                setFormData({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
              }}
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showAddForm ? "Cancel" : "+ Add New Task"}
            </motion.button>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-white/70 dark:bg-trueGray-900/70 backdrop-blur-md rounded-xl p-6 mb-8 overflow-hidden border border-white/20 dark:border-trueGray-800/50"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                {editingTodo ? "Edit Task" : "Create New Task"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="What needs to be done?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Add some details..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="URGENT">🔴 Urgent Priority</option>
                  <option value="HIGH">🔥 High Priority</option>
                  <option value="MEDIUM">📊 Medium Priority</option>
                  <option value="LOW">💚 Low Priority</option>
                </select>
                <input
                  type="date"
                  name="dueDate"
                  placeholder="Due Date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-trueGray-700 bg-white dark:bg-trueGray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {editingTodo ? "Update Task" : "Create Task"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Todo List */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <EmptyStateIllustration />
              <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg">
                No tasks yet. Create your first task to get started! 🚀
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {todos.map((todo: Todo) => {
                const dueDateFormatted = formatDate(todo.dueDate);
                const overdue = isOverdue(todo.dueDate) && todo.status !== 'COMPLETED';
                
                return (
                  <motion.div
                    key={todo.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white/70 dark:bg-trueGray-900/70 backdrop-blur-md rounded-xl p-5 transition-all duration-300 border ${
                      todo.status === 'COMPLETED'
                        ? "border-green-200 dark:border-green-800/50 opacity-75"
                        : overdue
                        ? "border-red-200 dark:border-red-800/50"
                        : "border-white/20 dark:border-trueGray-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        onClick={() => handleToggleStatus(todo.id, todo.status)}
                        className="mt-1 group"
                        title={
                          todo.status === 'PENDING'
                            ? "Start task"
                            : todo.status === 'IN_PROGRESS'
                            ? "Complete task"
                            : "Reset task"
                        }
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          todo.status === 'COMPLETED'
                            ? "bg-green-500 border-green-500"
                            : todo.status === 'IN_PROGRESS'
                            ? "bg-blue-500 border-blue-500"
                            : "border-sky-500 group-hover:border-sky-600"
                        }`}>
                          {todo.status === 'COMPLETED' && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {todo.status === 'IN_PROGRESS' && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 3l14 9-14 9V3z" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${
                            todo.status === 'COMPLETED'
                              ? "line-through text-gray-400 dark:text-gray-500"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {todo.description}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <PriorityBadge priority={todo.priority} />
                          <StatusBadge status={todo.status} />
                          {dueDateFormatted && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              overdue
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            }`}>
                              {overdue ? "⚠️ Overdue" : `📅 ${dueDateFormatted}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(todo)}
                          className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                          title="Edit task"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(todo.id)}
                          className="p-2 text-red-500 hover:text-red-600 transition-colors"
                          title="Delete task"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Stats Section */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-white/70 dark:bg-trueGray-900/70 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-trueGray-800/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-sky-500">{todos.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">
                  {todos.filter(t => t.status === 'IN_PROGRESS').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">{Math.round(progress)}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}