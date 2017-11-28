import { Component, State, Prop, PropWillChange, PropDidChange } from '@stencil/core'
import { Engineer, Month, createMonth } from '../../models'

@Component({
  tag: 'fate-wheel',
  styleUrl: 'styles/styles.scss'
})
export class FateWheel {
  componentWillLoad() {
    // this.month = createMonth()
    Engineer.createInitial(10)
    const month = createMonth()
    month.fill()
    this.month = month
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
