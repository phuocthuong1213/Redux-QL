import React, { Component } from 'react';
import Search from './control/Search';
import Sort from './control/Sort';
class Control extends Component {
    render() {
        return (
            <div>
                <Search />
                <Sort />
            </div>
        );
    }
}

export default Control;