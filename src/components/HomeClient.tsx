// src/components/HomeClient.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1D40] via-[#1a3a7a] to-[#0B1D40] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Church stained glass window with light shining through"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1D40]/80" />
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#F7B500] rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-[#4FC3F7] rounded-full opacity-40 animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-[#F7B500] rounded-full opacity-30 animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Logo with white background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="bg-white rounded-xl p-3">
                  <Image
                    src="https://cdn.doorstepfoodstuffs.com.ng/lightline%201.png"
                    alt="Lightline Church Logo"
                    width={100}
                    height={100}
                    className="drop-shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Walking in the{" "}
              <span className="bg-gradient-to-r from-[#F7B500] to-[#4FC3F7] bg-clip-text text-transparent">
                Light
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Following the Light. Changing the World. Join us as we journey together 
              in faith, hope, and love, illuminating our community with Christ&apos;s message.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                href="/plan-your-visit"
                className="bg-[#F7B500] text-[#0B1D40] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e6a500] transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Plan Your Visit
              </Link>
              <Link
                href="/live"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#0B1D40] transform hover:scale-105 transition-all duration-300"
              >
                Watch Live
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-6">
                Welcome to{" "}
                <span className="text-[#F7B500]">Lightline Church</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We&apos;re a vibrant community of believers dedicated to following 
                Jesus Christ and making a difference in our world. Whether you&apos;re 
                exploring faith for the first time or looking for a church home, 
                you&apos;ll find a warm welcome here.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7B500] rounded-full" />
                  <span className="text-gray-700">Contemporary worship services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7B500] rounded-full" />
                  <span className="text-gray-700">Relevant biblical teaching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7B500] rounded-full" />
                  <span className="text-gray-700">Loving community for all ages</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#F7B500] to-[#4FC3F7] p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <Image
                    src="https://cdn.doorstepfoodstuffs.com.ng/lightline%20pic%202.jpg"
                    alt="Modern church interior with cross and people"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0B1D40] mb-2">
                      Our Church Home
                    </h3>
                    <p className="text-gray-600">
                      A welcoming space where faith comes alive
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Us This Week</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience meaningful worship and connect with our growing community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                day: "Sunday",
                times: ["9:00 AM", "11:00 AM"],
                description: "Worship Service",
                highlight: true,
                image: "https://cdn.doorstepfoodstuffs.com.ng/Lightline%20pic%201.jpg"
              },
              {
                day: "Wednesday",
                times: ["7:00 PM"],
                description: "Bible Study",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                day: "Friday",
                times: ["7:00 PM"],
                description: "Youth Service",
                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((service, index) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border-2 ${
                  service.highlight 
                    ? "border-[#F7B500] shadow-2xl" 
                    : "border-white/20"
                }`}
              >
                <div className="h-40 relative">
                  <Image
                    src={service.image}
                    alt={`${service.day} Service`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-4">{service.day}</h3>
                  <div className="space-y-2 mb-4">
                    {service.times.map((time) => (
                      <div key={time} className="text-3xl font-bold text-[#F7B500]">
                        {time}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300">{service.description}</p>
                  {service.highlight && (
                    <div className="mt-6">
                      <Link
                        href="/plan-your-visit"
                        className="inline-block bg-[#F7B500] text-[#0B1D40] px-6 py-3 rounded-full font-semibold hover:bg-[#e6a500] transition-colors duration-300"
                      >
                        Plan Your Visit
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-4">
              Grow With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities to connect, serve, and grow in your faith journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Children",
                description: "Ages 0-12",
                image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                href: "/ministries/children"
              },
              {
                title: "Youth",
                description: "Ages 13-18",
                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                href: "/ministries/youth"
              },
              {
                title: "Young Adults",
                description: "Ages 18-30",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                href: "/ministries/young-adults"
              },
              {
                title: "Adults",
                description: "All Ages",
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                href: "/ministries/adults"
              }
            ].map((ministry, index) => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#0B1D40] mb-2">
                      {ministry.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{ministry.description}</p>
                    <Link
                      href={ministry.href}
                      className="text-[#F7B500] font-semibold hover:text-[#e6a500] transition-colors duration-300"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B1D40] to-[#1a3a7a] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Community and connection"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re visiting for the first time or looking to get more involved, 
              we&apos;re here to help you on your spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-[#F7B500] text-[#0B1D40] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e6a500] transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get In Touch
              </Link>
              <Link
                href="/give"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#0B1D40] transform hover:scale-105 transition-all duration-300"
              >
                Support Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Sermon */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-6">
                Latest Message
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Walking in God&apos;s Light
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join Pastor Michael as he explores what it means to truly walk in the light 
                of Christ in our daily lives, and how this transforms our relationships, 
                work, and purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/sermons"
                  className="bg-[#0B1D40] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0a1838] transition-colors duration-300 text-center"
                >
                  Watch More Sermons
                </Link>
                <Link
                  href="/live"
                  className="border-2 border-[#0B1D40] text-[#0B1D40] px-6 py-3 rounded-full font-semibold hover:bg-[#0B1D40] hover:text-white transition-colors duration-300 text-center"
                >
                  Join Live
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#F7B500] to-[#4FC3F7] p-1 rounded-2xl shadow-2xl">
                <div className="bg-black rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Pastor teaching sermon"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] opacity-70" />
                  <div className="relative text-center text-white z-10">
                    <div className="w-20 h-20 bg-[#F7B500] rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl text-[#0B1D40] font-bold">▶</span>
                    </div>
                    <p className="text-lg font-semibold">Play Latest Sermon</p>
                    <p className="text-gray-300 text-sm mt-2">45:22 • October 15, 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}