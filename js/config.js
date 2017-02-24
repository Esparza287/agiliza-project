/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/web");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        //URLs del ADMINISTRADOR
        .state('inicio', {
            abstract: true,
            url: "/inicio",
            templateUrl: "views/common/content.html"
        })
        .state('inicio.panel', {
            url: "/panel",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Inicio', roles: ['adm', 'alm', 'prf', 'apd'], specialClass: 'fixed-sidebar' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        },
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('inicio.perfil', {
            url: "/perfil/:propio",
            templateUrl: "views/modulos/usuario/perfil_usuario.html",
            data: { pageTitle: 'Información de Usuario' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inicio.busqueda', {
            url: "/busqueda/:busqueda",
            templateUrl: "views/modulos/inicio/busqueda.html",
            data: { pageTitle: 'Resultados de la busqueda', vista: 'busqueda' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        // FIN: URLs GENERALES
        // URLs DE MANTENEDORES DE USUARIOS
        .state('usuarios', {
            abstract: true,
            url: "/usuarios",
            data: { roles: ['adm'] },
            templateUrl: "views/common/content.html"
        })
        .state('usuarios.lista_usuarios', {
            url: "/listar",
            templateUrl: "views/modulos/usuario/listar_usuarios.html",
            data: { pageTitle: 'Lista de Usuarios' }
        })
        .state('usuarios.listar_usuarios', {
            url: "/listado/:tipo",
            templateUrl: "views/modulos/usuario/listar_usuarios.html",
            data: { pageTitle: 'Lista de Usuarios' }
        })
        .state('usuarios.nuevo_usuario', {
            url: "/nuevo_usuario",
            templateUrl: "views/modulos/usuario/usuario_mod.html",
            data: { pageTitle: 'Nuevo Usuario' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        }
                    ]);
                }
            }            
        })
        .state('usuarios.modificar_usuario', {
            url: "/modificar_usuario/:id_usuario",
            templateUrl: "views/modulos/usuario/usuario_mod.html",
            data: { pageTitle: 'Modificar Usuario' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        }
                    ]);
                }
            } 
        })
        // FIN: MANTENEDORES

        // URLs DE REGISTROS Y PLANIFICACIÓN
        .state('matricula', {
            abstract: true,
            url: "/matricula",
            data: { roles: ['adm'] },
            templateUrl: "views/common/content.html"
        })
        .state('matricula.panel', {
            url: "/panel",
            templateUrl: "views/modulos/matricula/panel.html",
            data: { pageTitle: 'Panel de Matrícula' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        // URLs DE REGISTROS Y PLANIFICACIÓN
        .state('registro', {
            abstract: true,
            url: "/registros",
            data: { roles: ['adm', 'prf'] },
            templateUrl: "views/common/content.html"
        })
        .state('registro.calificacion', {
            url: "/calificaciones",
            templateUrl: "views/modulos/registro/calificacion.html",
            data: { pageTitle: 'Calificaciones' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        .state('registro.asistencia', {
            url: "/asistencias",
            templateUrl: "views/modulos/registro/asistencia.html",
            data: { pageTitle: 'Asistencia' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        // URLs DE MIS REGISTROS (INOFRMACIÓN QUE PUEDE VER EL ALUMNO)
        .state('mi_registro', {
            abstract: true,
            url: "/registros/personales",
            data: { roles: ['alm', 'apd', 'adm'] },
            templateUrl: "views/common/content.html"
        })
        .state('mi_registro.calificacion', {
            url: "/calificaciones",
            templateUrl: "views/modulos/mi_registro/calificaciones.html",
            data: { pageTitle: 'Calificaciones' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('mi_registro.horario', {
            url: "/horario",
            templateUrl: "views/modulos/mi_registro/horario.html",
            data: { pageTitle: 'Calificaciones' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        // URLs DE ASIGNACIONES
        .state('asignaciones', {
            abstract: true,
            url: "/asignaciones",
            data: { roles: ['adm'] },
            template: "<div ui-view></div>"
        })
        .state('mantenedores', {
            parent: "asignaciones",
            url: "/mantenedores",
            templateUrl: "views/common/content.html"
        })
        .state('mantenedores.curso', {
            url: "/cursos",
            templateUrl: "views/modulos/asignaciones/curso.html",
            data: { pageTitle: 'Planificación de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('mantenedores.asignatura', {
            url: "/asignaturas",
            templateUrl: "views/modulos/asignaciones/asignatura.html",
            data: { pageTitle: 'Mantenedor de Asignaturas' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('mantenedores.periodo', {
            url: "/periodos",
            templateUrl: "views/modulos/asignaciones/periodo.html",
            data: { pageTitle: 'Mantenedor de Periodos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('asistentes', {
            parent: "asignaciones",
            url: "/asistentes",
            templateUrl: "views/common/content.html"
        })
        .state('asistentes.enlace', {
            url: "/enlazar",
            templateUrl: "views/modulos/asignaciones/enlace.html",
            controller: wizardCtrl,
            data: { pageTitle: 'Asistente de Creacion del Plan Anual de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                         {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.enlace.paso_uno', {
            url: '/paso_uno',
            templateUrl: 'views/modulos/asignaciones/paso_uno.html',
            data: { pageTitle: 'Asistente de Creacion del Plan Anual de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.enlace.paso_dos', {
            url: '/paso_dos',
            templateUrl: 'views/modulos/asignaciones/paso_dos.html',
            data: { pageTitle: 'Asistente de Creacion del Plan Anual de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.enlace.paso_tres', {
            url: '/paso_tres',
            templateUrl: 'views/modulos/asignaciones/paso_tres.html',
            data: { pageTitle: 'Asistente de Creacion del Plan Anual de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.enlace.paso_cuatro', {
            url: '/paso_cuatro',
            templateUrl: 'views/modulos/asignaciones/paso_cuatro.html',
            data: { pageTitle: 'Asistente de Creacion del Plan Anual de Cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.listar_cursos', {
            url: '/listar_cursos',
            templateUrl: 'views/modulos/asignaciones/listar_cursos.html',
            data: { pageTitle: 'Listado de cursos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('asistentes.asignar_alumnos', {
            url: '/asignar/alumnos',
            templateUrl: 'views/modulos/asignaciones/asignar_alumnos.html',
            data: { pageTitle: 'Asignación de Alumnos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        // FIN: ASIGNACIONES
        // URLs DE HORARIO
        .state('horario', {
            abstract: true,
            url: "/horario",
            data: { roles: ['adm', 'prf'] },
            templateUrl: "views/common/content.html"
        })
        .state('horario.crear_horario', {
            url: '/gestionar',
            templateUrl: 'views/modulos/horario/gestionar_horario.html',
            data: { pageTitle: 'Gestión de Horarios' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
                        },
                        {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        },
                        {
                            name: 'ui.sortable',
                            files: ['js/plugins/ui-sortable/sortable.js']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        })
        .state('horario.bloque', {
            url: "/bloques",
            templateUrl: "views/modulos/horario/bloque.html",
            data: { pageTitle: 'Mantenedor de bloques' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        // FIN: HORARIO
        // URLs DE PLANIFICACIÓN
        .state('planificacion', {
            abstract: true,
            url: "/planificacion",
            data: { roles: ['adm', 'prf'] },
            templateUrl: "views/common/content.html"
        })
        .state('planificacion.materia', {
            url: "/materias",
            templateUrl: "views/modulos/planificacion/materia.html",
            data: { pageTitle: 'Planificación de Asignaturas' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('planificacion.agregar_materia', {
            url: "/asignaturas(agregar",
            templateUrl: "views/modulos/planificacion/agregar_materia.html",
            data: { pageTitle: 'Agregar Asignatura' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        // FIN: PLANIFICACIÓN
        // URLs DE MANTENEDOR DE IMPLEMENTOS
        .state('implementos', {
            abstract: true,
            url: "/implementos",
            data: { roles: ['adm'] },
            template: "<div ui-view></div>"
        })
        // URLs DE MANTENEDOR DE IMPLEMENTOS
        .state('gestionar', {
            parent: 'implementos',
            url: "/gestion",
            templateUrl: "views/common/content.html"
        })
        .state('gestionar.lista_implemento', {
            url: "/lista",
            templateUrl: "views/modulos/implementos/lista_implementos.html",
            data: { pageTitle: 'Lista de Implementos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestionar.crear_implemento', {
            url: "/crear",
            templateUrl: "views/modulos/implementos/crear_implemento.html",
            data: { pageTitle: 'Crear Implemento' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestionar.modificar_implemento', {
            url: "/modificar/:id_implemento",
            templateUrl: "views/modulos/implementos/crear_implemento.html",
            data: { pageTitle: 'Modificar Implemento' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestionar.lista_proveedor', {
            url: "/proveedor/listar",
            templateUrl: "views/modulos/implementos/lista_proveedor.html",
            data: { pageTitle: 'Lista de Proveedores' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestionar.crear_proveedor', {
            url: "/proveedor/crear",
            templateUrl: "views/modulos/implementos/proveedor_mod.html",
            data: { pageTitle: 'Crear Proveedor' }
        })
        .state('gestionar.modificar_proveedor', {
            url: "/proveedor/modificar/:id_proveedor",
            templateUrl: "views/modulos/implementos/proveedor_mod.html",
            data: { pageTitle: 'Modificar Proveedor' }
        })
        .state('historial', {
            parent: 'implementos',
            url: "/historial",
            templateUrl: "views/common/content.html"
        })
        .state('historial.pagos', {
            url: "/pagos",
            templateUrl: "views/modulos/implementos/historial.html",
            data: { pageTitle: 'Historial de Pagos' },
                        resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('historial.pedidos', {
            url: "/pedidos",
            templateUrl: "views/modulos/implementos/pedidos.html",
            data: { pageTitle: 'Historial de Pedidos' },
                resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })  
        //FIN: IMPLEMENTOS

        //URLs DE MODULO DE PEDIDOS DE TALLER
        .state('talleres', {
            abstract: true,
            url: "/talleres",
            data: { roles: ['adm', 'prf'] },
            template: "<div ui-view></div>"
        })
        .state('movimientos', {
            parent: 'talleres',
            url: "/movimientos",
            templateUrl: "views/common/content.html"
        })
        .state('movimientos.pedidos', {
            url: "/pedidos",
            templateUrl: "views/modulos/taller/pedidos.html",
            data: { pageTitle: 'Pedidos de Materiales' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('movimientos.crear_pedido', {
            url: "/crear",
            templateUrl: "views/modulos/taller/pedido_mod.html",
            data: { pageTitle: 'Realizar Pedido' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('movimientos.modificar_pedido', {
            url: "/modificar/:id_orden_material",
            templateUrl: "views/modulos/taller/pedido_mod.html",
            data: { pageTitle: 'Modificar Pedido' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('movimientos.recepcion', {
            url: "/recepcion",
            templateUrl: "views/modulos/taller/recepcion.html",
            data: { pageTitle: 'Recepción de Materiales' }
        })
        .state('movimientos.entrega', {
            url: "/entrega",
            templateUrl: "views/modulos/taller/entrega.html",
            data: { pageTitle: 'Entrega de Materiales' }
        })
        .state('movimientos.historial', {
            url: "/historial",
            templateUrl: "views/modulos/taller/historial.html",
            data: { pageTitle: 'Historial de Movimientos' }
        })
        .state('inventario', {
            parent: 'talleres',
            url: "/inventario",
            templateUrl: "views/common/content.html"
        })
        .state('inventario.material', {
            url: "/lista",
            templateUrl: "views/modulos/taller/material.html",
            data: { pageTitle: 'Mantenedor de Materiales' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.crear_material', {
            url: "/crear_material",
            templateUrl: "views/modulos/taller/material_mod.html",
            data: { pageTitle: 'Nuevo Material' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.modificar_material', {
            url: "/modificar_material/:id_material",
            templateUrl: "views/modulos/taller/material_mod.html",
            data: { pageTitle: 'Modificar Material' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.tipo_material', {
            url: "/lista/tipo",
            templateUrl: "views/modulos/taller/tipo_material.html",
            data: { pageTitle: 'Mantenedor de Tipos Materiales' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.crear_tipo_material', {
            url: "/crear_tipo_material",
            templateUrl: "views/modulos/taller/tipo_material_mod.html",
            data: { pageTitle: 'Nuevo Tipo Material' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.modificar_tipo_material', {
            url: "/modificar_tipo_material/:id_tipo_material",
            templateUrl: "views/modulos/taller/tipo_material_mod.html",
            data: { pageTitle: 'Modificar Tipo Material' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventario.stock', {
            url: "/stock",
            templateUrl: "views/modulos/taller/stock.html",
            data: { pageTitle: 'Gestión de Stock' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        //FIN: TALLERES
        //URLs DE MODULO DEL INTERNADO
        .state('internado', {
            abstract: true,
            url: "/internado",
            data: { roles: ['adm', 'alm'] },
            template: "<div ui-view></div>",
        })

        //URLs DE MODULO DEL BIBLIOTECA
        .state('biblioteca', {
            abstract: true,
            url: "/biblioteca",
            data: { roles: ['adm', 'alm'] },
            templateUrl: "views/common/content.html"
        })
        .state('biblioteca.lista_libros', {
            url: "/lista_libros",
            templateUrl: "views/modulos/biblioteca/listar_libros.html",
            data: { pageTitle: 'Listado de Libros' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('biblioteca.pedido', {
            url: "/pedidos",
            templateUrl: "views/modulos/biblioteca/pedido.html",
            data: { pageTitle: 'Gestión de Pedidos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        }
                    ]);
                }
            }
        })
        //URLs DE MODULO DE ADMINSTACIÓN
        .state('admin', {
            abstract: true,
            url: "/administracion",
            data: { roles: ['adm'] },
            template: "<div ui-view></div>"
        })
        .state('solicitud', {
            parent: 'admin',
            url: "/solicitud",
            templateUrl: "views/common/content.html"
        })
        .state('solicitud.pedidos', {
            url: "/pendientes",
            templateUrl: "views/modulos/admin/solicitudes.html",
            data: { pageTitle: 'Solicitudes de Materiales' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('solicitud.pedido', {
            url: "/pedido/:id_orden_material",
            templateUrl: "views/modulos/admin/pedido.html",
            data: { pageTitle: 'Solicitudes de Materiales' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('solicitud.cotizacion', {
            url: "/cotizacion",
            templateUrl: "views/modulos/admin/cotizacion.html",
            data: { pageTitle: 'Ingreso de Cotizaciones' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('solicitud.modificar_cotizacion', {
            url: "/cotizacion/:id_orden_material",
            templateUrl: "views/modulos/admin/cotizacion_mod.html",
            data: { pageTitle: 'Crear Cotización' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('solicitud.comparacion', {
            url: "/comparacion",
            templateUrl: "views/modulos/admin/comparacion.html",
            data: { pageTitle: 'Análisis Comparativo' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('solicitud.realizar_comparacion', {
            url: "/comparacion/:id_orden_material",
            templateUrl: "views/modulos/admin/comparacion_mod.html",
            data: { pageTitle: 'Cuadro Comparativo' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestion', {
            parent: 'admin',
            url: "/gestion",
            templateUrl: "views/common/content.html"
        })
        .state('gestion.cuentas', {
            url: "/cuentas",
            templateUrl: "views/modulos/admin/cuentas.html",
            data: { pageTitle: 'Mantenedor de Cuentas' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('gestion.proveedores', {
            url: "/proveedores",
            templateUrl: "views/modulos/admin/proveedores.html",
            data: { pageTitle: 'Mantenedor de Proveedores' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        //FIN: ADMINISTRACIÓN

        ///////////////AREA USUARIO///////////////////
        ///////////////AREA USUARIO.HOME///////////////////
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "views/common/apoderado/content.html",
        })
        .state('home.panel', {
            url: "/panel",
            templateUrl: "views/home/main.html",
            data: { pageTitle: 'Inicio', roles: ['nadie'] },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
                        },
                        {
                            name: 'ui.checkbox',
                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
                        }
                    ]);
                }
            }
        })
        .state('implementos_apd', {
            abstract: true,
            url: "/implementos",
            data: { roles: ['adm', 'apd', 'prf', 'alm'] },
            template: "<div ui-view></div>",
        })
        .state('productos', {
            parent: 'implementos_apd',
            url: "/productos",
            templateUrl: "views/common/content.html",
        })
        .state('productos.mostrar_implementos', {
            url: "/mostrar",
            templateUrl: "views/modulos/implementos/mostrar_implementos.html",
            data: { pageTitle: 'Implementos' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            insertBefore: '#loadBefore',
                            files: ['js/plugins/bootstrap-tour/bootstrap-tour.min.js', 'css/plugins/bootstrap-tour/bootstrap-tour.min.css']
                        },
                        {
                            name: 'bm.bsTour',
                            files: ['js/plugins/angular-bootstrap-tour/angular-bootstrap-tour.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('productos.detalle_implemento', {
            url: "/detalle/{id_implemento}",
            templateUrl: "views/modulos/implementos/detalle_implemento.html",
            data: { pageTitle: 'Detalle del Implemento'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
                        },
                        {
                            name: 'slick',
                            files: ['js/plugins/slick/angular-slick.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('productos.carro_compra', {
            url: "/carro",
            templateUrl: "views/modulos/implementos/carro_compra.html",
            data: { pageTitle: 'Carro de Compras' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            insertBefore: '#loadBefore',
                            files: ['js/plugins/bootstrap-tour/bootstrap-tour.min.js', 'css/plugins/bootstrap-tour/bootstrap-tour.min.css']
                        },
                        {
                            name: 'bm.bsTour',
                            files: ['js/plugins/angular-bootstrap-tour/angular-bootstrap-tour.min.js']
                        }
                    ]);
                }
            }
        })
        .state('productos.pago', {
            url: "/pago",
            templateUrl: "views/modulos/implementos/pago.html",
            data: { pageTitle: 'Realizar Pago' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/language/moment/moment-with-locales.js']
                        },
                        {
                            serie: true,
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js',
                                    'js/plugins/jquery-ui/i18n/jquery.ui.datepicker-es.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        },
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        //URLs DE PREGUNTAS FRECUENTES
        .state('ayuda', {
            abstract: true,
            url: "/ayuda",
            data: { roles: ['adm', 'prf', 'alm', 'apd'] },
            templateUrl: "views/common/content.html"
        })
        .state('ayuda.preguntas_frecuentes', {
            url: "/PrguntasFrecuentes",
            templateUrl: "views/modulos/ayuda/preguntas_frecuentes.html",
            data: { pageTitle: 'Preguntas Frecuentes' }
        })
        //FIN DE PREGUNTAS FRECUENTES

        // URLs del LOGIN
        .state('login', {
            url: "/login",
            templateUrl: "views/modulos/login/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('pagina_web', {
            url: "/web",
            templateUrl: "views/modulos/inicio/pagina_web.html",
            data: { pageTitle: 'Presentación', specialClass: 'landing-page' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/wow/wow.min.js']
                        }
                    ]);
                }
            }
        })
        .state('nueva_contraseña', {
            url: "/nueva_clave/:cod",
            templateUrl: "views/modulos/login/nueva_contraseña.html",
            data: { pageTitle: 'Nueva Contraseña', specialClass: 'gray-bg' }
        })
        .state('recuperar_contraseña', {
            url: "/recuperar_clave",
            templateUrl: "views/modulos/login/recuperar_contraseña.html",
            data: { pageTitle: 'Recuperar Contraseña', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('solicitar_acceso', {
            url: "/solicitar_acceso",
            templateUrl: "views/modulos/login/solicitar_acceso.html",
            data: { pageTitle: 'Registrar', specialClass: 'gray-bg' }
        })
        //FIN: LOGIN
}


angular
    .module('inspinia')
    .config(config)
    /*.run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });*/
    .run(['$rootScope', '$state', '$stateParams', 
      'authorization', 'principal','varStorage',
    function($rootScope, $state, $stateParams, 
             authorization, principal, varStorage){

        $rootScope.$on('$stateChangeStart', 
            function(event, toState, toStateParams)
            {
                // track the state the user wants to go to; 
                // authorization service needs this
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                // if the principal is resolved, do an 
                // authorization check immediately. otherwise,
                // it'll be done when the state it resolved.
                varStorage.resetVars();
                authorization.authorize();
                //console.log(principal.isIdentityResolved());
                /*if (principal.isIdentityResolved()) 
                    authorization.authorize();*/
                $state.year = principal.getYear();
                $state.usuario = principal.getIdentity();
            });

        $rootScope.$state = $state;
    }
  ]);
