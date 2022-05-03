/*
 *
 *  Z E M P T
 * 
 *  A free Z-Library grabber in NodeJS.
 *  
 *  It's set by default with the Brazilian version of zLibrary
 *  and the default language is Portuguese. Standard file formats
 *  are PUB, MOBI and PDF.
 * 
 *  The author of this code is not part of zLibrary, does not support
 *  and is not responsible for the contents published by this site.
 * 
 *  @Author : AnderHEX
 *  @License: MIT
 *  @Date   : 04/2022 
 * 
 *  Oxente
 */

import fetch from 'node-fetch'; 
import {parse} from 'node-html-parser';


const zempt = {

      LIB_URL:"",
      LANGUAGE:"portuguese",
      FILE_EXTENSIONS:['epub','mobi','pdf'],

      searchBook:async (title) =>{
        try{
            if(title === "" || title === null || title === undefined)
            return; 

            title = title.replaceAll(' ', '%20');
            const ext = zempt.FILE_EXTENSIONS.map(e=>'&extensions[]='+e).join('');
            const url = `${zempt.LIB_URL}/s/${title}?languages%5B%5D=${zempt.LANGUAGE}${ext}`;

            let request = await fetch(url);
            let content = await request.text(); 
            let books   = await zempt.loadBooklist(content);
            return books;
        }catch(e){
            console.error("Can't Search:", e);
            return {'error':e}
        }
      },
      loadBooklist:async (content) =>{
        try{
            if(content === "" || content === null || content === undefined)
            return; 

            let     books       = [];
            const   html        = parse(content);
            const   resultList  = html.getElementById('searchResultBox');
            const   resultItems = resultList.querySelectorAll('.resItemBox');
           
            resultItems.forEach(book=>{
                let title      = (book.querySelector('[itemprop="name"]').innerText).trim();
                let publisher  = book.querySelector('[title="Publisher"]');
                    publisher  = publisher != null ? (publisher.innerText).trim() : "Unknown Publisher";
                let year       = book.querySelector('.property_year');
                    year       = year != null ? (year.querySelector('.property_value ').innerText).trim() : "Unknown Year";
                let fileFormat = book.querySelector('.property__file').querySelector('.property_value ').innerText.split(' ')[0].replaceAll(',','');
                let url        = zempt.LIB_URL+book.querySelector('[itemprop="name"]').querySelector('a').getAttribute('href')
                books.push({
                    title,
                    publisher,
                    year,
                    fileFormat,
                    url,
                });
            })
            return books;
        }catch(e){
            console.error("Can't List Books:", e);
            return {'error':e}
        }
      },
      getDownloadLink:async (book) =>{
        try{
            let url         = book.url;
            let request     = await fetch(url);
            let content     = await request.text(); 
            let html        = parse(content);
            let downloadUrl = html.querySelector('.addDownloadedBook').getAttribute('href');
            return {downloadUrl:zempt.LIB_URL+downloadUrl};
        }catch(e){
            console.error("Can't get download link:", e);
            return {'error':e}
        }
      }

}

export default zempt;