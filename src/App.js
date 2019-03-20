import React, { Component } from 'react'
import './app.css'
import generateGrid from './generate-grid'

class App extends Component {
  generateGrid = () => {
    const grid = generateGrid(300, ['100', '011', '010', '001'])
    console.log({ grid });
    return (
      <tbody className='grid'>
        {grid.map((row, i) =>
          <tr className='row' key={i}>
            {row.map((cell, j) =>
              <td className={`cell ${cell ? 'cell--active' : 'cell--inactive'}`} key={j} />
             )}
          </tr>
        )}
      </tbody>
    )
  }

  render() {
    return (
      <div className='app'>
        <div className='sidebar'>
          <div className='sidebar__app-title'>
            Elementary CA Visualizer
          </div>
          <div className='sidebar__app-description'>
            Lorem ipsum blahblahbal plumbus
          </div>
        </div>
        <table className='content'>
          {this.generateGrid()}
        </table>
      </div>
    );
  }
}

export default App;
