import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { status: authStatus, userData } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Bookmarks",
      slug: "/bookmarks",
      active: authStatus,
    }
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <NavLink to="/">
              <Logo width="45px" />
            </NavLink>
          </div>
          {authStatus && userData && (
                <p className="font-semibold text-[#4fa87d] m-auto bg-white py-2 px-4 rounded-full">
                   Welcome {userData?.name}
                </p>
            )}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 rounded-full duration-200 ${
                        isActive ? 'bg-[#4fa87d] text-white' : 'hover:bg-blue-100'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
               <li>
                 <LogoutBtn />
               </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
