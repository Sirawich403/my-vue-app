import { CartItem } from './types';

const PRICE_PER_BOOK = 100;

const discounts = {
  2: 10, // 2 เล่มไม่ซ้ำ ลด 10%
  3: 20, // 3 เล่มไม่ซ้ำ ลด 20%
  4: 30, // 4 เล่มไม่ซ้ำ ลด 30%
  5: 40, // 5 เล่มไม่ซ้ำ ลด 40%
  6: 50, // 6 เล่มไม่ซ้ำ ลด 50%
  7: 60, // 7 เล่มไม่ซ้ำ ลด 60%
};

export function calculateTotalPrice(cartItems: CartItem[]): number {
  if (cartItems.length === 0) {
    return 0;
  }

  // 1. จัดกลุ่มหนังสือ (แก้ไข product.name เป็น product.id)
  let bookCounts: number[] = Object.values(
    cartItems.reduce((acc, item) => {
      if (!acc[item.product.id]) {
        acc[item.product.id] = 0;
      }
      acc[item.product.id] += item.quantity;
      return acc;
    }, {} as { [key: number]: number }) // กำหนด type ให้ accumulator
  );
  bookCounts.sort((a, b) => b - a);

  // 2. คำนวณส่วนลด
  let totalDiscount = 0;
  while (bookCounts.length > 0 && bookCounts.some((count) => count > 0)) {
    const uniqueBooks = bookCounts.filter((count) => count > 0).length;
    const discount = discounts[uniqueBooks] || 0;
    totalDiscount += uniqueBooks * PRICE_PER_BOOK * (discount / 100);

    bookCounts = bookCounts.map((count) => (count > 0 ? count - 1 : 0));
    bookCounts = bookCounts.filter((count) => count > 0);
  }

  // 3. คำนวณราคาก่อนลด
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // 4. คำนวณราคาสุทธิ
  // const netPrice = totalPrice - totalDiscount; // ไม่จำเป็น

  return totalPrice - totalDiscount;
}