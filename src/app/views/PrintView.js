import React from 'react';
import {HtmlPagesRenderer,PDFPagesTrigger,BootstrapPublisher} from 'react-page-renderer';
import WidgetFactory from 'react-designer-widgets';
import request from 'superagent';
import BindToMixin from 'react-binding';

import {Menu,MainButton,ChildButton} from 'react-mfb';



import {Modal,ModalTrigger,Button} from 'react-bootstrap';

//get print widgets
var widgets = new WidgetFactory().getWidgets();

//get external widgets with more controls
var _ = require('underscore');
import ReactBootstrap from 'react-bootstrap';
var bootstrapWidgets = {ReactBootstrap};
_.each(['Input','Button', 'Panel','Glyphicon','Tooltip','Alert','Label'],function(widgetName){
    var name = 'ReactBootstrap.' + widgetName;
    bootstrapWidgets[name] = ReactBootstrap[widgetName];
});


let InputViewModal = React.createClass({

    render() {
        var style = {height:'70vh'};
        var schema = this.props.schema || {};
        var businessRules = schema.businessRules || {};
        return (
            <Modal {...this.props} title='Form fields' animation={false}>
                <div style={style} className='modal-body'>
                    <BootstrapPublisher widgets={bootstrapWidgets} schema={schema} rules={businessRules} dataContext={this.props.dataContext} />
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </div>
            </Modal>
        );
    }
});
let PrintView = React.createClass({
    mixins: [BindToMixin],
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            loaded: false
        }
    },
    componentDidMount() {
        var name = this.context.router.getCurrentParams().name;
        request.get('assets/schemas/' + name + '.json')
            .end(function (err, res) {
                if (res.ok) {
                    if (this.isMounted()) {
                        //alert(JSON.stringify(res.body));
                        var schema = res.body;
                        this.setState({
                            loaded: true,
                            printSchema: schema,
                            data: schema.data || {}
                        });
                    }
                } else {
                    alert('Oh no! error ' + res.text);
                }
            }.bind(this));


        request.get('assets/schemas/' + name + '_Input.json')
            .end(function (err, res) {
                if (res.ok) {
                    if (this.isMounted()) {
                        //alert(JSON.stringify(res.body));
                        var schema = res.body;
                        this.setState({
                            inputSchema: schema
                        });
                    }
                }
            }.bind(this));

    },
    captureAndDisplay(){
        html2canvas(this.getDOMNode().children[1], {
            onrendered: function(canvas) {
                window.open(canvas.toDataURL("image/png"));
            }
        });
    },
    render() {

        if (!this.state.loaded) return (<div>Loading ...</div>);
        var printSchema = this.state.printSchema;
        var dataContext = this.bindToState('data');

        // mfb menu defaults
        var effect = 'zoomin',
            pos = 'br',
            method = 'hover';

        return (<div className='printView'>
            <Menu effect={effect} method={method} position={pos}>
                <MainButton iconResting="ion-plus-round" iconActive="ion-close-round" />
                <ModalTrigger modal={<InputViewModal schema={this.state.inputSchema} dataContext={dataContext} />}>
                    <ChildButton
                        icon="ion-compose"
                        label="Fill"
                    />
                </ModalTrigger>
                <PDFPagesTrigger schema={printSchema} data={this.state.data}>
                    <ChildButton
                        icon="ion-printer"
                        label="PDF"
                    />
                </PDFPagesTrigger>
            </Menu>
            <div id="preview">
                <HtmlPagesRenderer  widgets={widgets} schema={printSchema} dataContext={dataContext} />
            </div>
        </div>);
    }
});

export default PrintView;
