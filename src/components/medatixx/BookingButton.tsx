'use client';

interface BookingButtonProps {
  configId?: string;
  label?: string;
  className?: string;
}

export default function BookingButton({
  configId,
  label = '📅 Termin buchen',
  className = '',
}: BookingButtonProps) {
  const handleClick = () => {
    alert('Die Online-Terminbuchung wird aktuell überarbeitet. Bitte vereinbaren Sie Ihren Termin telefonisch.');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className + ' opacity-90 hover:opacity-100 cursor-pointer'}
    >
      {label}
    </button>
  );
}
