import {LOAD_List, LOAD_TASKLIST_SUCCESS, LOAD_TASKLIST_ERROR, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, UPDATE_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes';
import axios from 'axios';


// 加载
export const loadingTListAction =(loading) => ({
    type: LOAD_List,
    loading
});

// 获取数据成功
export const ListSuccessAction =(data) =>({
	type: LOAD_TASKLIST_SUCCESS,
	data
});

// 获取数据失败
export const ListErrorAction =(error) =>({
	type: LOAD_TASKLIST_ERROR,
	error
});

// 获取
export const getInputChangeAction =(value) =>({
    type: CHANGE_INPUT_VALUE,
    value
});

// 添加
export const getAddItemAction =() =>({
    type: ADD_TODO_ITEM,
});

// 完成
export const getUpdateItemAction =(item) =>({
    type:  UPDATE_TODO_ITEM,
    item
});

// 删除
export const getDeleteItemAction =(item) =>({
    type:  DELETE_TODO_ITEM,
    item
});


// axios请求
export const getTodoList = ()=>{
    return (dispatch)=>{
        dispatch(loadingTListAction(true));
        axios.get('./data/List.json')
        .then((res)=>{
            dispatch(loadingTListAction(false));
            dispatch(ListSuccessAction(res.data.result.list));
        })
        .catch((error) =>{
            console.log(error);
			dispatch(loadingTListAction(false));
			dispatch(ListErrorAction(true));
        });
    }
}

