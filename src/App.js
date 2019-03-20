import React, { Component } from 'react'
import './App.css'
import generateGrid from './generate-grid'

const allPatterns = ['111', '110', '101', '100', '011', '010', '001', '000']

class App extends Component {
  state = {
    activePatterns: []
  }

  componentDidMount() {
    const gridRef = this.refs.grid
    this.ctx = gridRef.getContext('2d')

    const grid = generateGrid(600, ['100', '011', '010', '001'])
    this.drawGrid(grid, this.ctx)
  }

  drawGrid = grid => {
    this.ctx.clearRect(0, 0, 1200, 600)

    grid.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) =>
        cell && this.ctx.fillRect(colIndex, rowIndex, 1, 1)
      ))
  }

  drawPatterns = patterns => {
    const grid = generateGrid(600, patterns)
    this.drawGrid(grid)
  }

  handlePatternOnClick = event => {
    const { pattern } = event.currentTarget.dataset
    const { activePatterns } = this.state
    const newActivePatterns = activePatterns.includes(pattern)
      ? activePatterns.filter(activePattern => activePattern !== pattern)
      : [ pattern, ...activePatterns ]

    this.drawPatterns(newActivePatterns)
    this.setState({ activePatterns: newActivePatterns })
  }

  render() {
    const { activePatterns } = this.state

    return (
      <div className='app'>
        <canvas ref='grid' className='grid' width='1200' height='600'>
        </canvas>
        <div className='info'>
          <div className='info__app-title'>
            Elementary Cellular Automata Visualizer
          </div>
          <div className='info__app-controller'>
            {allPatterns.map(pattern => {
              const patternClassName = activePatterns.includes(pattern)
                ? 'pattern pattern--selected' : 'pattern'

              return (
                <div
                  className={patternClassName}
                  onClick={this.handlePatternOnClick}
                  data-pattern={pattern}
                >
                  {pattern}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
