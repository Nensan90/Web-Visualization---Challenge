url = "https://github.com/Nensan90/Web-Visualization---Challenge/blob/main/samples.json"

var names;
var samples;
var dataset;
var metadata;

d3.json(url).then(function(data) {
    dataset = data;
    metadata = data.metadata;
    names = data.names;
    samples = data.samples;
    console.log(metadata[0]);
    console.log(samples);

    function init() {
        var select = d3.select("select");
        for (var i = 0; i < names.length; ++i) {
          newOption = select.append("option").text(names[i]);
          newOption.attr('value', names[i]);
        }
        var initMetadata = metadata[0];
        metadataPanelGen(initMetadata);
        initSampleData = samples[0];
        console.log(initSampleData);
        chartGen(initSampleData);
    }  
        init();
  });
  function optionChanged(newSample) {
    console.log(newSample);
    var newIndex;
    for (var l=0; l<names.length; l++) {
      if (names[l] == newSample) {
        newIndex = l;
    }
  }
  console.log(newIndex);
  console.log(names[newIndex]);
  var newMetadata = metadata[newIndex];
  var newSampleData = samples[newIndex];
  console.log("New", newSampleData);
  metadataPanelGen(newMetadata);
  chartGen(newSampleData);

}
function metadataPanelGen(metadata) {
    let counter = 0
    d3.selectAll("p").remove();
    var mdPanel = d3.select('div.panel-body');
    for (let [key, value] of Object.entries(metadata)) {
      mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
      mdEntry.attr('valNum');
      counter +=1;
    }
  }

  function chartGen(sampleData) {
    var sampleOIDS = sampleData.otu_ids;
    var sampleAxisLabels =[];
    for (var k=0; k<sampleOIDS.length; k++) {
      sampleAxisLabels.push(`OTU ${sampleOIDS[k]}`);
    }
    console.log(sampleAxisLabels);
    var barData = [{
      type: 'bar',
      y: sampleAxisLabels.slice(0,10),
      x: sampleData.sample_values.slice(0,10),
      text: sampleData.otu_labels.slice(0,10),
      orientation: 'h',
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending'
      
      }]
    }];

  Plotly.newPlot('bar', barData);
  var trace1 = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      color: sampleData.otu_ids,  
      size: sampleData.sample_values,
      sizeref: 1.2,
      sizemode: 'diameter'
    }
  };

  var bubbleData = [trace1];
  var bubbleLayout = { 
    xaxis: {title: {text: 'OTU ID'}},
    showlegend: false,
    height: 400,
    width: 800
  };

  Plotly.newPlot("bubblechart", bubbleData, bubbleLayout);
}