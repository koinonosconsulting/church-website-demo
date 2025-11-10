// src/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Connect",
      links: [
        { href: "/plan-your-visit", label: "Plan Your Visit" },
        { href: "/about", label: "About Us" },
        { href: "/beliefs", label: "Our Beliefs" },
        { href: "/staff", label: "Staff" },
      ],
    },
    {
      title: "Ministries",
      links: [
        { href: "/ministries/children", label: "Children" },
        { href: "/ministries/youth", label: "Youth" },
        { href: "/ministries/adults", label: "Adults" },
        { href: "/ministries/seniors", label: "Seniors" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/sermons", label: "Sermons" },
        { href: "/events", label: "Events" },
        { href: "/blog", label: "Blog" },
        { href: "/resources", label: "Resources" },
      ],
    },
    {
      title: "Get Involved",
      links: [
        { href: "/give", label: "Give" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/small-groups", label: "Small Groups" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "YouTube",
      href: "#",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      name: "Instagram",
      href: "#",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    },
  ];

  return (
    <footer className="bg-[#0B1D40] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              {/* Logo Container with White Background */}
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative w-12 h-12 p-1">
                  <Image
                    src="https://cdn.doorstepfoodstuffs.com.ng/lightline%201.png"
                    alt="Lightline Church Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white group-hover:text-[#F7B500] transition-colors duration-300">
                  Lightline Church
                </span>
                <span className="text-[#F7B500] text-sm font-medium">
                  Following the Light. Changing the World.
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              A vibrant community walking in the light of Christ, dedicated to spreading 
              hope, love, and transformation throughout our world.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="bg-white/10 hover:bg-[#F7B500] p-2 rounded-lg transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-[#0B1D40]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-[#F7B500]">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service Times */}
        <div className="mt-12 pt-8 border-t border-gray-600">
          <h3 className="text-lg font-semibold mb-4 text-[#F7B500] text-center">
            Service Times
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold text-white">Sunday Worship</h4>
              <p className="text-gray-300">9:00 AM & 11:00 AM</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Wednesday Bible Study</h4>
              <p className="text-gray-300">7:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Youth Service</h4>
              <p className="text-gray-300">Friday 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Lightline Church. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}