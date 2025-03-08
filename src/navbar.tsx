// components/Navbar.tsx
import React from 'react';
// import Contact from './Contact.tsx'
import './navbar.css'

function Navbar() {
  return (
    <>
    <nav>
      <ul>
        <li><a href="#home"><h2>Home</h2></a></li>
        <li><a href=""><h2>About</h2></a></li>
        <li><a href=""><h3>Hobbies</h3></a></li>
        <li><a href='#projects'><h2>Projects</h2></a></li>
        <ul>
          <li><a href='#gameDev'><h3>Game Dev</h3></a></li>
            <ul>
              <li><a href=''><p>Tower Defense</p></a></li>
            </ul>

          <li><a href='#webDev'><h3>Web Dev</h3></a></li>
          <ul>
            <li></li>
          </ul>

          <li><a href='#hardware'><h3>Hardware</h3></a></li>
          <li><a href='https://www.linkedin.com/in/angie-leong-nc/' target="_blank">LinkedIn</a></li>
        </ul>
          <li><a href='./Contact.tsx'>Contact Me</a></li>
      </ul>
    </nav>
    </>
  );
}

export default Navbar;