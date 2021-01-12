const inputService=require('../service/inputService')
const analyseService=require('../service/analyseService')
const outputService=require('../service/outputService')

module.exports={
    analyse:(inputFile,outputFile)=>{
        //Input
        inputService.readFromCsv(inputFile).then(entries=>{
            //Process
            var formattedEdgeData=analyseService.analyse(entries)
            //Output
            outputService.writeToCsv(formattedEdgeData,outputFile)
        }).catch(err=>{
            console.log(err)
        })
    }
}