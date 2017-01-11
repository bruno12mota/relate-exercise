import {Editor, EditorState, RichUtils, convertFromRaw} from 'draft-js';
import React, {Component, PropTypes} from 'react';

import BlockStyles from './block-styles';
import InlineStyles from './inline-styles';
import Typography from 'components/typography';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './index.less';

export default class EditorComponent extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  @bind
  toggleBlockType (blockType) {
    const {onChange, value} = this.props;
    onChange(
      RichUtils.toggleBlockType(
        value,
        blockType
      )
    );
  }

  @bind
  toggleInlineStyle (inlineStyle) {
    const {onChange, value} = this.props;
    onChange(
      RichUtils.toggleInlineStyle(
        value,
        inlineStyle
      )
    );
  }

  @bind
  focus () {
    if (this.editor) {
      this.editor.focus();
    }
  }

  render () {
    const {value, onChange} = this.props;

    const editorState = value instanceof EditorState ? value : EditorState.createWithContent(
      convertFromRaw(value)
    );

    const hasFocus = editorState.getSelection().getHasFocus();
    const contentState = editorState.getCurrentContent();

    let className = cx(styles.editor, hasFocus && styles.focused);

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className = cx(className, styles.hidePlaceholder);
      }
    }

    return (
      <div>
        <BlockStyles
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyles
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <Typography className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            placeholder='Tell a story...'
            ref={(ref) => {
              this.editor = ref;
            }}
            spellCheck
          />
        </Typography>
      </div>
    );
  }
}
