export const selectLoadingBooking = state => state.booking.loading;

export const selectFilter = state => state.booking.filter;

export const selectError = state => state.booking.error;

export const selectAllReservationsBooking = state => state.booking.items;

// Всі pending (очікують підтвердження)
export const selectPendingBookings = state =>
  state.booking.items.filter(b => b.status === "pending");

// Всі confirmed (підтверджені)
export const selectConfirmedBookings = state =>
  state.booking.items.filter(b => b.status === "confirmed");

// Всі cancelled (відмінені)
export const selectCancelledBookings = state =>
  state.booking.items.filter(b => b.status === "cancelled");

// Всі майбутні бронювання зі статусом "pending"
export const selectFutureBookings = state =>
  state.booking.items
    .filter(b => {
      const bookingDateTime = new Date(`${b.date}T${b.time}`);
      return bookingDateTime > new Date() && b.status === "pending";
    })
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
    );

// Селектор-конструктор: перевірка на конфлікт
export const selectIsTimeSlotTaken = (businessId, date, time) => state => {
  return state.booking.items.some(
    b =>
      b.businessId === businessId &&
      b.date === date &&
      b.time === time &&
      b.status !== "cancelled" // відмінені можна ігнорити
  );
};
