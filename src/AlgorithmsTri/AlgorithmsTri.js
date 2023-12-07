export const BubbleSort = array =>{
    const swaps=[];
    let sorted=false;
    let c=0;
    while (!sorted){
        sorted = true;
        for (let i=0; i<array.length ; i++){
            if (array[i] > array[i+1]){
                swaps.push([i,i+1]);
                c=array[i];
                array[i] = array[i+1];
                array[i+1] = c;
                sorted = false;
            }
        }   
    }
    return array;
}