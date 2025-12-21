export const validateRequired = (value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Dieses Feld ist erforderlich.';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (phone && !phoneRegex.test(phone)) {
    return 'Bitte geben Sie eine gültige Telefonnummer ein.';
  }
  return null;
};
