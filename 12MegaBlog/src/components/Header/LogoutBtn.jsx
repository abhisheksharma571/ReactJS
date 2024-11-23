import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
