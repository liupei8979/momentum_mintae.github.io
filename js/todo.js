const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = []; 

const TODOS_KEY = "todos";

function playButtonClickSound() {
    // 효과음 재생 코드 작성
    // 예시로는 'click_sound.mp3' 파일을 재생하는 것으로 가정합니다.
    const audio = new Audio('https://www.dropbox.com/s/5q7witjidgwmgzd/MP_%EC%A0%84%EC%9E%90%20%EB%B2%84%ED%8A%BC%EC%9D%8C%20-%202.mp3?dl=0');
    audio.play();
  }

function saveToDos(){
    // toDos array를 locarstorage에 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){ 
    const deleteLi = event.target.parentElement; //target=button, parent=li
    toDos = toDos.filter(todo => todo.id !== parseInt(deleteLi.id)); // li의 id와 변수의 id가 다를 때 true -> 클릭한 li.id와 todo.id가 같은 요소는 false이므로 새로 형성할 배열에서 제외  
    saveToDos(); 
    deleteLi.remove(); // = delete parent li

 // 효과음 재생 함수 호출
    playButtonClickSound();
 }

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id; // html의 li에 localstorage에 저장된 id값을 부여(string)
    
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    
    const button = document.createElement("button");
    button.innerText = "x";
    
    button.addEventListener("click",deleteToDo);
    li.appendChild(span); 
    li.appendChild(button);
    toDoList.appendChild(li);
} 

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = ""; // submit(enter) 할 때마다 해당 입력값을 빈 칸으로 초기화
    const newTodoObj = {
        text:newTodo,
        id: Date.now(), // number 타입 
    }
    toDos.push(newTodoObj); // toDos arry에 vlaue 저장
    paintToDo(newTodoObj);
    saveToDos();
    // 효과음 재생 함수 호출
  playButtonClickSound();
    
}
toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    // localstorage에 저장된 todo가 있을 경우
    const parsedToDos = JSON.parse(savedToDos); 
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}