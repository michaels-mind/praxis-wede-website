interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'primary' | 'accent' | 'success' | 'warning';
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className='admin-stat-card'>
      <div className={`stat-icon stat-icon--${color}`}>
        {icon}
      </div>
      <div className='stat-content'>
        <h3 className='stat-title'>{title}</h3>
        <p className='stat-value'>{value}</p>
      </div>
    </div>
  );
}
