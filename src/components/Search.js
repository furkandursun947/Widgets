import React, {useState, useEffect} from 'react'
import axios from 'axios'




const Search = () => {

    const [term,setTerm] = useState('');
    const [results, setResults] = useState([]);   // hiç result yokmuş gibi boş array
    /*1 . yol
    useEffect(() => {
        (async () => {
            await axios.get('sdasd');
        })();
    }, [term]);  // second argument lifecylce ın ne olduğunu gösterir. [], [term], empty 3 ünden biri olabilir.
    */
   /* 2. yol
   useEffect(() =>{
       axios.get('sadad').then((response) =>{
            console.log(response.data);
       });
   },[term]);
   */
   useEffect(() =>{
        const search = async () =>{
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });
            setResults(data.query.search);  // gelen data da istediğimiz kısım (cconsole.logdan bakabilirsin)
        };
        // for first time render avoid the 1000 timer
        if(term && !results.length){
            search();
        }
        else{   
            // yaptığımız şey -> input change : set a timer to 500ms -> inputchange : cancel previos timer, set a timer to 500 ms ...
            const timeoutId = setTimeout(() =>{
                if(term){           // normalde ilk başta renderlanınca srsearch empty oluyor bu da program da istenmiyor. bunun için term varsa arama yapıyor direk
                    search();
                }
            }, 1000);

            return() =>{
                clearTimeout(timeoutId);
            }
        }
   },[term, results.length]);   // result length i kaldırınca hata verir. bunu ekleyince de başta 2 request atar çünkü term değişince atıyor sonra gelen objede results kısmı alıyoruz bunun lengthi hesaplanıyor ve bu gelmiş oluyor length değişince tekrar renderleniyor  yani 2 request oluyor
    const renderedResults = results.map((result) =>{
        const regex = /(<([^>]+)>)/gi;
        const cleanSnippet = result.snippet.replace(regex,"");
        return(
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {cleanSnippet}
                </div>
            </div>
        )
    });
    return (
        <div>
            <div className="ui form">
                <div className="field"> 
                    <label>Enter search term</label>
                    <input className="input" value={term} onChange={e =>setTerm(e.target.value)}/>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}    
            </div>    
        </div>
    );
};


export default Search;