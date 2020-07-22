import React,{ Component } from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import SubmitDialog from './SubmitDialog';
import { getTodoList, getInputChangeAction, getAddItemAction, getUpdateItemAction, getDeleteItemAction } from './store/actionCreators';
import './TodoList.css';

class TodoList extends Component {    
    // 统计
    getFinished(){
        let sum = 0;
        this.props.list.forEach((item, index) => {
            if( item.status ){
                sum++;
            }
        })
        return sum;
    }

    render(){
        const { loading, error, list, handleUpdate, handleDelete, inputValue, InputChangeValue, handleClick } = this.props;
        if ( loading ) {
            return (
                <div className = "container">
                <h1><b>React Todo</b></h1>
                  <p><b>加载中...</b></p>
               
            </div>
            )
        }
        if (error) {
            return (
                <div className = "container">
                <h1><b>React Todo</b></h1>
                  <p><b>error!</b></p>
               
            </div>
            )
        }
        if(list){
            const todoFinish = this.getFinished();
            return (
                <div className = "container">
                    <h1><b>React Todo</b></h1>
                    <ul>
                      {
                        list.map( (item,index) =>
                            <ListItem
                               item = {item}
                               key = {index}
                               handleUpdate = {handleUpdate}
                               handleDelete = {handleDelete}
                            />
                        )}
                        <li>{ todoFinish }&nbsp;已完成&nbsp;/&nbsp;{list.length }总数</li>
                    </ul>
                    <SubmitDialog  
                       list = { list }
                       inputValue = { inputValue } 
                       InputChangeValue = { InputChangeValue }
                       handleClick = { handleClick }
                    />
                </div>
            )
        }
    }

    // 发送ajax，获取数据，渲染
    componentDidMount(){
        this.props.loadItemList();
    }
  
}

//把store数据挂载到props上
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        inputValue: state.inputValue,
	    list: state.list
    }
}

//把store.dispatch方法(映射)挂载到props上 
const mapDispatchToProps = (dispath) =>{
    return {
        // 请求数据，渲染
        loadItemList(){
            const action = getTodoList();
            dispath(action);
        },
         // 获取value值
        InputChangeValue(e){
            const action = getInputChangeAction(e.target.value);
            dispath(action);
        },
         // 按钮提交（添加
        handleClick(){
            const action = getAddItemAction();
            dispath(action);
        },
        //完成任务
        handleUpdate(item){
            const action = getUpdateItemAction(item);
            dispath(action);
        },
        //删除
        handleDelete(item){
            const action = getDeleteItemAction(item);
            dispath(action);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);