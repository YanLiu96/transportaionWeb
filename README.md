# Express Transportation Website
## Yan Liu 
## 20082245
### It is a system that manage sender, receiver and goods(express). It also provides user query information to search their express where it is and who sends it. 
### 1. Related Links
#### I deploy the website on the Heroku, use Github as the deployment method, use mlab as the cloud database,and demo video which upload at YouTube.

The website url is : https://express-transportation.herokuapp.com/

The GitHub url is :https://github.com/YanLiu96/transportationWeb

The demo url is:https://youtu.be/XfYGKxZ4FXQ

### 2.	Structure(contains file)
#### 2.1.	It uses Git to control project version and push code to the Github.
#### 2.2.	It contains 4 models file and 8 routes file and 13 Get, 4 Post, 4 Put, 4 Delete API request.
#### 2.3.	It uses Mocha + Chai to test the project. All of the test code are store in the transportation/test/routes folder. 
#### 2.4.	It uses ESLint to analyse code quality for potential errors and fix the errors.
#### 2.5.	It uses GCOV to test the code coverage and generate coverage report at transportation/coverage/lcov-report/index.html.

### 3.	Description of functionality
#### 3.1.	Goods
##### ①Get all the goods information from goods model
##### ②Get one good information by it’s ID
##### ③Add one goods 
##### ④Edit the `goods status:goodlocation`🌟
##### ⑤Edit the `goods deliveryman information` 🌟
##### ⑥Delete one good by ID. 


#### 3.2.	Senders
##### ①Get all the senders information from senders model
##### ②Get one sender information by it's ID
##### ③Add one sender
##### ④Find `one sender send how many goods`🌟
##### ⑤delete one sender by it’s ID.


#### 3.3.	Receivers
##### ①Get all receivers information
##### ②Get one receivers by it’s ID
##### ③Change one receiver's phone number🌟
##### ④Change one receiver's address🌟
##### ⑤Delete one receiver


#### 3.4.	ShipmentsDetails
##### ①Get all shipmentDetails information
##### ②Get one shipmentDetails by it’s ID
##### ③Get `the combination of Good and shipmentDetails` by ID🌟🌟
##### ④Change one receiver's address🌟
##### ⑤Delete one receiver


#### 3.5.	Details🌟🌟🌟
##### ①Get `the combination of Goods,Senders,Receivers information`
##### ②Get` Details of good,sender and receiver by it’s ID`


#### 3.6.	FuzzySearch🌟🌟🌟🌟
##### ①`input keyword it will find the good or sender or receivers name whic contain keyword no matter upcase and return the combination details`	


### 4.	Project Test details
#### In the Terminal,Print $npm test,and the test will run.
`warning:`
I use the orginal database data for the test of project. That menas please make sure you don't delete the data in the database. If you add data,you should delete it `Or`you can open the tst file,and edit the code :expect(res.body.length).to.equal(5); If you add one change 5 to 6.Because i don't want to create a new database to test,so i use orginal database which i expect the number of records is equal to orginal database data which is 5.

