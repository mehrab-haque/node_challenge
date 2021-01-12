const CSVToJSON = require('csvtojson');

module.exports={
    readFromCsv:inputFile=>{
        return CSVToJSON().fromFile('./input/'+inputFile)
    }
}