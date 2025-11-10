// src/app/give/page.tsx

"use client";

import DonationForm from "@/components/DonationForm";
import { motion } from "framer-motion";

export default function GivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-4">
            Support Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your giving is an act of worship that enables us to spread the light of Christ 
            and make a lasting impact in our community and beyond.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <DonationForm />
          </div>

          {/* Sidebar - Giving Information */}
          <div className="space-y-8">
            {/* Giving Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#F7B500] to-[#e6a500] rounded-2xl p-6 text-white"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Your Giving Makes a Difference</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Support local outreach programs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Fund youth and children's ministries</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Maintain our church facilities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>Support global missions</span>
                </li>
              </ul>
            </motion.div>

            {/* Bible Verse */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#0B1D40] rounded-2xl p-6 text-white"
            >
              <div className="w-12 h-12 bg-[#F7B500]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <blockquote className="text-lg italic mb-4 leading-relaxed">
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver."
              </blockquote>
              <p className="text-[#F7B500] font-semibold">— 2 Corinthians 9:7</p>
            </motion.div>

            {/* Giving Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-[#0B1D40] mb-4">Other Ways to Give</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-[#F7B500] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Bank Transfer</p>
                    <p className="text-sm text-gray-600">Direct bank deposit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-[#0B1D40] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💳</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">In Person</p>
                    <p className="text-sm text-gray-600">Sunday service offering</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}