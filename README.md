# react-publisher

[react-publisher](http://hand-formvalidation.rhcloud.com/publisher) is application that publishes content created by [react-designer](http://hand-formvalidation.rhcloud.com/designer).

It enables to view, fill in and preview and print documents and it enables to generate to pdf.

You can browse all example documents from [documents gallery](http://hand-formvalidation.rhcloud.com/publisher).


## Features

+   high-quality on-screen output and on-printer output
+   precise visual layout that corresponds to an existing paper version
    +   support for various output formats - html, pdf.
+   application features with comfortable user experience
    +   preview and print documents (responsive and mobile friendly)
    +   fill in data to documents
    +   supports validation using [business rules engine](https://github.com/rsamec/business-rules-engine) 
    +   generate pdf documents
    +   search and filter documents


## Basic philosophy

The basic feature is rendering of document (json format - RDOM structure) using [react](https://facebook.github.io/react/).

RDOM is object schema format that represents full description of document.

It is a simple object tree that consists of
-   __containers__ - nodes that are invisible components - usable for logical grouping of reactive parts of document (sections)
-   __boxes__ - terminal nodes (leaf) that are visible components - (react components, boxes, widgets) - it maps to props of react component

minimal RDOM example

```json
{ 
 "name": "rootContainer",
 "elementName": "ObjectSchema",
 "containers": [ 
    { 
     "name": "container",
     "elementName": "Container",
     "style": { "top": 0, "left": 0, "height": 200, "width": 740, "position": "relative" }
     "boxes": [{ 
        "name": "TextBox",
        "elementName": "TextBox",
        "style": { "top": 0, "left": 0 },
        "content": "Type your text" 
        }],
      "containers": [ ] }
    ]
}
```

The object schema tree is composed using __containers__ property as collection of children.
The __boxes__ on the other hand is a leaf collection that can not have other children.


To render in react is super simple 

```js
    createComponent: function (box) {
        var widget =widgets[box.elementName];
        if (widget === undefined) return React.DOM.span(null,'Component ' + box.elementName + ' is not register among widgets.');

        return React.createElement(widget,box, box.content!== undefined?React.DOM.span(null, box.content):undefined);
    },
    render:function(){
       {this.props.boxes.map(function (box, i) {
                var component = this.createComponent(box);
                return (
                       <div style={box.style}>
                            {component}
                       </div>
                       );
       }, this)}
    }
        
```


# Get started

Run watch task and begin to develop your React components.

```
$ npm install
```

```
$ bower install
```

```
$ gulp dev
```

```
$ gulp pro
```


# Road map

+   support for biometric signature
+   support for electronic signature
+   PDF - support PDF/A format

# Licence

MIT
Copyright (c) 2015 Roman Samec 

