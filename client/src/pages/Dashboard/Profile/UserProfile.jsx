import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Shield, Camera, KeyRound } from 'lucide-react';
import { updateProfile } from '../../../redux/slices/authSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Avatar from '../../../components/ui/Avatar';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email) {
      showToast.error('Please enter name and email');
      return;
    }
    dispatch(updateProfile(profileForm));
    showToast.success('Profile details updated successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showToast.error('All password fields are required');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast.error('New passwords do not match');
      return;
    }
    showToast.success('Security password credentials updated');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Profile Header Cards */}
      <Card className="relative overflow-hidden bg-white dark:bg-slate-900 border-slate-100 shadow-md">
        {/* Cover banner color */}
        <div className="h-40 bg-gradient-to-r from-blue-600 via-primary to-cyan-500 w-full" />
        
        {/* Profile Avatar overlapping */}
        <div className="px-8 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className="relative">
              <Avatar src={user?.avatar} name={user?.name} size="xl" className="border-4 border-white dark:border-slate-900 shadow-md bg-slate-100" />
              <button className="absolute bottom-1 right-1 p-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 border border-white dark:border-slate-900 shadow transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-col mb-1">
              <h2 className="text-h2 font-black text-slate-900 dark:text-white leading-tight">
                {user?.name}
              </h2>
              <span className="text-small text-slate-500 font-medium capitalize">
                {user?.title} &bull; {user?.role?.replace('_', ' ')}
              </span>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 capitalize shrink-0 mb-1">
            Status: Active Rep
          </span>
        </div>
      </Card>

      {/* Forms Section Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Details Edit */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100">
          <h3 className="text-body font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span>Profile Information</span>
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input label="Full Name" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} required />
            <Input label="Email Address" type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} required />
            <Input label="Job Title" value={profileForm.title} onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })} />
            <Button type="submit" variant="primary" className="w-full mt-2">
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Change Password */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-100">
          <h3 className="text-body font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-accent" />
            <span>Change Password</span>
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required />
            <Input label="New Password" type="password" placeholder="••••••••" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} required />
            <Button type="submit" variant="secondary" className="w-full mt-2">
              Update Password
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
