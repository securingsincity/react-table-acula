var React = require('react/addons');
var _ = require('lodash');
var dot = require('dot-component');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'Table',
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    columns: React.PropTypes.object.isRequired,
    sortingCallback: React.PropTypes.func.isRequired,
    sortOrder: React.PropTypes.number,
    sortKey: React.PropTypes.string,
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool
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
    this.props.sortingCallback(e.currentTarget.getAttribute('data-field'), (sortOrder * -1));
  },
  render: function() {
    var self = this;
    var classes = classNames({
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
        var classesHead = classNames(classesObj);
        head.push(
         <th  key={columnName} className={classesHead} onClick={self.sort} data-field={column.field}> {columnName}</th>
       );
      } else {
        head.push(
          <th key={columnName}>{columnName}</th>
        );
      }

    });

    _.each(this.props.collection,function(model,index) {
       var columns = [];
       _.each(self.props.columns, function(column,columnName) {
         if (column.display === 'string') {
            columns.push(
              <td key={columnName}>{ dot.get(model,column.field) }</td>
            );
         } else if (column.display === 'custom') {
            if (column.format) {
              columns.push(<td key={columnName}>{column.format(dot.get(model,column.field))}</td>);
            }
         } else if (column.display === 'react') {
            var CustomComponent = column.component;
            columns.push(<td key={columnName}><CustomComponent model={model} /></td>);
         } else if (column.display === 'list') {
            var field = dot.get(model,column.field);
            var list = _.map(field, function(subField,index) {
              return  (<li key={index}>{subField}</li>);
            });
            columns.push(<td key={columnName}><ul>{list}</ul></td>);
         } else if (column.display === 'button') {
            var icon;
            if(column.icon) {
              icon = (<span className={"glyphicon "+column.icon}/>);
            }
            columns.push(
              <td key={columnName}><button className={'btn btn-sm '+column.classes + ' ' + column.action} data-id={model.id}>{icon} {columnName}</button></td>
            );
         }

       });
       rows.push(
         <tr key={index}>{columns}</tr>
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
