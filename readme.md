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

### Start server

`$ node server`

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

Using techniques from [StencilJS tutorial video](https://www.youtube.com/watch?v=g4jsOCUD4lA)

### New Day spin

For the `day-fate` component, we can set up an `onClick` event handler with a `data-` attribute on the element with the day index (0-30).

```html
<a data-index={this.index} onClick={this.onClickHandler.bind(this)}
```

Then the `onClick` handler can make the server request (ie. call API) to generate new Day fate.

```js
  // make request
  onClickHandler(e) {
    const { target } = e
    const { index } = target.dataset
    // TODO: extract index from data attribute of target element of event to req
    console.log('make server request for a new day date', { e, target, index })
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
  onClickHandler() {

  }

  render() {
    return (
      <button onClick={this.onClickHandler.bind(this)} name="fate">
        Spin it
      </button>
    )
  }
```

In real life it would look like this, and ideally use a client Service class to call the Server.

```js
  // make a post request or send via Web socket
  onClickHandler() {
    this.callRest()
    this.callWs()
  }

  // send request for new month spin via WS
  // TODO: use a service
  callWs() {
    const host = location.origin.replace(/^http/, 'ws')
    const ws = new WebSocket(host)
    const month = {}
    ws.send({ month })
  }

  // TODO: use a service
  callRest() {
    const post = window['$']['post']
    const data = {}
    const onSuccess = this.onSuccess.bind(this)
    const onFailure = this.onFailure.bind(this)
    post('/month',
      data
    )
      .done(onSuccess)
      .fail(onFailure)
  }

  // TODO: update component state
  onSuccess(data) {
  }

  // TODO: display err message
  onFailure(error) {
  }

  render() {
    return (
      <button onClick={this.onClickHandler.bind(this)} name="fate">
        Spin it
      </button>
    )
  }
```

### Enabling spinner

The spinner should only be enabled (or shown) when socket connection is ready.

For this we use [Native DOM Custom Events](https://www.sitepoint.com/javascript-custom-events/)

Note: See more on Custom Events [here](https://www.sitepoint.com/javascript-custom-events/) and [here](https://davidwalsh.name/customevent)

We open a connection in `index.html` and then notify each spinner element, via a custom event, passing the open `WebSocket` instance in the `event.detail`

```js
    const host = 'ws://localhost:34567'
    const ws = new WebSocket(host)
    ws.onmessage = msg => console.log(msg.data)
    ws.onopen = e => {
      ws.send('WebSockets are awesome!')
      const daySpinners = document.querySelectorAll('day-spinner')
      var event = new CustomEvent('socketReady', {
        detail: {
          ws
        }
      });
      daySpinners.forEach(spinner => {
        spinner.dispatchEvent(event);
      })
    }
```

We then setup a listener for `socketReady` message in the spinner element.

```js
  @Listen('socketReady')
  socketReadyHandler(event: CustomEvent) {
    console.log('socket is ready: ', { event });
    this.enable = true
    const { ws } = event.detail
    this.ws = ws
  }
  @Prop() ws: any
```

Which sets the `ws` property to the one passed in the event.

Then for `callWs` we test if `ws` is available to send on

```js
  if (!ws) {
    error('Missing Web socket conn')
    return
  }
  ws.send({ month })
```

### Conditional spinner display

For the Spinner render method, we pass the `enable` state to the styling function

```js
  render() {
    return (
      <button style={Styles.spinner(this.enable)} onClick={this.onClickHandler.bind(this)} name="fate">
        Spin it
      </button>
    )
  }
```

Anytime the component state is updated, it will be re-rendered and hence call `Styles.spinner` with the new `enable` state, to `show` or `hide` it.

```js
const Styles = {
  spinner(enable) {
    return {
      display: enable ? 'show' : 'none'
    }
  }
}
```


### Client websocket posts

We could also add support for clients to post updates to Websockets alongside the REST api.

## License

MIT
