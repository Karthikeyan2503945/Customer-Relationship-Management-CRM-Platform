import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, ArrowRight, ChevronDown } from 'lucide-react';
import { showToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockUsers } from '../../data/users';
import { loginUser } from '../../redux/slices/authSlice';
const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);
  const [showQuickLogin, setShowQuickLogin] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const demoAccounts = [
    { name: 'Sarah Connor (Admin)', email: 'sarah.connor@crm360.com', password: 'password123' },
    { name: 'Marcus Wright (Sales Manager)', email: 'marcus.wright@crm360.com', password: 'password123' },
    { name: 'John Connor (Sales Executive)', email: 'john.connor@crm360.com', password: 'password123' },
    { name: 'Kate Brewster (Sales Executive)', email: 'kate.brewster@crm360.com', password: 'password123' },
  ];

  const handleDemoLogin = (email, password) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
    setShowQuickLogin(false);
    showToast.success('Prefilled credentials! Click Sign In to connect.');
  };

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser({ email: data.email, password: data.password, rememberMe }));
      if (loginUser.fulfilled.match(resultAction)) {
        showToast.success(`Welcome back!`);
        navigate('/dashboard');
      } else {
        showToast.error(resultAction.payload || 'Invalid email or password');
      }
    } catch (err) {
      showToast.error('Network or server unavailable');
    }
  };
  return (
    <Card glass className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-h2 font-extrabold text-slate-800 dark:text-white mb-2">Sign in to CRM360</h2>
        <p className="text-small text-slate-400">
          Or{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            create a new administrator account
          </Link>
        </p>
      </div>

      {/* Quick Login Dropdown Menu */}
      <div className="relative mb-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowQuickLogin(!showQuickLogin)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-650 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-button transition-all shadow-sm"
        >
          <span>⚡ Quick Demo Logins</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showQuickLogin ? 'rotate-180' : ''}`} />
        </button>

        {showQuickLogin && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowQuickLogin(false)} />
            <div className="absolute top-11 z-20 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-card shadow-xl p-2 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2.5 py-1">Select a demo user:</span>
              <div className="h-px bg-slate-100 dark:bg-slate-800 mb-1" />
              {demoAccounts.map((acc, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDemoLogin(acc.email, acc.password)}
                  className="w-full text-left px-3 py-2 rounded-button text-xs hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex flex-col gap-0.5"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">{acc.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{acc.email}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          error={errors.email?.message}
          icon={<Mail className="h-5 w-5 text-slate-400" />}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          icon={<Lock className="h-5 w-5 text-slate-400" />}
          {...register('password')}
        />

        {/* Extra actions */}
        <div className="flex items-center justify-between text-small mt-2">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary/20 dark:bg-slate-950 dark:border-slate-800"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-primary font-bold hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6"
          loading={loading}
          icon={<ArrowRight className="h-4.5 w-4.5" />}
        >
          Sign In
        </Button>
      </form>
    </Card>
  );
}
