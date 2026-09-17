"use client";

import SegmentedControl from "@/components/ui/SegmentedControl";

import type { SegmentedOption } from "@/components/ui/SegmentedControl";
import type { BookingPeriod } from "../../types";

const options: SegmentedOption<BookingPeriod>[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export default function TimeButtons({
  time,
  setTime,
}: {
  time: BookingPeriod;
  setTime: (value: BookingPeriod) => void;
}) {
  return (
    <SegmentedControl
      value={time}
      onChange={setTime}
      options={options}
      fullWidth
      className="mx-auto max-w-90"
    />
  );
}
