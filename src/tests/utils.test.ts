import { describe, it, expect } from 'vitest';
import { calculateTotalPrice } from '../utils';
import { Product } from '../types';

const mockProduct1: Product = { id: 1, name: 'แฮร์รี่ พอตเตอร์กับศิลาอาถรรพ์', price: 100, image: '' };
const mockProduct2: Product = { id: 2, name: 'แฮร์รี่ พอตเตอร์กับห้องแห่งความลับ', price: 100, image: '' };
const mockProduct3: Product = { id: 3, name: 'แฮร์รี่ พอตเตอร์กับถ้วยอัคนี', price: 100, image: '' };

describe('calculateTotalPrice', () => {
  it('calculates price with no discount', () => {
    expect(calculateTotalPrice([{ product: mockProduct1, quantity: 1 }])).toBe(100);
  });

  it('calculates price with 2 unique books', () => {
    expect(calculateTotalPrice([
      { product: mockProduct1, quantity: 1 },
      { product: mockProduct2, quantity: 1 },
    ])).toBe(180);
  });

  it('calculates price with 3 unique books', () => {
    expect(calculateTotalPrice([
      { product: mockProduct1, quantity: 1 },
      { product: mockProduct2, quantity: 1 },
      { product: mockProduct3, quantity: 1 },
    ])).toBe(240);
  });

  it('calculates price with multiple same books', () => {
    expect(calculateTotalPrice([{ product: mockProduct1, quantity: 3 }])).toBe(300);
  });

  it('calculates price with example 1', () => {
    expect(calculateTotalPrice([
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 1 },
    ])).toBe(280);
  });

  it('calculates price with example 2', () => {
    expect(calculateTotalPrice([
      { product: mockProduct2, quantity: 3 },
      { product: mockProduct3, quantity: 3 },
    ])).toBe(540);
  });

  it('calculates price with example 3', () => {
    expect(calculateTotalPrice([
      { product: mockProduct1, quantity: 1 },
      { product: mockProduct2, quantity: 1 },
      { product: mockProduct3, quantity: 1 },
    ])).toBe(240);
  });
  it('calculates price with example 4', () => {
    expect(calculateTotalPrice([{ product: mockProduct1, quantity: 10 }])).toBe(1000);
  });

  it('returns 0 for empty cart', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });
});