// src/app/(auth)/login/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signIn("credentials", { 
        email, 
        password, 
        redirect: false 
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push("/admin");
      } else {
        setError("An unexpected error occurred");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1D40] via-[#1e3a8a] to-[#0B1D40] p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#F7B500]/20 to-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Login Card */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Header */}
          <div className="text-center mb-2">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F7B500] to-[#e6a500] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl text-white">⛪</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to access the admin dashboard</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1D40] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 bg-white/50 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B1D40] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 bg-white/50 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200"
            >
              <p className="text-red-600 text-sm font-medium flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-[#F7B500] via-amber-500 to-[#F7B500] text-[#0B1D40] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <div className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-[#0B1D40] border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </motion.button>

          {/* Security Note */}
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-700 flex items-center justify-center space-x-2">
              <span className="text-blue-600">🔒</span>
              <span>Secure admin access. Your credentials are encrypted.</span>
            </p>
          </div>

          {/* Decorative Footer */}
          <div className="text-center pt-4 border-t border-gray-200/50">
            <p className="text-xs text-gray-500">
              Church Management System • Built with Faith
            </p>
          </div>
        </motion.form>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#F7B500] to-amber-500 rounded-full shadow-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full shadow-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
    </div>
  );
}