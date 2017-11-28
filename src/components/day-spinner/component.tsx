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

  render() {
    return (
      <button name="fate">
        Spin
      </button>
    )
  }
}
