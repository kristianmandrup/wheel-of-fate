# Wheel of Fate

*Wheel of Fate* is a small demo project, showcasing:

- [StencilJS](https://stenciljs.com/) front-end
- [Fastify](https://www.fastify.io/) server

## StencilJS

Stencil is a compiler for building fast web apps using Web Components.

- TypeScript
- TSX (React JSX for TypeScript)
- Server Side Rendering (SSR)
- SASS stylesheets
- ...

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/kristianmandrup/wheel-of-fate
cd wheel-of-fate
```

and run:

```bash
npm install
npm start
```

To view the build, start an HTTP server inside of the `/www` directory.

To watch for file changes during development, run:

```bash
npm run dev
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```

## Architecture

- Front-end (UI)
- Back-end
- Engine

### Front-end (UI)

The UI is designed using native Custom elements (aka. Web components).
The main components are:

- `fate-wheel` Displays the engineer schedule for a given month (30 days)
- `day-fate` Displays the fate for 2 engineers on a given day
- `day-spinner` Button to spin the wheel and generate a new engineer schedule (ie. fate) for that month

The UI currently uses [Bootstrap 4 (beta)](https://v4-alpha.getbootstrap.com/) for styling, mainly:

- `cards`
- `buttons`

A wheel for given month displays a `card` for each day.

The UI can be found in `/src` folder, the components in `src/components`.
The `index.html` is the main entry point. It loads Bootstrap in the header via CDN.

```html
<main class="container-fluid">
  <h1>Spin the Wheel of Fate</h1>
  <fate-wheel></fate-wheel>
</main>
```

### Back-end (server)

The back-end is written using [Fastify](https://www.fastify.io/), a new super performant lightweight framework built on top of [Express](expressjs.com/)

- Extendible: Fastify is fully extensible via its hooks, plugins and decorators
- Highly performant: can serve up to 20.000 request per second

The server can be found in `/server` folder

The server currently consists of 2 routes:

- `day/:id` (POST) : create a new `Day` schedule of engineers
- `month` (POST) : create a new `Month` schedule of engineers

```js
let $month, $day

// create fate for a single day
fastify
  .post('/day/:id', schema.day, function (req, reply) {
    const id = req.params.id
    if (id < 0 || id > 30) {
      return reply.send({
        error: 'Invalid id'
      })
    }
    $day = $month.days[id]
    reply
      .send({ day: $day.asJson })
  })

// create a new month of fate
fastify
  .post('/month', schema.month, function (_, reply) {
    $month = createMonth()
    reply
      .send({ month: $month.asJson })
  })
```

### Engine

The engine is designed using [TypeScript](typescriptlang.org), ie. strongly typed Javascript.

The engine can be found in `/src/models` folder and is unit tested via [Jest](https://facebook.github.io/jest/) by Facebook/React.

## Reactivity

We will be using [Web sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) technology to have the UI be notified and react to changes on the backend.

### Web sockets

We use Web sockets based on the blazing fast [uws](https://www.npmjs.com/package/uws) library via the [fastify-ws](https://github.com/gj/fastify-ws) plugin

On the server we set up a socket to listen to any `message` and send it back.

```js
fastify.ws
  .on('connection', socket => {
    socket.on('message', msg => socket.send(msg)) // Creates an echo server
  })
```

In the client we can set up a `WebSocket` connection to the host and send/receive messages:

```js
    const ws = new WebSocket(host)
    ws.onmessage = msg => console.log(msg.data)
    ws.send('WebSockets are awesome!')
```

### Integrating sockets with REST API

When we receive a POST we can send the new data back via a socket as well:

```js
// day
  let pack = { day: $day.asJson }
  reply
    .send(pack);
  fastSocket.send(pack)

// month
  let pack = { month: $month.asJson }
  reply
    .send(pack)
  fastSocket.send(pack)
```

Then have the components re-render on any newly received data received on the socket. This simply requires a `@State` decorator on a component property.

```ts
export class DayFate {
  componentDidLoad() {
    const host = location.origin.replace(/^http/, 'ws')
    // listen to socket for changes and set new month state on any month received
    const ws = new WebSocket(host)

    // on any message received from server,
    // check if day message, if so update day state to automatically re-render
    ws.onmessage = msg => {
      if (msg['day']) {
        // update state
        this.day = msg['day']
      }
    }
  }

  @State() @Prop() day: Day;

  render() {
    //...
  }
}
```

## Spin the Wheel

- New day spin
- New month spin

Using techniques from [StencilJS tutorial video](https://www.youtube.com/watch?v=g4jsOCUD4lA&t=106s)

### New Day spin

For the `day-fate` component, we can set up an `onClick` event handler with a `data-` attribute on the element with the day index (0-30).

```html
<a data-index={this.index} onClick={this.onClick}
```

Then the `onClick` handler can make the server request (ie. call API) to generate new Day fate.

```js
  // make request
  onClick(e) {
    console.log(e, 'make server request for a new day date')
  }
```

### New Month spin

Fot the Month spin, we add a `day-spinner` component under the `fate-wheel`

```html
  <main class="container-fluid">
    <h1>Spin the Wheel of Fate</h1>
    <fate-wheel></fate-wheel>
    <day-spinner></day-spinner>
  </main>
```

The `day-spinner` component can then be set up to make a Request for a new month (spin) as an `onClick` side effect on the button.

```js
  // make a post request or send via Web socket
  onClick() {

  }

  render() {
    return (
      <button onClick={this.onClick} name="fate">
        Spin it
      </button>
    )
  }
```

### Client websocket posts

We could also add support for clients to post updates to Websockets alongside the REST api.

## License

MIT
