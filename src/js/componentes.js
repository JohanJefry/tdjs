import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBOrrar     = document.querySelector('.clear-completed');
const ulFitors      = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const count         = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) =>{

   const htmlTodo = `
   <li class="${ ( todo.completado )? 'completed':'' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked': '' } >
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>` 
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    //contador
     //console.log(count.firstChild.innerHTML);
     if (!todo.completado) {
         count.firstChild.innerHTML++; 
     }
      
    //

    return div.firstElementChild;

}

//Eventos inout
txtInput.addEventListener('keyup', ( event )=>{
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        
    }
    
});

//event 

divTodoList.addEventListener('click',(event) =>{
    //console.log(event.target.localName);//para detectar donde se hace click

    const nombreElemento = event.target.localName;//all elementos div (input, label, button)
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input')) {//Click en check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed')
        if (todoElemento.classList.contains('completed')) {
            count.firstChild.innerHTML--; 
        }else {
            count.firstChild.innerHTML++; 
        }
    }else if (nombreElemento.includes('button')) {//boton x
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );    
        if (!todoElemento.classList.contains('completed')) {
            count.firstChild.innerHTML--; 
        }    
    }
    
    
});

//evento borrar
btnBOrrar.addEventListener('click', ()=>{
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >=0; i--) {
        
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
        
    }


});

//event restantes
ulFitors.addEventListener('click', (event)=>{
    //console.log(event.target.text);
    const filtro = event.target.text;
    if (!filtro) return;
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
     

    for (const elemento of divTodoList.children) {
        //console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }
    
})