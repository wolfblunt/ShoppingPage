export const sortData = <T,>(data: T[], field: keyof T, direction: 'asc' | 'desc') => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
