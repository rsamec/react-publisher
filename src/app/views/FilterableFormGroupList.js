import React from 'react';

import SearchBar from '../components/SearchBar.js';
import FormGroupList from '../components/FormGroupList.js';
import formService from '../services/formService.js';

let FilterableFormGroupList = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            schemaList:[]
        };
    },
    handleUserInput: function (filterText) {
        this.setState({
            filterText: filterText
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
                <div style={{margin:'10px'}}>
                    <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                </div>

                <hr />
                <FormGroupList filterText={this.state.filterText} formGroups={this.state.schemaList} />
            </div>
        );
    }
});


export default FilterableFormGroupList;
