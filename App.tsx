import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { AppMockup } from './components/AppMockup';
import { MPesaLogo, CMALogo } from './components/Logos';
import { ArrowRight, CheckCircle2, ChevronRight, Globe, Lock, Smartphone, Menu, X, Zap, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, bgColor, iconColor, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition duration-300"
    >
      <motion.div
        className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-6`}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-2xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 4px 12px rgba(0, 0, 0, 0.08)']
  );
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);
  const bgOpacity = useTransform(scrollY, [0, 300], [0.6, 0.1]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
        style={{
          backgroundColor: navBg,
          boxShadow: navShadow
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <img src="/logos/leapa-logo.svg" alt="Leapa" className="h-10" />
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl overflow-hidden"
            >
              <div className="px-4 py-4">
                <motion.a
                  href="#features"
                  className="block py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </motion.a>
                <motion.a
                  href="#about"
                  className="block py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.17 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Company
                </motion.a>
                <motion.a
                  href="#contact"
                  className="block py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div
              className="max-w-2xl -mt-12 lg:-mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Now Live in Kenya
              </motion.div>
              <motion.h1
                className="font-display text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.05] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Leap into the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">future of money.</span>
              </motion.h1>
              <motion.p
                className="text-lg lg:text-xl text-slate-600 mb-8 leading-loose max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                The sleek bridge between M-Pesa and the global crypto economy. Send Money, Buy Goods, Pay Bills all with crypto. Buy and Sell crypto instantly with M-pesa.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.button
                  className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
                  whileTap={{ scale: 0.95 }}
                >
                   View Demo
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center gap-6 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                   <span className="text-sm font-medium text-gray-600">Regulated</span>
                </div>
                 <div className="flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                   <span className="text-sm font-medium text-gray-600">Secure M-Pesa Integration</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - App Mockup */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              {/* Background abstract shapes */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl -z-10"
                style={{ y: bgY, opacity: bgOpacity }}
              />
              <AppMockup />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Features</h2>
             <h3 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">No hidden fees.</h3>
             <p className="text-slate-600 text-lg leading-relaxed">We believe in complete transparency. Enjoy market-leading rates with zero surprise charges when you buy, sell, or send.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <FeatureCard
               icon={<MPesaLogo className="w-12 h-12" />}
               bgColor="bg-white"
               iconColor=""
               title="M-Pesa Integration"
               description="Sell crypto and receive cash instantly to your phone."
               index={0}
             />
             <FeatureCard
               icon={<CMALogo className="w-7 h-7" />}
               bgColor="bg-blue-100"
               iconColor="text-blue-600"
               title="Regulated"
               description="Leapa is regulated by the CMA, ensuring your funds are safe and compliant."
               index={1}
             />
             <FeatureCard
               icon={<Zap className="w-7 h-7" />}
               bgColor="bg-purple-100"
               iconColor="text-purple-600"
               title="Instant"
               description="Instant crypto to paying bills."
               index={2}
             />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Ready to Leapa?</span>
          </h2>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-700 font-medium">
              Find us in the <span className="text-green-600 font-bold">M-Pesa Super App</span>
            </p>
          </motion.div>
          <div className="mt-16 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-8">
             <p>© 2026 Leapa (Satoshi Kenya). All rights reserved.</p>
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