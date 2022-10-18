import React from 'react';
import './css/Home.css'

export default class Home extends React.Component {
    render() {
        return (
            <div className="home-content"> 
                <h1>Welcome to the Random Tool Service!</h1>
                <h4 style={{fontWeight: '300'}}>Select your desired tool below: </h4>
                <div class="home-button-container">
                    <a href='/user-generator' class="home-button">Random User Generator</a>
                    <a href='/selectable-grid' class="home-button">Selectable Grid</a>
                </div>
            </div>
        )
    }
}