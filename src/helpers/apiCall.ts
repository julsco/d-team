

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


/* const fetchData = async () =>{
    const data = await getJSON("http://localhost:8080/players");
    console.log(data);
}

fetchData(); */