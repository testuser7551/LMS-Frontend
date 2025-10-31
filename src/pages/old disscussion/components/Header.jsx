// src/pages/Discussion/components/Header.jsx
import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import SearchBar from "./SearchBar";

const Header = ({ user, onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Center section - Search */}
          {/* <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <SearchBar />
          </div> */}

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            {/* <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5" />
            </button> */}

            {/* Notifications */}
            <NotificationDropdown />

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                {/* <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {/* <div className="md:hidden px-4 pb-3 border-t border-gray-100">
        <SearchBar />
      </div> */}
    </header>
  );
};

export default Header;
