import type { IParticipant } from "../interfaces/IParticipant";
import { assertEmailLike, assertNonEmpty } from "../utils/validators";

export class Participant implements IParticipant {
  private readonly _id: string;
  private _name: string;
  private _email: string;

  constructor(id: string, name: string, email: string) {
    assertNonEmpty(id, "Participant id");
    assertNonEmpty(name, "Participant name");
    assertEmailLike(email);

    this._id = id.trim();
    this._name = name.trim();
    this._email = email.trim();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    assertNonEmpty(value, "Participant name");
    this._name = value.trim();
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    assertEmailLike(value);
    this._email = value.trim();
  }
}
