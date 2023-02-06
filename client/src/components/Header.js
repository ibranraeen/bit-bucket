import '../css/header.css';
import React, { useState } from 'react';

const Header = ({ user, signOut }) => {
  return (
    <header className="header">
      <div className="header-user-name">{user.displayName}</div>
      <button onClick={signOut} className="header-logout-button">Sign Out</button>
    </header>
  )
}

export default Header;