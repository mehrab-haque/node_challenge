# To run it in your environment :

- Install node.js in your machine.
- Clone this repository.
- In the project folder, run command **npm install** to install all necessary dependencies.
- Then to run the program for the provided csv file, run command **npm start** , data will be fetched from **input/volunteer_attendance_data.csv** file and the output will be generated at **output/main_out.csv**
-  To run **automated test**, run command **npm test**
, in this case, data will be fetched from the **input/test.csv** file and the output will be generated at **output/test_out.csv**.

The main logic is in the **service/analyseService.js** file.
Necessary comments are included for easy understannding and intuition.  

This codebase follows **MVC architecture** that is easily understandable, upgradable and debuggable.