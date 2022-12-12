

export const getJSON = async function(url:string){
    try{
        const res = await fetch(url);
       
        const data = await res.json();
       
        if (!res.ok) throw new Error (`Bad response`);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

export const getData = (apiUrl:string, setterFunction: (data: []) => void) => {
    fetch(apiUrl)
       .then((response) => response.json())
       .then((data) => {
          setterFunction(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
   }