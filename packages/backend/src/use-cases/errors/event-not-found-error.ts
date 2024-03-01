export class EventNotFoundError extends Error {
  constructor() {
    super('Event not found')
  }
}
