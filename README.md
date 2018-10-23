# transportationWeb
assignment1
It is a system that manage sender, receiver and goods(express). It also provides user query information to search their express where it is and who sends it. 
## The website url 
I deploy it on the Heroku, use Github as the deployment method, use mlab as the cloud database.The website url is : https://express-transportation.herokuapp.com/

## Structure(contains file)
### It uses Git to control project version and push to the Github: https://github.com/YanLiu96/transportationWeb
### It contains four models file and eight routes file and 12 Get, 4 Post, 4 Put, 4 Delete API request.
### It uses Mocha + Chai to test the project. All of the test code are store in the transportation/test/routes folder. 
### It uses ESLint to analyse code quality for potential errors and fix the errors.
### It uses GCOV to test the code coverage and grant coverage report at transportation/coverage/lcov-report/index.html.

## Description of functionality.
3.1.	Goods
It can get all the goods information, get one good information according to it’s ID, edit the goods status (Location and deliveryman information) by enter the fix information to change. It also can delete good by ID. 
3.2.	Senders
It can get all the senders information, get one sender information
3.3.	Receivers
3.4.	Shipments
3.5.	Details
3.6.	FuzzySearch
3.7.	
