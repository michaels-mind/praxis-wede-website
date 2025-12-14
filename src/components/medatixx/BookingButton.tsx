'use client';

import Script from 'next/script';
import { useState } from 'react';

interface BookingButtonProps {
  /** Optional für Demo-Zwecke */
  configId?: string;
  label?: string;
  className?: string;
}

export default function BookingButton({
  configId = '', // Fallback: Leerer String
  label = 'Termin online buchen',
  className,
}: BookingButtonProps) {
  const [isReady, setIsReady] = useState(false);

  // Prüfen, ob wir im Demo-Modus sind
  const isDemoMode = !configId;

  return (
    <>
      {/* 1. jQuery */}
      <Script
        src="https://webtermin.medatixx.de/plugin/jquery-3.6.0.min.js"
        strategy="afterInteractive"
      />

      {/* 2. Medatixx Plugin */}
      <Script
        src="https://webtermin.medatixx.de/plugin/terminbuchung-plugin.js"
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
      />

      {/* 3. Button */}
      <button
        type="button"
        // Das Plugin sucht dieses Attribut. Wenn leer, passiert nichts Magisches.
        data-configid={configId} 
        disabled={!isReady}
        onClick={() => {
          if (isDemoMode) {
            alert('DEMO-MODUS: Button ist integriert.\nFür das Overlay wird später die Medatixx-UUID benötigt.');
          }
        }}
        className={`terminbuchung-trigger transition-all duration-200 ${
          !isReady ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-110'
        } ${className || 'bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-sm'}`}
      >
        {label}
      </button>
    </>
  );
}
