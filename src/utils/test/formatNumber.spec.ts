import { formatRating } from '../formatNumber';

describe('formatRating', () => {
  it('formats a rating with one decimal place', () => {
    expect(formatRating(4.5)).toBe('4.5');
  });

  it('removes the decimal place if it is 0', () => {
    expect(formatRating(4.0)).toBe('4');
  });

  it('returns 0 for 0.0', () => {
    expect(formatRating(0.0)).toBe('0');
  });

  it('returns 10 for 10.0', () => {
    expect(formatRating(10.0)).toBe('10');
  });
});
