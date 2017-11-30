import { Component, State, Prop, Listen } from '@stencil/core'

const { log, error } = console

@Component({
  tag: 'day-spinner',
  styleUrl: 'styles/style.scss'
})
export class DaySpinner {
  componentDidLoad() {
    log('The component has been rendered');
  }
  componentDidUnload() {
    log('The component tag has been removed from the DOM');
  }

  // make a post request or send via Web socket
  onClickHandler() {
    this.callRest()
    this.callWs()
  }

  @Listen('socketReady')
  socketReadyHandler(event: CustomEvent) {
    console.log('socket is ready: ', { event });
    this.enable = true
    const { ws } = event.detail
    this.ws = ws
  }
  @Prop() ws: any

  // send request for new month spin via WS
  // TODO: use a service
  callWs() {
    const { ws } = this
    const month = {
      id: 1
    }
    if (!ws) {
      error('Missing Web socket conn')
      return
    }
    ws.send({ month })
  }

  // TODO: use a service
  callRest() {
    const $ = window['$']
    if (!$) {
      error('Missing $ on global window object')
      return
    }

    const post = $['post']
    const data = {}
    const onSuccess = this.onSuccess.bind(this)
    const onFailure = this.onFailure.bind(this)

    if (!post) {
      error('Missing $.post method for making REST call')
      return
    }

    post('/month',
      data
    )
      .done(onSuccess)
      .fail(onFailure)
  }

  // TODO: update component state
  onSuccess(data) {
    log('success', data)
  }

  // TODO: display err message
  onFailure(error) {
    log('error', error)
  }

  @State() enable: true

  render() {
    return (
      <button style={Styles.spinner(this.enable)} onClick={this.onClickHandler.bind(this)} name="fate">
        Spin it
      </button>
    )
  }
}

const Styles = {
  spinner(enable) {
    log({
      enable
    })
    return {
      // width: '10rem',
      display: enable ? 'show' : 'none'
    }
  }
}

