# Week-7-rcmn

## Roles

Quality - Nafisa
User - Chun
Facilitator - Mariya
Deployment - Rosie


Our project was to build anything we like as long as it meets the technical criteria below. 


## Technical criteria 
Express server
Postgres database
Hosted on Heroku
One of the above spike topics
Handle errors and inform the user


## Initial ideas

* book reviews
* job site (upload cv)
* photo library - add pics of things to shared library? could include filtering, different photo albums

## Chosen idea - 'Photo app: Our beautiful island'

* Upload images of favourite places/ nice pictures and then tag it with key words  V
* We can then filter using those key words
* You will need to have an account to upload pictures V
* You can only delete you own pictures
* Anyone can view all images and filter them

---

## Common libraries: Multer and Formidable

Formidable: https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp

Multer:
https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
(also good for general file set up)

---

## Hints and tips

To get a full path name for file (Mac users sorry Windows!):
    - use finder to locate the image
    click view
    click show path bar
    when the path bar appears at the bottom, right click ont he file itself and click: copy <file name> as pathname


![](https://i.imgur.com/nHpi4e6.png)




## Questions and answers
*put your questions here (and answer them if you can!*

* Why do we install some things as a development dependency only?
* Do we need npm run start (node server.js) if we're also using nodemon (npm run dev)?
* What is result.rows[0]?
*     console.error("error", error) - why does it need double error here?
* in logout.js line 1, why is delete in curly braces? it works without it too ( we think its so you could assign it to multiple vraibales w)
*why do we need to npm install cookie-parser every time? npm install doesn't just install it for us
