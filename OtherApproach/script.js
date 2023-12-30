let n = 50;
let array = [];
var audioCtx = null;
var running = false;
let delay = 10;

initialise();

function updateSpeed() {
  delay = document.getElementById("time_slider").value;
}

function updateWidth() {
  let width = document.getElementById("container").value;
  let topbox = document.getElementById("top-box");
  document.topbox.style.setProperty("--width", width + "%");
  topbox.style.color = "red";
}

function updateArraySize() {
  n = document.getElementById("arr_sz").value;

  initialise();
}

function initialise() {
  if (n >= array.length) {
    for (let i = 0; i < n; i++) {
      //generer un num aleatoire entre 0.05 et 1.
      array[i] = Math.random() * 1 + 0.05;
    }
  } else {
    array = array.slice(0, n);
    initialise();
  }
  showbars();
}

function playBubble() {
  const swaps = BubbleSort([...array]);
  animate(swaps);
}

function playSelection() {
  const swaps = SelectionSort([...array]);
  animate(swaps);
}

function playBS2() {
  runBtn(BS2, array);
}

function playSS2() {
  runBtn(SS2, array);
}

function playMerge() {
  runBtn(mergeSort, array, 0, array.length);
}

async function runBtn(sort, ...args) {
  running = true;
  await sort(...args);
  showbars();
  running = false;
}

async function mergeSort(arr, start, end) {
  if (start >= end - 1) return;
  const mid = start + Math.floor((end - start) / 2);

  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid, end);

  const cache = Array(end - start).fill(arr[0]);
  let k = mid;

  for (let i = start, r = 0; i < mid; r++, i++) {
    if (!running) return;
    while (k < end && arr[k] < arr[i]) {
      cache[r] = arr[k];
      r++;
      k++;
    }
    cache[r] = arr[i];
  }

  for (let i = 0; i < k - start; i++) {
    if (!running) return;
    arr[i + start] = cache[i];
    await sleep(delay); // Adjust the delay as needed
    showbars({ indices: [i + start] }); // Refresh the visualization for each swap
    playNote(200 + array[i] * 500);
    playNote(200 + array[start] * 500);
  }
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
  }, delay);
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

async function BS2(array) {
  let sorted = false;
  let c = 0;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > array[i + 1]) {
        c = array[i];
        array[i] = array[i + 1];
        array[i + 1] = c;
        showbars({ indices: [i, i + 1] });
        await sleep(delay);
        sorted = false;
      }
    }
  }

  //showbars();
  //return swaps;
}

function SelectionSort(array) {
  const swaps = [];
  for (let i = 0; i < array.length - 1; i++) {
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

async function SS2(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j;
    }
    if (min !== i) {
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
      showbars({ indices: [i, min] });
      await sleep(delay);
    }
  }
}

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function showbars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 80 + "%";
    bar.classList.add("bar");
    //bar.style.width = Window.innerWidth / array.length;
    if (move && move.indices.includes(i)) bar.style.backgroundColor = "red";
    container.appendChild(bar);
  }
}

function playNote(freq) {
  if (audioCtx == null) {
    audioCtx = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  var node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function MuteWindow() {
  audio = document.getElementById("audio").firstElementChild.innerHTML === "volume_off" | 0;
    updateAudioIcon();

    fetch("/audio/", {
        method: "PUT",
    })
}
