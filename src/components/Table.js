import React, {Component} from 'react';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//Const search bar using 'react-bootstrap-table2-toolkit' component
const {SearchBar} = Search;

//Component class that renders a fully customized and responsive table using 'react-bootstrap-table2'
export class Table extends Component {
    render() {
        //Define the default sorting options (col & asc)
        const defaultSorted = [{
            dataField: this.props.sort,
            order: 'asc'
        }];
        //Define pagination options
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
            </span>
        );
        //Define the options of the table (nb of rows/pagination, etc)
        const options = {
            paginationSize: 10,
            pageStartIndex: 1,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
            firstPageText: '<<',
            prePageText: '<',
            nextPageText: '>',
            lastPageText: '>>',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '5', value: 5
            }]
        };

        //Return a custom table with a search bar
        return (
            <ToolkitProvider
                keyField={this.props.id}
                data={this.props.data}
                columns={this.props.columns}
                noDataIndication={'no results found'}
                search
            >{props => (
                <div>
                    <br/><SearchBar  {...props.searchProps}
                                     className="custom-search-field"
                                     delay={1000}
                                     placeholder={`Search ${this.props.search}`}/><br/>
                    <BootstrapTable defaultSorted={defaultSorted} {...props.baseProps}
                                    pagination={paginationFactory(options)}/>
                </div>
            )}
            </ToolkitProvider>)
    }
}
export default Table;