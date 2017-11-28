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
  onClick() {

  }

  render() {
    return (
      <button onClick={this.onClick} name="fate">
        Spin it
      </button>
    )
  }
}
