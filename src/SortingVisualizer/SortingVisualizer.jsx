import React from 'react';
import  { BubbleSort } from '../AlgorithmsTri/AlgorithmsTri.js';
import './SortingVisualizer.css';
import { render } from '@testing-library/react';
import { toHaveFocus } from '@testing-library/jest-dom/matchers';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
    
    this.state = {
        array: [],
    };
    }

componentDidMount(){
    this.resetArray();
}

resetArray(){
    const array = [];
    for (let i = 0; i < 300; i++) {
        array.push(nbrAleatoire(10, 600));
    }
    this.setState({ array });
}


BubbleSort() {
    
    const mysortedArr = BubbleSort(this.state.array);
    
    
}

render(){
    const { array } = this.state;

    return (
        <div className="array-container">
            {array.map((value, idx) => (
                <div 
                className="array-bar"
                key={idx}
                style={{ height: `${value}px` }}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generer un nouveau vecteur.</button>
            <button onClick={() => this.BubbleSort()}>Bubble Sort</button>
        </div>
    );
}
}

function nbrAleatoire(min,max){
    return Math.random() * (max - min) + min;
};


function comparerVect(arr1, arr2){
    if(arr1.length !== arr2.length) return false;
    for(let i=0; i<arr1.length; i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}