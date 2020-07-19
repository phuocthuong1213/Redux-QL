import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import *  as actions from './actions/index'


//Truyền dữ liệu từ cha vào con thì dung props function
class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'name',
            sortValue: 1
        }
        //this.isDisplayForm = this.setState.bind(this);
    }

    onToggleForm = () => {
        var { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
            this.props.onClearTask({
                id: '',
                name: '',
                status: false
            });
        }

        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        var index = this.findIndex(data.id);
        tasks[index] = data;
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    
    render() {
        //Tương tự var isDisplayForm = this.state.isDisplayForm
        var { isDisplayForm } = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    {/* form Thêm công việc */}
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/* <TaskForm /> */}
                        <TaskForm
                            onSubmit={this.onSubmit}
                        />
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>

                        <div className="row mt-15">
                            <Control />
                        </div>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task))
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)