import zempt from './zempt.js';

// Setting the file extensions
// Default: EPUB, MOBI and PDF. 

zempt.FILE_EXTENSIONS = ['epub'];
zempt.LIB_URL = "https://pt.br1lib.org";

// Searching for a book by book title
// its returns a list of objects contains the book title,
// publisher, year, file-format and url. 
let books = await zempt.searchBook('As Crônicas de Nárnia');

// Showing the list
console.log(books);