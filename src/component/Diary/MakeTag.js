import React, { Component } from 'react';
import { MultiSelect } from 'react-selectize';

export default class MakeTag extends Component {
  render() {

    var obj = this.props.tag;
    if (obj.length && !obj[0].label) {
      obj = this.props.tag.map(text => {
        return { label: text, value: text };
      });
    }

    return (

      < MultiSelect
        values={obj}


        // delimtiers :: [KeyCode]
        delimiters={[188, 32]}
        // valuesFromPaste :: [Item] -> [Item] -> String -> [Item]
        valuesFromPaste={function(options, values, pastedText) {
          return pastedText
            .split(',')
            .filter(function(text) {
              var labels = values.map(function(item) {
                return item.label;
              });
              return labels.indexOf(text) == -1;
            })
            .map(function(text) {
              return { label: text, value: text };
            });
        }}
        // restoreOnBackspace :: Item -> String
        restoreOnBackspace={function(item) {
          return item.label;
        }}
        // onValuesChange :: [Item] -> (a -> Void) -> Void
        onValuesChange={this.props.func}
        // createFromSearch :: [Item] -> [Item] -> String -> Item?
        createFromSearch={function(options, values, search) {
          let labels = values.map(function(value) {
            return value.label;
          });
          if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1)
            return null;
          return { label: search.trim(), value: search.trim() };
        }}
        // renderNoResultsFound :: [Item] -> String -> ReactElement
        renderNoResultsFound={function(values, search) {
          return (
            <div className="no-results-found">
              {(function() {
                if (search.trim().length == 0)
                  return 'Type a few characters to create a tag';
                else if (
                  values
                    .map(function(item) {
                      return item.label;
                    })
                    .indexOf(search.trim()) != -1
                )
                  return 'Tag already exists';
              })()}
            </div>
          );
        }}
      />
    );
  }
}
