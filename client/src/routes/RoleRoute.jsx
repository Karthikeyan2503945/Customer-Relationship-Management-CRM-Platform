import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const roleMap = {
  'admin': 'admin',
  'sales_manager': 'sales_manager',
  'sales_executive': 'sales_executive',
  'sales manager': 'sales_manager',
  'sales executive': 'sales_executive'
};

const normalizeRole = (role) => {
  if (!role) return '';
  const clean = role.toString().trim().toLowerCase();
  return roleMap[clean] || clean;
};

export default function RoleRoute({ userRole, allowedRoles = [] }) {
  const normalizedUserRole = normalizeRole(userRole);
  const normalizedAllowed = allowedRoles.map(normalizeRole);
  return normalizedAllowed.includes(normalizedUserRole) ? <Outlet /> : <Navigate to="/403" replace />;
}

