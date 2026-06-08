import React from 'react';
import './Step1Test.scss';

export default function Step1Test() {
  return (
    <div className="test-page">
      {/* Header */}
      <div className="test-header">
        <div className="test-header-content">
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
      <div className="test-content">
        <h1>Step 1: Header with SCSS</h1>
        <p>Testing rem units (1rem = 1px) and SCSS compilation</p>
        <div className="test-box">
          <p>This box should be 200rem × 100rem (200px × 100px)</p>
        </div>
      </div>
    </div>
  );
}
