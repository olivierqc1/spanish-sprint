"use client";
import { useState } from 'react';

export default function AudioManagerFree() {
  const [message, setMessage] = useState('Audio Manager Free - Coming Soon');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f1720', 
      color: '#e5e7eb', 
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          🎙️ Audio Manager Free
        </h1>
        <p style={{ fontSize: '24px', color: '#93a2b8' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
