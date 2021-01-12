const app=require('./controller/app')

//Modify the test_out.csv with as much test data as you want.
const testInputFile='test.csv' //this file is in the input directory
const testOutputFile='test_out.csv' //this file will be generated in the output directory

app.analyse(testInputFile,testOutputFile)