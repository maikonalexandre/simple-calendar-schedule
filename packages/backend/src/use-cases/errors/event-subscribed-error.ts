export class EventSubscribedError extends Error {
  constructor() {
    super('Event cannot be subscribed')
  }
}
