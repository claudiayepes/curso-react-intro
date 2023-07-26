import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}){

    const {
    //los dos puntos renombran los estados
    item: todos, 
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  const totalTodos = todos.length;
  const [openModal, setOpenModal] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
//Estado derivado para manipular la propiedad del Todo 'completed' para contar, cuantos todos están completados
  const completedTodos = todos.filter( 
    todo => !!todo.completed).length;

  //Estado derivado para filtrar en la lista de todos
  const searchedTodos = todos.filter(
    (todo) =>{
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText)
    }
    )

  //Agregar To do
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      text,
      completed: false
    });
    
    saveTodos(newTodos);
  }

  //Marcar todo como completado  
  const completeTodo = (text) => {
    //Hacer copia de un array con EcmaScript
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    //mandar los todos al metodo saveTodos
    saveTodos(newTodos);
  }  

  //Eliminar todo
  const deleteTodo = (text) =>{
    //Hacer copia de un array con EcmaScript
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }
  console.log('Los usuarios buscan todos de '+ searchValue);
    
  //Enviar contexto
    return(
        <TodoContext.Provider value={{
        error,
        loading,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,        
        }}>
            {children}
        </TodoContext.Provider>
    );
}
export {TodoContext, TodoProvider};