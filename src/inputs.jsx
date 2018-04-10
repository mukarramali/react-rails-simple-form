import React from 'react'
import PropTypes from 'prop-types'
import {FormFeedback, FormText, FormGroup, Label, Col} from 'reactstrap'
import { FormInput } from './forms';

const propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
};

const defaultProps = {
  formGroupAttributes: {className: 'row'},
  labelAttributes: {sm: 3},
  inputAttributes: {},
  inputSize: {sm: 9},
  hintAttributes: {color: 'muted'},
};

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  renderInput = function(props){
    let {
      type,
      name,
      value,
      isValid,
      children,
      childrenOnly,
      inputAttributes
    } = props;
    let invalidClass = isValid ? '' : 'is-invalid';
    return type=="radio" || childrenOnly ? children : (
      <FormInput type={type || 'text'} className={invalidClass} name={name} defaultValue={value} {...inputAttributes}>
        {children}
      </FormInput>);
  }

  render() {
    let {
      name,
      label,
      type,
      value,
      children,
      hint,
      formGroupAttributes,
      labelAttributes,
      inputSize,
      inputAttributes,
      hintAttributes,
      errors,
      childrenOnly,
      ...attributes
    } = this.props;
    let isValid = (errors == undefined);
    let inputOrChildren = this.renderInput({'type': type, 
                                            'name': name, 
					    'value': value, 
					    'isValid': isValid, 
					    'children': children, 
					    'childrenOnly': childrenOnly, 
					    'inputAttributes': inputAttributes});
    return (
      <FormGroup {...formGroupAttributes}>
        <Label htmlFor={name} {...labelAttributes}>{label}</Label>
        <Col {...inputSize}>
          {inputOrChildren}
          {isValid ? '' : (<FormFeedback valid={isValid}>{errors.join()}</FormFeedback>)}
          <FormText {...hintAttributes}>{hint}</FormText>
        </Col>
      </FormGroup>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;

