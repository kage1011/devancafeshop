# devancafeshop
app for my cafe shop in the future

                    FRONTEND
          ┌────────────────────────┐
          │ React Native / React   │
          └────────────┬───────────┘
                       │
                 REST / WebSocket
                       │
                       ▼
              ┌─────────────────┐
              │    API SERVER   │
              │ Node + Express  │
              └────────┬────────┘
                       │
        ┌──────────────┼───────────────┐
        │              │               │
        ▼              ▼               ▼
     Auth          Business         Realtime
     JWT           Services         Socket.IO
        │              │
        └──────────────┼───────────────┘
                       ▼
                  ┌──────────┐
                  │ MongoDB  │
                  └──────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Orders       Inventory     Reports