const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports={
    writeToCsv:(formattedEdgeData,outputFile)=>{
        //Configuring the output csv file
        const csvWriter = createCsvWriter({
            path: './output/'+outputFile,
            header: [
                {id: 'node1', title: 'node1'},
                {id: 'node2', title: 'node2'},
                {id: 'weight', title: 'weight'}
            ]
        });
        //writing the output csv file
        csvWriter
            .writeRecords(formattedEdgeData)
            .then(()=> console.log('CSV file generated in the output diractory'));
    }
}