function formatRating(rating: number) {
  const formatted = rating.toFixed(1);
  if (formatted.endsWith('.0')) return formatted.slice(0, -2);
  return formatted;
}

export { formatRating };
