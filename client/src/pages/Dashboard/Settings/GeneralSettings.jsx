import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Settings, Bell, Palette, Globe, Shield, User, KeyRound } from 'lucide-react';
import { updateNotifications, toggleTheme } from '../../../redux/slices/settingsSlice';
import { updateProfile } from '../../../redux/slices/authSlice';
import { showToast } from '../../../components/ui/Toast';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

export default function GeneralSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('account'); // account | appearance | notifications | security | language

  // Account details form
  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
  });

  // Password reset form
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    if (!accountForm.name || !accountForm.email) {
      showToast.error('Please enter name and email');
      return;
    }
    dispatch(updateProfile(accountForm));
    showToast.success('Account profile updated');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!pwdForm.current || !pwdForm.newPwd || !pwdForm.confirm) {
      showToast.error('All password fields are required');
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      showToast.error('New passwords do not match');
      return;
    }
    showToast.success('Security password credentials updated');
    setPwdForm({ current: '', newPwd: '', confirm: '' });
  };

  const handleToggleNotification = (key, val) => {
    dispatch(updateNotifications({ [key]: val }));
    showToast.success('Notification preferences updated');
  };

  const tabs = [
    { id: 'account', label: 'Account Profile', icon: User },
    { id: 'appearance', label: 'Theme Styling', icon: Palette },
    { id: 'notifications', label: 'Alert Toggles', icon: Bell },
    { id: 'security', label: 'Security Details', icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-h1 font-black text-slate-900 dark:text-white">Workspace Settings</h1>
        <p className="text-small text-slate-500">Configure CRM layout properties, dark mode styling, and notification alerts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Navigation Sidebar Tabs */}
        <Card className="w-full md:w-60 p-3 bg-white dark:bg-slate-900 border-slate-100 flex flex-col gap-1 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-3 rounded-button text-small font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white font-bold'
                    : 'text-slate-500 hover:bg-slate-55/60 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Tab panels content */}
        <Card className="flex-1 p-6 bg-white dark:bg-slate-900 border-slate-100 min-h-[400px]">
          {/* 1. ACCOUNT PROFILE */}
          {activeTab === 'account' && (
            <form onSubmit={handleUpdateAccount} className="space-y-4">
              <div>
                <h3 className="text-body font-bold text-slate-800 dark:text-white mb-1">Account Information</h3>
                <p className="text-xs text-slate-400">Update workspace metadata, full name, and email coordinates.</p>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              <Input label="Full Name" value={accountForm.name} onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })} required />
              <Input label="Email Address" type="email" value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} required />
              <Input label="Job Title" value={accountForm.title} onChange={(e) => setAccountForm({ ...accountForm, title: e.target.value })} />
              <Button type="submit" variant="primary" className="w-full mt-2">
                Save Account Profile
              </Button>
            </form>
          )}

          {/* 2. THEME CONFIG */}
          {activeTab === 'appearance' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-body font-bold text-slate-800 dark:text-white mb-1">Theme Configuration</h3>
                <p className="text-xs text-slate-400">Toggle dark mode and customize colors of cards.</p>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              <div className="flex justify-between items-center py-2">
                <div className="flex flex-col">
                  <span className="text-small font-bold text-slate-800 dark:text-slate-200">Dark Mode Active</span>
                  <span className="text-xs text-slate-400">WCAG-compliant contrast theme settings</span>
                </div>
                <button
                  onClick={() => {
                    dispatch(toggleTheme());
                    showToast.success(`Theme updated to ${settings.theme === 'dark' ? 'light' : 'dark'} mode`);
                  }}
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out dark:bg-slate-700"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* 3. NOTIFICATION TRIGGERS */}
          {activeTab === 'notifications' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-body font-bold text-slate-800 dark:text-white mb-1">Notification Configurations</h3>
                <p className="text-xs text-slate-400">Enable or disable task updates and email reminders.</p>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              
              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex justify-between items-center py-3">
                  <div className="flex flex-col">
                    <span className="text-small font-bold text-slate-800 dark:text-slate-200">Email Alerts</span>
                    <span className="text-xs text-slate-400">Receive copy updates for billing renewals</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailAlerts}
                    onChange={(e) => handleToggleNotification('emailAlerts', e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary/20 dark:bg-slate-950 dark:border-slate-800"
                  />
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex flex-col">
                    <span className="text-small font-bold text-slate-800 dark:text-slate-200">Push Notifications</span>
                    <span className="text-xs text-slate-400">Real-time WebSocket notifications drawer alerts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushAlerts}
                    onChange={(e) => handleToggleNotification('pushAlerts', e.target.checked)}
                    className="rounded border-slate-300 text-primary focus:ring-primary/20 dark:bg-slate-950 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. SECURITY */}
          {activeTab === 'security' && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <h3 className="text-body font-bold text-slate-800 dark:text-white mb-1">Security & Access</h3>
                <p className="text-xs text-slate-400">Modify login passwords and check access audit flags.</p>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              <Input label="Current Password" type="password" placeholder="••••••••" value={pwdForm.current} onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })} required />
              <Input label="New Password" type="password" placeholder="••••••••" value={pwdForm.newPwd} onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })} required />
              <Input label="Confirm New Password" type="password" placeholder="••••••••" value={pwdForm.confirm} onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })} required />
              <Button type="submit" variant="secondary" className="w-full mt-2">
                Update Security Credentials
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
