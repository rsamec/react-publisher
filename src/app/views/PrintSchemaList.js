import React from 'react';
import {Link} from 'react-router';
import {Accordion,Panel,Button,ListGroup,ListGroupItem} from 'react-bootstrap';
import Flipper from '../components/Flipper.js';

var list = [
    {
        name: 'Contracts',
        items: [
            {name: 'EmployeeContract', label: 'Employee contract', input: true},
            {name: 'ServiceContract', label: 'Service contract', input: true},
            {name: 'SimpleInvoice', label: 'Simple invoice', input: true},
            {name: 'ParagraphGuide', label: 'Paragraph guide', input: false},
            {name: 'EmployeeContract', label: 'Employee contract', input: true},
            {name: 'ServiceContract', label: 'Service contract', input: true},
            {name: 'EmployeeContract', label: 'Employee contract', input: true},
            {name: 'ServiceContract', label: 'Service contract', input: true},
            {name: 'EmployeeContract', label: 'Employee contract', input: true},
            {name: 'ServiceContract', label: 'Service contract', input: true},
            {name: 'EmployeeContract', label: 'Employee contract', input: true},
            {name: 'ServiceContract', label: 'Service contract', input: true}
        ]
    },
    {
        name: 'Invoices',
        items: [
            {name: 'SimpleInvoice', label: 'Simple invoice', input: true},
            {name: 'ColorInvoice', label: 'Color invoice', input: true}
        ]
    },
    {
        name: 'Guides',
        items: [
            {name: 'ReactDesignerGuide', label: 'React designer guide', input: false},
            {name: 'CookingGuide', label: 'Cooking guide', input: false},
            {name: 'ParagraphGuide', label: 'Paragraph guide', input: false}
        ]
    }
];

let Tile = React.createClass({
    componentDidMount() {
        //request.get('assets/schemas/' + this.props.params.name + '.json')
        //    .end(function (err, res) {
        //        if (res.ok) {
        //            if (this.isMounted()) {
        //                //alert(JSON.stringify(res.body));
        //                var schema = res.body;
        //                this.setState({
        //                    loaded: true,
        //                    printSchema: schema,
        //                    data: schema.data || {}
        //                });
        //            }
        //        } else {
        //            //alert('Oh no! error ' + res.text);
        //        }
        //    }.bind(this));

    },
    render() {
        var src = '/assets/images/' + this.props.params.name + '.png';

        return (

            <div className='tile-content'>
                <Link to="printView" params={this.props.params}>
                    <div>{this.props.title}</div>
                    <img src={src} />
                </Link>
            </div>

        );
    }
});

let PrintSchemaList = React.createClass({
    render() {

        var header = function (name, count) {
            return (<h3>{name}
                <span className='badge'>{count}</span>
            </h3>);
        };

        return (
            <div>
                <Accordion className='group-list' defaultActiveKey={0}>
            {list.map(function (node, i) {
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

export default PrintSchemaList;
