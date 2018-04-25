import React from 'react'
import PropTypes from 'prop-types'
import {FormFeedback, FormText, FormGroup, Label, Col} from 'reactstrap'
import { FormInput } from './Forms';

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
  childAttributes: {},
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
      ...attributes
    } = props;
    let invalidClass = isValid ? '' : 'is-invalid';
    console.log("inputAttributes: "+Object.keys(attributes));
    return type=="radio" || childrenOnly ? children : (
      <Input type={type || 'text'} className={invalidClass} name={name} defaultValue={value} {...attributes}>
        {children}
      </Input>);
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
      hintAttributes,
      errors,
      childrenOnly,
      required,
      collection,
      conditional, //{index: 2, searchValue: profile.base.category, attributes: {selected: 'selected', value: profile.base.category}}
      childAttributes,      
      ...attributes
    } = this.props;
    let isValid = (errors == undefined);

    if(collection)
    {
      children =
        <GenericChildren
            collection={collection}
            type={GenericChildrenTypes[type] || type}
            conditional={conditional}
            childAttributes={childAttributes}/>;
    }

    let inputOrChildren = this.renderInput({'type': type,
                                            'name': name,
                                            'value': value,
                                            'isValid': isValid,
                                            'children': children,
                                            'childrenOnly': childrenOnly,
                                            ...attributes
                                          });
    return (
      <FormGroup {...formGroupAttributes}>
        <Label htmlFor={name} {...labelAttributes}>{required ? (<abbr title="required">* </abbr>) : ''}{label}</Label>
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

