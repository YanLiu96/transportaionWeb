# Express Transportation Website
## Yan Liu 
## 20082245
### It is a system that manage sender, receiver and goods(express). It also provides user query information to search their express where it is and who sends it. 
### 1. Related Links
I deploy it on the Heroku, use Github as the deployment method, use mlab as the cloud database,and record demo video which upload at YouTube.

The website url is : https://express-transportation.herokuapp.com/
The demo url is:

### 2.	Structure(contains file)
#### 2.1.	It uses Git to control project version and push to the Github: https://github.com/YanLiu96/transportationWeb
#### 2.2.	It contains four models file and eight routes file and 12 Get, 4 Post, 4 Put, 4 Delete API request.
#### 2.3.	It uses Mocha + Chai to test the project. All of the test code are store in the transportation/test/routes folder. 
#### 2.4.	It uses ESLint to analyse code quality for potential errors and fix the errors.
#### 2.5.	It uses GCOV to test the code coverage and grant coverage report at transportation/coverage/lcov-report/index.html.

### 3.	Description of functionality and example
#### 3.1.	Goods
##### 3.1.1.	Get all the goods information from goods model
##### 3.1.2.	Get one good information by it’s ID
##### 3.1.3.  Add one goods 
##### 3.1.3.	Edit the `goods status:goodlocation`🌟
##### 3.1.4.	Edit the `goods deliveryman information` 🌟
##### 3.1.5.	Delete one good by ID. 

#### 3.2.	Senders
##### 3.2.1.	Get all the senders information from senders model
##### 3.2.2.	Get one sender information by it's ID
##### 3.2.3.	Add one sender
##### 3.2.5.	Find `one sender send how many goods`🌟
##### 3.2.6.	delete one sender by it’s ID.

#### 3.3.	Receivers
##### 3.3.1.	Get all receivers information
##### 3.3.2.	Get one receivers by it’s ID
##### 3.3.3.	Change one receiver's phone number🌟
##### 3.3.3.	Change one receiver's address🌟
##### 3.3.3.	Delete one receiver

#### 3.4.	ShipmentsDetails
##### 3.4.1.	Get all shipmentDetails information
##### 3.4.2.	Get one shipmentDetails by it’s ID
##### 3.4.3.	Get `the combination of Good and shipmentDetails` by ID🌟🌟
##### 3.4.4.	Change one receiver's address🌟
##### 3.4.5.	Delete one receiver

#### 3.5.	Details🌟🌟🌟
##### 3.5.1.	Get `the combination of Goods,Senders,Receivers information`
##### 3.5.2.	Get` Details of good,sender and receiver by it’s ID`

#### 3.6.	FuzzySearch🌟🌟🌟🌟
##### 3.6.1.  `input keyword it will find the good or sender or receivers name whic contain keyword no matter upcase and return the combination details`	

### 4.	Project Test

