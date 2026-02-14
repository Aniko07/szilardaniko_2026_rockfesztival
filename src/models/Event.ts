import type { IEvent } from "../interfaces/IEvent";
import type { EventTheme } from "./types";
import { Participant } from "./Participant";
import { assertNonEmpty } from "../utils/validators";
import { ConflictError } from "../utils/errors";

export class Event implements IEvent {
  private readonly _id: string;
  private _name: string;
  private _location: string;
  private _time: string; // "2026.07.26 18:00"
  private _theme: EventTheme;

  private participants: Map<string, Participant> = new Map();

  constructor(
    id: string,
    name: string,
    location: string,
    time: string,
    theme: EventTheme
  ) {
    assertNonEmpty(id, "Event id");
    assertNonEmpty(name, "Event name");
    assertNonEmpty(location, "Event location");
    assertNonEmpty(time, "Event time");

    this._id = id.trim();
    this._name = name.trim();
    this._location = location.trim();
    this._time = time.trim();
    this._theme = theme;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    assertNonEmpty(value, "Event name");
    this._name = value.trim();
  }

  get location(): string {
    return this._location;
  }
  set location(value: string) {
    assertNonEmpty(value, "Event location");
    this._location = value.trim();
  }

  get time(): string {
    return this._time;
  }
  set time(value: string) {
    assertNonEmpty(value, "Event time");
    this._time = value.trim();
  }

  get theme(): EventTheme {
    return this._theme;
  }
  set theme(value: EventTheme) {
    this._theme = value;
  }

  addParticipant(participant: Participant): void {
    
    if (this.participants.has(participant.id)) {
      throw new ConflictError(
        `Participant already registered: ${participant.id}`
      );
    }
    this.participants.set(participant.id, participant);
  }

  removeParticipant(participantId: string): boolean {
    return this.participants.delete(participantId);
  }

  hasParticipant(participantId: string): boolean {
    return this.participants.has(participantId);
  }

  getParticipants(): Participant[] {
    return Array.from(this.participants.values());
  }

  getParticipantCount(): number {
    return this.participants.size;
  }
}
