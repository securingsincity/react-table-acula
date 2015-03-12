/** @jsx React.DOM */
var React = require('react/addons');
var Table = require('./Table.jsx');
var Pagination = require('./Pagination.jsx');


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
    sortKey: React.PropTypes.string,
    sortOrder: React.PropTypes.number
  },
  render: function () {
    var maximumPages = this.props.maximumPages  ? this.props.maximumPages : 10;
    return(
      <div>
        <Table
          striped={this.props.striped}
          bordered={this.props.bordered}
          condensed={this.props.condensed}
          hover={this.props.hover}
          collection={this.props.collection}
          columns={this.props.columns}
          sortingCallback={this.props.sortingCallback}
          sortKey={this.props.sortKey}
          sortOrder={this.props.sortOrder}

          />
        <Pagination
          nextPageCallback={this.props.nextPageCallback}
          previousPageCallback={this.props.previousPageCallback}
          pageCallback={this.props.pageCallback}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          maximumPages={maximumPages}
        />
     </div>);
  }
});
