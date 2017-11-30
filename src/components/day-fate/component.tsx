import { Component, Prop, State, PropWillChange, PropDidChange, Listen } from '@stencil/core'
import { Day } from '../../models'

const { log, error } = console

@Component({
  tag: 'day-fate',
  styleUrl: 'styles/style.scss'
})
export class DayFate {
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
      log('DayFate: received', {
        msg
      })
      const pack = JSON.parse(msg.data)
      log('received', {
        pack
      })
      if (pack.day) {
        // update state
        this.day = pack.day
      }
    }

    this.ws = ws
  }

  @State() ws: any

  // @State()
  @Prop() day: Day;
  @Prop() index: number;

  @PropWillChange('day')
  willChangeHandler(newValue: boolean) {
    console.log('The new value of month will be: ', newValue);
  }

  @PropDidChange('day')
  didChangeHandler(newValue: boolean) {
    console.log('The new value of month is now: ', newValue);
  }

  // https://getbootstrap.com/docs/4.0/components/card/

  // make request
  onClickHandler(e) {
    const { target } = e
    const { index } = target.dataset
    // TODO: extract index from data attribute of target element of event to req
    console.log('make server request for a new day date', { e, target, index })
  }

  render() {
    return (
      <div class="fate card" style={Styles.fateCard()
      }>
        <div class="card-block">
          <h4 class="card-title">Day #{this.index}</h4>
          <button class="engineer btn btn-secondary morning">{display(this.day, 'morning')}</button>
          <button class="engineer btn btn-secondary evening">{display(this.day, 'evening')}</button>
        </div>
        <div class="card-block spinner">
          <a data-index={this.index} onClick={this.onClickHandler.bind(this)} class="btn btn-primary">Spin it!</a>
        </div>
      </div >
    )
  }
}

function display(day, time) {
  if (!day || !day[time]) return ''
  return day[time].name
}

function randomColor() {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
}

const Styles = {
  fateCard() {
    return {
      // width: '10rem',
      padding: '1rem',
      background: randomColor()
    }
  }
}

