export const queryKeys = {
  courts: ["courts"],
  /** Player-facing: GET /reservations/my */
  myBookings: ["reservations", "my"],
  /** Admin-facing: GET /admin/reservations */
  adminReservations: ["reservations", "admin"],
  /** GET /reservations/:id */
  reservation: (id: string) => ["reservations", "detail", id],
  dashboard: ["dashboard"],
  /** GET /payments/:id */
  payment: (id: string) => ["payments", "detail", id],
  auth: ["auth"],
};
