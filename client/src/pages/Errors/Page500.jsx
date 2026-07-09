import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/ui/ErrorState';

export default function Page500() {
  const navigate = useNavigate();
  return (
    <ErrorState
      title="500 - Internal Server Exception"
      description="The database or Express gateway encountered an unhandled exception. Verify network logs or try again shortly."
      actionText="Retry Connection"
      onAction={() => navigate('/dashboard')}
    />
  );
}
