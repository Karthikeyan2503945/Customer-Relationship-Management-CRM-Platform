import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/ui/ErrorState';

export default function Page404() {
  const navigate = useNavigate();
  return (
    <ErrorState
      title="404 - Page Not Found"
      description="The link you followed may be broken or the directory page might have been removed. Verify your URL path parameters."
      actionText="Go Home"
      onAction={() => navigate('/dashboard')}
    />
  );
}
