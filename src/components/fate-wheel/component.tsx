import { Component, State, Prop, PropWillChange, PropDidChange } from '@stencil/core'
import { Engineer, Month, createMonth } from '../../models'

@Component({
  tag: 'fate-wheel',
  styleUrl: 'styles/styles.scss'
})
export class FateWheel {
  componentWillLoad() {
    Engineer.createInitial(10)
    const month = createMonth()
    month.fill()
    this.month = month
  }

  componentDidLoad() {
    const host = location.origin.replace(/^http/, 'ws')
    // listen to socket for changes and set new month state on any month received
    const ws = new WebSocket(host)
    ws.onmessage = msg => {
      if (msg['month']) {
        // update state
        this.month = msg['month']
      }
    }
  }

  @State() month: Month

  @PropWillChange('month')
  willChangeHandler(newValue: boolean) {
    console.log('The new value of month will be: ', newValue);
  }

  @PropDidChange('month')
  didChangeHandler(newValue: boolean) {
    console.log('The new value of month is now: ', newValue);
  }

  render() {
    return (
      <section id="wheel fate">
        {this.month.days.map((day, index) => {
          return <day-fate day={day} index={index} />
        })}
      </section>
    )
  }
}
