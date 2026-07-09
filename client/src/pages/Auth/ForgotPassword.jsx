import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, ArrowLeft } from 'lucide-react';
import { showToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    showToast.success('Password reset.');
    navigate('/login');
  };

  return (
    <Card glass className="p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800 shadow-xl">
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4">
          <ArrowLeft className="h-3 w-3" />
          <span>Back to Login</span>
        </Link>
        <h2 className="text-h2 font-extrabold text-slate-800 dark:text-white mb-2">Reset Password</h2>
        <p className="text-small text-slate-400">
          Enter your registered email address and we will send a link to reset your Password.
        </p>
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

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6"
        >
          Send Reset Link
        </Button>
      </form>
    </Card>
  );
}
