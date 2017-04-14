Will update readme in a later update.

# Installation
```sh
  npm i --save settings-mixin
```

# Usage
```js
  const SettingsMixin = require('settings-mixin')

  class Base {
    constructor () {
    }
  }

  // Just wrap it around the base when extending a class.
  class ExtendedWithSettings extends SettingsMixin(Base) {
    constructor () {
      super()

      // We can now set/get settings
      this.settings = {
        'foo': 'bar'
      }
    }
  }

  let instance = new ExtendedWithSettings()

  // We can get stored settings
  console.log(instance.get('foo')) // prints 'bar'

  // We cannot find what we do not have,
  console.log(instance.get('bar')) // prints undefined

  // but we can provide a replacement if needed.
  console.log(instance.get('bar', 'baz')) // prints 'baz'

  // We can set settings from the instance too.
  instance.set('bar', 'bom')

  // It will only use the replacement when no value is found.
  console.log(instance.get('bar', 'baz')) // prints 'bom'

  // It is possible to chain, setting multiple settings in a row.
  instance.set('baz', 'foo').set('foo', 'baz')

  // It is also possible to set/get a value from a decending object.
  console.log(instance.get('path.to.value', 'no')) // prints 'no'
  
  instance.set('path.to.value', 'yes') 

  // Will get decendant 'to' of 'path'
  let to = instance.get('path.to')

  console.log(to.value) // prints 'yes'

  // All Objects stored are mutable
  to.value = 'modified'

  console.log(instance.get('path.to.value', 'no')) // prints 'modified'

  // When encountering a 'null'...
  instance.set('path.stopped', null)
  
  // when setting will not set value
  instance.set('path.stopped.here', 'or not')

  // when getting, will return null when no replacement is provided
  console.log(instance.get('path.stopped.here')) // prints null

  // but return the replacement when provided
  console.log(instance.get('path.stopped.here', 'stopped')) // prints 'stopped'

```

# License
See the [license](./LICENSE) file.