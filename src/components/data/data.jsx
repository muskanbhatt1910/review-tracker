import React, { useState, useEffect } from 'react';

export const StoreContext = React.createContext(null)

const StoreData = () => {
    const [colourOptions, setcolourOptions] = useState([]);
    useEffect(() => {
        console.log("data jsx");
        fetch("http://127.0.0.1:5000/stores/")
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