
function generateFFT(data,samplingRate,minResolution=5,pointsBetween=5,maxSegments=30,) {

    let nyquistFreq = 0.5 * samplingRate;
    let numPoints = math.size(data)._data[0];
    let fftFreq = linspace(0,samplingRate / 2, math.ceil(numPoints / 2));
    let fftMag = math.ones(math.ceil(numPoints/2));

    let nPerSeg;
    let nOverlap;

    if(numPoints < maxSegments * nyquistFreq) {
        nPerSeg = math.ceil(samplingRate * pointsBetween / minResolution);
    }
    else{
        nPerSeg = math.floor(numPoints / (maxSegments/2));
    }

    if(nPerSeg > math.floor(numPoints / 2)){
        nPerSeg = math.floor(numPoints / 2);

        console.log("The desired resolution cannot be achieved\n\
                    due to limited available data. Consider reducing the\n\
                    desired resolution or increasing the sampling time.");
    }


    nOverlap = math.floor(nPerSeg / 2);

    let step = nPerSeg - nOverlap;
    let numSegs = math.floor((numPoints - nOverlap) / step);

    let reshapedData = math.zeros(numSegs,nPerSeg);

    for(n = 0; n < numSegs; n++) {
        let startIndex = n * step;

        for(m = 0; m < nPerSeg; m++) {
            reshapedData = math.subset(reshapedData, math.index(n,m),data._data[startIndex + m]);
        }
    }

    for(i = 0; i < math.ceil(numPoints/2); i++) {

        let tempReal = new Array(numSegs).fill(0);
        let tempImag = new Array(numSegs).fill(0);

        for(j = 0; j < nPerSeg; j++) {

            let exponential = math.pow(W,i * j);

            for(k = 0; k < numSegs; k++) {
                tempReal[k] = tempReal[k] + reshapedData._data[k][j] * math.re(exponential);
                tempImag[k] = tempImag[k] + reshapedData._data[k][j] * math.im(exponential);
            }
        }

        for(k = 0; k < numSegs; k++) {
            fftMag._data[i] = fftMag._data[i] + tempReal[k] * tempReal[k] + tempImag[k] * tempImag[k];
        }

        fftMag._data[i] = 2 /(numPoints * numSegs) * fftMag._data[i];

    }

    return {fftMag: fftMag,
            fftFreq: fftFreq};
}