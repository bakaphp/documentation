# Canvas CRUD Example

When creating CRUD for simple input fields like email, phone, number and so on, the process it's pretty straightforward
, just set the v-model of the input to the desired state/model and the type of the input.

## Simple Inputs

#### Html

```html
<input v-model="email" type="email">
<input v-model="phoneNumber" type="phone">
<input v-model="warcry" type="text">
```

##### Vue

```js
export default {
    name: "PlayerInformation",
    data() {
        return {
            email: "nazg@mordor.com",
            phoneNumber: "314-159-26535",
            theAnswer: "42",
            warcry: "Lok'Tar Ogar!!"
        }
    }
}
```

## Custom Multiselect

The custom multiselect is a wrapper of the vue-multiselect component, the wrapper encapsulates the async data fetch, since it's a functionality that we need in many
of our multiselects

**Usage:**

#### Html
```html
<custom-multiselect
    :id="id"
    v-model="model.races"
    endpoint="/races"
    excludeOptionId="id"
    debounceTime="450"
    multiselectProps="multiselectProps"
>
```

#### Vue
```js
export default {
    name: "ExampleComponent",
    data() {
        return {
            model: {
                races: [
                    {
                        id: 0,
                        name: "Terran"
                    },
                    {
                        id: 1,
                        name: "Zerg",
                    },
                    {
                        id: 2,
                        name: "Protoss"
                    }
                ]
            },
            multiselectProps: {
                "multiple": true,
                "label": "name"
            }
        }
    }
}
```

#### Props

- **id**: this id will be used as a parameter when a search is performed.
- **endpoint**: the endpoint to the resources that you are trying to get.

    *The combination of **id** and **endpoint** will be used to construct the url: `/endpoint?q=(id:%search-query%)`.*

- **excludeOptionId**: if you want to prevent a given resource from being listed you can specify it with this prop, this is used to exclude the same resource we are in, say for example we are in races and we happen to be listing races inside the same races view and we want to exclude the race we are editing/viewing.
- **debounceTime**: debounce time from each endpoint call when searching, defaults to 250.
- **multiselectProps**: this is where you'll pass additional properties for the multiselect within. Refer to the [vue-multiselect documentation](https://vue-multiselect.js.org) for the complete list of props that you can pass to it.

#### Slots

Currently the wrapper supports two slots from vue-multiselect: beforeList, afterList, they work exactly the same way,
just use the slots trought the wrapper just like you will with multiselect directly.

```html
<custom-multiselect
    :id="id"
    v-model="model"
    endpoint="/player-resources"
    excludeOptionId="id"
    debounceTime=""
    multiselectProps="multiselectProps">
    <template slot="beforeList">
        <div>
            <i class="fa fa-plus" /> Add Item
        </div>
    </template>
    <template slot="afterList">
        <div>
            <i class="fa fa-plus" /> Add Item
        </div>
    </template>
</custom-multiselect>
```


## Quill (WYSYWYG)

We will be using Quill as our WYSYGWIG trough an existing vue-js wrapper, you can find it and it's documentation here [Vue-quill-editor](https://github.com/surmon-china/vue-quill-editor).

#### Installation (NPM)
```
npm install vue-quill-editor --save
```

#### Usage (In Component)

``` js
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

export default {
  components: {
    quillEditor
  }
}
```

#### Example

###### Template
```html
<template>
  <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
    >
  </quill-editor>
</template>
```

###### Script
``` js
import Quill from 'quill'
import { someModule } from '../yourModulePath/someQuillModule.js'
Quill.register('modules/someModule', someModule)

export default {
    data () {
        return {
            content: '<h2>I am Example</h2>',
            editorOption: {
                // some quill options
            }
        }
    },
    methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill);
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill);
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill);
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text);
            this.content = html;
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    mounted() {
        console.log('this is current quill instance object', this.editor);
    }
}
```
