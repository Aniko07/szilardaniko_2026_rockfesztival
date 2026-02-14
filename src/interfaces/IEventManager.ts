import type { IEvent } from "./IEvent";
import type { IParticipant } from "./IParticipant";
import type { EventTheme } from "../models/types";

export interface IEventManager {
  createEvent(event: IEvent): void;

  updateEvent(
    eventId: string,
    patch: Partial<Pick<IEvent, "name" | "location" | "time" | "theme">>
  ): IEvent;

  deleteEvent(eventId: string): boolean;

  getEventById(eventId: string): IEvent | undefined;
  listAllEvents(): IEvent[];

  getEventsByTheme(theme: EventTheme): IEvent[];

  registerParticipant(eventId: string, participant: IParticipant): void;
  unregisterParticipant(eventId: string, participantId: string): boolean;

  getEventsOfParticipant(participantId: string): IEvent[];
}

