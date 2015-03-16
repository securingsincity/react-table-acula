/** @jsx React.DOM */
var React = require('react/addons');
var classNames = require('classnames');
module.exports = React.createClass({
  displayName: 'Search',
  getInitialState: function() {
    return {
      userInput: ''
    };
  },
  propTypes: {
    searchCallback: React.PropTypes.func.isRequired,
    searchResetCallback: React.PropTypes.func.isRequired
  },
  /**
   * Search functionality on a fullCollection
   * @param  {Object or String } e Event for determining a search or a string for determining search
   *
   */
  search: function(e) {
    if(e && e.target.value && e.target.value !== '') {
      this.props.searchCallback(e.target.value);
    } else if( !e || (e.target.value === '') ) {
      this.props.searchResetCallback();
    }

  },
  /**
   * Clear search : focuses the input and empties it as well as clearling the state
   */
  clearSearch:function() {
    this.setState({userInput: ''}, function() {
      // This code executes after the component is re-rendered
      this.refs.theInput.getDOMNode().focus();   // Boom! Focused!
      this.refs.theInput.getDOMNode().value = '';
      this.search();
    });
  },
  render: function () {
    var classes = classNames({
      'form-group': true,
      'col-sm-4': true,
      'pull-right': true
    });

    return (
      <div className={classes}>
        <div className="col-sm-12">
          <label className="control-label col-sm-12">Search: </label>
        </div>
        <div className="col-sm-12">
          <div className=" col-sm-10">
            <input type="search" className="form-control " ref="theInput" defaultValue={this.state.userInput}
              placeholder="Search" onChange={this.search}/>
          </div>
          <button className="btn btn-info col-sm-2" ref="clearInput" onClick={this.clearSearch}><span className='glyphicon glyphicon-remove' /></button>
        </div>
      </div>
    );
  }
});
