"use client";

import type React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Trophy,
  Lightbulb,
  Cpu,
  Zap,
  Target,
  CheckCircle,
  Sparkles,
  CircuitBoard,
  MicroscopeIcon as Microchip,
  Wifi,
  Heart,
  Leaf,
  Bot,
  Wrench,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// export const metadata = {
//   title: "Thinkronix - Electronics Hackathon",
//   description:
//     "Join Thinkronix, the premier electronics hackathon at Central University of Rajasthan. Build innovative solutions and win exciting prizes!",
// };

// Smooth scroll component
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    lenis();
  }, []);

  return <>{children}</>;
};

// 3D Floating Elements
const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ y: 0, rotateX: 0, rotateY: 0 }}
      animate={{
        y: [-5, 5, -5],
        rotateX: [-5, 5, -5],
        rotateY: [-5, 5, -5],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// Animated Background Particles
const BackgroundParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPositions(
        particles.map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }))
      );
    }
  }, [particles]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: positions[index]?.x ?? 0,
            y: positions[index]?.y ?? 0,
            opacity: 0,
          }}
          animate={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// 3D Card Component
const Card3D = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function CustomRegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = value.toString();
    }
    console.log("Payload:", payload);
    try {
      const { data } = await axios.post("/api/submit-google-form", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API response:", data);
      if (data.success) {
        toast.success("Your response has been recorded!", {
          duration: 4000,
          style: {
            background: "#0C4A6E",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        });
        setIsSubmitted(true);
        form.reset();
      } else {
        toast.error(
          "There was an error submitting the form. Please try again.",
          {
            duration: 4000,
            style: {
              background: "#7F1D1D",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting the form. Please try again.", {
        duration: 4000,
        style: {
          background: "#7F1D1D",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-cyan-400 mx-auto" />
        </div>
        <h3 className="text-2xl font-bold text-cyan-300 mb-4">Thank You!</h3>
        <p className="text-gray-300 text-lg">
          We have received your response and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <form
        className="space-y-7 text-left bg-gray-800/80 p-12 rounded-xl shadow-xl border border-gray-700 max-w-3xl mx-auto"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center tracking-tight">
          Team Registration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="fullName"
            >
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="email"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="phone"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              placeholder="Enter your 10-digit phone number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="university"
            >
              University/College *
            </label>
            <input
              id="university"
              name="university"
              required
              placeholder="Enter your university or college"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="course"
            >
              Course/Degree *
            </label>
            <input
              id="course"
              name="course"
              required
              placeholder="Enter your course or degree"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="year"
            >
              Year of Study *
            </label>
            <select
              id="year"
              name="year"
              required
              title="Year of Study"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
              <option>5th Year</option>
              <option>Post Graduate</option>
            </select>
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="track"
            >
              Preferred Track *
            </label>
            <select
              id="track"
              name="track"
              required
              title="Preferred Track"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            >
              <option value="">Select Track</option>
              <option>Smart Cities & Automation</option>
              <option>Green Tech & Renewable Energy</option>
              <option>IoT & Home Automation</option>
              <option>Healthcare & Assistive Devices</option>
              <option>Robotics & Drones</option>
              <option>Agriculture Innovations</option>
            </select>
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="teamName"
            >
              Team Name *
            </label>
            <input
              id="teamName"
              name="teamName"
              required
              placeholder="Enter your team name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-cyan-200 font-semibold mb-2 tracking-wide"
              htmlFor="teamSize"
            >
              Team Size *
            </label>
            <select
              id="teamSize"
              name="teamSize"
              required
              title="Team Size"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            >
              <option value="">Select Team Size</option>
              <option>1 ( Individual )</option>
              <option>2 Members</option>
              <option>3 Members</option>
              <option>4 Members</option>
            </select>
          </div>
        </div>
        <div>
          <label
            className="block text-cyan-200 font-semibold mb-2 tracking-wide"
            htmlFor="projectIdea"
          >
            Brief Project Idea *
          </label>
          <textarea
            id="projectIdea"
            name="projectIdea"
            required
            rows={3}
            placeholder="Describe your project idea"
            className="w-full px-4 py-2 rounded-lg bg-gray-800/80 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl shadow-cyan-500/25 rounded-xl mt-2"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}

export default function ThinkronixLanding() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Toaster />
        {/* Animated Background */}
        <BackgroundParticles />

        {/* 3D Grid Background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: "perspective(1000px) rotateX(60deg)",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Image
                  src="/CURAJ_Logo.png"
                  alt="CURAJ Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <FloatingElement>
                      <CircuitBoard className="h-8 w-8 text-cyan-400" />
                    </FloatingElement>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Thinkronix
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    — Department of Electronics and Technology
                  </span>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25">
                  Register Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          style={{ y: heroY, scale: heroScale }}
          className="relative py-20 lg:py-32 overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 to-blue-900/30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Thinkronix
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Unleash Innovation. Build the Future.
              </motion.p>

              <div className="flex justify-center space-x-8 mb-12">
                <FloatingElement delay={0}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Cpu className="h-12 w-12 text-cyan-400" />
                  </motion.div>
                </FloatingElement>
                <FloatingElement delay={0.5}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Zap className="h-12 w-12 text-blue-400" />
                  </motion.div>
                </FloatingElement>
                <FloatingElement delay={1}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Microchip className="h-12 w-12 text-purple-400" />
                  </motion.div>
                </FloatingElement>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl shadow-cyan-500/25"
              >
                Register Now
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="ml-2 h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-cyan-400">
                About the Event
              </h2>
              <motion.div
                className="max-w-4xl mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-gray-300 leading-relaxed">
                  🎯 Are you passionate about circuits, sensors, and smart
                  systems? Showcase your engineering mindset by building a
                  working electronics-based prototype that solves real-world
                  problems.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Event Details */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Event Details
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: "Date",
                  value: "14/09/2025",
                  delay: 0,
                },
                {
                  icon: Clock,
                  title: "Time",
                  value: "10:00 AM onwards",
                  delay: 0.1,
                },
                {
                  icon: MapPin,
                  title: "Venue",
                  value: "School of Engineering and Technology",
                  subtitle: "Central University of Rajasthan",
                  delay: 0.2,
                },
                {
                  icon: Users,
                  title: "Team Size",
                  value: "2–4 members",
                  delay: 0.3,
                },
                {
                  icon: DollarSign,
                  title: "Registration Fee",
                  value: "Rs. 300/-",
                  delay: 0.4,
                },
                {
                  icon: Target,
                  title: "Last Date",
                  value: "10/08/2025",
                  delay: 0.5,
                },
              ].map((detail, index) => (
                <Card3D key={index} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: detail.delay }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500 transition-all duration-300 h-full shadow-xl">
                      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <detail.icon className="h-6 w-6 text-cyan-400 mr-3" />
                        </motion.div>
                        <CardTitle className="text-white">
                          {detail.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-cyan-400">
                          {detail.value}
                        </p>
                        {detail.subtitle && (
                          <p className="text-gray-300 mt-1">
                            {detail.subtitle}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Card3D>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Themes */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Themes
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CircuitBoard,
                  title: "Smart Cities & Embedded Automation",
                  color: "text-cyan-400",
                  delay: 0,
                },
                {
                  icon: Leaf,
                  title: "Renewable Energy Monitoring Systems",
                  color: "text-green-400",
                  delay: 0.1,
                },
                {
                  icon: Wifi,
                  title: "IoT & Wireless Sensor Networks",
                  color: "text-blue-400",
                  delay: 0.2,
                },
                {
                  icon: Heart,
                  title: "Biomedical Devices & Assistive Tech",
                  color: "text-red-400",
                  delay: 0.3,
                },
                {
                  icon: Bot,
                  title: "Robotics & Intelligent Control Systems",
                  color: "text-purple-400",
                  delay: 0.4,
                },
                {
                  icon: Wrench,
                  title: "Precision Agriculture & AgriTech",
                  color: "text-yellow-400",
                  delay: 0.5,
                },
              ].map((theme, index) => (
                <Card3D key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50, rotateY: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: theme.delay }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-xl">
                      <CardHeader className="text-center">
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotateY: 360,
                            transition: { duration: 0.8 },
                          }}
                        >
                          <theme.icon
                            className={`h-12 w-12 mx-auto mb-4 ${theme.color}`}
                          />
                        </motion.div>
                        <CardTitle className="text-white text-lg">
                          {theme.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </Card3D>
              ))}
            </div>
          </div>
        </motion.section>

        {/* What to Build */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              What to Build
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  "Form a team (2–4 members)",
                  "Design and develop a working model using microcontrollers, sensors, or custom electronic systems",
                  "Demo your solution to judges during the final event",
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {index + 1}
                    </motion.div>
                    <p className="text-lg text-gray-300 pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Prizes */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Prizes
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  gradient: "from-yellow-600 to-yellow-700",
                  border: "border-yellow-500",
                  title: "🥇 First Prize",
                  amount: "Rs. 21,000/-",
                  delay: 0,
                },
                {
                  gradient: "from-gray-400 to-gray-500",
                  border: "border-gray-400",
                  title: "🥈 Second Prize",
                  amount: "Rs. 11,000/-",
                  delay: 0.1,
                },
                {
                  gradient: "from-amber-600 to-amber-700",
                  border: "border-amber-500",
                  title: "🥉 Third Prize",
                  amount: "Rs. 5,000/-",
                  delay: 0.2,
                },
                {
                  gradient: "from-cyan-600 to-blue-600",
                  border: "border-cyan-500",
                  title: "🎖️ Participation",
                  amount: "Certificates for all participants",
                  delay: 0.3,
                },
              ].map((prize, index) => (
                <Card3D key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: prize.delay }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`bg-gradient-to-br ${prize.gradient} ${prize.border} text-center shadow-2xl`}
                    >
                      <CardHeader>
                        <motion.div
                          whileHover={{ scale: 1.2, rotateY: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Trophy className="h-16 w-16 mx-auto text-white mb-4 drop-shadow-lg" />
                        </motion.div>
                        <CardTitle className="text-white text-xl">
                          {prize.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={`${
                            index === 3 ? "text-xl" : "text-3xl"
                          } font-bold text-white`}
                        >
                          {prize.amount}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Card3D>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Judging Criteria */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Judging Criteria
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Lightbulb, title: "Innovation & Creativity", delay: 0 },
                {
                  icon: CircuitBoard,
                  title: "Circuit Design & Technical Complexity",
                  delay: 0.1,
                },
                {
                  icon: Target,
                  title: "Practical Use Case & Scalability",
                  delay: 0.2,
                },
                { icon: Sparkles, title: "Design & Aesthetics", delay: 0.3 },
                { icon: DollarSign, title: "Cost Optimization", delay: 0.4 },
                {
                  icon: CheckCircle,
                  title: "Quality of Demo & Explanation",
                  delay: 0.5,
                },
              ].map((criteria, index) => (
                <Card3D key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotateZ: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ duration: 0.8, delay: criteria.delay }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500 transition-all duration-300 text-center shadow-xl">
                      <CardHeader>
                        <motion.div
                          whileHover={{
                            scale: 1.3,
                            rotateY: 360,
                            transition: { duration: 0.6 },
                          }}
                        >
                          <criteria.icon className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                        </motion.div>
                        <CardTitle className="text-white">
                          {criteria.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </Card3D>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Registration */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold mb-12 text-cyan-400"
            >
              How to Register
            </motion.h2>
            <div className="max-w-2xl mx-auto space-y-8">
              <CustomRegistrationForm />
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Organising Committee
            </motion.h2>

            {/* Faculty Coordinators */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-300">
                Faculty Coordinators
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Dr. Sanyog Rawat",
                    role: "Faculty Coordinator",
                    position: "Head, Department of ECE",
                    delay: 0,
                  },
                  {
                    name: "Dr. Milan Sasmal",
                    role: "Faculty Coordinator",
                    position: "Prof, Department of ECE",
                    delay: 0.1,
                  },
                  {
                    name: "Dr. Rajan Singh",
                    role: "Faculty Coordinator",
                    position: "Prof, Department of ECE",
                    delay: 0.2,
                  },
                  {
                    name: "Dr. Kapil Saraswat",
                    role: "Faculty Coordinator",
                    position: "Prof, Department of ECE",
                    delay: 0.3,
                  },
                  {
                    name: "Dr. Sudhir Bhaskar",
                    role: "Faculty Coordinator",
                    position: "Prof, Department of ECE",
                    delay: 0.4,
                  },
                ].map((faculty, index) => (
                  <Card3D key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: faculty.delay }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-xl">
                        <CardHeader>
                          <motion.div
                            whileHover={{ scale: 1.2, rotateY: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            <Users className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                          </motion.div>
                          <CardTitle className="text-white text-lg text-center">
                            {faculty.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-cyan-400 mb-1">{faculty.role}</p>
                          <p className="text-gray-400">{faculty.position}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </motion.div>

            {/* Student Co-leads */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-300">
                Student Co-leads
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {[
                  {
                    name: "Arijit Lodhi",
                    role: "Student Co-lead",
                    delay: 0.5,
                  },
                  {
                    name: "Hitesh Mali",
                    role: "Student Co-lead",
                    delay: 0.6,
                  },
                ].map((student, index) => (
                  <Card3D key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: student.delay }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-xl">
                        <CardHeader>
                          <motion.div
                            whileHover={{ scale: 1.2, rotateY: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            <Users className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                          </motion.div>
                          <CardTitle className="text-white text-lg text-center">
                            {student.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-cyan-400">{student.role}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Card3D>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Rules */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-cyan-400"
            >
              Rules Snapshot
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Working hardware prototype is mandatory",
                  "Readymade kits must be significantly modified",
                  "Teams must submit an abstract before the deadline. (Deadline will be announced later)",
                  "Max presentation time: 10 minutes (incl. Q&A)",
                  "No hazardous or unsafe materials allowed",
                ].map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <p className="text-gray-300">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 border-t border-gray-800 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FloatingElement>
                <CircuitBoard className="h-8 w-8 text-cyan-400" />
              </FloatingElement>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Thinkronix
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-4"
            >
              Unleash Innovation. Build the Future.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              © 2025 Thinkronix. All rights reserved. | School of Engineering
              and Technology, Central University of Rajasthan
            </motion.p>
          </div>
        </motion.footer>
      </div>
    </SmoothScroll>
  );
}
