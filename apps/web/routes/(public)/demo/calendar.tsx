import dayjs from "dayjs";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Calendar } from "$/core/ui";

export const Route = createFileRoute("/(public)/demo/calendar")({
  component: CalendarDemoPage,
});

function CalendarDemoPage() {
  const [single, setSingle] = useState<Date | undefined>(() => dayjs().toDate());
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined }>();

  return (
    <div className="max-w-3xl space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">Calendar</h1>
        <p className="text-neutral-600">
          Date grid built on DayPicker with single, multiple, and range selection.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Single</h2>
        <Calendar mode="single" onSelect={setSingle} selected={single} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Range</h2>
        <Calendar mode="range" onSelect={setRange} selected={range} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Dropdown navigation</h2>
        <Calendar captionLayout="dropdown" />
      </section>
    </div>
  );
}
