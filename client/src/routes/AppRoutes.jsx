import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import LandingLayout from '../layouts/LandingLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import Loader from '../components/Common/Loader';

// Lazy Loaded Pages
const Landing = React.lazy(() => import('../pages/Landing'));
const Login = React.lazy(() => import('../pages/Auth/Login'));
const Register = React.lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword'));
const Overview = React.lazy(() => import('../pages/Dashboard/Overview'));
const CustomerList = React.lazy(() => import('../pages/Dashboard/Customers/CustomerList'));
const CustomerDetail = React.lazy(() => import('../pages/Dashboard/Customers/CustomerDetail'));
const LeadList = React.lazy(() => import('../pages/Dashboard/Leads/LeadList'));
const LeadDetail = React.lazy(() => import('../pages/Dashboard/Leads/LeadDetail'));
const LeadBoard = React.lazy(() => import('../pages/Dashboard/Leads/LeadBoard'));
const TaskBoard = React.lazy(() => import('../pages/Dashboard/Tasks/TaskBoard'));
const CalendarView = React.lazy(() => import('../pages/Dashboard/Calendar/CalendarView'));
const AnalyticsDashboard = React.lazy(() => import('../pages/Dashboard/Reports/AnalyticsDashboard'));
const UserProfile = React.lazy(() => import('../pages/Dashboard/Profile/UserProfile'));
const GeneralSettings = React.lazy(() => import('../pages/Dashboard/Settings/GeneralSettings'));
const UserList = React.lazy(() => import('../pages/Dashboard/Users/UserList'));
const NotificationCenter = React.lazy(() => import('../pages/Dashboard/Notifications/NotificationCenter'));

// Lazy Loaded Errors
const Page403 = React.lazy(() => import('../pages/Errors/Page403'));
const Page404 = React.lazy(() => import('../pages/Errors/Page404'));
const Page500 = React.lazy(() => import('../pages/Errors/Page500'));

// Guards
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

export default function AppRoutes() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRole = user?.role || 'sales_executive';

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader /></div>}>
      <Routes>
        {/* Redirect root to dashboard if logged in, else to login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

        {/* Auth Screen Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<DashboardLayout />}>
            {/* General Views */}
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/pipeline" element={<LeadBoard />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/notifications" element={<NotificationCenter />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<GeneralSettings />} />

            {/* Role Restricted Views */}
            <Route element={<RoleRoute userRole={userRole} allowedRoles={['admin', 'sales_manager']} />}>
              <Route path="/reports" element={<AnalyticsDashboard />} />
            </Route>

            {/* Admin Only Views */}
            <Route element={<RoleRoute userRole={userRole} allowedRoles={['admin']} />}>
              <Route path="/users" element={<UserList />} />
            </Route>
          </Route>
        </Route>

        {/* Error Boundary Routes */}
        <Route element={<ErrorLayout />}>
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Route>

        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
