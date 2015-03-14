#React-table-acula

##Examples

[Complex Table](http://maxwellhealth.github.io/react-table-acula/example/example.html) - The configuration for this table is listed below it has custom formatters, search, paging, sorting and custom react components.

[Using Backbone](http://maxwellhealth.github.io/react-table-acula/example/backbone-example.html) - Uses a Backbone view for its base but is a much simpler example. 

##Components:
* [Table](#table)
* [Pagination](#pagination)
* [PageableTable](#pageabletable)
* [SearchablePageableTable](#searchablepageabletable)

A complete rethink of [Backbone-React-UI](https://github.com/securingsincity/backbone-react-ui)

#Install

`npm install react-table-acula --save`

#Usage

The table components are driven by a collection and a configuration.


##Config

A sample config would look like this:

```javascript
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
  'City' : {
    field: 'address.city',
    display: 'string'
  },
  'State' : {
    field: 'address.state',
    display: 'string'
  },
  'Messages' : {
    field: 'messages',
    display: 'list'
  },
  'Custom' : {
    field: 'address.state',
    display: 'custom',
    format: function(field) {
      return field.toLowerCase();
    }
  },
  'RCL' : {
    display: 'react',
    component:  React.createClass({
        render: function() {
          return (
            <div className="class">
              <ol>
                <li>{this.props.model.first_name}</li>
                <li>{this.props.model.last_name}</li>
                <li>{this.props.model.address.city}</li>
              </ol>
            </div>
          );
        }
      });
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
```
* The key of the object is the displayed header name
* Strings  - display a field as text.
* Lists - will loop over an array and display the value as a string in an unordered list
* Buttons - Display a button. contain an action which add that field as a class assigned to that cell. Additional classes can be added through the "classes" field. Additionally you can add a glyphicon.
* Custom - pass in a function that takes the field as a parameter and then you would format that column as needed. Great for formatting dates.
* React - Pass in a custom react component. The row is passed in as a prop called model into this custom react component.
* Strings, Custom and Lists can use dot access to access a nested object like `address.city` for example.


##Callbacks

Callbacks are a necessary evil to making this all work.

All of them are required in this case. But it allows for some flexibility in this library.

As you implment you decide how you want search, or pagination work, server or client. Just pass the new values into the props of the react component and it'll rerender.


#Props

##Table

|Prop|Type| Required|
|-----|----|--------|
|collection|array| true|
|columns|object| true|
|sortingCallback|function| true|
|sortOrder|number| false|
|sortKey|string| false|
|striped|bool| false|
|bordered|bool| false|
|condensed|bool| false|
|hover|bool| false|

##Pagination

|Prop|Type| Required|
|-----|----|--------|
|totalPages|number| true|
|currentPage|number| true|
|nextPageCallback|function| true|
|pageCallback|function| true|
|nextPageCallback|function| true|
|maximumPages|number| false|

##PageableTable

Contains all of the props of the paginator and the table

##SearchablePageableTable

Contains all of the props of the paginator and the table as well as the following:

|Prop|Type| Required|
|-----|----|--------|
|searchCallback|function| true|
|searchResetCallback|function| true|
