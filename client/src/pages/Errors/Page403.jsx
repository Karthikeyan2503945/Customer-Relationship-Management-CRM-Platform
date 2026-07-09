import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/ui/ErrorState';

export default function Page403() {
  const navigate = useNavigate();
  return (
    <ErrorState
      title="403 - Forbidden Access"
      description="You do not have administrative permissions to view this resource. Contact your operations manager if you believe this is an error."
      actionText="Return to Dashboard"
      onAction={() => navigate('/dashboard')}
    />
  );
}
