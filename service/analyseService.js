module.exports={
    analyse:entries=>{
        var data={}, // This will keep track of multiple simultaneous shifts.
            graph={  // Object that represents graph
                nodes:[],
                edges:{}
            },
            formattedEdgeData=[] // This will contain formatted edge data that is required for csv output.
        entries.map(entry=>{
            var key=entry.date+'#'+entry.shift // Simultaneous shifts (same date and time) will be stored against the same field
            if(!(key in data))data[key]=[] // Initializing array that'd contain the names of persons working at the same time
            data[key].push(entry.volunteerName)
            if(!graph.nodes.includes(entry.volunteerName))graph.nodes.push(entry.volunteerName) // Adding node to graph if it is not added yet
            if(data[key].length>1) // If other persons are working at the same date and shift
                for(var i=0;i<data[key].length-1;i++){
                    var edgeIndices=[graph.nodes.indexOf(data[key][i]),graph.nodes.indexOf(entry.volunteerName)].sort() //sorting the 2 vertices that the edge connects as it is bidirectional
                    var edgeKey=edgeIndices[0]+'#'+edgeIndices[1] //Naming the edge
                    graph.edges[edgeKey] = (graph.edges[edgeKey] || 0) + 1; // Initializing orr incrementing weight by 1.
                }
        })

        //Formatting object for csv output
        Object.keys(graph.edges).map(edgeKey=>{
            formattedEdgeData.push({
                node1:graph.nodes[parseInt(edgeKey.split('#')[0])],
                node2:graph.nodes[parseInt(edgeKey.split('#')[1])],
                weight:graph.edges[edgeKey]
            })
        })

        return formattedEdgeData
    }
}