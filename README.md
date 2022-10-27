
# ribbit-connect
Pure JavaScript component for integrating [RIBBIT CONNECT](https://ribbit.ai/) into your webpage

Use a JavaScript framework? Here are a few more implementation methods we provide:
1.  [React](https://github.com/darrylhuffman/react-ribbit-connect)
2. Angular (coming soon)
3. React Native (coming soon)

## Install
Include the RIBBIT CONNECT script on your website. 

```html
<script src="https://portal.ribbit.ai/CONNECT.js"></script>
```

With ```npm```:
```
npm install --save ribbit-connect
```

With ```yarn```:
```
yarn add ribbit-connect
```


## Documentation
Please refer to the official [RIBBIT CONNECT](https://portal.ribbit.ai/Widgets/Integration) docs for more information.

## Usage
```js
//import  {  RIBBITConnect  }  from  "react-ribbit-connect"; // comment out only if you used npm or yarn to install

const CONNECT = new RIBBITConnect({
    target: 'ribbit-container', // id of any element within the </body> which you want CONNECT to initialize within
    token: this.token  // see documentation on how to get a token
})

CONNECT.open()

CONNECT.onExit(eventData => {
    CONNECT.close()
})

//CONNECT.onComplete(eventData => {
//    do something with eventData
//    console.log(eventData)
//})

```

### Methods

| Name | Description |
| ------- | --------|
| ```onMessage``` | Generic message handler that fires for every one of the events below ```function(eventName, eventData) => void```  
| ```onLaunch``` |  ```function(eventData) => void```  
| ```onExit``` | ```function(eventData) => void```  
| ```onComplete``` | ```function(eventData) => void```  
| ```onBankLoginSelected``` | ```function(eventData) => void```  
| ```onManualEnrollmentSelected``` | ```function(eventData) => void```  
| ```onNoAccountsFound``` | ```function(eventData) => void```  
| ```onBankNotFound``` | ```function(eventData) => void```  
| ```onBankLogin``` | ```function(eventData) => void```  
| ```onLinkOpen``` | ```function(eventData) => void``` 

### All Init Parameters
| Name | Type | Default | Description |
| ------- | ----- | --------- | --------|
| ```token``` | string |  | Token recieved from ```/CONNECT/session/``` endpoint
| ```open``` | boolean | false | Whether or not CONNECT should be open or not
| ```language``` | string | en | Optional language to be displayed to the user (Translation must be added within CONNECT settings. More coming soon.)
| ```style``` | object |  | Optional styles to be applied to the CONNECT container
| ```className``` | string |  | Optional class to be added to the CONNECT container
| ```inline``` | boolean | false | Whether or not CONNECT should display inline (default is popup)
| ```settings``` | object | | Additional settings (see below)
| ```getContext``` | function |  | Can be used to get the RIBBIT CONNECT context 

#### Settings
| Name | Type | Default | Description | 
| ------- | ----- | --------- | --------|
| ```curtainColor``` | string |  | Color of the popup background curtain. Examples: ```#FFF``` and ```rgba(0,0,0,0.5)```
| ```curtainAllowClose``` | boolean | true | Whether or not the user clicking on the popup background curtain should close the CONNECT popup


