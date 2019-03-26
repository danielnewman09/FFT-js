function linspace(start,stop,numPoints) { 

    var out = math.zeros(numPoints);

    var step = (stop - start) / numPoints;

    for(i = 1; i < numPoints; i++) {
        out._data[i] = out._data[i - 1] + step;
    }

    return out;

}

function convolve(a,v){

    var numPoints = math.size(a)._data[0];
    var out = [];

    for(i = 0; i < numPoints; i++) {
        let tempValue = 0;

        for(j = 0; j < numPoints; j++) {

            tempValue = tempValue + a._data[j] * v._data[i-j];
        }

        out[i] = tempValue;
    }

    return out;

}

function hanning(M) {

    var out = math.ones(M);

    for(i = 0; i < M; i++) {
        out._data[i] = 0.5 - 0.5 * math.cos(2 * math.PI * i / (M - 1));
    }

    return out;
}

function elementwiseMultiply(a,b) {
    var numPoints = math.size(a)._data[0]; 
    var out = math.ones(numPoints);

    for(i = 0; i < numPoints; i++) {
        out._data[i] = a._data[i] * b._data[i];
    }

    return out;
}