# reflect-todo

This is a demo of Reflect: an upcoming multiplayer SaaS we are building.

The idea of Reflect is that you can get all the benefits of [Replicache](https://replicache.dev/) without having to build your own backend. Think of it like Firebase, but with multiplayer and offline support that works 😂.

Currently the way you run this demo is on-"prem": you get yourself a Cloudflare account and upload the backend (which is inside this repo) to your Cloudflare account.

You don't have to know much/anything about how the backend works. It's a black box. In the future, the backend will become a service.

See also https://github.com/rocicorp/replidraw-do, a fancier drawing demo.

# Demo

Running live at https://reflect-todo.vercel.app/.

## Setup

```bash
npm install
```

## Develop

```bash
# start the backend
npm run dev-worker

# start the frontend
VITE_WORKER_URL=ws://127.0.0.1:8787 npm run dev
```

**Note:** By default, the development server loses its state on restart. This is often convenient. To cause it to persist state across restarts, call `npm run dev-worker -- --persist`.

## Publish to Cloudflare

First, get an account at Cloudflare: https://workers.cloudflare.com/ and enable Workers and Durable Objects.

Then:

```bash
# publish worker to Cloudflare
npx wrangler publish

# run frontend against published worker
VITE_WORKER_URL=wss://<host from publish command> npm run dev
```

## Other Examples / Resources

- https://github.com/rocicorp/replidraw-do
- Rails: useful boilerplate for crud / datastructures: https://github.com/rocicorp/rails
- As Reflect is a SaaS version of Replicache, the docs for Replicache are helpful, for example the interact intro: https://doc.replicache.dev/. Of course the bits related to your backend and sync can be ignored as Reflect handles all that.

## Authentication and Authorization

Reflect can optionally authenticate users who connect to rooms with your server and authorize their access to the room.

1. Pass some `authToken` to the `Reflect` constructor's `auth` parameter.
2. Provide `createReflectServer` with an `authHandler` function that authenticates the user and returns whether the user should be allowed in the room.

The signature for the auth handler is as follows:

```ts
/**
 * An `AuthHandler` should validate that the user authenticated by `auth` is
 * authorized to access the room with `roomID`.
 * @return A promise which resolves to `UserData` for the user if authentication
 * and authorization is successful, or rejects if authentication or
 * authorization fail.
 */
export type AuthHandler = (auth: string, roomID: string) => Promise<UserData>;

/**
 * `UserData` must include a `userID` which is unique stable identifier
 * for the user.
 * `UserData` has a size limit of 6 KB.
 * Currently only `userID` is used, but in the future `UserData` may
 * be passed through to mutators which could use it to supplement
 * mutator args and to validate the mutation.
 */
export type UserData = ReadonlyJSONObject & { userID: string };
```

### Auth Revalidation

You can invalidate specific users or rooms using the [Server Auth API](doc/server-api.md#auth-api).

## Server API

The server's Room Management and Auth API are documented in [Server API](doc/server-api.md) doc.

## Recipes

### How to persist logs from the worker

The `BaseServer` class accepts a `logger` argument. You can implement this yourself to send the logs wherever you want. `reflect-server` exports `ConsoleLogSink` and `DatadogLogSink` implementations of this interface in the package as a convenience. The default implementation is just `ConsoleLogSink` alone.

### How to list the rooms for your Reps server

Cloudflare doesn't have a UI for this, but there's an API.

First, go to https://dash.cloudflare.com/profile/api-tokens and click "Create Token" then choose the "Read All Resources" template. Click through and then copy the resulting token.

```bash
# Get the account id
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
     -H "Authorization: Bearer :token" \
     -H "Content-Type:application/json"

# Get namespace for account
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:accountid/workers/durable_objects/namespaces" \
     -H "Authorization: Bearer :token" \
     -H "Content-Type:application/json"

# Get object instances
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:accountid/workers/durable_objects/namespaces/:namespaceid/objects" \
     -H "Authorization: Bearer :token" \
     -H "Content-Type:application/json"
```

### How to run different code for mutation on server

The `WriteTransaction` class passed to mutators has a `environment` field which returns either `"client"` or `"server"`.

### How to know when a mutator has run on the server

Using above, you can store state in the client view that tracks whether a given mutator has run on client-side or server. Commit [e488892dd69b828b1b9ab253f06a42628d25831d](https://github.com/rocicorp/reflect-todo/commit/e488892dd69b828b1b9ab253f06a42628d25831d) shows an example of this.
