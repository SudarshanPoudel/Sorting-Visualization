let values = [];




let container = document.querySelector('.container');

generateArray();
function generateArray(){
    values = [];
    for (var i = 0; i < 20; i++) {
        values.push(Math.floor(Math.random() * 91) + 10); // Generates random number between 10 and 100
    }
    drawBox();
}
function drawBox(...boxNo){
    container.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        let dataBox = document.createElement('div');
        dataBox.classList.add('data')
        dataBox.innerHTML = values[i]
        dataBox.style.height = calculateHeight(values[i]);
        if(boxNo.includes(i)) dataBox.style.backgroundColor = '#ff0000'
        container.appendChild(dataBox)
    }

    function calculateHeight(val){
        let max = Math.max.apply(null, values);
        return 100/max * val.toString() + '%';
    }
}




function startSorting(sortingType){
    switch(sortingType) {
        case 'BubbleSort':
            bubbleSort();
            break;
        case 'SelectionSort':
            selectionSort();
            break;
        case 'InsertationSort':
            insertationSort();
            break;
    }
    
}

// Bubble sorting
async function bubbleSort(){
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < (values.length - i - 1); j++) {
            if (values[j] > values[j + 1]) {
                [values[j], values[j + 1]] = [values[j+1], values[j]]

            }
            await new Promise(r => setTimeout(r, 50));
            drawBox(j+1);
        }
        
    }
    await new Promise(r => setTimeout(r, 200));
    drawBox();
}

// Selection sorting
async function selectionSort(){
    const len = values.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < len; j++) {
            if (values[j] < values[minIndex]) {
                minIndex = j;
            }
            await new Promise(r => setTimeout(r, 50)); drawBox(i, j+1, minIndex);
        }
        if (minIndex !== i) {
            // Swap the elements
            [values[i], values[minIndex]] = [values[minIndex], values[i]];
            await new Promise(r => setTimeout(r, 200)); drawBox(minIndex, i);

        }
        
    }
    await new Promise(r => setTimeout(r, 200));
    drawBox();
}

// Insertation sorting

async function insertationSort(){
    const len = values.length;
    for (let i = 1; i < len; i++) {
        let current = values[i];
        let j = i - 1
        while (j >= 0 && values[j] > current) {
            values[j + 1] = values[j];
            j--;
            await new Promise(r => setTimeout(r, 100));
            drawBox(j+1);
        }
        await new Promise(r => setTimeout(r, 100));
        drawBox(i, j+1);
        values[j + 1] = current; 
    }
    await new Promise(r => setTimeout(r, 1000)); 
    drawBox();
}



function mergeSort(val) {
    if (val.length <= 1) {
        return val;
    }

    const middle = Math.floor(val.length / 2);
    const left = val.slice(0, middle);
    const right = val.slice(middle);

    val = merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    console.log(left, right)
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    if(left && right){
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    // await new Promise(r => setTimeout(r, 1000)); drawBox(leftIndex, rightIndex);

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
}
