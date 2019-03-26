var maxTime = 100;
var timeStep = .1;

var samplingRate = 1 / timeStep;

var time = math.range(0,maxTime,timeStep);
var numPoints = math.size(time)._data[0];

var data = math.map(time,function(value) {
    return math.sin(value * 2 * math.PI);
});

var W = math.exp(math.complex(0,-2 * math.PI / numPoints));

var hanningWindow = hanning(numPoints);
var windowedData = elementwiseMultiply(hanningWindow,data);

var generatedFFT = generateFFT(windowedData, samplingRate);

