import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  Zap,
  BarChart,
  Users,
  GitPullRequest,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Landing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly | yearly
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const features = [
    { title: 'Lightning Fast Pipelines', desc: 'Drag, drop, and convert opportunities at scale with optimized layout grids.', icon: Zap },
    { title: 'Enterprise Role Security', desc: 'Custom RBAC matrix restricting details to executive, manager, or admin.', icon: Shield },
    { title: 'Live Performance Charts', desc: 'Interactive Recharts graphs tracking monthly conversion rates and revenue growth.', icon: BarChart },
    { title: 'Central Team Inbox', desc: 'Real-time WebSocket alerts and push notifications sync tasks instantly.', icon: Users },
  ];

  const plans = [
    { name: 'Starter', price: { monthly: 29, yearly: 24 }, desc: 'Perfect for small teams and single executives.', features: ['Up to 5 team members', 'Standard lead tracking', 'Base Recharts reports', 'Email alerts'] },
    { name: 'Professional', price: { monthly: 79, yearly: 64 }, desc: 'Best for regional managers and scaling groups.', features: ['Unlimited members', 'Drag-and-drop Kanban Board', 'Advanced performance graphs', 'Real-time socket notifications', 'Custom role profiles'] },
    { name: 'Enterprise', price: { monthly: 149, yearly: 119 }, desc: 'For director and VP level administration operations.', features: ['Multi-organization workspaces', 'Winston activity log audit logs', 'Custom database indexes', '24/7 dedicated support engineering'] }
  ];

  const faqs = [
    { q: 'Is there a limit on sales records?', a: 'No! With our normalized MongoDB database models, your CRM handles thousands of client documents and opportunity rows without latency.' },
    { q: 'Can I customize team permissions?', a: 'Yes! CRM360 comes with three pre-configured role hierarchies: Admins can view settings and audits, Managers view analytics, and Executives manage tasks.' },
    { q: 'How does real-time syncing work?', a: 'We use Socket.io to push task, lead, and timeline notifications to your dashboard drawer instantly without page reloads.' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Banner Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 bg-slate-900 text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(37,99,235,0.05),rgba(6,182,212,0.03))] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <Badge variant="accent" className="w-fit">Version 2.4 Release</Badge>
            <h1 className="text-hero font-extrabold leading-tight">
              Manage your sales pipeline <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">with precision.</span>
            </h1>
            <p className="text-body text-slate-400 max-w-lg leading-relaxed">
              CRM360 is the commercial-grade customer relationship platform designed for clarity. Automate tasks, monitor conversions, and close deals in a dashboard that updates in real time.
            </p>
            <div className="flex gap-4 mt-2">
              <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                Start Free Trial
              </Button>
              <a href="#preview">
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800/80 rounded-card p-6 shadow-2xl overflow-hidden glass-dark">
              {/* Decorative nodes */}
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
                <span className="h-3 w-3 rounded-full bg-danger/80" />
                <span className="h-3 w-3 rounded-full bg-warning/80" />
                <span className="h-3 w-3 rounded-full bg-success/80" />
                <span className="text-xs text-slate-600 font-bold ml-2">CRM360 Pipeline Overview</span>
              </div>
              
              {/* Mock Dashboard widgets */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-button">
                  <span className="text-xs text-slate-500 font-semibold block">Monthly Deal Revenue</span>
                  <span className="text-h2 font-extrabold text-white">₹298,000</span>
                  <span className="text-xs text-success font-bold mt-1 block">▲ +12.4% this month</span>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-button">
                  <span className="text-xs text-slate-500 font-semibold block">Active Leads</span>
                  <span className="text-h2 font-extrabold text-white">84</span>
                  <span className="text-xs text-slate-500 font-bold mt-1 block">92 deals closed</span>
                </div>
              </div>

              {/* Mock Kanban item */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-button border-l-4 border-l-primary flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">API Integration Contract</span>
                  <Badge variant="primary" className="text-[10px]">Proposal</Badge>
                </div>
                <span className="text-xs text-slate-500">Stripe Inc &bull; ₹45,000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Logos Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-6">Trusted by scaling teams at</span>
          <div className="flex justify-center items-center gap-12 flex-wrap text-slate-400 dark:text-slate-600 font-bold text-lg">
            <span>Stripe</span>
            <span>Linear</span>
            <span>Vercel</span>
            <span>Figma</span>
            <span>Retool</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <Badge variant="primary" className="w-fit mx-auto">Full Stack Features</Badge>
          <h2 className="text-h1 font-black text-slate-900 dark:text-white leading-tight">
            Designed for high performance teams.
          </h2>
          <p className="text-body text-slate-500 dark:text-slate-400 leading-relaxed">
            Close deal pipelines with tools built around Redux status states, Joi route checks, and Winston audits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} className="p-6 flex flex-col gap-4 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-10 w-10 rounded-button bg-primary/10 text-primary dark:bg-primary/20 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-body font-bold text-slate-800 dark:text-slate-100">{feat.title}</h3>
                <p className="text-small text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-b border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-4">
            <h2 className="text-h1 font-black text-slate-900 dark:text-white">Pricing built around growth</h2>
            <p className="text-body text-slate-500 dark:text-slate-400">
              Upgrade as your sales executives scale. Save 20% on annual billing cycles.
            </p>

            {/* Toggle switch */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <span className={`text-small font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out dark:bg-slate-700"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-small font-bold ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Yearly (Save 20%)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => {
              const price = plan.price[billingCycle];
              const isPopular = plan.name === 'Professional';
              
              return (
                <Card
                  key={idx}
                  className={`p-8 flex flex-col justify-between relative bg-white dark:bg-slate-900 border-slate-100 ${
                    isPopular ? 'ring-2 ring-primary dark:ring-primary' : ''
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-body font-extrabold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-h1 font-black text-slate-900 dark:text-white">₹{price}</span>
                      <span className="text-slate-500 text-xs">/ user / month</span>
                    </div>
                    <p className="text-small text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{plan.desc}</p>
                    
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-6" />
                    
                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-small text-slate-600 dark:text-slate-300">
                          <CheckCircle className="h-4.5 w-4.5 text-success shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={isPopular ? 'primary' : 'outline'}
                    className="w-full mt-auto"
                    onClick={() => navigate('/login')}
                  >
                    Select Plan
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 flex flex-col gap-3">
          <Badge variant="info" className="w-fit mx-auto">FAQs</Badge>
          <h2 className="text-h1 font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <Card
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 border-slate-100 cursor-pointer overflow-hidden"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-body font-bold text-slate-800 dark:text-slate-100 flex gap-2.5 items-center">
                    <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <span className="text-slate-400 dark:text-slate-600 text-lg">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-small text-slate-500 dark:text-slate-400 mt-4 leading-relaxed pl-7 border-l-2 border-slate-100 dark:border-slate-800"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
