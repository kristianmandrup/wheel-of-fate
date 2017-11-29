import { Component, Prop } from '@stencil/core'

@Component({
  tag: 'day-spinner',
  styleUrl: 'styles/style.scss'
})
export class DaySpinner {
  componentDidLoad() {
    console.log('The component has been rendered');
  }
  componentDidUnload() {
    console.log('The component tag has been removed from the DOM');
  }

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
}
