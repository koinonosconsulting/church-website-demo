// src/components/DonationForm.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Branch {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
}

export default function DonationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("Tithe");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [recurring, setRecurring] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Suggested amounts as requested
  const suggestedAmounts = [5000, 10000, 15000, 30000, 50000];

  useEffect(() => {
    // Fetch branches from API
    axios.get("/api/admin/branches").then((res) => {
      setBranches(res.data);
      if (res.data.length > 0) setBranchId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    // Fetch projects for selected branch
    if (!branchId) return;
    axios.get(`/api/admin/projects?branchId=${branchId}`).then((res) => {
      setProjects(res.data);
      setProjectId(res.data.length > 0 ? res.data[0].id : "");
    });
  }, [branchId]);

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setAmount(Number(value));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const finalAmount = customAmount ? Number(customAmount) : amount;
      
      const res = await axios.post("/api/payments/checkout", {
        purpose,
        amount: finalAmount,
        branchId,
        projectId: projectId || null,
        recurring,
        note,
        donor: { name, email, phone },
      });

      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        alert("Unable to initialize payment");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  }

  const displayAmount = customAmount ? Number(customAmount) : amount;

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 p-8"
    >
      {/* Form Header */}
      <div className="text-center mb-2">
        <div className="w-16 h-16 bg-gradient-to-br from-[#F7B500] to-[#e6a500] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">❤️</span>
        </div>
        <h2 className="text-2xl font-bold text-[#0B1D40]">Make a Donation</h2>
        <p className="text-gray-600 mt-2">Join us in spreading God's light</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-[#0B1D40] flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#F7B500] rounded-full"></div>
          <span>Personal Information</span>
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-blue-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-blue-300"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+234 XXX XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-blue-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Donation Details */}
      <div className="space-y-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-lg font-semibold text-[#0B1D40] flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#F7B500] rounded-full"></div>
          <span>Donation Details</span>
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">Branch</label>
          <div className="relative">
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full border border-amber-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer text-amber-900 font-medium"
              required
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="text-amber-900">
                  {b.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">Giving Purpose</label>
          <div className="relative">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full border border-amber-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer text-amber-900 font-medium"
            >
              <option value="Tithe" className="text-amber-900">Tithe</option>
              <option value="Offering" className="text-amber-900">Offering</option>
              <option value="Building" className="text-amber-900">Building Fund</option>
              <option value="Special Project" className="text-amber-900">Special Project</option>
              <option value="Outreach" className="text-amber-900">Outreach</option>
              <option value="Other" className="text-amber-900">Other</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {(purpose === "Building" || purpose === "Special Project") && projects.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">Select Project</label>
            <div className="relative">
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full border border-amber-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer text-amber-900 font-medium"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id} className="text-amber-900">
                    {p.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-3">Donation Amount (NGN)</label>
          
          {/* Suggested Amount Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {suggestedAmounts.map((suggestedAmount) => (
              <motion.button
                key={suggestedAmount}
                type="button"
                onClick={() => handleAmountSelect(suggestedAmount)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-3 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  amount === suggestedAmount && !customAmount
                    ? 'bg-gradient-to-br from-[#F7B500] to-amber-500 border-amber-400 text-white shadow-lg'
                    : 'bg-white/80 border-amber-200 text-amber-700 hover:border-amber-400 hover:bg-amber-100'
                }`}
              >
                ₦{suggestedAmount.toLocaleString()}
              </motion.button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-800">Or Enter Custom Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 font-bold">₦</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="w-full border border-amber-200 bg-white/80 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 placeholder-amber-300 text-amber-900 font-medium"
                min="100"
              />
            </div>
            {customAmount && (
              <p className="text-sm text-green-600 font-medium flex items-center space-x-1">
                <span>✨</span>
                <span>Custom amount selected: ₦{Number(customAmount).toLocaleString()}</span>
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-800 mb-2">Additional Note (Optional)</label>
          <textarea
            placeholder="Any special instructions or prayer requests..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border border-amber-200 bg-white/80 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 resize-none placeholder-amber-300 text-amber-900"
          />
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
          <input
            type="checkbox"
            id="recurring"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="w-5 h-5 text-[#F7B500] focus:ring-[#F7B500] border-blue-300 rounded"
          />
          <label htmlFor="recurring" className="text-sm text-blue-800">
            <span className="font-semibold">Make this a monthly recurring donation</span>
            <p className="text-blue-600 text-xs mt-1">Your donation will be automatically processed each month</p>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || displayAmount < 100}
        whileHover={{ scale: loading || displayAmount < 100 ? 1 : 1.02 }}
        whileTap={{ scale: loading || displayAmount < 100 ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-[#F7B500] via-amber-500 to-[#F7B500] text-white py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <div className="relative z-10">
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Your Gift...</span>
            </div>
          ) : (
            `Give ₦${displayAmount.toLocaleString()} Now`
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </motion.button>

      {/* Security Note */}
      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <p className="text-xs text-green-700 flex items-center justify-center space-x-2">
          <span className="text-green-600">🔒</span>
          <span>Your payment is secure and encrypted. We respect your privacy.</span>
        </p>
      </div>

      {/* Minimum amount notice */}
      {displayAmount < 100 && (
        <div className="text-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
          <p className="text-sm text-red-600 font-medium flex items-center justify-center space-x-2">
            <span>⚠️</span>
            <span>Minimum donation amount is ₦100</span>
          </p>
        </div>
      )}
    </motion.form>
  );
}