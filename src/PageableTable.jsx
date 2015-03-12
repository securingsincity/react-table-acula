/** @jsx React.DOM */
var React = require('react/addons');
var Table = require('./Table.jsx');
var Pagination = require('./Pagination.jsx');


module.exports = React.createClass({
  displayName: 'PageableTable',
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
          {...this.props}

          />
        <Pagination
        {...this.props}
        maximumPages={maximumPages}
        />
     </div>);
  }
});
