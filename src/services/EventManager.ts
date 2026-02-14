import { Event } from "../models/Event";
import { Participant } from "../models/Participant";
import type { EventTheme } from "../models/types";
import type { IEventManager } from "../interfaces/IEventManager";
import { NotFoundError } from "../utils/errors";

export class EventManager implements IEventManager {
  private events: Map<string, Event> = new Map();

  createEvent(event: Event): void {
    this.events.set(event.id, event);
  }

  updateEvent(
    eventId: string,
    patch: Partial<Pick<Event, "name" | "location" | "time" | "theme">>
  ): Event {
    const event = this.getOrThrow(eventId);


    if (patch.name !== undefined) event.name = patch.name;
    if (patch.location !== undefined) event.location = patch.location;
    if (patch.time !== undefined) event.time = patch.time;
    if (patch.theme !== undefined) event.theme = patch.theme;

    return event;
  }

  deleteEvent(eventId: string): boolean {
    return this.events.delete(eventId);
  }

  getEventById(eventId: string): Event | undefined {
    return this.events.get(eventId);
  }

  listAllEvents(): Event[] {
    return Array.from(this.events.values());
  }

  getEventsByTheme(theme: EventTheme): Event[] {
    return this.listAllEvents().filter((e) => e.theme === theme);
  }

  registerParticipant(eventId: string, participant: Participant): void {
    const event = this.getOrThrow(eventId);
    event.addParticipant(participant);
  }

  unregisterParticipant(eventId: string, participantId: string): boolean {
    const event = this.getOrThrow(eventId);
    return event.removeParticipant(participantId);
  }

  getEventsOfParticipant(participantId: string): Event[] {
    return this.listAllEvents().filter((e) => e.hasParticipant(participantId));
  }


  async createEventAsync(event: Event): Promise<void> {
    try {
     
      await Promise.resolve();
      this.createEvent(event);
    } catch (err) {
      
      throw err;
    }
  }

  private getOrThrow(eventId: string): Event {
    const event = this.events.get(eventId);
    if (!event) {
      throw new NotFoundError(`Event not found: ${eventId}`);
    }
    return event;
  }
}
