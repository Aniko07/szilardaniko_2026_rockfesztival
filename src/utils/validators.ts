import { ValidationError } from "./errors";

export function assertNonEmpty(value: string, fieldName: string): void {
  if (!value || !value.trim()) {
    throw new ValidationError(`${fieldName} cannot be empty.`);
  }
}

export function assertEmailLike(value: string): void {
  assertNonEmpty(value, "email");
  if (!value.includes("@") || !value.includes(".")) {
    throw new ValidationError("email format is invalid.");
  }
}
