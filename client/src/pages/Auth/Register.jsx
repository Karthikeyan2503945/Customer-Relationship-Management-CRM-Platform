import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { showToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const schema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

import authService from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'Sales Executive' // Default role for registering
      });
      if (response.success) {
        showToast.success('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        showToast.error(response.message || 'Registration failed');
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Network or server error during registration');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card glass className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-h2 font-extrabold text-slate-800 dark:text-white mb-2">Create your CRM360 Account</h2>
        <p className="text-small text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          icon={<User className="h-5 w-5 text-slate-400" />}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@company.com"
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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          icon={<Lock className="h-5 w-5 text-slate-400" />}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6"
          loading={loading}
          icon={<ArrowRight className="h-4.5 w-4.5" />}
        >
          Register Workspace
        </Button>
      </form>
    </Card>
  );
}
