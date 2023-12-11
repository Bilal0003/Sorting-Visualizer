const n=100;
const array=[];

initialise();

function initialise(){
    for (let i= 0; i < n ; i++){
        array[i] = Math.random();
        }
    showbars();
}

function play(){
    const copy = [...array];
    const swaps = BubbleSort(copy);
    animate(swaps);
    //showbars();
}

function animate(swaps){
    if(swaps.length==0) return;

    //on stock le premier couple d'indice a swaper (donc les deux premieres valeurs actuel du vecteur swaps) que l'on stock dans le vecteur temporaire [i,j]    
    const move = swaps.shift();
    const [i,j] = move.indices;
    //on effectue le swap des deux bars correspondantes
    [array[i],array[j]] = [array[j],array[i]];
    // a chaque fois que je swap, je reaffiche le resultat
    
    showbars(move);
    //timeout pour avoir le temps de visualiser les swaps
    setTimeout(function(){
        animate(swaps);
    },1);
}

function BubbleSort(array){
let sorted=false;
    const swaps = [];
    let c=0;
    while (!sorted){
        sorted = true;
        for (let i=0; i<array.length ; i++){
            if (array[i] > array[i+1]){
                c=array[i];
                array[i] = array[i+1];
                array[i+1] = c;
                swaps.push([i,i+1]);
                sorted = false;
            }
        }   
}
//showbars();
return swaps;
}

function showbars(move){
    container.innerHTML="";
for ( let i = 0; i<array.length; i++){
    const bar = document.createElement("div");
    bar.style.height = array[i]*150+"%";
    bar.classList.add("bar");
    if(swaps && move.indices.includes(i)) bar.style.backgroundColor = "red";
    container.appendChild(bar);
    
}
}

