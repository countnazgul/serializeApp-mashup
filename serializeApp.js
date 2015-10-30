$('#serialize').prop('disabled', true);

var me = {
	config: {
		host: window.location.hostname,
		isSecure: window.location.protocol === "https:",
	  appname: null
	},
	baseurl: './'
};

require.config({
	baseUrl: me.baseurl,
	paths: {
		qsocks: 'qsocks.bundle',
	  serializeApp1: 'serialize.bundle'
	}
});

require(['jquery', 'qsocks', 'serializeApp1'], function($, qsocks, serializeApp1) {
	
  var globalQS;
  qsocks.Connect(me.config).then(function(global) {
	globalQS = global;
	global.getDocList().then(function(docList) {
	  if( docList.length > 0) {
		$('#serialize').prop('disabled', false);

		for( var i = 0; i < docList.length; i++) {
		  $('#docList')
		  .append($("<option></option>")
				  .attr("value",docList[i].qDocId)
				  .text(docList[i].qDocName));
		}
	  } 
	})
  });
  
  $( "#serialize" ).on( "click", function() {
	var d = new Date();
    var dformat = d.getFullYear() + "" +("00" + (d.getMonth() + 1)).slice(-2) + "" + 
    ("00" + d.getDate()).slice(-2) + "-" + 
    ("00" + d.getHours()).slice(-2) + "" + 
    ("00" + d.getMinutes()).slice(-2) + "" + 
    ("00" + d.getSeconds()).slice(-2)
	
	$( '#status' ).html( '' );
	$( '#download' ).html( '' );
	$( '#status' ).append( '--- Starting --- <br /> ' );
	var selectedApp = $('#docList').find(":selected").val();
	var selectedAppText = $('#docList').find(":selected").text();

	var appConfig = {
	  host: window.location.hostname,
	  isSecure: window.location.protocol === "https:",
	  appname: selectedApp
	};	
	
	
	globalQS.connection.ws.close();
	qsocks.Connect(appConfig).then(function(global) {
	  globalQS = global;	  
	  globalQS.openDoc( selectedApp )
	  .then(function(app) {
		$( '#status' ).append( '--- Document open successfully  --- <br /> ' );
		return serializeAppBundle(app);
	  })
	  .then(function(data) {

		$( '#status' ).append( '--- JSON object generated successfully  --- <br /> ' );
		data = JSON.stringify(data, null, 2);
		var a = window.document.createElement('a');
				a.href = window.URL.createObjectURL(new Blob([data], {type: 'text/json'}));
				a.download = selectedAppText + '_' + dformat + '.json';
				a.text = 'Download';
				$( '#download' ).append(a)
		
			})	  
	  })	    
	})
});

