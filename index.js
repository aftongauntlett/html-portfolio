// prompt user for name, location, bio, linkedIn URL and Github URL
// create html based on responses
// string template literals 
// promises


const inquirer = require("inquirer")
const axios = require("axios")
const fs = require("fs")

const createTag = function (tagName, str) {
  return "<" +  tagName + ">" + str  + "</" + tagName + ">"
}
const questions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name"
  },

  {
  type: "input",
  message: "What is your location?",
  name: "location"
},

{
  type: "input",
  message: "Write a small bio",
  name: "bio"
},

{
  type: "input",
  message: "What is your LinkedIn URL?",
  name: "linkedin"
},

{
  type: "input",
  message: "What is your Github URL?",
  name: "github"
},

{
  type: "input",
  message: "What is your repo count?",
  name: "repoCount"
},
]

inquirer.prompt(questions).then( (response) => {
  const queryUrl = `https://api.github.com/users/${response.github}/repos?per_page=${response.repoCount}`;
  axios
    .get(queryUrl)
    .then( resp => {
      const repoArray = resp.data
      let html = `
        <html>
        <head>
           <title>${response.name}'s Web Page</title>
           <link rel="stylesheet" href="styles.css">
        </head>
        <body>
      `;

      html += createTag("h1", "Web Page For " + response.name)

      repoArray.forEach( repo => {
        const liTag1 = createTag("li", "Id: " + repo.id) 
        const liTag2 = createTag("li", "Name: " + repo.name) 
        const allLiTags = liTag1 + liTag2
        const ulTag = createTag("ul", allLiTags) 
        const divTag = createTag("div", ulTag)

        html += divTag
      })

      html += `
        </body>
        </html>
      `;

      fs.writeFile("index.html", html, err => {
        if(err){
          return console.log(err)
        }

        console.log("Success!")
      })

      let css ="h1 {\n  color: red;\n}\n \n"
      css+= "body {\n  background-color: rgb(#927a8e);\n}\n \n"
      // css+= ".liTag1 {\n  color: white;\n}\n"
      // css+= ".liTag2 {\n  color: white;\n}\n"


      fs.writeFile("styles.css", css, err => {
        if(err){
          return console.log(err)
        }

        console.log("Success!")
      })
      
    })
});
