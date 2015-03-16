/** @jsx React.DOM */
jest.dontMock('../src/Table.jsx');
jest.dontMock('react/addons');
jest.dontMock('lodash');
jest.dontMock('dot-component');
var React = require('react/addons');
var _ = require('lodash');
var Table = require('../src/Table.jsx');
var TestUtils = React.addons.TestUtils;

var collection = [
  {foo: 'James', bar: 'Hrisho', baz: ['foo','bar','baz']},
  {foo: 'George', bar: 'Costanza', baz: ['foo','bar','baz']},
  {foo: 'Jerry', bar: 'Seinfeld', baz: ['foo','bar','baz']}
];

describe('Table',function() {
  it('should render', function() {
    var columns = {
      'Foo' : {
        field: 'foo',
        sortable: true,
        display: 'string'
      },
      'Bar' : {
        field: 'bar',
        display: 'string'
      }
    };
    var called = false;
    var sort = function(){
      called = true;
    };
    var table = <Table
      columns={columns}
      collection={collection}
      sortingCallback={sort}
      // sortOrder={1}
      sortKey={'foo'}/>;
    var DOM = TestUtils.renderIntoDocument(table);
    var renderedRows = TestUtils.scryRenderedDOMComponentsWithTag(DOM,'tr');
    // should be 2
    expect(renderedRows.length).toEqual(3);
    _.each(renderedRows, function(row,index) {
      var columns = TestUtils.scryRenderedDOMComponentsWithTag(row,'td');
      expect(columns.length).toEqual(2);
      expect(row.getDOMNode().textContent).toEqual(collection[index].foo + collection[index].bar)
    });
    //
    var renderedHead = TestUtils.scryRenderedDOMComponentsWithTag(DOM,'th');
    expect(renderedHead.length).toEqual(2);
    TestUtils.Simulate.click(renderedHead[0].getDOMNode());
    expect(called).toBeTruthy();
    TestUtils.Simulate.click(renderedHead[0].getDOMNode());
        var table = <Table
      columns={columns}
      collection={collection}
      sortingCallback={sort}
      sortOrder={1}
      sortKey={'foo'}/>;
    var DOM = TestUtils.renderIntoDocument(table);
  });

  it('should render with custom format', function() {
    var columns = {
      'Foo' : {
        field: 'foo',
        display: 'custom',
        format: function(field) {
          return field.toUpperCase();
        }
      },
      'Bar' : {
        field: 'bar',
        display: 'react',
        component: React.createClass({
          render: function() {
            return (
              <span>{this.props.model.bar.toLowerCase()}</span>
            );
          }
        })
      }
    };

    var table = <Table
      columns={columns}
      collection={collection}
      sortingCallback={function(){}}
      sortKey={'foo'}
      sortOrder={1}/>;
    var DOM = TestUtils.renderIntoDocument(table);
    var renderedRows = TestUtils.scryRenderedDOMComponentsWithTag(DOM,'tr');
    _.each(renderedRows, function(row,index) {
      var columns = TestUtils.scryRenderedDOMComponentsWithTag(row,'td');
      expect(row.getDOMNode().textContent).toEqual(collection[index].foo.toUpperCase() + collection[index].bar.toLowerCase())
    });
  });
  it('should render list and icon', function() {
    var columns = {
      'Foo' : {
        field: 'baz',
        display: 'list'
      },
      'Bar' : {
        display: 'button',
        icon: 'glyphicon-remove'
      },
      'Baz' : {
        display: 'button'
      }
    };

    var table = <Table
      columns={columns}
      collection={collection}
      sortingCallback={function(){}}
      sortKey={'foo'}
      sortOrder={1}/>;
    var DOM = TestUtils.renderIntoDocument(table);
    var renderedRows = TestUtils.scryRenderedDOMComponentsWithTag(DOM,'tr');
    _.each(renderedRows, function(row,index) {
      var columns = TestUtils.scryRenderedDOMComponentsWithTag(row,'td');
      expect(row.getDOMNode().textContent).toEqual('foobarbaz' + ' Bar'+ ' Baz')
    });
  });
});