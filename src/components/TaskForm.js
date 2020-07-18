import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'
import '../App.css';
class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    //Bất đồng bộ Synchronous và Asynchronous 
    UNSAFE_componentWillMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        if (nextProps && nextProps.isDisplayForm) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            })
        } else {
            this.onClear();
        }
    }



    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id ? 'Update công việc' : 'Thêm Công Việc'}
                        <span className="fa fa-times-circle text-right padding195" onClick={this.onCloseForm}></span>
                    </h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" onChange={this.onChange} value={this.state.name} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" >Lưu lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

//Chuyển các state trên store thành props
const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}
// Dispatch thành props để thực thi 1 action
//Chuyển action lên reducer thực thi
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        // Đóng form
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)