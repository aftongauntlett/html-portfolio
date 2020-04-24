// prompt user for name, location, bio, linkedIn URL and Github URL
// create html based on responses
// string template literals 
// promises


const inquirer = require("inquirer")
const axios = require("axios")
const fs = require("fs")

const createTag = function (tagName, str) {
  // return `<${tagName}>${str}</${tagName}>`
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
        </head>
        <body>
      `;

      // Create h1 tag for page title
      html += createTag("h1", "Web Page For " + response.name)

      // for each repo, create a div, and a ul/li combo for some info
      repoArray.forEach( repo => {
        // Create each li tag for the current repo
        const liTag1 = createTag("li", "Id: " + repo.id) // <li>Id: 53434343</li>
        const liTag2 = createTag("li", "Name: " + repo.name) // <li>Name: group_project_1</li>

        // Join the two li tags together into a single string
        const allLiTags = liTag1 + liTag2

        // Put the string of li tags inside a <ul> tag
        const ulTag = createTag("ul", allLiTags) // <ul><li>....</li><li>....</li></ul>

        // Put the ul tag inside of a div
        const divTag = createTag("div", ulTag) // <div><ul><li>....</li><li>....</li></ul></div>

        // Add the div tag for this repo to the html
        html += divTag
      })

      // Now add the closing html tags
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

      let css ="h1 { color: red; } "

      fs.writeFile("styles.css", css, err => {
        if(err){
          return console.log(err)
        }

        console.log("Success!")
      })
      
    })
});
