import  React from 'react';

let SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function () {
        return (
            <div class="input-group">
                <input type="text" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} class="form-control" placeholder="Search for..." />
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" onClick={this.handleChange}>Go!</button>
                </span>
            </div>
        );
    }
});

export default SearchBar;
