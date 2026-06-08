import React from 'react';

export default function MinimalTest() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px',
      background: 'linear-gradient(to bottom, #D5D6F7, #E1E2F9, #ffffff)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#000' }}>
        Randseed HomePage
      </h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Component is rendering successfully!
      </p>
      <div style={{ marginTop: '30px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Status</h2>
        <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <li>✓ React component loaded</li>
          <li>✓ Styles applied via inline styles</li>
          <li>✓ No SCSS dependencies</li>
        </ul>
      </div>
    </div>
  );
}
