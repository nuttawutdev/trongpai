"use client";

import dynamic from "next/dynamic";
import { events } from "@/data/events";
import { useMapContext } from "@/context/MapContext";
import { useRef, useState } from "react";

const BangkokMap = dynamic(
  () => import("@/components/Map"),
  {
    ssr: false,
  }
);

const hotspots = [
  {
    id: 1,
    title: "ราชมังคลากีฬาสถาน",
    event: "Concert",
    score: 95,
  },
  {
    id: 2,
    title: "Impact เมืองทอง",
    event: "Expo",
    score: 88,
  },
  {
    id: 3,
    title: "RCA",
    event: "Nightlife",
    score: 82,
  },
];


export default function Home() {

  const mapSectionRef = useRef<HTMLDivElement>(null);
  const { setSelectedPosition } = useMapContext();
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const today = new Date();

  const filteredEventsDate = events.filter((event) => {
    const matchSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const eventDate = new Date(event.eventDate);

    let matchDate = true;

    if (dateFilter === "today") {
      matchDate =
        eventDate.toDateString() ===
        today.toDateString();
    }

    if (dateFilter === "week") {
      const diff =
        (eventDate.getTime() -
          today.getTime()) /
        (1000 * 60 * 60 * 24);

      matchDate = diff >= 0 && diff <= 7;
    }

    if (dateFilter === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      matchDate =
        eventDate.toDateString() ===
        tomorrow.toDateString();
    }

    return matchSearch && matchDate;
  });

  const filteredEvents = events.filter((event) => {
    const matchSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchDate =
      !selectedDate ||
      event.eventDate === selectedDate;

    return matchSearch && matchDate;
  });

  const totalCount = events.length;

  const todayCount = events.filter((event) => {
    const eventDate = new Date(event.eventDate);

    return (
      eventDate.toDateString() ===
      today.toDateString()
    );
  }).length;

  const tomorrowCount = events.filter((event) => {
    const eventDate = new Date(event.eventDate);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      eventDate.toDateString() ===
      tomorrow.toDateString()
    );
  }).length;

  const weekCount = events.filter((event) => {
    const eventDate = new Date(event.eventDate);

    const diff =
      (eventDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold">
              trongpai
            </h1>

            <p className="text-sm text-slate-400">
              รู้ก่อน วิ่งไวกว่า
            </p>
          </div>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500">
            Sign In
          </button>
        </div>
      </header>


      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-4xl font-bold">
            คืนนี้ตรงไหนดี?
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            รวม Event และ Hotspot ทั่วกรุงเทพ
            เพื่อช่วยให้ Driver และคนเดินทาง
            รู้ว่าจุดไหนกำลังคึกคัก
          </p>

          {/* KPI */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-3xl font-bold text-blue-400">
                {events.length}
              </div>
              <div className="text-sm text-slate-400">
                Events
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-3xl font-bold text-red-400">
                {events.filter((e) => e.crowdScore >= 80).length}
              </div>
              <div className="text-sm text-slate-400">
                Hotspots
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-3xl font-bold text-green-400">
                {
                  [...new Set(events.map((e) => e.location))]
                    .length
                }
              </div>
              <div className="text-sm text-slate-400">
                Areas
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="🔍 ค้นหา Event หรือสถานที่"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none transition focus:border-blue-500"
            />

            {/* <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none transition focus:border-blue-500"
            /> */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setDateFilter("all")}
                className={`rounded-lg px-4 py-2 ${dateFilter === "all"
                  ? "bg-blue-600"
                  : "bg-slate-800"
                  }`}
              >
                ทั้งหมด ({totalCount})
              </button>

              <button
                onClick={() => setDateFilter("today")}
                className={`rounded-lg px-4 py-2 ${dateFilter === "today"
                  ? "bg-blue-600"
                  : "bg-slate-800"
                  }`}
              >
                วันนี้ ({todayCount})
              </button>
              <button
                onClick={() => setDateFilter("tomorrow")}
                className={`rounded-lg px-4 py-2 ${dateFilter === "tomorrow"
                  ? "bg-blue-600"
                  : "bg-slate-800"
                  }`}
              >
                พรุ่งนี้ ({tomorrowCount})
              </button>
              <button
                onClick={() => setDateFilter("week")}
                className={`rounded-lg px-4 py-2 ${dateFilter === "week"
                  ? "bg-blue-600"
                  : "bg-slate-800"
                  }`}
              >
                7 วัน ({weekCount})
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Content */}
      <section className="mx-auto grid max-w-7xl gap-6 p-4 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-4 text-xl font-semibold">
              📅 Upcoming Events
            </h3>
            <p className="mb-4 text-sm text-slate-400">
              พบ {filteredEventsDate.length} งาน
            </p>
            <div className="max-h-[750px] overflow-y-auto space-y-3">

              {filteredEventsDate.map((event) => (
                <div
                  key={event.id}
                  className="cursor-pointer rounded-xl border border-slate-700 p-4 transition hover:border-blue-500"
                  onClick={() => {
                    setSelectedPosition({
                      lat: event.lat,
                      lng: event.lng,
                    });

                    mapSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <div className="font-semibold">
                    {event.title}
                  </div>

                  <div className="text-sm text-slate-400">
                    {event.location}
                  </div>

                  <div className="mt-2 font-bold">
                    {event.crowdScore >= 90 ? (
                      <span className="text-red-400">
                        🔥 Demand สูงมาก
                      </span>
                    ) : event.crowdScore >= 80 ? (
                      <span className="text-orange-400">
                        🚕 Demand สูง
                      </span>
                    ) : (
                      <span className="text-green-400">
                        👍 Demand ปานกลาง
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    📅 {event.eventDate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-4 text-xl font-semibold">
              🚕 แนะนำคืนนี้
            </h3>

            <div className="space-y-2 text-slate-300">
              <div>📍 RCA</div>
              <div>📍 ราชมัง</div>
              <div>📍 อโศก</div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapSectionRef} className="lg:col-span-2 sticky top-4 h-fit">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                🗺️ Bangkok Live Map
              </h3>

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                LIVE
              </span>
            </div>

            {/* <div className="flex h-[650px] items-center justify-center rounded-xl bg-slate-800">
              <span className="text-slate-500">
                Leaflet Map Coming Soon
              </span>
            </div> */}
            <BangkokMap />
          </div>
        </div>
      </section>
    </main>
  );
}