import React, {Component, PropTypes} from 'react';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const options = {
  blockRenderers: {
    unstyled: (block) => `<div>${block.getText() || '<br />'}</div>`
  }
};

export default class DraftHtml extends Component {
  static propTypes = {
    raw: PropTypes.object
  };

  shouldComponentUpdate (nextProps) {
    return this.props.raw !== nextProps.raw;
  }

  render () {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.props.raw &&
            typeof this.props.raw === 'object' &&
            stateToHTML(convertFromRaw(
              this.props.raw
            ), options)
        }}
      />
    );
  }
}
