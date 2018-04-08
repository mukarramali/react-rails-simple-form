# react-rails-simple-form
Form Helper, enclosing fields in hash. And using Reactstrap components.

# Installation
```
npm install -g react-rails-simple-form
```

Or add to your package.json file.
```
yarn add react-rails-simple-form
```

# Usage

```javascript
import { Input, FormFor, FormTag, HashFields, ArrayFields } from 'react-rails-simple-form';
```
Input: For input types. Text, radio, select.

FormFor: To enclose each input type into a hash, which is defined in FormFor attribute 'name'.

FormTag: In rails, three hidden input fields are added for security purpose. FormTag wraps original form and add these three hidden fields

HashFields: To enclose inputs into nested hash

ArrayFields: To enclose inputs into an array


