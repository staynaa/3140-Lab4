# 3140-Lab4
## About:
This repo contains the frontend portion of the quiz5 report on quiz2/lab3 Database and API assignment. The database and api used could be found over at https://github.com/CesarIgnacio/Lab3-CISC-3140
However everything needed for this repo/assignment to work smoothly is all here. All you need to do is follow these instructions

## Instructions:
###### Important Must have NPM/Node JS 
**1.** In the terminal, ` cd ` into the repo folder and type `node app.js `
> app.js is what contains the APIs and routing instructions.
**2.** After typing this, the terminal should return "Worked!" to let you know that a connection to the server was made and you can move on to opening your browswer of choice to view the website.
**3.** In your browswers search bar, type  http://localhost:3000. This is the main/home page of the website. You should see a form.
**4.** Answer the form and submit when everything is filled out. Once submitted, Click on *"View History"* and scroll until you see your latest report!
###### Completing the form is not a requirement, you can go straight to "View History" if you want to.
**5.** And thats it, very simple website that only deals with input reports and viewing reports.

## Tools Used:
  **Pug HTML CSS** and **JavaScript** was used to make the frontend.
  We installed PUG the same way we installed everything into the package.json 
  ` npm install --save pug `
  In the API, we needed to set up and allow for a connection to pug files and the folder `/views` that would hold them.
  ```
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  ```
  PUG framework isn't all that different from HTML but it has it's benefits that allows for it to stand out.
  Unlike HTML, PUG uses indentation over tags. Think of it like Java, where indents allow for users to know which lines of codes are where, whether in a specific conditional statement or loop. All that being said, it is much easier to view and understand. Also easier to type since there is no need to constantly use closing tags. 
  We still did use HTML for our home page and submit page, but for view history we relied on PUG. This was due to a limitation in HTML... VARIABLES.
  HTML doesn't use variables and loops to go through an array, which it also can't handle. This became a problem for us as we wanted to display each report in a specific way. Pug allowed for the use of a loop that would put data in a json array sent from the API into variables. This was done with the `each` function in PUG.

