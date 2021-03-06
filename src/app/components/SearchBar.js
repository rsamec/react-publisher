import  React from 'react';

let SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.showInput.getDOMNode().checked
        );
    },
    render: function () {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <input type="checkbox" ref="showInput" aria-label="include input forms" onChange={this.handleChange} />
                </span>
                <input type="text" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} className="form-control" placeholder="Search for..." />
                <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                </div>
            </div>
        );
    }
});

export default SearchBar;
