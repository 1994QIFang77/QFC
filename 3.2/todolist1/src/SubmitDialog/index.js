import React,{ Component } from 'react';
import './index.css';
import { Input } from 'antd';

// 输入框，提交
class SubmitDialog extends Component {  
    
    constructor (props) {
		super(props);

        this.handleClickItem = this.handleClickItem.bind(this);
        this.onKeyDownchange = this.onKeyDownchange.bind(this);
    }
    // 提交
    handleClickItem(){
        var value = this.props.inputValue;
        if(value!==''){
            this.props.handleClick(value);
        }
        else {
            alert("请输入任务...");
        }
    }
    // 回车提交
    onKeyDownchange(e) {
		if (e.keyCode === 13) {
            var value = this.props.inputValue;
            if(value!==''){
                this.props.handleClick(value);
            }
            else {
                alert("请输入任务...");
            }

        }
    }   
    render(){
        return (
            <div className="dialog">
                <div>
                    <h3  style={{fontWeight:"600"}}>Task</h3>
                    <Input 
                        style={{width: "80%", fontWeight:"600"}}
                        placeholder='你想做点什么' 
                        value={this.props.inputValue}
                        onChange={this.props.InputChangeValue} 
                        onKeyDown={this.onKeyDownchange}  
                    />
                </div>
                <div>
                    <button 
                        className="btn"
                        onClick={this.handleClickItem}
                    >Save Task</button>
                </div>
            </div>
        )
    }
 
}

export default SubmitDialog;