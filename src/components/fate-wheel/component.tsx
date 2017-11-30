import { Component, State, Prop, PropWillChange, PropDidChange, Listen } from '@stencil/core'
import { Engineer, Month, createMonth } from '../../models'

const { log, error } = console

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
    log('FateWheel: set initial month', {
      month
    })
  }

  @Listen('socketReady')
  socketReadyHandler(event: CustomEvent) {
    log('FateWheel: socket is ready: ', { event });
    const { ws } = event.detail
    if (!ws) {
      error('FateWheel: Missing Web socket conn', {
        ctx: this
      })
      return
    }
    ws.onmessage = msg => {
      log('FateWheel: received', {
        msg
      })
      const pack = JSON.parse(msg.data)
      log('pack', {
        pack
      })
      if (pack.month) {
        // update state
        this.month = pack.month
      }
    }

    this.ws = ws
  }
  @State() ws: any

  @State() @Prop() month: Month

  @PropWillChange('month')
  willChangeHandler(newValue: boolean) {
    log('The new value of month will be: ', newValue);
  }

  @PropDidChange('month')
  didChangeHandler(newValue: boolean) {
    log('The new value of month is now: ', newValue);
  }

  render() {
    return (
      <section id="wheel fate">
        {this.month.days.map((day, index) => {
          // console.log({ day })
          return <day-fate day={day} index={index} />
        })}
      </section>
    )
  }
}
