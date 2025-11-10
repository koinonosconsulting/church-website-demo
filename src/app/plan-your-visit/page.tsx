// src/app/plan-your-visit/page.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function PlanYourVisitPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    visitDate: "",
    familySize: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for planning your visit! We'll be in touch soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      visitDate: "",
      familySize: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(247, 181, 0, 0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(79, 195, 247, 0.2) 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Plan Your Visit</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We can&apos;t wait to welcome you to Lightline Church! Here&apos;s everything you need to know 
              for your first visit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-4">What to Expect</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A warm welcome, inspiring worship, and meaningful connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👋",
                title: "Friendly Welcome",
                description: "Our greeting team will welcome you with a smile and help you get settled. Don't worry about knowing what to do - we'll guide you every step of the way.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🎵",
                title: "Inspiring Worship",
                description: "Experience contemporary worship music that connects you with God. Our services are about 90 minutes with engaging music and relevant biblical teaching.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "☕",
                title: "Free Coffee & Connection",
                description: "Join us before or after service for complimentary coffee and refreshments. It's a great opportunity to meet people and learn more about our community.",
                color: "from-amber-500 to-orange-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1D40] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times & Location */}
      <section className="py-20 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us This Weekend</h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Choose the service time that works best for you and your family. 
                We have programs for all ages!
              </p>

              <div className="space-y-6">
                {[
                  {
                    day: "Sunday Morning",
                    times: ["9:00 AM", "11:00 AM"],
                    description: "Main Worship Services",
                    highlight: true
                  },
                  {
                    day: "Wednesday Evening",
                    times: ["7:00 PM"],
                    description: "Bible Study & Small Groups"
                  },
                  {
                    day: "Friday Youth",
                    times: ["7:00 PM"],
                    description: "Youth Service (Ages 13-18)"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={service.day}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 ${
                      service.highlight ? "border-[#F7B500]" : "border-white/20"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{service.day}</h3>
                    <div className="flex items-center space-x-4 mb-2">
                      {service.times.map((time) => (
                        <span key={time} className="text-3xl font-bold text-[#F7B500]">
                          {time}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6">Our Location</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F7B500] rounded-full flex items-center justify-center">
                    <span className="text-white">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lightline Church Main Campus</p>
                    <p className="text-gray-300">123 Faith Avenue, City Center</p>
                    <p className="text-gray-300">Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F7B500] rounded-full flex items-center justify-center">
                    <span className="text-white">📞</span>
                  </div>
                  <div>
                    <p className="font-semibold">Contact Us</p>
                    <p className="text-gray-300">+234 123 456 7890</p>
                    <p className="text-gray-300">hello@lightlinechurch.org</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F7B500] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white">🗺️</span>
                  </div>
                  <p className="text-gray-300">Interactive Map</p>
                  <p className="text-gray-400 text-sm">Coming Soon</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-[#F7B500] text-[#0B1D40] px-6 py-3 rounded-full font-semibold hover:bg-[#e6a500] transition-colors duration-300"
                >
                  <span>Get Directions</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Your Family */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-4">For Your Family</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Safe, engaging programs for every age group
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                age: "0-2 Years",
                program: "Nursery",
                description: "Loving care in our safe, clean nursery environment",
                icon: "👶"
              },
              {
                age: "3-5 Years",
                program: "Preschool",
                description: "Fun Bible stories and activities for little ones",
                icon: "🎨"
              },
              {
                age: "6-12 Years",
                program: "Kids Church",
                description: "Interactive lessons and worship designed for children",
                icon: "🌟"
              },
              {
                age: "13-18 Years",
                program: "Youth",
                description: "Relevant teaching and community for teenagers",
                icon: "🚀"
              }
            ].map((program, index) => (
              <motion.div
                key={program.age}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#F7B500] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{program.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0B1D40] mb-2">{program.age}</h3>
                <p className="text-[#F7B500] font-semibold mb-2">{program.program}</p>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Visit Form */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D40] mb-4">
                Let Us Know You&apos;re Coming
              </h2>
              <p className="text-xl text-gray-600">
                Fill out this form and we&apos;ll have a welcome gift waiting for you!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When are you planning to visit?</label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
                  <select
                    name="familySize"
                    value={formData.familySize}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select...</option>
                    <option value="1">Just me</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5+">5+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anything else we should know? (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Questions, prayer requests, or anything else..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#F7B500] to-amber-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Plan My Visit
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0B1D40] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions Before You Visit?</h2>
          <p className="text-xl text-gray-200 mb-8">
            We&apos;re here to help! Reach out with any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#F7B500] text-[#0B1D40] px-8 py-4 rounded-full font-semibold hover:bg-[#e6a500] transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0B1D40] transition-colors duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}