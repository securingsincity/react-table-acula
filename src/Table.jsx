/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');


module.exports = React.createClass({
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    columns: React.PropTypes.object.isRequired,
    sortingCallback: React.PropTypes.func.isRequired
  },
  /* Sort functionality for a table header
   * @param  {object} e Event object
   *
   */
  sort: function(e) {
    var sortOrder = this.props.sortOrder;
    if(!this.props.sortOrder) {
      sortOrder = 1;
    }
    this.props.sortingCallback(e.currentTarget.dataset.field, (sortOrder * -1));
  },
  render: function() {
    var self = this;
    var cx = React.addons.classSet;
    var classes = cx({
      'table': true,
      'dataTable': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    });
    var head = [];
    var rows = [];
    _.each(this.props.columns, function(column,columnName) {
      if(column.sortable) {
        var classesObj = {
          'sorting' : true
        };
        if(column.field === self.props.sortKey && self.props.sortOrder === 1) {
          classesObj.sorting_desc = true;
        } else if (column.field === self.props.sortKey){
          classesObj.sorting_asc = true;
        }
        var classesHead = cx(classesObj);
        head.push(
         <th className={classesHead} onClick={self.sort} data-field={column.field}> {columnName}</th>
       );
      } else {
        head.push(
          <th>{columnName}</th>
        );
      }

    });

    _.each(this.props.collection,function(model) {
       var columns = [];
       _.each(self.props.columns, function(column,columnName) {
         if(column.field === 'id') {
           columns.push(
            <td>{model.id}</td>
           );
         } else if(column.display === 'string') {
            columns.push(
              <td>{ model[column.field] }</td>
            );
         } else if (column.display === 'button') {
            var icon;
            if(column.icon) {
              icon = (<span className={"glyphicon "+column.icon}/>);
            }
            columns.push(
              <td><button className={'btn btn-sm '+column.classes + ' ' + column.action} data-id={model.id}>{icon} {columnName}</button></td>
            );
         }

       });
       rows.push(
         <tr>{columns}</tr>
       );
    });
    return (
      <table className={classes}>
        <thead>
          {head}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

    );
  }
});