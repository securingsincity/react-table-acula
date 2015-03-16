/** @jsx React.DOM */
var React = require('react/addons');


module.exports = React.createClass({
  displayName: 'Pagination',
  propTypes: {
    nextPageCallback: React.PropTypes.func.isRequired,
    previousPageCallback: React.PropTypes.func.isRequired,
    pageCallback: React.PropTypes.func.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    currentPage: React.PropTypes.number.isRequired,
    maximumPages: React.PropTypes.number
  },
  /**
   * Next page button being clicked
   */
  nextPage: function(e) {
    e.preventDefault();
    this.props.nextPageCallback(this.props.currentPage);
  },
  /**
   * Previous page button being clicked
   */
  previousPage: function(e) {
    e.preventDefault();
    this.props.previousPageCallback(this.props.currentPage);
  },
  /**
   * Change page being clicked
   * @param {Event} e Event of the page number being clicked
   */
  changePage: function(e) {
    e.preventDefault();
    var pageNumber = +e.currentTarget.getAttribute('data-field');
    this.props.pageCallback(pageNumber);
  },
  /**
   * Render function for the next page button.
   * If the current page is the last then it shouldn't render a clickable next page
   */
  renderNext: function() {
    if(this.props.currentPage < this.props.totalPages){
      return (<li><a href="javascript: void(0);" ref="nextPage" onClick={this.nextPage}>&raquo;</a></li>);
    } else {
      return (<li className="disabled"><a href="javascript: void 0;">&raquo;</a></li>);
    }
  },
  /**
   * Render functon for the pages
   * If the number of maximumPages is exceeded by the number of pages then that must be handled with an ellipsis
   * If the page is active then it should have the active class
   *
   */
  renderPages: function(){
    var pages = [];
    var starterPage = 1;
    if(this.props.currentPage >= 4) {
      starterPage = this.props.currentPage - 1;
    }
    var page = 1;
    if(this.props.maximumPages > this.props.totalPages) {
      for(page = 1; page <= this.props.totalPages; page++){
        if(page !== this.props.currentPage) {
          pages.push(<li key={page}><a href="javascript: void 0;" onClick={this.changePage} data-page={page}>{page}</a></li>);
        } else {
          pages.push(<li key={page} className="active"><a href="javascript: void 0;" >{page}</a></li>);

        }
      }
    } else {
      if(this.props.currentPage >= 4) {
        pages.push(<li key={1}><a href="javascript: void 0;" onClick={this.changePage} data-page={1} >{1}</a></li>);
        pages.push(<li  key="leftellips" className="disabled"><a href="javascript: void 0;">&hellip;</a></li>);

      }
      for(page = starterPage; page <= this.props.totalPages; ++page) {
        if((starterPage + this.props.maximumPages) < page && (page + this.props.maximumPages) < this.props.totalPages) {
          pages.push(<li key={'ellips'} className="disabled"><a href="javascript: void 0;">&hellip;</a></li>);
          pages.push(<li key={'totalpages'}><a href="javascript: void 0;" onClick={this.changePage} data-page={this.props.totalPages} className="">{this.props.totalPages}</a></li>);
          break;
        } else if (page !== this.props.currentPage){
          pages.push(<li key={page}><a href="javascript: void 0;" onClick={this.changePage} data-page={page} className="">{page}</a></li>);
        } else {
          pages.push(<li key={page} className="active"><a href="javascript: void 0;" >{page}</a></li>);

        }
      }
    }
    return pages;

  },
  /**
   * Render function for the previous page button.
   * If the current page is the first then it shouldn't render a clickable previous page
   */
  renderPrevious : function() {
    if(this.props.currentPage > 1){
      return (<li className=""><a href="javascript: void 0;"  ref="prevPage" onClick={this.previousPage}>&laquo;</a></li>);
    }else {
      return (<li className="disabled"><a href="javascript: void 0;" >&laquo;</a></li>);
    }
  },

  render: function () {
    var next = this.renderNext();
    var pages = this.renderPages();
    var previous = this.renderPrevious();
    return(
    <ul className="pagination">
      {previous}
      {pages}
      {next}
    </ul>);
  }
});
