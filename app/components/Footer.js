'use client';
import { useEffect, useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} Dea Pradestiawati — Made with 💖 and semangat ✨</p>
        <div className="footer-links">
          <a
            href="https://github.com/pradeslagi" // ganti link sesuai username kamu ya!
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://instagram.com/deapradestiawati" // ganti juga kalau beda username
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
