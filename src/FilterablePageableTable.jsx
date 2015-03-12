/** @jsx React.DOM */
var React = require('react/addons');
var PageableTable = require('./PageableTable.jsx');
var FilterSearch = require('./FilterSearch.jsx');

module.exports = React.createClass({
  propTypes: {
    nextPageCallback: React.PropTypes.func.isRequired,
    previousPageCallback: React.PropTypes.func.isRequired,
    pageCallback: React.PropTypes.func.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    maximumPages: React.PropTypes.number,
    collection: React.PropTypes.array.isRequired,
    columns: React.PropTypes.object.isRequired,
    sortingCallback: React.PropTypes.func.isRequired,
    searchCallback: React.PropTypes.func.isRequired,
    searchResetCallback: React.PropTypes.func.isRequired
  },
  render: function () {
    var maximumPages = this.props.maximumPages  ? this.props.maximumPages : 10;
    return(
      <div>
        <FilterSearch
          searchCallback={this.props.searchCallback}
          searchResetCallback={this.props.searchResetCallback}
        />
        <PageableTable
          striped={this.props.striped}
          bordered={this.props.bordered}
          condensed={this.props.condensed}
          hover={this.props.hover}
          collection={this.props.collection}
          columns={this.props.columns}
          sortingCallback={this.props.sortingCallback}
          nextPageCallback={this.props.nextPageCallback}
          previousPageCallback={this.props.previousPageCallback}
          pageCallback={this.props.pageCallback}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          maximumPages={maximumPages}
          sortKey={this.props.sortKey}
          sortOrder={this.props.sortOrder}
        />
     </div>);
  }
});
