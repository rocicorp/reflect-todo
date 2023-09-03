# reflect-todo

TodoMVC on [Reflect](https://reflect.net/).

# Demo

Running live at https://reflect-todo.vercel.app/.

## Setup

```bash
npm install
```

## Develop

```bash
# start the backend
npx reflect dev

# In a separate terminal, start the frontend
VITE_REFLECT_URL=ws://127.0.0.1:8080 npm run dev
```

## Publish

Then:

```bash
# Publish server to reflect.net
npx reflect publish

# Publish UI somewhere, for example Vercel.
npx vercel

# Note: You'll have to set the VITE_REFLECT_URL env
# var to whatever `npx reflect publish` printed.
```
