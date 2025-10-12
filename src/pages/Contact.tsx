import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong!');
  }
};


  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#008080] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Talk to a Career Expert in Analytics
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Ready to accelerate your BA/DA career? Our specialists are here to guide you through every step of your professional journey.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-[#333333] mb-8">
                  Start Your Career Transformation
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="mx-auto text-[#2ECC71] mb-4" />
                    <h3 className="text-2xl font-semibold text-[#333333] mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#333333] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your career goals and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#008080] to-[#2ECC71] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#006666] hover:to-[#27AE60] transition-all hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll respond to your inquiry within 24 hours during business days.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-[#333333] mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#008080]/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[#008080]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#333333]">Email</div>
                        <div className="text-gray-600">[Your Email Here]</div>
                        <div className="text-sm text-gray-500">We respond within 24 hours</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#008080]/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[#008080]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#333333]">Phone</div>
                        <div className="text-gray-600">[Your Phone Here]</div>
                        <div className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#008080]/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[#008080]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#333333]">Office</div>
                        <div className="text-gray-600">[Your Address Here]</div>
                        <div className="text-sm text-gray-500">By appointment only</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#008080]/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-[#008080]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#333333]">Business Hours</div>
                        <div className="text-gray-600">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM EST
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-gradient-to-br from-[#0A2540] to-[#008080] text-white rounded-xl p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Why Work With Us?
                  </h3>
                  <ul className="space-y-3 text-blue-100">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-3 text-[#2ECC71]" />
                      Specialized BA/DA expertise
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-3 text-[#2ECC71]" />
                      90% success rate
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-3 text-[#2ECC71]" />
                      Personalized career strategy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-3 text-[#2ECC71]" />
                      End-to-end support
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-[#333333] mb-4">
                    Follow Our Journey
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional Placeholder) */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2" />
            <p className="text-lg">Interactive Map Would Go Here</p>
            <p className="text-sm">[Your Address Here]</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;