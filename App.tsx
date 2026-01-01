import React, { useState } from 'react';
import { AppMockup } from './components/AppMockup';
import { ArrowRight, CheckCircle2, ChevronRight, Globe, Lock, Smartphone, Menu, X, Zap, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">Leapa</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Products</a>
              <a href="#about" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Company</a>
              <a href="#contact" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full px-4 py-4 shadow-xl">
             <a href="#features" className="block py-3 text-base font-medium text-gray-600">Products</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Now Live in Kenya
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                Leap into the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">future of money.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                The sleek bridge between M-Pesa and the global crypto economy. Send Money, Buy Goods, Pay Bills all with crypto. Buy and Sell crypto instantly with M-pesa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                   View Demo
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                   <span className="text-sm font-medium text-gray-600">Regulated</span>
                </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                   <span className="text-sm font-medium text-gray-600">Secure M-Pesa Integration</span>
                </div>
              </div>
            </div>

            {/* Right Content - App Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Background abstract shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60 -z-10"></div>
              <AppMockup />
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Features</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">No hidden fees.</h3>
             <p className="text-gray-500 text-lg">We believe in complete transparency. Enjoy market-leading rates with zero surprise charges when you buy, sell, or send.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Feature 1 */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Direct M-Pesa Integration</h4>
                <p className="text-gray-500 leading-relaxed">
                  Sell crypto and receive cash instantly to your phone.
                </p>
             </div>

             {/* Feature 2 */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Shield className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Regulated</h4>
                <p className="text-gray-500 leading-relaxed">
                  Leapa is regulated by the CMA, ensuring your funds are safe and compliant.
                </p>
             </div>

             {/* Feature 3 */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                  <Zap className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Instant</h4>
                <p className="text-gray-500 leading-relaxed">
                  Instant crypto to paying bills.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to Leapa?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black transition flex items-center justify-center gap-3">
               <Smartphone className="w-6 h-6" /> Get for iOS
             </button>
             <button className="bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black transition flex items-center justify-center gap-3">
               <Smartphone className="w-6 h-6" /> Get for Android
             </button>
          </div>
          <div className="mt-16 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-8">
             <p>© 2024 Leapa (LipaBit). All rights reserved.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-gray-900">Privacy</a>
                <a href="#" className="hover:text-gray-900">Terms</a>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;