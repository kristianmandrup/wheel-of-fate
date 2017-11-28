import { Component, Prop, State } from '@stencil/core'
import { Day } from '../../models'

@Component({
  tag: 'day-fate',
  styleUrl: 'styles/style.scss'
})
export class DayFate {
  componentDidLoad() {
    const host = location.origin.replace(/^http/, 'ws')
    // listen to socket for changes and set new month state on any month received
    const ws = new WebSocket(host)
    ws.onmessage = msg => {
      if (msg['day']) {
        // update state
        this.day = msg['day']
      }
    }
  }

  @State() @Prop() day: Day;
  @Prop() index: number;

  // https://getbootstrap.com/docs/4.0/components/card/

  render() {
    return (
      <div class="fate card" style={Styles.fateCard()
      }>
        <div class="card-block">
          <h4 class="card-title">Day #{this.index}</h4>
          <button class="engineer btn btn-secondary morning">{this.day.morning.name}</button>
          <button class="engineer btn btn-secondary evening">{this.day.evening.name}</button>
        </div>
        <div class="card-block spinner">
          <a href="/spin/{this.index}" class="btn btn-primary">Spin it!</a>
        </div>
      </div >
    )
  }
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

