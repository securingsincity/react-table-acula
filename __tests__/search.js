/** @jsx React.DOM */
jest.dontMock('../src/Search.jsx');
jest.dontMock('react/addons');
jest.dontMock('lodash');

var React = require('react/addons');
var Search = require('../src/Search.jsx');
var TestUtils = React.addons.TestUtils;

describe('Search', function() {
  it('should render, take input, call a callback and clear itself', function() {
    var resetCalled = false;
    var searchCallbackCalled = '';
    searchResetCallback = function() {
      resetCalled = true;
    };
    searchCallback = function(value) {
      searchCallbackCalled = value;
    };
    var searchComp = (<Search
      searchCallback={searchCallback}
      searchResetCallback={searchResetCallback}/>
    );
    var DOM = TestUtils.renderIntoDocument(searchComp);
    var theInput = DOM.refs.theInput.getDOMNode();
    var clearInput = DOM.refs.clearInput.getDOMNode();
    expect(theInput.getAttribute('placeholder')).toBe('Search');
    theInput.value = 'Get the groceries';
    React.addons.TestUtils.Simulate.change(theInput);
    expect(searchCallbackCalled).toBe('Get the groceries');
    expect(resetCalled).toBe(false);
    React.addons.TestUtils.Simulate.click(clearInput);
    expect(resetCalled).toBe(true);
    expect(theInput.value).toBe('');
  });
});