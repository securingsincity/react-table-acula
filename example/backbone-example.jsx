/** @jsx React.DOM */
var React = require('react/addons');
var Table = require('../src/PageableTable.jsx');
var $  = require('jquery');
var jQuery  = $;
var Backbone = require('backbone');
Backbone.$ = $;
global.jQuery = $;
global.$ = $;
global.bootstrap = require('../bower_components/bootstrap/dist/js/bootstrap');
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

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

for(var i = 0; i < 1000; i++) {
  var a = new testModel({
    id:i+1,
    first_name: makeid(),
    last_name: makeid(),
    address: {
      state: 'New York',
      city: makeid()
    },
    messages: [
      'foo',
      'bar',
      'baz'
    ]
  });
  coll.add(a);
}


coll.getFirstPage();

var ContentModal = Backbone.View.extend({
  el: '#container',
  initialize: function(options) {
    _.bindAll(this,['previousPage','nextPage','sort','page']);
    this.columns = options.columns;
  },
  events: {
    'click .edit' : 'editButton',
    'click .delete' : 'deleteButton'
  },
  editButton: function(e) {
    console.log('edit: '+$(e.currentTarget).data('id'));
  },
  deleteButton: function(e) {
    console.log('deleteButton: '+$(e.currentTarget).data('id'));
  },

  sort: function (key,order) {
    coll.setSorting(key, order);
    coll.fullCollection.sort();
    this.render();
  },
  previousPage : function () {
    this.collection.getPreviousPage();
    this.render();
  },
  nextPage : function () {
    this.collection.getNextPage();
    this.render();
  },

  page : function (pageNumber) {
    this.collection.getPage(pageNumber);
    this.render();
  },
  template: '<div class="container"></div>',
  render: function() {
    if (!this.collection.state.sortKey) {
      this.collection.setSorting('last_name', -1);
      this.collection.fullCollection.sort();
    }
    React.render(
      <Table striped hover condensed
        columns={this.columns}
        sortingCallback={this.sort}
        collection={this.collection.toJSON()}
        sortKey={this.collection.state.sortKey}
        sortOrder={this.collection.state.order}
        nextPageCallback={this.nextPage}
        pageCallback={this.page}
        previousPageCallback={this.previousPage}
        totalPages={this.collection.state.totalPages}
        currentPage={this.collection.state.currentPage}
      />, this.el);
    return this;
  }
});
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
$(function() {
  var contentView = new ContentModal({
    collection: coll,
    columns: columns
  });
  $('body').append(contentView.render().el);
});
