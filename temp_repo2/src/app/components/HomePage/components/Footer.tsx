import React from "react";
import { Fingerprint, MessageSquare, ShieldCheck, Twitter } from "lucide-react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="home-footer-topline">
          <span><ShieldCheck aria-hidden="true" /> Public randomness</span>
          <span>Original games</span>
          <span>Ledger verified</span>
        </div>

        <div className="home-footer-main">
          <div className="home-footer-brand">
            <div className="home-footer-logo-row">
              <Fingerprint className="home-footer-brand-icon" aria-hidden="true" />
              <span>Randseed</span>
            </div>
            <p>
              Fair, original games built around verifiable randomness and public blockchain ledger technology.
            </p>
          </div>

          <div className="home-footer-links">
            <div className="home-footer-column">
              <h3>Platform</h3>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/roadmap">Roadmap</a></li>
                <li><a href="/community/wltoken">$WLT Token</a></li>
              </ul>
            </div>

            <div className="home-footer-column">
              <h3>Connect</h3>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="https://x.com/randseedgame" target="_blank" rel="noreferrer"><Twitter className="home-footer-link-icon" aria-hidden="true" />@randseedgame</a></li>
                <li><a href="/discord"><MessageSquare className="home-footer-link-icon" aria-hidden="true" />Discord</a></li>
                <li><a href="/gamevrf"><Fingerprint className="home-footer-link-icon" aria-hidden="true" />GameVRF</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="home-footer-bottom">
          <p>© 2026 Randseed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
