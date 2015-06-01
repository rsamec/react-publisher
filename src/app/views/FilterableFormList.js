import React from 'react';

import SearchBar from '../components/SearchBar.js';
import FormList from '../components/FormList.js';
import formService from '../services/formService.js';

let FilterableFormList = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            showInput:false,
            schemaList:[]
        };
    },
    handleUserInput: function (filterText, showInput) {
        this.setState({
            filterText: filterText,
            showInput:showInput
        });
    },
    componentDidMount() {
        formService.getSchemaList().then(
            function (schemaList) {
                if (this.isMounted()) {
                    //alert(JSON.stringify(res.body));
                    this.setState({
                        schemaList: schemaList
                    });
                }
            }.bind(this),
            function (err) {
                console.log(error)
            });

    },
    render() {
        return (
            <div>
                <div className="container banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="banner-title center-text">
                                    <h1 >Reactive documents for everybody.</h1>
                                    <p>
                                        <SearchBar filterText={this.state.filterText} showInput={this.state.showInput}  onUserInput={this.handleUserInput} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <FormList filterText={this.state.filterText} showInput={this.state.showInput} forms={this.state.schemaList} />
            </div>
        );
    }
});


export default FilterableFormList;
