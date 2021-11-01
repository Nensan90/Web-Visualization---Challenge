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

    function init() {
        var select = d3.select("select");
        var initMetadata = metadata[0];
        metadataPanelGen(initMetadata);
        initSampleData = samples[0];
        init();
  });

function metadataPanelGen(metadata) {
    d3.selectAll("p").remove();
    var mdPanel = d3.select('div.panel-body');
    for (let [key, value] of Object.entries(metadata)) {
      mdEntry = mdPanel.append("p").text(`${key}: ${value}`);
      mdEntry.attr('valNum');
    }
  }

  Plotly.newPlot('bar', barData);
  var trace1 = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      color: sampleData.otu_ids,  
      size: sampleData.sample_values,
    }
  };

  var bubbleData = [trace1];
var bubbleLayout = { 
    xaxis: {title: {text: 'OTU ID'}},
    showlegend: false,
    height: 400,
    width: 800
  };