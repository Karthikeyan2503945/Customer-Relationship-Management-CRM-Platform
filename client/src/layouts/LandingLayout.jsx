import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Menu, X, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function LandingLayout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-slate-900 dark:bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-9 w-9 rounded-button bg-primary text-white font-extrabold shadow-md">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-wide">CRM360</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-small font-semibold text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#preview" className="hover:text-slate-900 dark:hover:text-white transition-colors">Preview</a>
            <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQs</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/login')} icon={<ArrowRight className="h-4 w-4" />}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-100 bg-white p-6 md:hidden flex flex-col gap-4 text-body font-bold dark:bg-slate-950 dark:border-slate-900">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors"
            >
              Preview
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-primary transition-colors"
            >
              FAQs
            </a>
            <div className="h-px bg-slate-100 dark:bg-slate-900 my-1" />
            <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
              Log In
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* Main marketing page body */}
      <main className="min-h-[80vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-button bg-primary text-white font-extrabold shadow-md">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <span className="text-md font-black text-white">CRM360</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Beautiful SaaS pipeline tools for modern operations and high-performing sales executive divisions.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-small">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-small">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sales Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-small">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800/80 mt-12 pt-8 text-xs text-slate-600 flex justify-between">
          <span>&copy; {new Date().getFullYear()} CRM360 Inc. All rights reserved.</span>
          <span>Designed with care in San Francisco.</span>
        </div>
      </footer>
    </div>
  );
}
