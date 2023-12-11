import React from 'react';
import { BubbleSort } from '../AlgorithmsTri/AlgorithmsTri.js';
import './SortingVisualizer.css';
import { render } from '@testing-library/react';
import { toHaveFocus } from '@testing-library/jest-dom/matchers';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props); this.state = { array: [],}; }

    

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 300; i++) {
            array.push(nbrAleatoire(10, 600));
        }
        this.setState({ array });
    }

    animate(swaps) {
        if (swaps.length == 0) { return;}
        const [i,j] = swaps.shift();
        [this.state.array[i], this.state.array[j]] = [ this.state.array[j], this.state.array[i]];
        //render();
        //setTimeout(animate(swaps),20);
    }

    BubbleSort() {

        const mysortedArr = BubbleSort(this.state.array);
        this.setState(mysortedArr);

    }

    showbars(){
        
        
    }

    render() {
        
        const { array } = this.state;
        return (
                <div>
                <div className="arraycontainer">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value}px` }}></div>
                ))}
                
                <button onClick={() => this.resetArray()}>Generer un nouveau vecteur.</button>
                <button class="btn" onClick={() => this.BubbleSort()}>Bubble Sort</button>
                </div></div>
        );
    }
}

function nbrAleatoire(min, max) {
    return Math.random() * (max - min) + min;
};


function comparerVect(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function TestingSortedArray() {


}

