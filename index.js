const app=require('./controller/app')

const mainInputFile='volunteer_attendance_data.csv' //this file is in the input directory
const mainOutputFile='main_out.csv' //this file will be generated in the output directory

app.analyse(mainInputFile,mainOutputFile)



