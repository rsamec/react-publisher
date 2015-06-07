import React from 'react';
import BindToMixin from 'react-binding';

import {Menu,MainButton,ChildButton} from 'react-mfb';
import {Modal,ModalTrigger,Button} from 'react-bootstrap';

//business-rules-engine
import FormSchema from 'business-rules-engine/commonjs/FormSchema';
import {HtmlPagesRenderer,BootstrapPublisher} from 'react-page-renderer';
import WidgetFactory from 'react-designer-widgets';
import formService from '../services/formService.js';

import _ from 'underscore';
import ReactBootstrap from 'react-bootstrap';

//get print widgets
var widgets = new WidgetFactory().getWidgets();

//set external widgets with more controls
_.each(['Input','Button', 'Panel','Glyphicon','Tooltip','Alert','Label'],function(widgetName){
    var name = 'ReactBootstrap.' + widgetName;
    widgets[name] = ReactBootstrap[widgetName];
});

widgets['ChartistGraph'] = require('react-chartist');
widgets['react-inlinesvg'] = require('react-inlinesvg');
widgets['React.Griddle'] = require('griddle-react');

let InputViewModal = React.createClass({

    render() {
        var style = {height:'70vh'};
        var schema = this.props.schema || {};
        var businessRules = schema.businessRules || {};
        var title = this.props.schema.title || 'Unknown title';
        return (
            <Modal {...this.props} bsSize="large" title={title} animation={false}>
                <div className='modal-body modal-input'>
                    <BootstrapPublisher widgets={widgets} schema={schema} rules={businessRules} dataContext={this.props.dataContext} />
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
            loaded: false,
            data :{}
        }
    },
    componentDidMount() {
        var name = this.context.router.getCurrentParams().name;
        formService.getSchema(name).then(
            function (schema) {
                if (this.isMounted()) {
                    //alert(JSON.stringify(res.body));
                    this.setState({
                        loaded: true,
                        printSchema: schema,
                        data: schema.data || {}
                    });
                }
            }.bind(this),
            function (err) {
                console.log(error)
            });

        formService.getSchema(name + "_Input").then(
            function (schema) {
                if (this.isMounted()) {
                    //alert(JSON.stringify(res.body));
                    this.setState({
                        inputSchema: schema,
                        rules: new FormSchema.JsonSchemaRuleFactory(schema.businessRules || {}).CreateRule("Main")
                    })
                }
            }.bind(this),
            function (err) {
                //console.log(error)
            });
    },
    print(){window.print()},
    pdf(){
        var url = '';//http://localhost:8080';
        var name = this.context.router.getCurrentParams().name;

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", url + '/print/' + name);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.responseType = 'arraybuffer';

        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var blob = new Blob([xmlhttp.response], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(blob);
                window.open(fileURL);
            }
        };
        xmlhttp.send(JSON.stringify(this.state.data));
    },
    render() {

        if (!this.state.loaded) return (<div>Loading ...</div>);
        var printSchema = this.state.printSchema;
        var dataContext = this.bindToState('data');

        // mfb menu defaults
        var effect = 'zoomin',
            pos = 'br',
            method = 'hover';

        var errors = this.state.rules !== undefined?this.state.rules.Validate(this.state.data):undefined;
        var hasErrors = errors !== undefined?errors.HasErrors:false;


        return (<div className='printView'>
            <Menu effect={effect} method={method} position={pos}>
                <MainButton iconResting="ion-plus-round" iconActive="ion-close-round" />
                    <ChildButton
                        icon="ion-printer"
                        label="Print document"
                        onClick={this.print}
                    />
                <ModalTrigger modal={<InputViewModal schema={this.state.inputSchema} dataContext={dataContext} />}>
                    <ChildButton
                        icon="ion-compose"
                        label="Fill in data"
                    />
                </ModalTrigger>
                    <ChildButton
                        icon="ion-share"
                        label="Export to PDF"
                        onClick={this.pdf}
                    />
            </Menu>
            <div id="preview">
                <HtmlPagesRenderer  widgets={widgets} schema={printSchema} data={this.state.data} dataContext={dataContext} errors={errors} errorFlag={hasErrors} />
            </div>
        </div>);
    }
});

export default PrintView;
