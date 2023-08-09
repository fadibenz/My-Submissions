sequenceDiagram
    participant browser
    participant server

    browser->>server: POSThttps://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code 201
    deactivate server
