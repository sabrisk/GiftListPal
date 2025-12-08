### Main Route

| Verb | Path | Response     | Notes                          |
| ---- | ---- | ------------ | ------------------------------ |
| GET  | "/"  | Landing Page | Shows landing page to the user |

### Register/Login Routes

| Verb | Path            | Response           | Notes                                                                        |
| ---- | --------------- | ------------------ | ---------------------------------------------------------------------------- |
| GET  | "/register"     | Register Page      | Shows registration page to the user. Success: (200). Error: (404)            |
| POST | "/api/register" | Result: user       | Success: (201) + redirect to events page. Error: (400/404) + register errors |
| GET  | "/login"        | Login Page         | Shows login page to the user. Success: (200). Error: (401/404)               |
| POST | "/api/login"    | Result: user,token | Success: (200) + redirect to events page. Error: (400/404) + login errors    |

### Event Routes

| Verb | Path        | Response       | Notes                                                          |
| ---- | ----------- | -------------- | -------------------------------------------------------------- |
| GET  | "/events"   | Events Page    | Shows events page to the user. Success: (200). Error: (404)    |
| POST | /api/events | Result: event  | Creates a new event. Success: (201). Error: (400/500)          |
| GET  | /events/new | New Event Page | Shows new event page to the user. Success: (200). Error: (404) |

### Participants Routes

| Verb | Path                             | Response             | Notes                                                                                       |
| ---- | -------------------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| GET  | /events/:id/participants         | Participants Page    | Shows participants page to the user for the selected event. Success: (200). Error: (404)    |
| POST | /api/participants                | Result               | Creates a new participant for the selected event. Success: (201). Error: (400/500)          |
| GET  | /api/events/:id/participants/new | New Participant Page | Shows new participant page to the user for the selected event. Success: (200). Error: (404) |

### Gifts Routes

| Verb | Path                                       | Response      | Notes                                                                                                                                                                 |
| ---- | ------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET  | /events/:id/participants/:id/gifts         | Gifts Page    | Shows gifts page to the user for the selected participant. Success: (200). Error: (404)                                                                               |
| POST | /events/gifts                              | Result        | Creates a new gift for the selected participant, or for the user's "my-gifts" page. Attach the event id if you have one to the body. Success: (201). Error: (400/500) |
| GET  | /api/events/:id/participants/:id/gifts/new | New gift Page | Shows new gift page to the user for the selected participant. Success: (200). Error: (404)                                                                            |
| GET  | /my-gifts                                  | My Gifts Page | User's personal gift list. Success: (200). Error: (404)                                                                                                               |
| GET  | /my-gifts/new                              | New Gift Page | Form for adding user’s personal gift. Success: (200). Error: (404)                                                                                                    |
