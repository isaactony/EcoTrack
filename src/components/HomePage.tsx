import { ArrowRight, Leaf, BarChart3, Shield, Globe, Mail, Phone, Users, TreePine, Factory, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', emissions: 2400, reduction: 1400 },
  { month: 'Feb', emissions: 1398, reduction: 2210 },
  { month: 'Mar', emissions: 9800, reduction: 2290 },
  { month: 'Apr', emissions: 3908, reduction: 2000 },
  { month: 'May', emissions: 4800, reduction: 2181 },
  { month: 'Jun', emissions: 3800, reduction: 2500 },
];

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Sustainable Manufacturing',
    excerpt: 'Discover how AI and IoT are revolutionizing sustainable production methods...',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    date: '2024-03-15',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Carbon Neutral Supply Chains',
    excerpt: 'Learn how companies are achieving carbon neutrality in their supply chains...',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    date: '2024-03-10',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Water Conservation in Industry',
    excerpt: 'Innovative approaches to reducing industrial water consumption...',
    image: 'https://images.unsplash.com/photo-1519184324956-7f0d0a2f0681',
    date: '2024-03-05',
    readTime: '6 min read',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '299',
    features: [
      'Up to 50 suppliers',
      'Basic analytics',
      'Email support',
      'Monthly reports',
    ],
  },
  {
    name: 'Professional',
    price: '599',
    features: [
      'Up to 200 suppliers',
      'Advanced analytics',
      'Priority support',
      'Weekly reports',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited suppliers',
      'Custom analytics',
      '24/7 support',
      'Real-time reporting',
      'API access',
      'Dedicated account manager',
    ],
  },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Animation */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 -z-10" />
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent animate-gradient">
                Supply Chain
              </span>{' '}
              Impact
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Join the future of sustainable manufacturing with real-time monitoring, AI-powered insights, and comprehensive environmental tracking.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Try Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-green-600 bg-white border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all duration-200"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Active Suppliers', value: '500+', icon: Factory },
              { label: 'Carbon Reduced', value: '2M tons', icon: Recycle },
              { label: 'Water Saved', value: '500M gal', icon: TreePine },
              { label: 'Happy Clients', value: '99.9%', icon: Users },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 mx-auto text-green-600 mb-3" />
                <dt className="text-base font-medium text-gray-600">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Real Impact, Real Results
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Track your environmental impact with precision
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Carbon Emissions Reduction</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reduction" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Water Usage Optimization</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emissions" fill="#0ea5e9" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
            <p className="mt-4 text-lg text-gray-600">
              Stay updated with the latest in sustainable manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={`${post.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={post.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="mx-2">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <a href="#" className="mt-4 inline-flex items-center text-green-600 hover:text-green-700">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-gray-600">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-500">/month</span>}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Shield className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-8 block w-full text-center px-6 py-3 rounded-lg font-medium ${
                      plan.popular
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Our Sales Team</h2>
              <p className="mt-4 text-lg text-gray-600">
                Ready to transform your supply chain? Our team is here to help you get started.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-green-600 mr-4" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-green-600 mr-4" />
                  <span className="text-gray-600">sales@ecotrack.com</span>
                </div>
              </div>
            </div>

            <form className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}