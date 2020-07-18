import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
export default combineReducers({
    tasks,//tasks:tasks
    isDisplayForm,
    itemEditing,
    filterTable
});