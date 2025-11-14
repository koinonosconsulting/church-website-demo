// src/app/about/page.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Pastor Michael Adebayo",
      role: "Senior Pastor",
      description: "With over 15 years of ministry experience, Pastor Michael is passionate about helping people discover their purpose in Christ.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Worship Director",
      description: "Sarah leads our worship ministry with a heart for ushering people into God's presence through music and praise.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "David Chen",
      role: "Youth Pastor",
      description: "David is dedicated to empowering the next generation to walk boldly in their faith and change their world.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Grace Williams",
      role: "Children's Ministry Director",
      description: "Grace creates engaging, safe environments where children can encounter God and build a foundation of faith.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const beliefs = [
    {
      title: "The Bible",
      description: "We believe the Bible is God's inspired Word, our final authority for faith and life.",
      verse: "2 Timothy 3:16-17",
      icon: "📖"
    },
    {
      title: "The Trinity",
      description: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
      verse: "Matthew 28:19",
      icon: "✨"
    },
    {
      title: "Salvation",
      description: "We believe salvation comes through faith in Jesus Christ alone, by God's grace.",
      verse: "Ephesians 2:8-9",
      icon: "🕊️"
    },
    {
      title: "The Church",
      description: "We believe the Church is Christ's body, called to worship God and serve the world.",
      verse: "1 Corinthians 12:27",
      icon: "⛪"
    },
    {
      title: "Mission",
      description: "We believe we're called to make disciples of all nations, sharing God's love.",
      verse: "Matthew 28:19-20",
      icon: "🌍"
    },
    {
      title: "Hope",
      description: "We believe in the blessed hope of Jesus' return and eternal life with God.",
      verse: "Titus 2:13",
      icon: "🌟"
    }
  ];

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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Lightline Church began with a simple vision: to help people walk in the light of Christ 
                and become world-changers for God&apos;s glory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/plan-your-visit"
                  className="bg-[#F7B500] text-[#0B1D40] px-8 py-4 rounded-full font-semibold hover:bg-[#e6a500] transition-colors duration-300 text-center"
                >
                  Visit Us
                </Link>
                <Link
                  href="/ministries"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0B1D40] transition-colors duration-300 text-center"
                >
                  Our Ministries
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#F7B500] to-[#4FC3F7] p-1 rounded-2xl shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <Image
                    src="https://cdn.doorstepfoodstuffs.com.ng/lightline%20pic%202.jpg"
                    alt="Lightline Church community worship"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0B1D40] mb-2">Since 2010</h3>
                    <p className="text-gray-600">Serving our community with love and truth</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="w-16 h-16 bg-[#F7B500] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0B1D40] mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To lead people into a growing relationship with Jesus Christ by following the light 
                of God&apos;s Word, loving one another, and serving our world.
              </p>
              <div className="bg-white/80 rounded-xl p-4 border border-blue-100">
                <p className="text-blue-800 font-semibold italic">
                  &ldquo;You are the light of the world. A city set on a hill cannot be hidden.&rdquo;
                </p>
                <p className="text-blue-600 mt-2">— Matthew 5:14</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
            >
              <div className="w-16 h-16 bg-[#0B1D40] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">🔭</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0B1D40] mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To see every person in our community transformed by the gospel, equipped to serve, 
                and empowered to change their world for Christ.
              </p>
              <div className="bg-white/80 rounded-xl p-4 border border-amber-100">
                <p className="text-amber-800 font-semibold italic">
                  &ldquo;Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.&rdquo;
                </p>
                <p className="text-amber-600 mt-2">— Matthew 5:16</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Beliefs */}
      <section className="py-20 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Believe</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Grounded in Scripture, focused on Christ, committed to truth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F7B500] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#F7B500] rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">{belief.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{belief.title}</h3>
                <p className="text-gray-200 mb-4 leading-relaxed">{belief.description}</p>
                <p className="text-[#F7B500] font-semibold text-sm">{belief.verse}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-6">Our Journey</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Lightline Church was founded in 2010 by Pastor Michael Adebayo and a small group 
                  of believers who shared a vision for a church that would illuminate their community 
                  with the love and truth of Jesus Christ.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  What began as a Bible study in a living room has grown into a vibrant community 
                  of faith, impacting thousands of lives through worship, discipleship, and outreach.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we continue our mission of &ldquo;Following the Light, Changing the World,&rdquo; 
                  believing that every person has a God-given purpose and potential to make a difference.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#F7B500] mb-2">13+</div>
                  <div className="text-gray-600">Years Serving</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#F7B500] mb-2">5</div>
                  <div className="text-gray-600">Ministries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#F7B500] mb-2">1000+</div>
                  <div className="text-gray-600">Lives Changed</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-[#0B1D40] mb-3">Our Values</h3>
                <ul className="space-y-3">
                  {[
                    "Biblical Truth as our foundation",
                    "Authentic Community as our culture",
                    "Spiritual Growth as our journey",
                    "Generous Service as our calling",
                    "Kingdom Impact as our mission"
                  ].map((value, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-[#F7B500] rounded-full"></div>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-[#0B1D40] mb-3">Our Focus</h3>
                <ul className="space-y-3">
                  {[
                    "Worship that connects us to God",
                    "Word that transforms our lives",
                    "Welcome that embraces everyone",
                    "Works that serve our community",
                    "Witness that shares God's love"
                  ].map((focus, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-[#0B1D40] rounded-full"></div>
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B1D40] mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate leaders dedicated to serving God and our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1D40] mb-1">{member.name}</h3>
                  <p className="text-[#F7B500] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-[#0B1D40] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#132a63] transition-colors duration-300"
            >
              <span>Contact Our Team</span>
              <span>→</span>
            </Link>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Story?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Become part of what God is doing at Lightline Church
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plan-your-visit"
              className="bg-[#F7B500] text-[#0B1D40] px-8 py-4 rounded-full font-semibold hover:bg-[#e6a500] transition-colors duration-300"
            >
              Plan Your First Visit
            </Link>
            <Link
              href="/ministries"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0B1D40] transition-colors duration-300"
            >
              Get Involved
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}