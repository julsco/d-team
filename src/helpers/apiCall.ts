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