/** @jsx React.DOM */
var React = require('react/addons');
var PageableTable = require('./PageableTable.jsx');
var Search = require('./Search.jsx');

module.exports = React.createClass({
  displayName: 'SearchablePageableTable',
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
        <Search
          searchCallback={this.props.searchCallback}
          searchResetCallback={this.props.searchResetCallback}
        />
        <PageableTable {...this.props} maximumPages={maximumPages}/>
     </div>);
  }
});
