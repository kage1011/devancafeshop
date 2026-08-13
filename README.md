# devancafeshop
app for my cafe shop in the future
                    ┌──────────────────────┐
                    │      Mobile App      │
                    │   React Native + TS  │
                    └──────────┬───────────┘
                               │
                      REST API / WebSocket
                               │
              ┌────────────────▼────────────────┐
              │           Backend API           │
              │       Node.js + NestJS          │
              │                                 │
              │ Auth │ Menu │ Order │ Employee  │
              │ User │ Table│ Notify│ Report    │
              └───────────────┬─────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │     Database      │
                    │    PostgreSQL     │
                    └───────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
        ┌──────▼──────┐              ┌──────▼──────┐
        │ Redis       │              │ Firebase    │
        │ Cache/Queue │              │ FCM Push    │
        └─────────────┘              └─────────────┘