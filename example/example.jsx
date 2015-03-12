/** @jsx React.DOM */
var React = require('react/addons');
var Table = require('../src/SearchablePageableTable.jsx');
$ = jQuery = global.$  = require('jquery');
global.bootstrap = require('../bower_components/bootstrap/dist/js/bootstrap');
var Backbone = require('backbone');
require('backbone.paginator');
var _ = require('lodash');


var testModel = Backbone.Model.extend();
var testCollection = Backbone.PageableCollection.extend({
  model : testModel,
  searchType: 'client',
  searchFields: [
  'first_name',
  'last_name'
  ]
});
var coll = new testCollection([], {
   mode: "client",
   comparator: function (model) {
     return model.get("last_name");
   },
   state: {
     pageSize : 20
  }
});
var sort = function (key,order) {
  coll.setSorting(key, order);
  coll.fullCollection.sort();
  render();
};
var previousPage = function () {
  coll.getPreviousPage();
  render();
};
var nextPage = function () {
  coll.getNextPage();
  render();
};

var page = function (pageNumber) {
  coll.getPage(pageNumber);
  render(coll);
};

var searchCallback = function (searchString) {
  if(coll.unfilteredCollection){
    coll.getFirstPage().fullCollection.reset(coll.unfilteredCollection.models);
  }
  var results = _.filter(coll.fullCollection.models,function(model) {
     var regexTest = new RegExp(searchString,"gi");
     var result = false;
      _.each(coll.searchFields, function(field) {
        if(regexTest.test(model.get(field))) {
          result = true;
        }
     });
     return result;
  });
  if(!coll.unfilteredCollection) {
    coll.unfilteredCollection = coll.fullCollection.clone();
  }

  coll.getFirstPage().fullCollection.reset(results);
  render();
};

var searchResetCallback = function () {
  if(coll.unfilteredCollection){
    coll.getFirstPage().fullCollection.reset(coll.unfilteredCollection.models);
    render();
  }
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

for(var i = 0; i < 1000; i++) {
  var a = new testModel({id:i+1,first_name: makeid(), last_name: makeid()});
  coll.add(a);
}

var columns = {
  'ID': {
    field: 'id',
    display: 'string',
    sortable: true
  },
  'First Name' : {
    field:'first_name',
    display: 'string',
    sortable: true
  },
  'Last Name' : {
    field: 'last_name',
    display: 'string',
    sortable: true
  },
  'Edit' : {
    action: 'edit',
    display: 'button',
    classes: 'btn-success'
  },
  'Remove' : {
    action: 'delete',
    display: 'button',
    classes: 'btn-warning',
    icon: 'glyphicon-remove'
  }
};
coll.getFirstPage();
var render = function() {
  if (!coll.state.sortKey) {
    coll.setSorting('last_name', -1);
    coll.fullCollection.sort();
  }
  React.render(<Table striped hover condensed
  columns={columns}
  collection={coll.toJSON()}
  sortingCallback={sort}
  sortKey={coll.state.sortKey}
  sortOrder={coll.state.order}
  nextPageCallback={nextPage}
  pageCallback={page}
  previousPageCallback={previousPage}
  totalPages={coll.state.totalPages}
  currentPage={coll.state.currentPage}
  searchCallback={searchCallback}
  searchResetCallback={searchResetCallback}
  />, document.getElementById("container"));

};
render(coll);
