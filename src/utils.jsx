import React from 'react';
import PropTypes from 'prop-types';
import { Input as ReactstrapInput } from 'reactstrap';
import { BreadcrumbItem, FormGroup, Label } from 'reactstrap';
import { Input } from './Forms';

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
  let key = Helpers.getNewKey();
  switch(Type){
    case 'BreadcrumbItem':
      return (<BreadcrumbItem key={key} {...attributes}>{value}</BreadcrumbItem>);
    case 'radio':
      return (<FormGroup check key={key}>
                <Label check>
                  <Input
                    type="radio"
                    key={key}
                    value={value}
                    {...attributes} />
                  {value}
                </Label>
              </FormGroup>);
    case 'option':
      return (<option
                key={key}
                value={value}
                {...attributes}>
                  {label}
              </option>);
    default:
      return (<Type
                key={key}
                {...attributes}>
                  {value}
              </Type>);
  }
}

//Example: {renderGenericChildren({collection: ['Profile', 'Personal'], type: 'BreadcrumbItem', conditional: {index: 1, attributes: 'active'}})}

export const renderGenericChildren = (options)=>{
  let list = [];
  let valueMethod = options.valueMethod;
  let labelMethod = options.labelMethod;
  let children = options.collection || [];
  let type = options.type;
  let childAttributes = options.childAttributes || {};
  let conditional = options.conditional || {index: -1, searchValue: '', attributes: {}};

  children.map((child, index) => {
    let value = child;
    let label = child;
    if(typeof(child) == 'object' && labelMethod != null && valueMethod != null){
      value = child[valueMethod];
      label = child[labelMethod];
    }
    let childAttr = {};
    Helpers.mergeAttributes(childAttr, childAttributes);
    // If, attributes need to be update on some specific child
    if(conditional.index == index || conditional.searchValue == value){
      Helpers.mergeAttributes(childAttr, conditional.attributes);
      console.log(childAttr.selected);
    }
    let ChildItem = GenericComponent(type, child, label, childAttr);
    list.push(ChildItem);
  })
  return list;
}

