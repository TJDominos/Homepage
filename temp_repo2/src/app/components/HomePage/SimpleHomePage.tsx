import React from 'react';
import './index.scss';

export default function SimpleHomePage() {
  return (
    <div className="home-page relative desktop-mode">
      {/* Header */}
      <div className="home-header" style={{ background: 'linear-gradient(to right, #D5D6F7, #E1E2F9, #D3C3FB)', borderBottom: '1px solid rgba(167, 139, 250, 0.3)' }}>
        <div className="home-header-content">
          <div className="logo-area">
            <div className="logo"></div>
          </div>
          <span className="title">Randseed</span>
          <a href="/community/wltoken" target="_blank" rel="noopener noreferrer" className="community-btn">
            <span></span>
            Community
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '80rem 20rem', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '24rem', marginBottom: '16rem' }}>HomePage Loading...</h1>
        <p style={{ fontSize: '16rem' }}>The full page is being set up. This is a simplified version to test rendering.</p>
      </div>
    </div>
  );
}
