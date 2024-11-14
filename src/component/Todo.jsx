import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todoSlice } from '../App';

const Todo = () => {

  const [input, setInput] = useState('0');
  const [type, setType] = useState("");

  const todolist = useSelector((state) => 
    { 
      return state.todo.todolist
    });
  let sum = 0;
  todolist.map(todo => {
    if(todo.type === "(수입)"){
      sum += parseInt(todo.text);
    }else{
      sum -= parseInt(todo.text);
    }
  });

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <label for="income">수입</label>
        <input type="radio" id="income" name="money" onClick={
          (e)=>{
            setType("(수입)");
          }
        }></input>
        <label for="expend" >지출</label>
        <input type="radio" id="expend" name="money" onClick={
          (e) => {
          setType(("(지출)"));
          }}></input>
      </div>
        <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }
          }
        placeholder="새 할 일 입력"
      />
      <button onClick={() => {
        // 액션 타입 수정 (슬라이스이름/타입)
        // dispatch({ type: 'todoSlice/ADD', text: input });
        
        //액션을 직접 넘기지 않고 액션함수를 사용
        dispatch(todoSlice.actions.ADD({"type": type, "input": input}));
        setInput('');
      }}>추가</button>
      <h3>총금액 : {sum} </h3>
      <ul>
        {todolist.map(todo => (
          <li key={todo.id}>
            {todo.type}
            {todo.text}
            {/* 단건 삭제는 삭제할 대상을 지정해야함
                조건: 식별자(아이디, 번호 등...)
            */}
            <button onClick={() => {
              // dispatch({ type: 'todoSlice/DELETE', id: todo.id })
              dispatch(todoSlice.actions.DELETE(todo.id));}
              }>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo