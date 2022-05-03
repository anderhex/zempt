
# zempt

A free Z-Library grabber in NodeJS. It's simple as '1, 2, 3'. 
Just import zempt and enjoy!

### Getting books list:

You can search and getting a list of found books using the command **zempt.searchBook(bookName)**

> **let** books = **zempt**.searchBook('As Crônicas de Nárnia');
> 
The command will return an object list contain all found books, for example:

    [{
        title: 'Frango com Batata Doce',
        publisher: 'Pra ficar fortão',
        year: '2022',
        fileFormat: 'PDF',
        url: 'https://site.com/123'
      },
      {
        title: 'Cuscuz é bom com molho',
        publisher: 'Mas serve com queijo',
        year: '2022',
        fileFormat: 'PDF',
        url: 'https://site.com/321'
      }]

### Direct download link

Oh, yes! You can grabber the direct download url using the function **zempt.getDownloadLink(object)**,
passing as parameter the book object, for example:

> **let** books             = **zempt**.searchBook('As Crônicas de Nárnia');
> 
> **let** downloadUrl = **zempt**.getDownloadLink(books[0]);

For now, that's all folks!



Zempt use 'node-html-parser' library to parse HTML.
