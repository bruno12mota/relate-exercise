import React, {Component, PropTypes} from 'react';

import StyleButton from './style-button';
import styles from './inline-styles.less';

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

export default class InlineStyles extends Component {
  static propTypes = {
    editorState: PropTypes.any,
    onToggle: PropTypes.func.isRequired
  };

  render () {
    const {editorState, onToggle} = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div className={styles.root}>
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}
