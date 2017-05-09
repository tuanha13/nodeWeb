'use strict';

(function (w) {
    'use strict';

    if (WBER) {
        WBER.library = [
		    //jquery libs
		    {
		        name: "jQuery",
		        jspath: "js/lib/jquery-1.9.1.js,js/lib/jquery-ui.js",
		        csspath: "css/lib/jquery-ui.css"
		    },
		    {
		        name: "cycle",
		        jspath: "assets/jquery.cycle/js/jquery.cycle.all.min.js",
		        csspath: ""
		    },
		    //lazy plugins
		    {
		        name: "LazySlider",
		        jspath: "js/lib/jLazyf.slider.js",
		        csspath: ""
		    },
            //nprogress plugins
            {
                name: 'NProgress',
                jspath: '/assets/vendor/nprogress/js/nprogress.min.js',
                csspath: '/assets/vendor/nprogress/css/nprogress.min.css',
                isWait: true
            },
		    //armchart plugins 
		    {
		        name: "AmCharts",
		        jspath: "assets/jquery.amcharts/amcharts.js",
		        csspath: ""
		    },
		    {
		        name: "AmCharts.AmPieChart",
		        jspath: "assets/jquery.amcharts/amcharts.js," +
					    "assets/jquery.amcharts/pie.js",
		        csspath: "assets/jquery.amcharts/pie-style.css"
		    },
		    {
		        name: "AmCharts.AmStockChart",
		        jspath: "assets/jquery.amcharts/amcharts.js," +
						    "assets/jquery.amcharts/serial.js," +
						    "assets/jquery.amcharts/amstock.js"
						    ,
		        csspath: "assets/jquery.amcharts/amstock-style.css"
		    },
		    {
		        name: "AmCharts.AmMap",
		        jspath: "assets/jquery.amcharts/amcharts.js," +
						    "assets/jquery.amcharts/ammap/ammap.js," +
						    "assets/jquery.amcharts/ammap/maps/js/worldLow.js"
						    ,
		        csspath: "assets/jquery.amcharts/ammap/ammap.css"
		    },
		    //jqxDataTable
		    {
		        name: "jqxDataTable",
		        jspath: "assets/jquery.widgets/js/jqxcore.js," +
						    "assets/jquery.widgets/js/jqxdata.js," +
						    "assets/jquery.widgets/js/jqxbuttons.js," +
						    "assets/jquery.widgets/js/jqxscrollbar.js," +
						    "assets/jquery.widgets/js/jqxlistbox.js," +
						    "assets/jquery.widgets/js/jqxdropdownlist.js," +
						    "assets/jquery.widgets/js/jqxdatatable.js"
						    ,
		        csspath: "assets/jquery.widgets/css/jqx.base.css"
		    },
		    //jqxMenu
		    {
		        name: "jqxMenu",
		        jspath: "assets/jquery.widgets/js/jqxcore.js," +
						    "assets/jquery.widgets/js/jqxmenu.js,"
						    ,
		        csspath: "assets/jquery.widgets/css/jqx.base.css"
		    }
        ];
    }
})(window)