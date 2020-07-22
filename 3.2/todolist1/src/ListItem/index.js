import React,{ Component } from 'react';
import './index.css';

// 列表的li
class ListItem extends Component {  
    
    constructor( props) {
       super(props);

       this.handleDeleteItem = this.handleDeleteItem.bind(this);
       this.handleUpdateItem = this.handleUpdateItem.bind(this);
    }
    // 列表的复选框
    handleUpdateItem(){
        var status = !this.props.item.status;
        var Item = {
            id: this.props.item.id,
            name: this.props.item.name,
            status: status
         };
        this.props.handleUpdate(Item);
    }

    // 列表的删除
    handleDeleteItem(){
        this.props.handleDelete(this.props.item);
    }

    render(){
        const item = this.props.item;
        const unfinish = {
			backgroundColor: '#ffff'	
		};
		const finish = {
			backgroundColor: '#E0F0D6',
			color: '#4F6D4B',
            textDecorationLine:'line-through',
            textDecorationStyle:'solid'
        };
        const itemStyle = item.status ? finish : unfinish;

        return (
            <li key = {item.id} style={itemStyle}>
                <input 
                    type="checkbox" 
                    className="check-btn"
                    id={item.id}
                    readOnly={true} 
                    checked = {item.status ? "checked": ""}
                    onClick={this.handleUpdateItem} 
                />
                <span>{item.name}</span>
                <span onClick={this.handleDeleteItem} className="delete-btn">删除</span>
            </li>
        )
    }
 
}


export default ListItem;