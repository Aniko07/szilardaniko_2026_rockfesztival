import { Event } from "../src/models/Event";
import { Participant } from "../src/models/Participant";
import { EventManager } from "../src/services/EventManager";

describe("EventManager basic functionality", () => {

  it("should create a new event", () => {
    const manager = new EventManager();
    const event = new Event("ev-1", "Test Event", "Budapest", "2026.07.26 18:00", "Rock");

    manager.createEvent(event);

    expect(manager.listAllEvents().length).toBe(1);
  });

  it("should register participant to event", () => {
    const manager = new EventManager();
    const event = new Event("ev-1", "Test Event", "Budapest", "2026.07.26 18:00", "Rock");

    manager.createEvent(event);

    const participant = new Participant("p-1", "Perta", "petra@test.hu");
    manager.registerParticipant("ev-1", participant);

    expect(manager.getEventById("ev-1")!.getParticipantCount()).toBe(1);
  });

});
