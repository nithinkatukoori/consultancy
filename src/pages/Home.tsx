import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Users,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Chatbot from "../components/Chatbot";

const CounterAnimation = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Application Strategy",
      description:
        "Apply smart, targeting roles that match your Business Analyst and Data Analyst skills with data-driven insights.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Resume & LinkedIn Makeover",
      description:
        "Create a data-driven professional brand that gets noticed by hiring managers.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Interview Assistance",
      description:
        "Practice Business and Data Analyst case studies and role-specific interview preparation sessions.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Verification Support",
      description:
        "Smooth clearance for background checks and seamless onboarding processes.",
    },
  ];

  const testimonials = [
    {
      quote:
        "With their comprehensive prep, I landed my first Business Analyst role in finance within 45 days.",
      author: "Sarah Johnson",
      role: "Business Analyst at Goldman Sachs",
      rating: 5,
    },
    {
      quote:
        "They helped me transition from reporting to a Data Analyst role in healthcare seamlessly.",
      author: "Michael Chen",
      role: "Data Analyst at Kaiser Permanente",
      rating: 5,
    },
    {
      quote:
        "The interview preparation was game-changing. I felt confident in every technical discussion.",
      author: "Emily Rodriguez",
      role: "Senior BA at McKinsey & Company",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#008080] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/50 to-transparent"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-lg rotate-45"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white/25 rounded-lg rotate-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Shaping Careers in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#008080]">
                  Business & Data Analysis
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                From applications to interviews to background checks — we guide
                analysts at every step of their career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#2ECC71] text-white text-lg font-semibold rounded-lg hover:bg-[#27AE60] transition-all hover:scale-105 hover:shadow-xl"
                >
                  Start My Career Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/success-stories"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-[#0A2540] transition-all"
                >
                  View Success Stories
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#2ECC71] mb-2">
                    90%
                  </div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">200+</div>
                    <div className="text-blue-200 text-sm">Analysts Placed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-blue-200 text-sm">
                      Partner Companies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Our Expertise in Analyst Careers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support designed specifically for Business and Data
              Analysts seeking career advancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-[#008080] mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-24 bg-gradient-to-r from-[#0A2540] to-[#008080] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-blue-100">
              Measurable results that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#2ECC71] mb-2">
                <CounterAnimation end={90} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Clients secured interviews within 60 days
              </h3>
              <p className="text-blue-100">
                Success rate for our comprehensive career support program
              </p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#2ECC71] mb-2">
                <CounterAnimation end={200} suffix="+" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Business & Data Analysts placed
              </h3>
              <p className="text-blue-100">
                Professionals successfully placed in top organizations
              </p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#2ECC71] mb-2">
                <CounterAnimation end={50} suffix="+" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Companies trust our candidates
              </h3>
              <p className="text-blue-100">
                Organizations that regularly hire our trained analysts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Analysts Who Trusted Us
            </h2>
            <p className="text-xl text-gray-600">
              Real success stories from our professional community
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>

              <blockquote className="text-2xl lg:text-3xl text-[#333333] text-center mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="text-center">
                <div className="font-semibold text-lg text-[#333333]">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-[#008080] font-medium">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-[#008080] hover:shadow-xl transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-[#008080] hover:shadow-xl transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-[#008080]"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#2ECC71] to-[#008080] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your Analytics Career?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join hundreds of successful Business and Data Analysts who
            transformed their careers with our expert guidance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#2ECC71] text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default Home;
