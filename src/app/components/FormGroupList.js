import  React from 'react';
import {Accordion,Panel} from 'react-bootstrap';
import _ from 'underscore';

import Tile from './Tile.js';

let FormGroupList = React.createClass({
    render() {

        var header = function (name, count) {
            return (<h3>{name}
            &nbsp;&nbsp;
                <span className='badge'>{count}</span>
            </h3>);
        };
        var filterText = this.props.filterText;
        var formGroups = this.props.formGroups;
        if (filterText !== undefined && filterText !== "") formGroups = _.filter(_.map(formGroups, function (group) {
            return {
                name: group.name, items: _.filter(group.items, function (form) {
                    return form.name.indexOf(filterText) !== -1
                })
            }
        }), function (x) {
            return x.items.length !== 0
        });

        return (
            <div>
                <Accordion className='group-list' defaultActiveKey={0}>
            {formGroups.map(function (node, i) {
                return (

                    <Panel header={header(node.name, node.items.length)}  eventKey={i} key={name + i} bsStyle='primary'>
                        <div>
                      {node.items.map(function (ctrl, j) {
                          return (<Tile title={ctrl.label} params={ctrl}></Tile>)
                      })}
                        </div>
                    </Panel>

                );
            }, this)}
                </Accordion>
            </div>
        );
    }
});

export default FormGroupList;
