steal('can/util', 'can/control/modifier', function(can) {

	module("can/control/modifier");

	asyncTest("pluginName", function() {

		var controllerClass = can.Control({
		}, {

			" click:debounce(30)" : function() {
				ok( this instanceof can.Control, "Debounced function has the correct context." );
				foo = true;
				run++;
			},

			"bar:debounce(30)" : function() {
				run2++;
			}
		
		});
		/**/
		var controller1 = new controllerClass( $("#foo") ),
		controller2 = new controllerClass( $("#bar") ),
		run = 0,
		run2 = 0,
		foo;

		// Do a bunch of clicks!
		$("#foo").trigger("click");
		$("#bar").trigger("click");
		$("#foo").trigger("click");
		$("#bar").trigger("click");
		$("#foo").trigger("click");
		$("#bar").trigger("click");

		// Make sure foo is still undefined (should be > 30ms before its defined)
		ok( ! foo, "`foo` is undefined." );

		console.dir( controller1 );
		ok( "bar" in controller1, "Method name gets aliased correctly");
		controller1.bar();
		controller1.bar();
		controller1.bar();
		controller1.bar();

		// Check if
		setTimeout(function() {
			ok( foo, "`foo` is true." );
			equals( run, 2, "`run` is 2" );
			equals( run2, 1, "`run2` is 1" );

			// Do a bunch more clicks!
			$("#foo").trigger("click");
			$("#bar").trigger("click");
			$("#foo").trigger("click");
			$("#bar").trigger("click");
			$("#foo").trigger("click");
			$("#bar").trigger("click");
			
			setTimeout(function() {
				ok( run === 4, "`run` is 4" );
				start();
			}, 40);
		}, 40);
		/**/

	});

});
