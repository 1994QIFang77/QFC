import { LOAD_List, LOAD_TASKLIST_SUCCESS, LOAD_TASKLIST_ERROR, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, UPDATE_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes';

const defaultState = {
    loading: false,
    error: false,
    inputValue: '',
    list: []
}

// 笔记本，记录一些对数据的操作，数据存储内容
export default (state = defaultState, action) => {
    switch (action.type) {

        case LOAD_List: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.loading = action.loading;
            return newState;
        }

        //成功
        case LOAD_TASKLIST_SUCCESS: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = action.data;
            return newState;
        }

        //错误
        case LOAD_TASKLIST_ERROR: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.error = action.error;
            return newState;
        }

        //获取
        case CHANGE_INPUT_VALUE: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.inputValue = action.value;
            return newState;
        }
        //添加
        case ADD_TODO_ITEM: {
            const newState = JSON.parse(JSON.stringify(state));
            let len = newState.list.length;
            let index = len > 0 ? len - 1 : 0;
            let lastListId = index !== 0 ? newState.list[index].id : 0;
            newState.list.push({
                id: (lastListId-0) + 1+'',
                name: newState.inputValue,
                status: false
            });
            newState.inputValue = '';
            return newState;
        }
        //完成
        case UPDATE_TODO_ITEM: {
            const newState = JSON.parse(JSON.stringify(state));
            const index = newState.list.indexOf(
                newState.list.find(item =>
                    item.id === action.item.id));
            newState.list[index].status = !newState.list[index].status;
            return newState;
        }
        //删除
        case DELETE_TODO_ITEM: {
            const newState = JSON.parse(JSON.stringify(state));
            const index = newState.list.indexOf(
                newState.list.find(item =>
                    item.id === action.item.id));
            newState.list.splice(index, 1);
            return newState;
        }

        default: {
            return state;
        }
    }
}