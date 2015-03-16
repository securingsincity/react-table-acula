/** @jsx React.DOM */
jest.dontMock('../src/Pagination.jsx');
jest.dontMock('react/addons');
jest.dontMock('lodash');
jest.dontMock('dot-component');
var React = require('react/addons');
var _ = require('lodash');
var Pagination = require('../src/Pagination.jsx');
var TestUtils = React.addons.TestUtils;


var tests = [
  {
    page: 5,
    currentPage: 1,
    maximumPage: 6,
    expectedText:'«12345»'
  },
  {
    page: 5,
    currentPage: 1,
    expectedText:'«12345»'
  },
  {
    page: 10,
    currentPage: 1,
    expectedText:'«12345678910»'
  },
  {
    page: 20,
    currentPage: 1,
    expectedText:'«123456…20»'
  },
  {
    page: 20,
    currentPage: 18,
    expectedText:'«1…17181920»'
  },
  {
    page: 20,
    currentPage: 8,
    expectedText:'«1…789101112…20»'
  },
  {
    page: 20,
    currentPage: 20,
    expectedText:'«1…1920»'
  },
];
describe('Pagination', function() {
  _.each(tests, function(test) {
    it('should render with '+test.page+' pages', function() {
      var nextCalled = false;
      var prevCalled = false;
      var pageCallbackCalled = '';
      nextPageCallback = function() {
        nextCalled = true;
      };
      prevPageCallback = function() {
        prevCalled = true;
      };
      pageCallback = function(value) {
        pageCallbackCalled = value;
      };
      var searchComp = (<Pagination
        nextPageCallback={nextPageCallback}
        previousPageCallback={prevPageCallback}
        pageCallback={pageCallback}
        totalPages={test.page}
        currentPage={test.currentPage}
        maximumPages={test.maximumPage ? test.maximumPage : 5}/>
      );
      var DOM = TestUtils.renderIntoDocument(searchComp);
      expect(DOM.getDOMNode().textContent).toBe(test.expectedText);

      if (test.currentPage > 1) {
        React.addons.TestUtils.Simulate.click(DOM.refs.prevPage);
        expect(prevCalled).toBe(true);
      }
      if (test.page > test.currentPage) {
        React.addons.TestUtils.Simulate.click(DOM.refs.nextPage);
        expect(nextCalled).toBe(true);
      }
      if (test.currentPage < 3) {
        var page2 = DOM.getDOMNode().querySelector('a[data-page="2"]');
        React.addons.TestUtils.Simulate.click(page2);
      }
      // /expect(pageCallbackCalled).toBe(2);
    });
  });
});