import React from 'react';
import BindToMixin from 'react-binding';

import {Menu,MainButton,ChildButton} from 'react-mfb';
import {Modal,ModalTrigger,Button} from 'react-bootstrap';

//business-rules-engine
import FormSchema from 'business-rules-engine/commonjs/FormSchema';
import {HtmlPagesRenderer,PDFPagesTrigger,BootstrapPublisher} from 'react-page-renderer';
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


let InputViewModal = React.createClass({

    render() {
        var style = {height:'70vh'};
        var schema = this.props.schema || {};
        var businessRules = schema.businessRules || {};
        var title = this.props.schema.title || 'Unknown title';
        return (
            <Modal {...this.props} bsSize="large" title={title} animation={false}>
                <div className='modal-input' className='modal-body'>
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
            loaded: false
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
                console.log(error)
            });
    },
    //captureAndDisplay(){
    //    html2canvas(this.getDOMNode().children[1], {
    //        onrendered: function(canvas) {
    //            window.open(canvas.toDataURL("image/png"));
    //        }
    //    });
    //},
    print(){window.print()},
    render() {

        if (!this.state.loaded) return (<div>Loading ...</div>);
        var printSchema = this.state.printSchema;
        var dataContext = this.bindToState('data');

        // mfb menu defaults
        var effect = 'zoomin',
            pos = 'br',
            method = 'hover';

        var hasErrors = this.state.rules !== undefined?this.state.rules.Validate(this.state.data).HasErrors:false;


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
                <PDFPagesTrigger schema={printSchema} data={this.state.data}>
                    <ChildButton
                        icon="ion-share"
                        label="Export to PDF"
                    />
                </PDFPagesTrigger>

            </Menu>
            <div id="preview">
                <HtmlPagesRenderer  widgets={widgets} schema={printSchema} dataContext={dataContext} errorFlag={hasErrors} />
            </div>
        </div>);
    }
});

export default PrintView;
