import  React from 'react';
import _ from 'underscore';

import Tile from './Tile.js';

let FormList = React.createClass({
    render() {
        var filterText = this.props.filterText;
        var forms = this.props.forms;
        if (filterText !== undefined && filterText !== "") {
            forms = _.filter(forms, function (form) {
                return form.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
            });
        }

        return (
            <div className="document-list">
                      {forms.map(function (ctrl, j) {
                          return (<Tile title={ctrl.label} params={ctrl}></Tile>)
                      })}
            </div>
        );
    }
});

export default FormList;
