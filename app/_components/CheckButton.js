"use client";
import { updateReservation } from "../_lib/actions";

function CheckButton({ reservationId }) {
  function handleUpdate() {
    updateReservation(reservationId);
  }
  return (
    <button
      onClick={() => handleUpdate}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      Update reservation
    </button>
  );
}

export default CheckButton;
