import React, { useState, useEffect } from 'react';

export const StoreContext = React.createContext(null)

const StoreData = () => {
    const [colourOptions, setcolourOptions] = useState([]);
    useEffect(() => {
        console.log("data jsx");
        fetch("https://matrik.pythonanywhere.com/stores/",{mode: 'no-cors'})
           .then((response) => response.json())
           .then((data) => {
              console.log("Bhatt data");
              console.log(data);
              setcolourOptions(data);
            //   val = colourOptions;
              //colourOptions = data;

           })
           .catch((err) => {
              console.log("Keetiii");
              console.log(err.message);
           });
     }, []);

  return (
    <StoreContext.Provider value={colourOptions}></StoreContext.Provider>
  )
}

export default StoreData