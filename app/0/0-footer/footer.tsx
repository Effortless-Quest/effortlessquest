"use client";

import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <section className="footer-card-container">
      <div className="footer h-70 py-8 rounded-lg shadow-lg">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-8 mt-[-10px]">

            {/* Effortless Works Links */}
            <div className="footer-card effortless-card p-6 shadow-md rounded-md text-center">
              <h3 className="text-2xl font-bold">⚔️Effortless Quest⚔️</h3>
              <a href="/000005/about" className="footer-link">About</a>
                    <a href="/000005/howtoplay" className="footer-link">How To Play</a>
                    <a href="/000005/roadmap" className="footer-link">Road Map</a>
              
              
            </div>

          </div>

          {/* Policy Links */}
          <div className="footer-links mt-8">
            <a href="/4/privacy" className="footer-link">Privacy Policy</a>
            <a href="/4/terms" className="footer-link">Terms of Service</a>
            <a href="/4/return" className="footer-link">Return Policy</a>
            <a href="/4/cookies" className="footer-link">Cookie Policy</a>
            <a href="/4/disclaimer" className="footer-link">Disclaimer</a>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4 footer-copyright">
            <p>&copy; 2024 Elif Çakmak, EasyFlow Media, Effortless Works. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
