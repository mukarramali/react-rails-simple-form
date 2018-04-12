import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactstrapInput } from 'reactstrap';
import { BreadcrumbItem, FormGroup, Label } from 'reactstrap';
import { Input } from './forms';

export const formHash = (parent, child)=>{
  return parent + '['+child+']';
}

var keyIndex = 0

function getNewKey(){
  keyIndex++;
  return keyIndex;
}

function mergeAttributes(obj, src) {
  for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
  }
  return obj;
}


export const InputTag = props => <ReactstrapInput {...props} />

export const nameWithContext = (Lower, prop = "name") => {
  const getDisplayName = component =>
    component.displayName || component.name || "Component"

  const buildInputName = (namespaces, name = "") =>
    [...namespaces, name]
      .map((field, index) => (index === 0 ? field : `[${field}]`))
      .join("")

  const higher = (props, context) => {
    const replacedProp = buildInputName(
      context.railsFormNamespaces,
      props[prop]
    )
    const replacedProps = Object.assign({}, props, { [prop]: replacedProp })
    return <Lower {...replacedProps} />
  }
  higher.displayName = getDisplayName(Lower).replace(/Tag$/, "")
  higher.contextTypes = {
    railsFormNamespaces: PropTypes.arrayOf(PropTypes.string),
  }
  return higher
}

const renderGenericComponent = (Type, value, label, attributes) => {
  let key = getNewKey();
  switch(Type){
    case 'BreadcrumbItem':
      return (<BreadcrumbItem key={key} {...attributes}>{value}</BreadcrumbItem>);
    case 'radio':
      return (<FormGroup check key={key}>
                <Label check>
                  <Input type="radio" key={key} {...attributes}/>
                  {value}
                </Label>
              </FormGroup>);
    case 'option':
      return (<option key={key} value={value} {...attributes}>{label}</option>);
    default:
      return (<Type key={key} {...attributes}>{value}</Type>);
  }
}

//Example: {renderGenericChildren({collection: ['Profile', 'Personal'], type: 'BreadcrumbItem', conditional: {index: 1, attributes: 'active'}})}

export const renderGenericChildren = (options)=>{
  let list = [];
  let value_method = options.value_method;
  let label_method = options.label_method;
  let children = options.collection || [];
  let type = options.type;
  let childAttributes = options.childAttributes != undefined ? options.childAttributes : {};
  let conditional = options.conditional != undefined ? options.conditional : {index: -1, searchValue: '', attributes: {}};

  children.map((child, index) => {
    let value = child;
    let label = child;
    if(typeof(child) == 'object' && label_method != null && value_method != null){
      value = child[value_method];
      label = child[label_method];
    }
    // If, attributes need to be update on some specific child
    if(conditional.index == index || conditional.searchValue == value){
      childAttributes = mergeAttributes(childAttributes, conditional.attributes);
    }
    let ChildItem = renderGenericComponent(type, child, label, childAttributes);
    list.push(ChildItem);
  })
  return list;
}

