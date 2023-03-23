#!/bin/bash

export $(cat .env | xargs)
export $(cat .dev.vars | xargs)

curl -X POST 'localhost:8787/createRoom' \
    -H "x-reflect-auth-api-key: $REFLECT_AUTH_API_KEY" \
    -H "Content-type: application/json" \
    -d "{ \"roomID\": \"$VITE_ROOM_ID\" }"
