import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  console.log('element: ', element)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  console.log('isAuthenticated: ', isAuthenticated)
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
