"use client";

import Link from 'next/link';
import { Star } from 'lucide-react';

const styles = {
  section: {
    padding: '80px 20px',
    backgroundColor: 'var(--background, #f5f7fa)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  logoBackground: {
    position: 'absolute' as const,
    right: '-5%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '600px',
    height: '600px',
    opacity: 0.15, // Hier: 15% Deckkraft für Wasserzeichen-Effekt
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 10,
    display: 'flex',
    gap: '60px',
  },
  contentColumn: {
    flex: '2',
    minWidth: '0',
  },
  header: {
    marginBottom: '40px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
  gIconSmall: {
    width: '40px',
    height: '40px',
    padding: '8px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  ratingNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#111827',
  },
  ratingStars: {
    display: 'flex',
    color: '#facc15',
    marginBottom: '4px',
  },
  ratingCount: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '12px',
  },
  authorName: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: '14px',
  },
  date: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  reviewText: {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  ctaCard: {
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    textDecoration: 'none',
    minHeight: '200px',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
    transition: 'transform 0.2s',
  },
};

const REVIEWS = [
  { id: 1, author: "Maximilian S.", rating: 5, text: "Kompetent und freundlich. Fühle mich hier seit Jahren gut aufgehoben.", date: "vor 2 Monaten" },
  { id: 2, author: "Julia K.", rating: 5, text: "Schnelle Terminvergabe und kaum Wartezeiten. Dr. Wede nimmt sich Zeit.", date: "vor 1 Monat" },
  { id: 3, author: "Thomas W.", rating: 5, text: "Moderne Praxis und tolle Organisation. Das Team ist immer hilfsbereit.", date: "vor 3 Wochen" }
];

export function GoogleReviews() {
  return (
    <section style={styles.section}>
      {/* Background Logo - Original Google Colors, aber mit Opacity */}
      <div style={styles.logoBackground}>
        <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      <div style={styles.container}>
        <div style={styles.contentColumn}>
          
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.titleRow}>
              <div style={styles.gIconSmall}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h2 style={styles.title}>Das sagen unsere Patienten</h2>
            </div>
            
            <div style={styles.ratingRow}>
              <span style={styles.ratingNumber}>4.8</span>
              <div style={{height: '30px', width: '1px', backgroundColor: '#e5e7eb'}}></div>
              <div>
                <div style={styles.ratingStars}>
                  {[...Array(5)].map((_, i) => <Star key={i} fill="#facc15" stroke="none" size={20} />)}
                </div>
                <div style={styles.ratingCount}>84 Google Rezensionen</div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={styles.grid}>
            {REVIEWS.map((review) => (
              <div key={review.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={styles.avatar}>{review.author.charAt(0)}</div>
                    <div>
                      <div style={styles.authorName}>{review.author}</div>
                      <div style={styles.date}>{review.date}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', backgroundColor: '#fefce8', padding: '2px 6px', borderRadius: '4px'}}>
                    <span style={{fontWeight: 'bold', fontSize: '12px', color: '#b45309', marginRight: '4px'}}>5.0</span>
                    <Star fill="#eab308" stroke="none" size={12} />
                  </div>
                </div>
                <p style={styles.reviewText}>"{review.text}"</p>
              </div>
            ))}
            
            <Link href="https://g.page/r/CW2AFHZ66UdAEBM/review" target="_blank" style={styles.ctaCard}>
              <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', marginBottom: '12px'}}>
                <Star fill="white" stroke="white" size={24} />
              </div>
              <span style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', display: 'block'}}>Ihre Meinung zählt</span>
              <span style={{fontSize: '14px', opacity: 0.9, display: 'block'}}>Bewerten Sie uns auf Google</span>
            </Link>
          </div>

        </div>
        
        <div className="desktop-spacer" style={{flex: 1, minWidth: 0}}></div>
      </div>
      
      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-spacer { display: none !important; }
        }
      `}</style>
    </section>
  );
}
