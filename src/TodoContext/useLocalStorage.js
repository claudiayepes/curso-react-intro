import React from "react";

function useLocalStorage(itemName, initialValue){
    const [item, setItem ] = React.useState(initialValue);
    const [loading, setLoading ] = React.useState(true);
    const [error, setError ] = React.useState(false);
   
    React.useEffect(() => {
        setTimeout(() => {
            try{
                let localStorageItem = localStorage.getItem(itemName);
                let parsedItem;
        
                //Si no hay datos guardados en el local storage vamos a crear un valor inicial
                if(!localStorageItem){
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                }else{
                    parsedItem = JSON.parse(localStorageItem);
                    setItem(parsedItem);
                }
        
                setLoading(false);
            } catch(error){
                setLoading(false);
                setError(true);
            }
   
        }, 2000);
        
    }, []);

   
      //Guardar en el estado y en el localStorage
      const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(newItem);
      };
  
      return {
        item, 
        saveItem,
        loading,
        error,
    };
  }

  export {useLocalStorage};

  {/*const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Completar curso de React', completed: false},
  {text: 'Llorar con la llorona', completed: true}
]
localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
localStorage.removeItem('TODOS_V1');*/}