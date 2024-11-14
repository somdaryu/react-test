import { Provider } from 'react-redux';
import Todo from './component/Todo';
import {createSlice, configureStore} from '@reduxjs/toolkit'
import { act } from 'react';

// redux방식 -> redux toolkit 방식

//차이점
//1. 스토어를 슬라이스 단위로 나눌수 있음
//2. 이전 state값을 유지할 필요가 없음

//reducer + createStore -> createSlice + configureStore

//1.todo 슬라이스 생성
//인자: {} 슬라이스이름, state초기값, 리듀서함수
export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {todolist: []},
  //액션타입별로 리듀서함수 정의
  reducers: {
    ADD: (state, action)=>{
      //새로운 요소
      //리스트가 하나도 없으면 id는 0, 있으면 리스트의 길이로 설정
      let id= 0;
      if( state.todolist.length > 0){
        id = state.todolist.length;
      }
      let todo = { id: id, text: action.payload.input, type:action.payload.type};
      // 리스트에 새로운 요소를 추가
      state.todolist.push(todo);
    },
    DELETE: (state, action)=>{
      //리스트에서 특정 요소 제거
      //배열의 filter함수 사용
      //filter함수: 배열의 요소를 순회하면서 조건을 만족하지 않는 요소는 제거
      // filter 함수는  
      let filterList = state.todolist.filter((todo)=>{
        if(todo.id !== action.payload){
          return true;
        }
      });

      //state 중에서 리스트를 필터링된 리스트로 교체
      state.todolist = filterList;
    }
  }
});

//2.슬라이스를 모아서 스토어 생성
//각 슬라이스의 이름과 리듀서 함수 정의
const store = configureStore({
  reducer: {
    //슬라이스이름: 리듀서함수
    todo: todoSlice.reducer
  }
});

function App() {

  return (
    <div>
      <h3>가계부</h3>
      {/* Provider로 앱에 스토어 주입 */}
      <Provider store={store}>
        <Todo></Todo>
      </Provider>
    </div>
  );
}

export default App;
