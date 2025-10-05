import React from "react";
import { Building, Users, TrendingUp, Award, ExternalLink } from "lucide-react";

const candidates = [
  {
    role: "Senior Business Analyst",
    company: "JPMorgan Chase & Co.",
    industry: "Financial Services",
    testimonial:
      "Thanks to their strategic guidance, I secured a Senior BA role at JPMorgan with a 40% salary increase.",
    photo: "👩‍💼",
  },
  {
    role: "Data Analyst",
    company: "Johnson & Johnson",
    industry: "Healthcare",
    testimonial:
      "The interview preparation was exceptional. I transitioned from reporting to strategic data analysis seamlessly.",
    photo: "👨‍💻",
  },
  {
    role: "Business Intelligence Analyst",
    company: "McKinsey & Company",
    industry: "Consulting",
    testimonial:
      "Their LinkedIn optimization got me noticed by recruiters. Now I'm at my dream consulting firm.",
    photo: "👩‍💼",
  },
  {
    role: "Senior Data Analyst",
    company: "Google",
    industry: "Technology",
    testimonial:
      "The technical interview prep was game-changing. I felt confident discussing complex data scenarios.",
    photo: "👨‍💻",
  },
  {
    role: "Business Analyst",
    company: "Amazon",
    industry: "E-commerce",
    testimonial:
      "From application to offer letter, their support was comprehensive and results-driven.",
    photo: "👩‍💼",
  },
  {
    role: "Data Scientist",
    company: "Pfizer",
    industry: "Pharmaceuticals",
    testimonial:
      "They helped me transition from traditional analysis to advanced data science roles successfully.",
    photo: "👨‍💻",
  },
];

const industryHighlights = [
  {
    icon: <Users size={20} />,
    title: "Business Analytics",
    description: "Placing analysts in top business roles worldwide.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Data Science",
    description: "Empowering data professionals to scale their careers.",
  },
  {
    icon: <Award size={20} />,
    title: "Consulting",
    description: "Connecting consultants to high-impact opportunities.",
  },
  {
    icon: <Building size={20} />,
    title: "Technology",
    description: "Helping tech analysts achieve their dream roles.",
  },
];

const SuccessStories = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#008080] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Analysts Who Made It Big
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            We specialize in placing Business & Data Analysts in top global organizations. Here are their inspiring success stories.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#2ECC71] mb-2">90%</div>
              <div className="text-blue-100">Average Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#2ECC71] mb-2">45</div>
              <div className="text-blue-100">Average Days to Hire</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-[#2ECC71] mb-2">45%</div>
              <div className="text-blue-100">Average Salary Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Recent Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real professionals, real results, real career transformations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0A2540] to-[#008080] rounded-full flex items-center justify-center text-white text-2xl">
                      {candidate.photo}
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {candidate.industry}
                    </span>
                  </div>

                  {/* Company Name */}
                  <p className="text-gray-700 font-medium flex items-center mb-2">
                    <Building size={16} className="mr-2 text-gray-500" />
                    {candidate.company}
                  </p>

                  {/* Candidate Role */}
                  <p className="text-[#008080] font-medium mb-4">{candidate.role}</p>

                  {/* Testimonial */}
                  <blockquote className="text-gray-600 italic leading-relaxed">
                    "{candidate.testimonial}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Industry Impact
            </h2>
            <p className="text-xl text-gray-600">
              Our reach spans across multiple industries and career levels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industryHighlights.map((highlight, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#008080] text-white rounded-lg mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0A2540] to-[#008080] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of successful analysts and take the next step in your career journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#2ECC71] text-white text-lg font-semibold rounded-lg hover:bg-[#27AE60] transition-all hover:scale-105"
            >
              Get Started Today
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-[#0A2540] transition-all"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
