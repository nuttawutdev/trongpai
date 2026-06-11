const venues = [
  {
    name: "Impact Arena",
    lat: 13.912,
    lng: 100.547,
    district: "ปากเกร็ด",
  },
  {
    name: "ราชมังคลากีฬาสถาน",
    lat: 13.754,
    lng: 100.622,
    district: "บางกะปิ",
  },
  {
    name: "BITEC",
    lat: 13.668,
    lng: 100.635,
    district: "บางนา",
  },
  {
    name: "CentralWorld",
    lat: 13.746,
    lng: 100.539,
    district: "ปทุมวัน",
  },
  {
    name: "One Bangkok",
    lat: 13.725,
    lng: 100.547,
    district: "สาทร",
  },
  {
    name: "RCA",
    lat: 13.747,
    lng: 100.571,
    district: "ห้วยขวาง",
  },
  {
    name: "สวนลุมพินี",
    lat: 13.73,
    lng: 100.541,
    district: "ปทุมวัน",
  },
];

const categories = [
  "concert",
  "festival",
  "expo",
  "food",
  "sport",
  "market",
  "nightlife",
  "tech",
];

const eventNames = [
  "Music Festival",
  "Food Fair",
  "Startup Meetup",
  "Anime Expo",
  "Night Market",
  "Running Event",
  "Coffee Festival",
  "Tech Conference",
  "Gaming Tournament",
  "Art Exhibition",
];

export const events = Array.from(
  { length: 100 },
  (_, index) => {
    const venue =
      venues[index % venues.length];

    const category =
      categories[
        index % categories.length
      ];

    const eventName =
      eventNames[
        index % eventNames.length
      ];

    const day =
      (index % 30) + 1;

    return {
      id: index + 1,
      title: `${eventName} #${index + 1}`,
      location: venue.name,
      district: venue.district,
      lat: venue.lat,
      lng: venue.lng,
      crowdScore:
        60 + Math.floor(Math.random() * 40),
      category,
      eventDate: `2026-06-${String(
        day
      ).padStart(2, "0")}`,
    };
  }
);