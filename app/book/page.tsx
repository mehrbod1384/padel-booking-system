"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function BookPage() {
  const [courts, setCourts] = useState<any[]>([]);

  const [selectedCourt, setSelectedCourt] = useState("");

  const [date, setDate] = useState("");

  const [slots, setSlots] = useState<string[]>([]);

  const [selectedSlot, setSelectedSlot] = useState("");

  // گرفتن زمین‌ها
  useEffect(() => {
    async function getCourts() {
      const res = await axios.get("/api/courts");
      setCourts(res.data.courts);
      console.log(courts);
    }

    getCourts();
  }, []);

  // گرفتن availability
  async function fetchAvailability() {
    if (!selectedCourt || !date) return;

    const res = await axios.get(
      `/api/availability?courtId=${selectedCourt}&date=${date}`,
    );

    const data = await res.data;

    setSlots(data.availableSlots);
  }

  // ساخت رزرو
  async function createReservation() {
    const res = await axios.post("/api/reservations", {
      courtId: selectedCourt,
      date,
      slot: selectedSlot,
    });

    if (res.data.success) {
      alert("Reservation created!");

      fetchAvailability();
    } else {
      alert(res.data.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Book Court</h1>

      {/* انتخاب زمین */}
      <select
        value={selectedCourt}
        onChange={(e) => setSelectedCourt(e.target.value)}
      >
        <option value="">Select Court</option>

        {courts.map((court) => (
          <option key={court._id} value={court._id}>
            {court.name}
          </option>
        ))}
      </select>

      {/* انتخاب تاریخ */}
      <div style={{ marginTop: 20 }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* گرفتن availability */}
      <div style={{ marginTop: 20 }}>
        <button onClick={fetchAvailability}>Show Slots</button>
      </div>

      {/* نمایش slot ها */}
      <div style={{ marginTop: 20 }}>
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            style={{
              margin: 5,
              background: selectedSlot === slot ? "green" : "",
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* رزرو */}
      <div style={{ marginTop: 20 }}>
        <button disabled={!selectedSlot} onClick={createReservation}>
          Reserve
        </button>
      </div>
    </div>
  );
}
