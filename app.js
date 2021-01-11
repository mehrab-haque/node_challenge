const CSVToJSON = require('csvtojson');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const analyse=(input,output)=>{
    const csvWriter = createCsvWriter({
        path: './output/'+output,
        header: [
            {id: 'node1', title: 'node1'},
            {id: 'node2', title: 'node2'},
            {id: 'weight', title: 'weight'}
        ]
    });

    CSVToJSON().fromFile('./input/'+input).then(array => {
        var data={},
            graph={
                nodes:[],
                edges:{}
            },
            csvOutput=[]
        array.map(entry=>{
            var key=entry.date+'#'+entry.shift
            if(!(key in data))data[key]=[]
            data[key].push({
                volunteerId:entry.volunteerId,
                volunteerName:entry.volunteerName,
                shiftReason:entry.shiftReason
            })
            if(!graph.nodes.includes(entry.volunteerName))graph.nodes.push(entry.volunteerName)
            if(data[key].length>1)
                for(var i=0;i<data[key].length-1;i++){
                    var edgeIndices=[graph.nodes.indexOf(data[key][i].volunteerName),graph.nodes.indexOf(entry.volunteerName)].sort()
                    var edgeKey=edgeIndices[0]+'#'+edgeIndices[1]
                    graph.edges[edgeKey] = (graph.edges[edgeKey] || 0) + 1;
                }
        })
        Object.keys(graph.edges).map(edgeKey=>{
            csvOutput.push({
                node1:graph.nodes[parseInt(edgeKey.split('#')[0])],
                node2:graph.nodes[parseInt(edgeKey.split('#')[1])],
                weight:graph.edges[edgeKey]
            })
        })
        csvWriter
            .writeRecords(csvOutput)
            .then(()=> console.log('CSV file generated in the output diractory'));
    }).catch(err => {
        console.log(err)
    });
}

module.exports={analyse}
