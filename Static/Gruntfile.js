/// <binding BeforeBuild='less, bowercopy' />
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'bower_components/bootstrap-timepicker/css/timepicker.css': 'bower_components/bootstrap-timepicker/css/timepicker.less'
                }
            }
        },
        bowercopy: {
            options: {
                destPrefix: 'lib'
            },
            underscore: {
                files: {
                    'underscore/underscore-min.js': 'underscore/underscore-min.js'
                }
            },
            jquery: {
                files: {
                    'jquery/jquery.js': 'jquery/dist/jquery.js',
                    'jquery/jquery.min.js': 'jquery/dist/jquery.min.js'
                }
            },
            jqueryui: {
                files: {
                    'jquery-ui/jquery-ui.js': 'jquery-ui/jquery-ui.js',
                    'jquery-ui/jquery-ui.min.js': 'jquery-ui/jquery-ui.min.js',
                    'jquery-ui/themes/smoothness/jquery-ui.css': 'jquery-ui/themes/smoothness/jquery-ui.css',
                    'jquery-ui/themes/smoothness': 'jquery-ui/themes/smoothness/*'
                }
            },
            bootstrap: {
                files: {
                    'bootstrap/js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
                    'bootstrap/js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'bootstrap/css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
                    'bootstrap/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap/css/bootstrap-theme.min.css': 'bootstrap/dist/css/bootstrap-theme.min.css',
                    'bootstrap/fonts': 'bootstrap/dist/fonts/*',
                    'bootstrap/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js': 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                    'bootstrap/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js': 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                    'bootstrap/plugins/bootstrap-datepicker/css/bootstrap-datepicker.css': 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
                    'bootstrap/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css': 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
                    'bootstrap/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js': 'bootstrap-timepicker/js/bootstrap-timepicker.js',
                    'bootstrap/plugins/bootstrap-timepicker/css/timepicker.css': 'bootstrap-timepicker/css/timepicker.css'
                }
            },
            simplesidebar: {
                files: {
                    'simple-sidebar/css/simple-sidebar.css': 'startbootstrap-simple-sidebar/css/simple-sidebar.css'
                }
            },
            chosen: {
                files: {
                    'chosen/chosen.jquery.min.js': 'chosen/chosen.jquery.min.js',
                    'chosen/chosen.min.css': 'chosen/chosen.min.css',
                    'chosen/chosen-sprite.png': 'chosen/chosen-sprite.png',
                    'chosen/chosen-sprite@2x.png': 'chosen/chosen-sprite@2x.png',
                    'chosen/bootstrap/chosen.bootstrap.min.css': 'chosen-bootstrap/chosen.bootstrap.min.css',
                    'chosen/bootstrap/chosen-sprite.png': 'chosen-bootstrap/chosen-sprite.png',
                    'chosen/bootstrap/chosen-sprite@2x.png': 'chosen-bootstrap/chosen-sprite@2x.png'
                }
            },
            moment: {
                files: {
                    'moment/moment.js': 'moment/moment.js',
                    'moment/moment.min.js': 'moment/min/moment.min.js'
                }
            },
            numeral: {
                files: {
                    'numeral/numeral.js': 'numeral/numeral.js',
                    'numeral/numeral.min.js': 'numeral/min/numeral.min.js'
                }
            },
            datatables: {
                files: {
                    'datatables/js/dataTables.bootstrap.js': 'datatables/media/js/dataTables.bootstrap.js',
                    'datatables/js/dataTables.bootstrap4.js': 'datatables/media/js/dataTables.bootstrap4.js',
                    'datatables/js/jquery.dataTables.js': 'datatables/media/js/jquery.dataTables.js',
                    'datatables/js/dataTables.bootstrap.min.js': 'datatables/media/js/dataTables.bootstrap.min.js',
                    'datatables/js/dataTables.bootstrap4.min.js': 'datatables/media/js/dataTables.bootstrap4.min.js',
                    'datatables/js/jquery.dataTables.min.js': 'datatables/media/js/jquery.dataTables.min.js',
                    'datatables/css/dataTables.bootstrap.css': 'datatables/media/css/dataTables.bootstrap.css',
                    'datatables/css/dataTables.bootstrap4.css': 'datatables/media/css/dataTables.bootstrap4.css',
                    'datatables/css/jquery.dataTables.css': 'datatables/media/css/jquery.dataTables.css',
                    'datatables/css/dataTables.bootstrap.min.css': 'datatables/media/css/dataTables.bootstrap.min.css',
                    'datatables/css/dataTables.bootstrap4.min.css': 'datatables/media/css/dataTables.bootstrap4.min.css',
                    'datatables/css/jquery.dataTables.min.css': 'datatables/media/css/jquery.dataTables.min.css',
                    'datatables/images': 'datatables/media/images/*',
                    'datatables/plugins/api/row().show().js': 'datatables-plugins/api/row().show().js'
                }
            },
            codemirror: {
                files: {
                    'codemirror/codemirror.js': 'codemirror/lib/codemirror.js',
                    'codemirror/codemirror.css': 'codemirror/lib/codemirror.css',
                    'codemirror/mode/sql': 'codemirror/mode/sql/*',
                    'codemirror/mode/python': 'codemirror/mode/python/*'
                }
            },
            footable: {
                files: {
                    'footable/js': 'footable/compiled/*.js',
                    'footable/css': 'footable/compiled/*.css'
                }
            },
            jscookie: {
                files: {
                    'js-cookie/js.cookie.js': 'js-cookie/src/js.cookie.js'
                }
            },
            json2: {
                files: {
                    'json2/json2.js': 'json2/json2.js'
                }
            },
            fullcalendar: {
                files: {
                    "fullcalendar/fullcalendar.min.js": "fullcalendar/dist/fullcalendar.min.js",
                    "fullcalendar/fullcalendar.min.css": "fullcalendar/dist/fullcalendar.min.css",
                    "fullcalendar/fullcalendar.print.css": "fullcalendar/dist/fullcalendar.print.css"
                }
            },
            qtip2: {
                files: {
                    'qtip2/jquery.qtip.min.js': 'qtip2/jquery.qtip.min.js',
                    'qtip2/jquery.qtip.min.css': 'qtip2/jquery.qtip.min.css'
                }
            },
            modernizr: {
                files: {
                    'modernizr/modernizr.js': 'components-modernizr/modernizr.js'
                }
            },
            jclock: {
                files: {
                    'jclock/jquery.jclock.js': 'jclock/jquery.jclock.js'
                }
            },
            watermark: {
                files: {
                    'watermark/ui.watermark.js': 'jquery-watermark/ui.watermark.js'
                }
            },
            tinymce: {
                files: {
                    'tinymce/tinymce.js': 'tinymce/tinymce.js',
                    'tinymce/tinymce.min.js': 'tinymce/tinymce.min.js',
                    'tinymce/jquery.tinymce.js': 'tinymce/jquery.tinymce.js',
                    'tinymce/jquery.tinymce.min.js': 'tinymce/jquery.tinymce.min.js',
                    'tinymce/tinymce.jquery.js': 'tinymce/tinymce.jquery.js',
                    'tinymce/tinymce.jquery.min.js': 'tinymce/tinymce.jquery.min.js',
                    'tinymce/skins': 'tinymce/skins',
                    'tinymce/plugins': 'tinymce/plugins',
                    'tinymce/themes': 'tinymce/themes'
                }
            },
            chartjs: {
                files: {
                    'chartjs/Chart.bundle.js': 'chart.js/dist/Chart.bundle.js',
                    'chartjs/Chart.bundle.min.js': 'chart.js/dist/Chart.bundle.min.js',
                    'chartjs/Chart.js': 'chart.js/dist/Chart.js',
                    'chartjs/Chart.min.js': 'chart.js/dist/Chart.min.js'
                }
            },
            urijs: {
                files: {
                    'urijs/URI.min.js': 'urijs/src/URI.min.js',
                    'urijs/jquery.URI.min.js': 'urijs/src/jquery.URI.min.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-less');
};