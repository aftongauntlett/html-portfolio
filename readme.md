# Mini Project

Built a command line tool that generates an HTML portfolio page from questions asked of the user and the responses provided.

## How it works

* You will be prompted for the following information: name, location, bio, LinkedIn URL, and GitHub URL. From the information provided, an HTML document will be created with CSS and answers filled in

* Some tools and technologies you'll need to accomplish this:

  * FS: For writing to the filesystem
  * Inquirer: For collecting user input
  * String template literals: For generating a string version of the HTML document before it is written to the filesystem
  * Promises: For handling asynchronous behavior

## Hint(s)

* It may be a good idea to start building out the HTML skeleton in a real HTML file. Once you're happy with the HTML file's appearance in the browser, you can copy/paste its contents into a string template literal and write a function to insert the user input into the appropriate places in the HTML string before writing it to the filesystem.

prompt user for name, location, bio, linkedIn URL and Github URL
create html based on responses
string template literals 
promises# html-portfolio
