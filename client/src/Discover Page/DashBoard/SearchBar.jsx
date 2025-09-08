import React from 'react';

export default function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search blogs..."
      className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800  text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  );
}
