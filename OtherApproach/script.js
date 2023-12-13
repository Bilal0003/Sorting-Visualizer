const n = 50;
const array = [];
let audioCtx = null;

initialise();

function initialise() {
    for (let i = 0; i < n; i++) {
        //generer un num aleatoire entre 0.05 et 1.
        array[i] = (Math.random() * 1) + 0.05;
    }
    showbars();
}

function playBubble() {
    const swaps = BubbleSort([...array]);
    animate(swaps);
    //showbars();
}

function playSelection() {
    const swaps = SelectionSort([...array]);
    animate(swaps);
    
}

function playMerge() {
    const swaps = MergeSort([...array]);
    animate(swaps);
    
}

function animate(swaps) {
    if (swaps.length === 0) {
        showbars();
        return;
    }

    //on stock le premier couple d'indice a swaper (donc les deux premieres valeurs actuel du vecteur swaps) que l'on stock dans le vecteur temporaire [i,j]    
    const move = swaps.shift();
    const [i, j] = move.indices;
    //on effectue le swap des deux bars correspondantes
    [array[i], array[j]] = [array[j], array[i]];
    // a chaque fois que je swap, je reaffiche le resultat
    showbars(move);
    //on joue une note pour chaque bar qu'on a swaper dont la frequence depends de la longeur de la bar
    playNote(200 + array[i] * 500);
    playNote(200 + array[j] * 500);
    //timeout pour avoir le temps de visualiser les swaps
    setTimeout(function () {
        animate(swaps);
    }, 10);
}

function BubbleSort(array) {
    let sorted = false;
    const swaps = [];
    let c = 0;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                c = array[i];
                array[i] = array[i + 1];
                array[i + 1] = c;
                swaps.push({ indices: [i, i + 1] });
                sorted = false;
            }
        }
    }
    //showbars();
    return swaps;
}

function SelectionSort(array) {
    const swaps = [];
    for (let i = 0; i < (array.length) - 1; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) min = j;
        }
        if (min !== i) {
            let temp = array[i];
            array[i] = array[min];
            array[min] = temp;
            swaps.push({ indices: [i, min] });
        }
    }
    return swaps;
}


function MergeSort(array) {
    const swaps = [];


    function merge(left, right, startIdx) {
        let ans = [];
        let leftidx = 0;
        let rightidx = 0;

        while (leftidx < left.length && rightidx < right.length) {
            if (left[leftidx] < right[rightidx]) {
                ans.push(left[leftidx]);
                leftidx++;
            }
            else {
                ans.push(right[rightidx]);
                rightidx++;
            }
        }
        swaps.push({ indices: [startIdx + leftidx, startIdx + left.length + rightidx - 1] });
        return ans.concat(left.slice(leftidx)).concat(right.slice(rightidx));
    }

    let chunks = array.map(item => [item]);

    while (chunks.length > 1) {
        let newChunks = [];

        // Merge pairs of adjacent chunks
        for (let i = 0; i < chunks.length; i += 2) {
            if (i + 1 < chunks.length) {
                newChunks.push(merge(chunks[i], chunks[i + 1], i));
            } else {
                newChunks.push(chunks[i]);
            }
        }

        chunks = newChunks;
    }
    return swaps;

}



function showbars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 150 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) bar.style.backgroundColor = "red";
        container.appendChild(bar);

    }
    ;
}

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}
