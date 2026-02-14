import { Event } from "./models/Event";
import { Participant } from "./models/Participant";
import { EventManager } from "./services/EventManager";

const manager = new EventManager();

// 2026 Rockfesztivál
const rockFest = new Event(
  "ev-001",
  "2026 Rockfesztivál",
  "Budapest",
  "2026.07.26 18:00",
  "Rock"
);

const metalNight = new Event(
  "ev-002",
  "Metal Night",
  "Győr",
  "2026.08.02 19:30",
  "Metal"
);

manager.createEvent(rockFest);
manager.createEvent(metalNight);

const p1 = new Participant("p-001", "Kovács Péter", "peter@example.com");
const p2 = new Participant("p-002", "Nagy Anna", "anna@example.com");

manager.registerParticipant("ev-001", p1);
manager.registerParticipant("ev-001", p2);
manager.registerParticipant("ev-002", p2);

// Lekérdezések
console.log("== ALL EVENTS ==");
for (const e of manager.listAllEvents()) {
  console.log(
    `- ${e.id}: ${e.name} | ${e.location} | ${e.time} | ${e.theme} | participants=${e.getParticipantCount()}`
  );
}

console.log("\n== ROCK EVENTS ==");
console.log(manager.getEventsByTheme("Rock").map((e) => e.name));

console.log("\n== EVENTS OF p-002 ==");
console.log(manager.getEventsOfParticipant("p-002").map((e) => e.name));

console.log("\n== PARTICIPANTS OF ROCKFEST ==");
console.log(
  rockFest.getParticipants().map((p) => `${p.name} <${p.email}>`)
);
