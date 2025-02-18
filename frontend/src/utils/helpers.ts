export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    }).format(date);
  };