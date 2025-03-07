// components/Navbar.tsx
import React from 'react';
import './navbar.css'

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/"><h2>Home</h2></a></li>
        <li><a href="/about"><h2>About</h2></a></li>
        <li><a href=""><h3>Hobbies</h3></a></li>
        <li><a href='/projects'><h2>Projects</h2></a></li>
        <ul>
          <li><a href='/gameDev'><h3>Game Dev</h3></a></li>
            <ul>
              <li><a href=''><p>Tower Defense</p></a></li>
            </ul>

          <li><a href='/webDeb'><h3>Web Dev</h3></a></li>
          <ul>
            <li></li>
          </ul>

          <li><a href=''><h3>Hardware</h3></a></li>
        </ul>
      </ul>
    </nav>
  );
}

export default Navbar;