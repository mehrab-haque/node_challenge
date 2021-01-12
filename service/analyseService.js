module.exports={
    analyse:entries=>{
        var data={}, // This will keep track of multiple simultaneous shifts.
            graph={  // Object that represents graph
                nodes:[],
                edges:{}
            },
            formattedEdgeData=[] // This will contain formatted edge data that is required for csv output.
        entries.map(entry=>{
            var key=entry.date+'#'+entry.shift // Simultaneous shifts (same date and time) will be stored against the same key
            if(!(key in data))data[key]=[] // Initializing array that'd contain the names of persons working at the same shift
            data[key].push(entry.volunteerName)
            if(!graph.nodes.includes(entry.volunteerName))graph.nodes.push(entry.volunteerName) // Adding node to graph if it is not added yet
            if(data[key].length>1) // If other persons are working at the same day and shift
                for(var i=0;i<data[key].length-1;i++){ // Traversing over each other persons working on the same day and shift for defining new edge or incrementing weight of existing edge.
                    var otherPersonIndex=graph.nodes.indexOf(data[key][i]) // Node index of the other person working on the same day and shift
                    var currentPersonIndex=graph.nodes.indexOf(entry.volunteerName) //Node index of the current person
                    var edgeIndices=[otherPersonIndex,currentPersonIndex].sort() //sorting the 2 node indices that the edge will connect as 1-2 and 2-1 will denote the same edge
                    var edgeKey=edgeIndices[0]+'#'+edgeIndices[1] // Name of the edge
                    graph.edges[edgeKey] = (graph.edges[edgeKey] || 0) + 1; // Initializing or incrementing edge weight by 1.
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