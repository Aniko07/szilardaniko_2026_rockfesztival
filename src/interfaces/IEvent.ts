import type { EventTheme } from "../models/types";

export interface IEvent {
  id: string;
  name: string;
  location: string;
  time: string; // pl.: "2026.07.26 18:00"
  theme: EventTheme;
}
