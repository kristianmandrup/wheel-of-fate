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
    // this.callRest()
    this.callWs()
  }

  @Listen('socketReady')
  socketReadyHandler(event: CustomEvent) {
    log('DaySpinner: socket is ready: ', { event });
    this.enable = true
    const { ws } = event.detail
    this.ws = ws
    log('set ws', {
      ctx: this
    })
  }
  @State() ws: any

  // send request for new month spin via WS
  // TODO: use a service
  callWs() {
    const { ws } = this
    if (!ws) {
      error('DaySpinner: Missing Web socket conn', {
        ctx: this
      })
      return
    }
    const pack = JSON.stringify({
      request: 'month'
    })
    log('send socket request', {
      pack
    })
    ws.send(pack)
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
    // const onSuccess = this.onSuccess.bind(this)
    const onFailure = this.onFailure.bind(this)

    if (!post) {
      error('Missing $.post method for making REST call')
      return
    }

    post('/month',
      data
    )
      .done((data) => {
        log('received', data)
      })
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
    return {
      display: enable ? 'show' : 'none'
    }
  }
}

