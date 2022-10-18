import React from "react";
import './css/SelectableGrid.css'

export default class SelectableGrid extends React.Component {
    state = {
        mouseDown: false,
        startCoord: [-1, -1], //[y, x]
        selectedCoords: []
    }

    startSelection = (y, x) => { this.setState({ mouseDown: true, startCoord: [y, x] }); }
    setSelection = (y, x) => {
        if (this.state.mouseDown) {
            const min_y = Math.min(y, this.state.startCoord[0]);
            const min_x = Math.min(x, this.state.startCoord[1]);
            const max_y = Math.max(y, this.state.startCoord[0]);
            const max_x = Math.max(x, this.state.startCoord[1]);

            let selected = [];
            for (let i = min_y; i <= max_y; i++) {
                for (let j = min_x; j <= max_x; j++) 
                    selected.push([i, j]);
            }
            this.setState({ selectedCoords: selected });
        }
    }

    endSelection = () => { 
        this.setState({mouseDown: false}); 
        console.log(this.state.selectedCoords);
    }

    render () {
        let matrix = new Array(10);
        for (let i = 0; i < matrix.length; i++)
          matrix[i] = new Array(10).fill(0);

        const grid = matrix.map((row, i) => {
            return (
            <div key={i} className="selectgrid-row">
                {
                    row.map((cell, j) => {
                        let selected = false;
                        for (let coord of this.state.selectedCoords) {
                            if (i === coord[0] && j === coord[1]) {
                                selected = true;
                                break;
                            }
                        }

                        return <div 
                            key={j} 
                            onMouseDown={() => this.startSelection(i, j)}
                            onMouseMove={() => this.setSelection(i, j)}
                            onMouseUp={() => this.endSelection(i, j)}
                            className="selectgrid-cell"
                            style={selected ? {backgroundColor: 'lightskyblue', opacity: '0.7'} : null}
                        />
                    })
                }  
            </div>)
        })


        return (
            <div className="selectgrid-content">
                <div className="selectgrid-notgrid" onClick={() => this.setState({ startCoord: [-1,-1], selectedCoords: [] })} />
                <div className="selectgrid-grid">
                    {grid}
                </div>
            </div>
        );
    }
} 