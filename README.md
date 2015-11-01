Qlik Sense mashup that can be used to export (serialize) app to JSON file. 

The JSON file then can be put under version control for example

#### Install
* QS Desktop - just unzip the file in `C:\Users\[USERNAME]\Documents\Qlik\Sense\Extensions\`. After this just navigate to `http://localhost:4848/extensions/serializeApp/serializeApp.html`
* QS Server 
  - login to QMC 
  - Navigate to "Extensions"
  - click "Import" button (bottom of the screen)
  - pick the serializeApp-mashup.zip
  - after the import is successfull navigate to `https://your-sense-server/extensions/serializeApp/serializeApp.html`

Thanks to [Alexander Karlsson](https://twitter.com/mindspank) for [qsocks](https://github.com/mindspank/qsocks) and [serializeapp](https://github.com/mindspank/serializeapp)

![serializeapp-mashup](https://raw.githubusercontent.com/countnazgul/serializeApp-mashup/master/serializeApp-mashup.png)


##### Changelog
v0.7.1
  * bold rows with more than 0 exporeted objects
  * objects count is added ( sheet objects )