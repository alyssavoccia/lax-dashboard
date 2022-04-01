import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const AdminRoute = () => {
  const { loggedIn, loading } = useAuthStatus();
  const currentUser = useSelector((state) => state.user.currentUser);

  if (loading) {
    return <Spinner />
  }

  return loggedIn && currentUser.isAdmin ? <Outlet /> : <Navigate to='/sign-in-sign-up' />
}

export default AdminRoute;