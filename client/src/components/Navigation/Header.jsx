import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sun, Moon, Bell, LogOut, ChevronDown, User, KeyRound } from 'lucide-react';
import { toggleTheme } from '../../redux/slices/settingsSlice';
import { logoutUser } from '../../redux/slices/authSlice';
import Avatar from '../ui/Avatar';
import Tooltip from '../ui/Tooltip';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import authService from '../../services/authService';
import { showToast } from '../ui/Toast';

export default function Header({ onOpenNotifications, onToggleMobileSidebar }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);
  const { user } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notification.items);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast.error('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast.error('New passwords do not match');
      return;
    }
    try {
      await authService.changePassword(currentPassword, newPassword);
      showToast.success('Password updated successfully');
      setPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showToast.error(err.response?.data?.message || err.message || 'Failed to update password');
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
      {/* Mobile Burger Menu */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleMobileSidebar}
          className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Action utilities & profile */}
      <div className="flex items-center gap-4">
        {/* Dark Mode toggle */}
        <Tooltip content={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-55 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </Tooltip>

        {/* Notifications toggle */}
        <Tooltip content="Notifications">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {unreadCount}
              </span>
            )}
          </button>
        </Tooltip>

        <div className="h-6 w-px bg-slate-100 dark:bg-slate-900" />

        {/* Interactive Profile Dropdown Pop Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-button hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-left outline-none"
          >
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <div className="flex flex-col text-left hidden md:flex shrink-0">
              <span className="text-small font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-slate-400 capitalize leading-none mt-0.5">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
          </button>

          {profileOpen && (
            <>
              {/* Overlay blocker */}
              <div className="fixed inset-0 z-20" onClick={() => setProfileOpen(false)} />
              
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-card shadow-xl p-2 z-35 flex flex-col gap-1">
                <div className="px-3 py-2 flex flex-col">
                  <span className="text-small font-bold text-slate-800 dark:text-slate-200">{user?.name}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{user?.email}</span>
                </div>
                
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-button text-xs text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setPasswordModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-xs text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-left transition-colors"
                >
                  <KeyRound className="h-4 w-4 text-slate-400" />
                  <span>Change Password</span>
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-button text-xs text-danger hover:bg-danger/5 text-left transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Change Password Modal Popup */}
      <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="Change Account Password">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Update Password
            </Button>
          </div>
        </form>
      </Modal>
    </header>
  );
}
