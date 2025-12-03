"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaHome, FaLaptopCode, FaBriefcase, FaUserSecret, FaFileAlt, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-gray-950/80 to-white/80 backdrop-blur-sm z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-8 text-white">
        <div className="flex gap-12 text-lg font-semibold ml-16">
          <Link
            href="/"
            className={`transition flex flex-col items-center gap-2 ${
              isActive("/") ? "text-gray-400" : "hover:text-blue-400"
            }`}
          >
            <FaHome size={24} />
            <span>Home</span>
          </Link>
          <Link
            href="/projects"
            className={`transition flex flex-col items-center gap-2 ${
              isActive("/projects") ? "text-gray-400" : "hover:text-blue-400"
            }`}
          >
            <FaLaptopCode size={24} />
            <span>Projects</span>
          </Link>
          <Link
            href="/experiences"
            className={`transition flex flex-col items-center gap-2 ${
              isActive("/experiences") ? "text-gray-400" : "hover:text-blue-400"
            }`}
          >
            <FaBriefcase size={24} />
            <span>Expériences</span>
          </Link>
          <Link
            href="/hackathons"
            className={`transition flex flex-col items-center gap-2 ${
              isActive("/hackathons") ? "text-gray-400" : "hover:text-blue-400"
            }`}
          >
            <FaUserSecret size={24} />
            <span>Hackathons</span>
          </Link>
        </div>

        <div className="flex items-center gap-8 mr-16">
          <Link
            href="/about"
            className="relative px-8 py-3 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-pulse overflow-hidden"
          >
            <span className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></span>
            <span className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></span>
            <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></span>
            About Me
          </Link>

          <a href="https://github.com/fab-pie" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/fabien-pieretti-83674a2a2/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin size={22} />
          </a>
          <a
            href="mailto:fabienpieretti@gmail.com?subject=Contact%20depuis%20votre%20portfolio"
            className="hover:text-blue-400 transition"
          >
            <FaEnvelope size={22} />
          </a>
          <a
            href="/cv/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaFileAlt size={22} />
          </a>
        </div>
      </nav>
    </header>
  );
}
