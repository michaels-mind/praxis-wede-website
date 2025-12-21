'use client';

import React from 'react';

const REVIEWS = [
  {
    id: 1,
    name: 'Maximilian S.',
    date: 'vor 2 Monaten',
    initial: 'M',
    rating: 5.0,
    text: 'Sehr kompetentes Team und kurze Wartezeiten. Ich fühle mich hier bestens aufgehoben. Dr. Wede nimmt sich wirklich Zeit für seine Patienten.',
  },
  {
    id: 2,
    name: 'Julia K.',
    date: 'vor 1 Monat',
    initial: 'J',
    rating: 5.0,
    text: 'Moderne Praxis und freundliche Atmosphäre. Die Terminvergabe über Medatixx funktioniert super einfach. Klare Empfehlung!',
  },
  {
    id: 3,
    name: 'Thomas W.',
    date: 'vor 3 Wochen',
    initial: 'T',
    rating: 5.0,
    text: 'Bin seit Jahren Patient und immer zufrieden. Das Team ist sehr hilfsbereit, auch wenn mal viel los ist.',
  },
];

export function GoogleReviews() {
  return (
    <section className="relative overflow-hidden py-20 bg-gray-50/50">
      {/* Background Decor */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.26v2.72h3.58c2.09-1.93 3.3-4.79 3.3-8.24z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 p-2 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.26v2.72h3.58c2.09-1.93 3.3-4.79 3.3-8.24z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 m-0">Das sagen unsere Patienten</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">4.8</span>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <div className="flex text-yellow-400 mb-1 text-lg">★★★★★</div>
                <div className="text-sm text-gray-500 font-medium">84 Google Rezensionen</div>
              </div>
            </div>
          </div>

          {/* Grid Layout (wie im alten Design) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center mr-3 flex-shrink-0">
                      {review.initial}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                      <div className="text-xs text-gray-400">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded text-xs font-bold text-yellow-700 flex-shrink-0">
                    <span className="mr-1">{review.rating}</span> ★
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic flex-grow">"{review.text}"</p>
              </div>
            ))}

            {/* CTA Card im Grid integriert (wie im alten Design) */}
            <a
              href="https://g.page/r/YOUR_GOOGLE_ID/review" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white rounded-2xl p-6 text-center shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex flex-col items-center justify-center h-full min-h-[200px] group"
            >
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                </svg>
              </div>
              <span className="block text-xl font-bold mb-1">Ihre Meinung zählt</span>
              <span className="block text-blue-100 text-sm">Bewerten Sie uns auf Google</span>
            </a>
          </div>
        </div>

        {/* Spacer for large screens only (optional, for aesthetics) */}
        <div className="hidden lg:block w-1/12"></div>
      </div>
    </section>
  );
}
