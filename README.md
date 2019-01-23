# rx-reactStore is a state management tool to replace redux

[![Greenkeeper badge](https://badges.greenkeeper.io/dreambo8563/rx-reactStore.svg)](https://greenkeeper.io/)

- core with rxjs 
- work with reactjs/react-router

# How to install it
- npm install rx-reactstore --save

# How to use it
- see demo here https://github.com/dreambo8563/rx-reactStore-demo

## key concept
- createStore will return an object have an additional stream called "updateStore"
e.g 

```js
const initailSub = {
    a: 123,
    b: [
        1, 2, 3, 4
    ],
    c: {
        xx: "ok"
    }
}

export const subStreamStore = createStore(initailSub, 'subStore')


```
for a and b, we will have to subject to pass value, but for C we will call the createStore intenally. to get an object
we will add the updateStore stream for each object

print out it , you will know

- updateStore

there is an limitation for the value pass to updateStore stream.


for subStreamStore the value should be the object which will be part of the initailSub object

### what is the sub object??
sorry for my poor english.
e.g 
{a:"a"}
{b:"b"}
{a:"d",b:"bb"}
{c:{xx:"rr"}}
{a:"ee",c:{xx:"rre"}}
{a:"55",b:"3",c:{xx:"re"}}

all the aboves will be fine.
do not pass value like {xx:"ccc"}, this is the sub object of c not initailSub