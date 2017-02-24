/**
 * MainCtrl - controller
 */
function MainCtrl($http, $state) {
    main = this;
    main.user_info = {};
    main.user_permisos = {};

    main.user_info = $state.usuario;

    main.helloText = 'Bienvenido a Agiliza Educación';
    main.descriptionText = 'Test.';
};
/**
* Controlador para el login
*/
function LoginCtrl($http, $state, principal, $location, toaster, PreCarga){
    login = this;
	login.datos = {};
    login.recuperacion = '';
    $http.get('API/session/log_out');

	login.validar = function(){
        login.loginLoading = true;
		$http.post('API/session/login', login.datos).success(function(data){
			console.log(data);
			if(data.status == 'OK'){
                principal.authenticate(data.user, data.year);
                $state.go(data.user.main_page);
                PreCarga.cargar_libros();
                PreCarga.cargar_libros_cantidad();
			}
            else{
                login.datos = {};
                login.loginLoading = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Datos Incorrectos.',
                    showCloseButton: true,
                    timeout: 10000
                });
            }
		});
	}

    login.recuperar_clave = function(){
        login.loginLoading = true;
        $http.post('API/session/recuperar_clave', {datos: login.recuperacion})
        .success(function(data){
        //console.log(login.recuperacion);
            if(data.status == 'OK'){
                login.loginLoading = false;
                $state.go('login');
            }
            else{
                login.loginLoading = false;
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Su correo no esta registrado en nuestra base de datos.',
                    showCloseButton: true,
                    timeout: 10000
                });
            }
        });
    }
}
/**
Controlador para generar una Nueva Clave
*/
function NuevaClaveCtrl($http, $state, $stateParams){
    login = this;
    login.texto = '';
    login.nueva_clave = function() {
        console.log($stateParams.cod);
        if ($stateParams.cod != '') {
            $http.post('API/session/nueva_clave/' + $stateParams.cod)
            .success(function(data){
                console.log(data);
                if(data.status == 'OK'){
                    login.texto = 'Su nueva contraseña fue enviada a su correo.';
                }
                else{
                    login.texto = 'El Codigo de autorización para cambiar contraseña es incorrecto. ';
                }
            });
        }
        else {
            login.texto = 'El Codigo de autorización para cambiar contraseña es incorrecto. ';
        }
    }
}
/**
Controlador para formulario estandar
*/
function CambiarYearCtrl($http, $state){
    cambiar = this;
    cambiar.year = $state.year;

    cambiar.change_year = function(id_year){
        $http.post('API/fecha/cambiar_year/' + id_year)
        .success(function(data){
            console.log(data);
            location.reload();
        });
    }
}
/**
Controlador para formulario estandar
*/
function FormularioCtrl($http, $state, $stateParams, $element){
    var formulario = this;
    var urlPost = $element.attr('url-post');
    var urlGet = $element.attr('url-get');
    var urlRedirect = $element.attr('url-redirect');
    var idName = $element.attr('id-name');
    var alwaysGet = $element.attr('always-get');
    var jsonLista = $element.attr('json-lista');


    formulario.data = {};
    formulario.data.lista = [];

    formulario.addFila = function(){
        var njson = JSON.parse(JSON.stringify(jsonLista));
        formulario.data.lista.push(njson);
    }

    if(typeof jsonLista !== 'undefined'){
        jsonLista = $.parseJSON(jsonLista);
        formulario.addFila();
        console.log('acaaaaa');
        console.log(formulario.data.lista);
    }

    if (typeof $stateParams[idName] !== 'undefined') {
        console.log($stateParams[idName]);
        $http.get(urlGet + $stateParams[idName])
        .success(function(data){
            console.log(data);
            formulario.data = data;
        });
    }
    else if(alwaysGet == 'true') {
        $http.get(urlGet)
        .success(function(data){
            console.log(data);
            formulario.data = data;
        });
    };

    formulario.subir = function(){
        console.log(this.data)
        if(typeof formulario.data.lista !== 'undefined' && formulario.data.lista.length == 0){
            delete formulario.data.lista;
        }
        $http.post(urlPost, this.data)
        .success(function(data){
            console.log(data);
            $state.go(urlRedirect);
            console.log("pasaaaaa2");
        });
    };

    formulario.volver = function(){
        $state.go(urlRedirect);
        console.log("pasaaaaa3");
    }

    formulario.cambiarData = function(name, val){
        formulario.data[name] = val;
    }

    formulario.eliminar = function(fila){
        var index = formulario.data.lista.indexOf(fila);
        if (index > -1) {
            formulario.data.lista.splice(index, 1);
            if(formulario.data.lista.length < 1){
                formulario.addFila();
            }
        }
    }
}
/**
*Controlador PARA GESTIONAR USUARIOS
*/
function FormularioUsuario($http, $location, $stateParams, toaster, RutHelper){
    usuario = this;
    usuario.datos = {};
    usuario.info = {};
    usuario.personal = {};
    usuario.asignaturas = {};
    //usuario.admin = {};
    usuario.permisos = {};
    usuario.ruts = {};
    usuario.correos = {};
    usuario.required = true;
    usuario.estado_validacion = false;

    usuario.validar_rut = function(){
        var rut = RutHelper.clean(usuario.datos.rut_usuario);
        usuario.existe_rut = false;
        usuario.estado_validacion = RutHelper.validate(rut);
        for (var i = usuario.ruts.length - 1; i >= 0; i--) {
            if (usuario.ruts[i] == rut) {
                usuario.existe_rut = true;
            }
        }
    }

    usuario.validar_correo = function(){
        usuario.existe_correo = false;
        var correo = usuario.datos.email_usuario;
        if (typeof $stateParams.id_usuario !== 'undefined') {
            var id = $stateParams.id_usuario;
            for (var i = usuario.correos.length - 1; i >= 0; i--) {
                if (usuario.correos[i]['email_usuario'] == correo && usuario.correos[i]['id_usuario'] != id) {
                    usuario.existe_correo = true;
                }
            }
        }
        else{
            for (var i = usuario.correos.length - 1; i >= 0; i--) {
                if (usuario.correos[i]['email_usuario'] == correo) {
                    usuario.existe_correo = true;
                }
            }
        }
        

        
    }

    usuario.traer_ruts = function(){
        console.log($stateParams.id_usuario);
        $http.get('API/usuario/get_ruts_usuarios')
        .success(function(data){
            usuario.ruts = data;
            console.log(data);
        });
    }

    usuario.traer_correos = function(){
        console.log($stateParams.id_usuario);
        $http.get('API/usuario/get_correos_usuarios')
        .success(function(data){
            usuario.correos = data;
            console.log(data);
        });
    }

    usuario.comprobar = function(){
        console.log(usuario.personal);
        if (usuario.personal.clave1 != undefined || usuario.personal.clave2 != undefined) {
            if (usuario.personal.clave1 === usuario.personal.clave2) {
                $http.post('API/usuario/subir_cambios_clave', { personal: usuario.personal })
                .success(function(data){
                    console.log(data);
                    $location.path("/inicio/panel");
                });
            }
            else{
                usuario.mostrar_mensaje();
            }
        }
        else{
            $http.post('API/usuario/subir_cambios', { personal: usuario.personal })
            .success(function(data){
                console.log(data);
                $location.path("/inicio/panel");
            });
        }
    }

    usuario.subir = function(){
        usuario.loginLoading = true;
        usuario.datos.rut_usuario = RutHelper.clean(usuario.datos.rut_usuario);
        if (usuario.datos.tipo_usuario == 'Profesor') {
            console.log([usuario.datos, usuario.info]);
            $http.post('API/usuario/subir_profesor', { usuario: usuario.datos, profesor: usuario.info })
            .success(function(data){
                console.log(data);
                $location.path("/usuarios/listado/" + 2);
                usuario.loginLoading = false;
            });
        }
        else if (usuario.datos.tipo_usuario == 'Alumno') {
            console.log([usuario.datos, usuario.info]);
            $http.post('API/usuario/subir_alumno', { usuario: usuario.datos, alumno: usuario.info })
            .success(function(data){
                console.log(data);
                $location.path("/usuarios/listado/" + 1);
                usuario.loginLoading = false;
            });
        }
        else if (usuario.datos.tipo_usuario == 'Apoderado') {
            console.log([usuario.datos, usuario.info]);
            $http.post('API/usuario/subir_apoderado', { usuario: usuario.datos, apoderado: usuario.info })
            .success(function(data){
                console.log(data);
                $location.path("/usuarios/listado/" + 4);
                usuario.loginLoading = false;
            });
        }
        else if (usuario.datos.tipo_usuario == 'Administrador') {
            console.log([usuario.datos, usuario.info, usuario.permisos]);
            $http.post('API/usuario/subir_admin', { usuario: usuario.datos, info: usuario.info, permisos: usuario.permisos })
            .success(function(data){
                console.log(data);
                $location.path("/usuarios/listado/" + 3);
                usuario.loginLoading = false;
            });
        }

    };

    usuario.traer_asignaturas = function(){
        $http.get('API/planificacion/get_asignaturas')
        .success(function(data){
            usuario.asignaturas = data;
            console.log(usuario.asignaturas);
        });
    }

    usuario.mostrar_mensaje = function(){
        toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'Las contraseñas no coinciden.',
            showCloseButton: true,
            timeout: 10000
        });
    }

    usuario.volver = function(){
        $location.path("/usuarios/listar");
    }

    usuario.traer_asignaturas();
    usuario.traer_correos();

    if (typeof $stateParams.propio !== 'undefined') {
        $http.get('API/usuario/get_usuario_conectado')
        .success(function(data){
            usuario.personal = data
        });
    }

    if (typeof $stateParams.id_usuario !== 'undefined') {
        console.log($stateParams.id_usuario);
        $http.get('API/usuario/get_usuario/' + $stateParams.id_usuario)
        .success(function(data){
            usuario.datos = data.usuario;
            usuario.info = data.info;
            usuario.permisos = data.permisos;
            usuario.info.asignaturas = data.asignaturas;
            console.log(data);
        });
    }
    else{
        usuario.traer_ruts();
    }
}
/**
*Controlador PARA LISTAR USUARIOS
*/
function ListaUsuarios($http, $location, $stateParams){
    var listaUsuario = this;
    listaUsuario.usuario = [];
    listaUsuario.alumno = [];
    listaUsuario.profesor = [];
    listaUsuario.apoderado = [];
    listaUsuario.asignaturas_profesor = [];
    listaUsuario.mostrar = [];
    listaUsuario.colores = ['','success', 'info', 'plain', 'primary', 'warning'];
    listaUsuario.muestra = false;
    listaUsuario.tipo = 1;

    if (typeof $stateParams.tipo !== 'undefined') {
        console.log($stateParams.tipo);
        console.log('pasa');
        listaUsuario.tipo = $stateParams.tipo;
    }

    listaUsuario.usuario_show = [];

    listaUsuario.mostrarLocal = function(id_usuario){
        listaUsuario.muestra = true;
        console.log(id_usuario);
        if (listaUsuario.usuario.length > 0) {
            for (var i = listaUsuario.usuario.length - 1; i >= 0; i--) {
                if (listaUsuario.usuario[i]['id_usuario'] == id_usuario) {
                    listaUsuario.usuario_show = listaUsuario.usuario[i];
                }
            }
        }
        if (listaUsuario.profesor.length > 0) {
            for (var i = listaUsuario.profesor.length - 1; i >= 0; i--) {
                if (listaUsuario.profesor[i]['id_usuario'] == id_usuario) {
                    listaUsuario.usuario_show = listaUsuario.profesor[i];
                    listaUsuario.traer_profesor_asignatura(listaUsuario.usuario_show.id_profesor);
                }
            }
        }
        if (listaUsuario.alumno.length > 0) {
            for (var i = listaUsuario.alumno.length - 1; i >= 0; i--) {
                if (listaUsuario.alumno[i]['id_usuario'] == id_usuario) {
                    listaUsuario.usuario_show = listaUsuario.alumno[i];
                }
            }
        }
        if (listaUsuario.apoderado.length > 0) {
            for (var i = listaUsuario.apoderado.length - 1; i >= 0; i--) {
                if (listaUsuario.apoderado[i]['id_usuario'] == id_usuario) {
                    listaUsuario.usuario_show = listaUsuario.apoderado[i];
                }
            }
        }
        console.log(listaUsuario.usuario_show);
    }

    listaUsuario.editarUsuario = function(id_usuario){
         $location.path("/usuarios/modificar_usuario/" + id_usuario);
    };

    listaUsuario.traer_profesor_asignatura = function(id_profesor){
        $http.get('API/usuario/get_profes_asignaturas/' + id_profesor)
        .success(function(data){
            listaUsuario.asignaturas_profesor = data;
            console.log(listaUsuario.asignaturas_profesor);
        });
    }

    $http.get('API/usuario/get_alumnos')
    .success(function(data){
        listaUsuario.alumno = data;
        console.log(listaUsuario.alumno);
    });

    $http.get('API/usuario/get_administrativos')
    .success(function(data){
        listaUsuario.usuario = data;
        console.log(listaUsuario.usuario);
    });

    $http.get('API/usuario/get_profes')
    .success(function(data){
        listaUsuario.profesor = data;
        console.log(listaUsuario.profesor);
    });

    $http.get('API/usuario/get_apoderados')
    .success(function(data){
        listaUsuario.apoderado = data;
        console.log(listaUsuario.apoderado);
    });
}
/**
*Controlador PARA MATRÍCULAS
*/
function MatriculaCtrl($http, $location, $stateParams, $uibModal, toaster, RutHelper, $state, $element, DTOptionsBuilder, SweetAlert){
    var matricula = this;
    matricula.matriculas = [];
    matricula.alumnos = {};
    matricula.apoderados = {};
    matricula.alumno = [];
    matricula.apoderado = [];
    matricula.menos = false;
    matricula.mas = false;
    matricula.paso_uno = true;
    matricula.paso_dos = false;
    matricula.paso_tres = false;
    matricula.egresado = false;

    var title = $element.attr('title');

    matricula.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: title},
            {extend: 'pdf', title: title},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ])
        .withLanguageSource('js/language/datatables/es.json');

    matricula.nuevo_usuario = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/matricula/modal_usuario.html',
            controller: NuevoUsuarioCtrl,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-ladda',
                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                        }
                    ]);
                }
            }
        });
    };

    matricula.cancelar = function(){
        matricula.paso_uno = true;
        matricula.paso_dos = false;
    }

    matricula.atras = function(){
        matricula.paso_dos = true;
        matricula.paso_tres = false;
    }

    matricula.mostrar_datos = function(){
        matricula.paso_uno = false;
        matricula.paso_dos = true;
        var rut = RutHelper.clean(matricula.rut_alumno);
        for (var i = matricula.alumnos.length - 1; i >= 0; i--) {
            if (matricula.alumnos[i].rut_usuario == rut) {
                matricula.alumno = matricula.alumnos[i];
                matricula.alumno.nombre = matricula.alumnos[i].nombres_usuario + ' ' + matricula.alumnos[i].apellido_paterno + ' ' + matricula.alumnos[i].apellido_materno;
                matricula.traer_informe(matricula.alumnos[i].id_usuario);
            }
        }

        console.log(matricula.alumnos);
        console.log(matricula.rut_alumno);
        console.log(matricula.alumno);
    }

    matricula.siguiente_paso = function(){
        matricula.paso_dos = false;
        matricula.paso_tres = true;
        var rut = RutHelper.clean(matricula.rut_apoderado);
        for (var i = matricula.apoderados.length - 1; i >= 0; i--) {
            if (matricula.apoderados[i].rut_usuario == rut) {
                matricula.apoderado = matricula.apoderados[i];
                matricula.apoderado.nombre = matricula.apoderados[i].nombres_usuario + ' ' + matricula.apoderados[i].apellido_paterno + ' ' + matricula.apoderados[i].apellido_materno;
            }
        }
        console.log(matricula.alumnos);
        console.log(matricula.rut_alumno);
        console.log(matricula.alumno);
    }

    matricula.hacer_matricula = function(){
        $http.post('API/matricula/subir_matricula', { alumno: matricula.alumno, apoderado: matricula.apoderado })
        .success(function(data){
            console.log(data);
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
        });
    }

    matricula.anular_matricula = function(id_matricula){
        SweetAlert.swal({
                title: "¿Esta seguro de Anular?",
                text: "Perderá el registro de esta matrícula.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, Anular",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Anulado", "La matrícula se anuló correctamente.", "success");
                    $http.get('API/matricula/anular_matricula/' + id_matricula)
                    .success(function(data){
                        console.log(data);
                    });
                    matricula.traer_matriculas();
                }
                else {
                    SweetAlert.swal("Cancelado", "La matrícula no se anuló.", "error");
                }
            });
        
    }

    matricula.verificar_rut_alm = function(rut_verificar){
        matricula.existe_rut_alm = false;
        matricula.rut_matriculado = false;
        var rut = RutHelper.clean(rut_verificar);
        for (var i = matricula.alumnos.length - 1; i >= 0; i--) {
            if (matricula.alumnos[i].rut_usuario == rut) {
                matricula.existe_rut_alm = true;
            }
        }
        for (var i = matricula.matriculas.length - 1; i >= 0; i--) {
            if (matricula.matriculas[i].rut_usuario == rut) {
                matricula.rut_matriculado = true;
            }
        }
    }

    matricula.verificar_rut_apd = function(rut_verificar){
        matricula.existe_rut_apd = false;
        var rut = RutHelper.clean(rut_verificar);
        for (var i = matricula.apoderados.length - 1; i >= 0; i--) {
            if (matricula.apoderados[i].rut_usuario == rut) {
                matricula.existe_rut_apd = true;
            }
        }
    }

    matricula.traer_matriculas = function(){
        $http.get('API/matricula/get_matriculas')
        .success(function(data){
            matricula.matriculas = data;
            for (var i = data.length - 1; i >= 0; i--) {
                matricula.matriculas[i].fecha_matricula = moment(data[i].fecha_matricula);
                matricula.matriculas[i].fecha_matricula = new Date(data[i].fecha_matricula);
            }
            console.log(matricula.matriculas);
        });
    }

    matricula.traer_alumnos = function(){
        $http.get('API/usuario/get_alumnos')
        .success(function(data){
            matricula.alumnos = data;
            console.log(matricula.alumnos);
        });
    }

    matricula.traer_apoderados = function(){
        $http.get('API/usuario/get_apoderados')
        .success(function(data){
            matricula.apoderados = data;
            console.log(matricula.apoderados);
        });
    }

    matricula.traer_informe = function(id_usuario){
        var estado = 'nuevo';
        $http.get('API/matricula/traer_promedios_finales_alumno/' + id_usuario)
        .success(function(data){
            console.log(data);
            if (data.length > 1) {
                var suma = 0;
                var rojos = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    suma = suma + parseInt(data[i].prom);
                    if (parseInt(data[i].prom) < 40) {
                        rojos ++;
                    }
                }
                var promedio = suma/data.length;
                if (rojos < 1 && promedio > 40){
                    estado = 'promovido';
                }
                else if (rojos < 2 && promedio > 45){
                    estado = 'promovido';
                }
                else if (rojos < 3 && promedio > 50){
                    estado = 'promovido';
                }
                else if (rojos < 4 && promedio > 55){
                    estado = 'promovido';
                }
                else{
                    estado = 'repitente';
                }
            }
            console.log(estado, promedio);
            matricula.estado = estado;

            if (matricula.alumno.nivel_alumno < 4) {
                if (matricula.estado == 'promovido') {
                    matricula.alumno.nuevo_nivel = (parseInt(matricula.alumno.nivel_alumno) + 1) + '° Medio';
                    matricula.alumno.nivel_alumno = parseInt(matricula.alumno.nivel_alumno) + 1;
                }
                else if (matricula.estado == 'repitente'){
                    matricula.alumno.nuevo_nivel = matricula.alumno.nivel_alumno + '° Medio';
                }
                else if (matricula.estado == 'nuevo'){
                    matricula.alumno.nuevo_nivel = matricula.alumno.nivel_alumno + '° Medio';
                }
            }
            else if (matricula.alumno.nivel_alumno == 4){
                if (matricula.estado == 'promovido') {
                    matricula.alumno.nuevo_nivel = 'Práctica Profesional';
                    matricula.alumno.nivel_alumno = 5;
                }
                else if (matricula.estado == 'repitente'){
                    matricula.alumno.nuevo_nivel = matricula.alumno.nivel_alumno + '° Medio';
                }
                else if (matricula.estado == 'nuevo'){
                    matricula.alumno.nuevo_nivel = matricula.alumno.nivel_alumno + '° Medio';
                }
            }
            else{
                matricula.egresado = true;
            }
        });
    }

    matricula.traer_matriculas();
    matricula.traer_alumnos();
    matricula.traer_apoderados();
}
/**
*Controlador PARA CREAR NUEVAS ASIGNATURAS
*/
function NuevoUsuarioCtrl ($scope, $uibModalInstance, $http, $state, RutHelper) {
    $scope.datos = {};
    $scope.info = {};
    $scope.ruts = {};
    $scope.correos = {};
    //required = true;
    $scope.estado_validacion = false;

    $scope.validar_rut = function(){
        var rut = RutHelper.clean($scope.datos.rut_usuario);
        $scope.existe_rut = false;
        $scope.estado_validacion = RutHelper.validate(rut);
        for (var i = $scope.ruts.length - 1; i >= 0; i--) {
            if ($scope.ruts[i] == rut) {
                $scope.existe_rut = true;
            }
        }
    }

    $scope.validar_correo = function(){
        $scope.existe_correo = false;
        var correo = $scope.datos.email_usuario;
        for (var i = $scope.correos.length - 1; i >= 0; i--) {
            if ($scope.correos[i]['email_usuario'] == correo) {
                $scope.existe_correo = true;
            }
        }
    }

    $scope.traer_ruts = function(){
        $http.get('API/usuario/get_ruts_usuarios')
        .success(function(data){
            $scope.ruts = data;
            console.log(data);
        });
    }

    $scope.traer_correos = function(){
        $http.get('API/usuario/get_correos_usuarios')
        .success(function(data){
            $scope.correos = data;
            console.log(data);
        });
    }

    $scope.subir = function(){
        $scope.loginLoading = true;
        $scope.datos.rut_usuario = RutHelper.clean($scope.datos.rut_usuario);
        if ($scope.datos.tipo_usuario == 'Alumno') {
            console.log([$scope.datos, $scope.info]);
            $http.post('API/usuario/subir_alumno', { usuario: $scope.datos, alumno: $scope.info })
            .success(function(data){
                console.log(data);
                $scope.loginLoading = false;
                $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                $uibModalInstance.dismiss('cancel');
            });
        }
        else if ($scope.datos.tipo_usuario == 'Apoderado') {
            console.log([$scope.datos, $scope.info]);
            $http.post('API/usuario/subir_apoderado', { usuario: $scope.datos, apoderado: $scope.info })
            .success(function(data){
                console.log(data);
                $scope.loginLoading = false;
                $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                $uibModalInstance.dismiss('cancel');
            });
        }
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.traer_ruts();
    $scope.traer_correos();
};
/**
*Controlador PARA GESTIONAR USUARIOS
*/
function FormularioProveedor($http, $location, $stateParams){
    proveedor = this;
    proveedor.datos = {};

    proveedor.volver = function(){
        $location.path("/implementos/gestion/proveedor/listar");
    }

    proveedor.subir = function(){
        console.log(proveedor.datos);
        $http.post('API/proveedor/subir_proveedor', { proveedor: proveedor.datos })
        .success(function(data){
            console.log(data);
            $location.path("/implementos/gestion/proveedor/listar");
        });
    };

    if (typeof $stateParams.id_proveedor !== 'undefined') {
        console.log($stateParams.id_proveedor);
        $http.get('API/proveedor/get_proveedor/' + $stateParams.id_proveedor)
        .success(function(data){
            proveedor.datos = data;
            console.log(proveedor.datos);
        });
    }
}
/**
*Controlador PARA GESTIONAR PRODUCTOS
*/
function FormularioProducto($http, $location, $stateParams){
    producto = this;
    producto.basico = {};
    producto.adicional = {};

    if (typeof $stateParams.id_implemento !== 'undefined') {
        console.log($stateParams.id_implemento);
        $http.get('API/implemento/get_implemento/' + $stateParams.id_implemento)
        .success(function(data){
            producto.basico = data.implemento;
            producto.adicional = data.adicional;
            console.log(data);
        });
    }

    producto.subir = function(){
        console.log([producto.basico, producto.adicional]);
        $http.post('API/implemento/subir_producto', { basico: producto.basico, adicional: producto.adicional })
        .success(function(data){
            console.log(data);
            $location.path("/implementos/gestion/lista");
        });
    };

    producto.volver = function(){
        $location.path("/implementos/gestion/lista");
    }
}
/**
*Controlador PARA GESTIONAR A LOS PROFESORES
*/
function FormularioProfesor($http, $location, $stateParams){
    este = this;
    este.usuario = {};
    este.profesor = {};
    este.required = true;

    if (typeof $stateParams.rut_usuario !== 'undefined') {
        console.log($stateParams.rut_usuario);
        $http.get('API/usuario/get_profesor/' + $stateParams.rut_usuario)
        .success(function(data){
            este.usuario = data.usuario;
            este.profesor = data.profesor;
        });
    }

    este.subir = function(){
        console.log([este.usuario, este.profesor]);
        $http.post('API/usuario/subir_profesor', { usuario: este.usuario, profesor: este.profesor })
        .success(function(data){
            console.log(data);
            $location.path("/usuarios/listado/"+2);
        });
    };
}
/**
*Controlador PARA GESTIONAR LAS NOTAS
*/

function CalificacionCtrl($http, $location, DTOptionsBuilder, $stateParams, SweetAlert , toaster, $element, $state, ServiceNotificaciones){

    nota = this;
    nota.cursos = {};
    nota.asignaturas = {};
    nota.periodos = {};
    nota.permisos = $state.usuario.roles[0];
    nota.id_usuario = $state.usuario.permisos.id_usuario;
    nota.cursos_anuales = {};
    nota.bloqueo_year = false;

    var f = new Date();
    var fecha = f.getFullYear();
    console.log(fecha);
    if($state.year.year == fecha){
        nota.bloqueo_year = false;
    }
    else
    {
        nota.bloqueo_year = true;
    }


    var urlMod = $element.attr('url-mod');
    var urlGet = $element.attr('url-get');
    var title = $element.attr('title');
    nota.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: title},
            {extend: 'pdf', title: title},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ])
        .withLanguageSource('js/language/datatables/es.json');

    nota.nombre_curso = '';
    nota.nombre_asignatura = '';
    nota.id_curso  = 0;
    nota.id_detalle = 0;
    nota.id_periodo = 0;

    nota.cantidad_notas=3;
    nota.c_notas = 3;
    nota.periodos_actual = {};
    nota.notas_alumno = {};
    nota.id_periodo_seleccionado = 0;


    nota.cambiar_cantidad = function() {
             SweetAlert.swal({
                title: "¿Esta seguro?",
                text: "Si descuenta notas se borraran.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, confirmar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Listo", "Se cambio la cantidad de notas.", "success");
                      $http.post('API/planificacion/cambiar_cantidad_notas', { id_periodo: nota.id_periodo, cantidad_notas: nota.c_notas })
                         .success(function(data){
                            nota.c = nota.c_notas;
                            nota.cantidad_notas = nota.c_notas;
                            if(nota.permisos == 'adm' ){
                                nota.traer_notas_adm();
                            }
                            else{
                                 nota.traer_notas();
                            }
                            nota.cantidad_notas = nota.c;
                            nota.c_notas = nota.c;
                        });
                }
                else {
                    SweetAlert.swal("Cancelado", "No se cambio la cantidad.", "error");
                    nota.c_notas = nota.cantidad_notas;
                }
            });
    };

    // Generales Registro y mis registros

        nota.crear_arreglo = function () {
            //console.log(enlace.curso);
             $http.get('API/planificacion/get_arreglo_cursos')
            .success(function(data){
                nota.cursos_anuales = data;
                if(nota.cursos_anuales.length > 0)
                {
                    nota.id_curso = nota.cursos_anuales[0]['id_curso_anual'];
                    nota.traer_alumnos_asignados();
                }
            });
        };

        nota.traer_alumnos_asignados = function () {
            $http.get('API/planificacion/get_alumnos_asignados/' + nota.id_curso)
            .success(function(data){
                nota.alumnos_asignados = data;
                if(nota.alumnos_asignados.length > 0){
                    nota.id_usuario = nota.alumnos_asignados[0]['id_usuario'];
                    nota.traer_notas_alumno();
                }
                else{
                    nota.notas_alumno = {};
                }
            });
        };

        nota.traer_cursos = function() {
            $http.get('API/planificacion/get_cursos_profe')
            .success(function(data){
                nota.cursos = data;
                if (nota.cursos.length >0){
                    nota.id_curso = nota.cursos[0]['id_curso_anual'];
                    console.log(nota.id_curso);
                    nota.cambiar_curso();
                }
            });
        };

        nota.cambiar_curso = function() {
            $http.get('API/planificacion/get_profe_asignaturas/' +  nota.id_curso)
                .success(function(data){
                   nota.asignaturas = data;
                   if (nota.asignaturas.length >0){
                        nota.id_detalle = nota.asignaturas[0]['id_detalle_curso_anual'];
                        nota.cambiar_asignatura();
                    }
                   angular.forEach(nota.cursos, function(value, key){
                       if(value['id_curso_anual'] == nota.id_curso){
                        nota.nombre_curso = value['nombre_curso_anual'];
                       }
                   });
            });
        }

        nota.cambiar_asignatura = function() {
              $http.get('API/planificacion/get_profe_periodos/' +  nota.id_detalle)
                .success(function(data){
                    console.log(data);
                   nota.periodos = data;
                   if (nota.periodos.length >0){
                        nota.id_periodo = nota.periodos[0]['id_periodo_asignatura_anual'];
                        nota.cambiar_periodo();
                   }

                   angular.forEach(nota.asignaturas, function(value, key){
                       if(value['id_detalle_curso_anual'] == nota.id_detalle){
                        nota.nombre_asignatura = value['nombre_asignatura'];
                       }
                   });
            });
        }

        nota.cambiar_periodo = function() {
                    angular.forEach(nota.periodos, function(value, key){
                       if(value['id_periodo_asignatura_anual'] == nota.id_periodo){
                        nota.cantidad_notas = value['cantidad_notas'];
                        nota.c_notas = nota.cantidad_notas;
                        nota.traer_notas();
                       }
                   });
        }

        nota.traer_notas = function() {
            $http.post('API/planificacion/get_notas', { id_curso_anual: nota.id_curso, id_asignatura: nota.id_detalle,
               id_periodo: nota.id_periodo, cantidad_notas: nota.cantidad_notas})
                .success(function(data){
                    console.log(data);
                    nota.notas = data;
                    nota.promediar();
            });
        }

        nota.guardar_notas = function() {
            if(nota.notas.length > 0){
                $http.post('API/planificacion/guardar_notas', { notas: nota.notas, id_curso_anual: nota.id_curso,
                   id_periodo: nota.id_periodo, cantidad_notas: nota.cantidad_notas, nombre_asignatura: nota.nombre_asignatura})
                .success(function(data){
                    toaster.pop({
                        type: 'success',
                        title: 'Correcto',
                        body: 'Notas guardadas exitosamente.',
                        showCloseButton: true,
                        timeout: 10000
                    });
                    if(nota.permisos == 'adm' ){
                        nota.traer_notas_adm();
                    }
                    else{
                        nota.traer_notas();
                    }
                });
                //enviar notificaciones WEB
                ServiceNotificaciones.agregar_notificacion(nota.notas, nota.nombre_asignatura);
            } 
            else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'El curso no tiene alumnos.',
                    showCloseButton: true,
                    timeout: 10000
                });
            }
        };

        nota.promediar = function(){
            var suma = 0;
            var promedio = 0;
            angular.forEach(nota.notas, function(value, key){
                for (var i = 0; i < nota.cantidad_notas; i++) {
                    suma = suma + parseInt(value['n'+ parseInt(i +1)]);
                }
                promedio = suma / nota.cantidad_notas;
                //promedio = $filter('number : 0')(promedio);
                value['prom'] = Math.round(promedio);
                suma = 0;
                promedio = 0;
            });
        }

        nota.actualizar_json = function(){
            console.log('hola');
                                         }

        nota.traer_periodos_alumno = function(){
           $http.get('API/planificacion/get_periodos_alumno')
            .success(function(data){
                console.log(data);
                nota.periodos_actual = data;
                if(nota.periodos_actual.length > 0){
                    nota.id_periodo_seleccionado = nota.periodos_actual[0]['id_periodo'];
                    nota.traer_notas_alumno();
                                                    }
                                  });
        };

        nota.traer_notas_alumno = function(){
           $http.post('API/planificacion/traer_notas_alumno', {id_usuario: nota.id_usuario, id_periodo: nota.id_periodo_seleccionado})
            .success(function(data){
                console.log(data);
                nota.notas_alumno = data;
            });
        };

        nota.traer_alumnos_apoderado = function(){
           $http.get('API/planificacion/traer_alumnos_apoderado')
            .success(function(data){
                console.log(data);
                nota.alumnos_asignados = data;
                 if(nota.alumnos_asignados.length > 0){
                    nota.id_usuario = nota.alumnos_asignados[0]['id_usuario'];
                    //nota.traer_notas_alumno();
                    console.log(nota.id_usuario+' ' + nota.id_periodo);
                }else{
                    nota.notas_alumno = {};
                }
            });
        }
    //

    //Admin Registros
        nota.crear_arreglo_admin = function () {
            //console.log(enlace.curso);
             $http.get('API/planificacion/get_arreglo_cursos')
            .success(function(data){
                nota.cursos_selec = data;
                console.log(nota.cursos_selec);
                if(nota.cursos_selec.length > 0)
                {
                    nota.id_curso_selec = nota.cursos_selec[0]['id_curso_anual'];
                    console.log(nota.id_curso_selec);
                    nota.cambiar_curso_adm();
                }
            });
        };

        nota.cambiar_curso_adm = function() {
            $http.get('API/planificacion/get_curso_asignaturas/' +  nota.id_curso_selec)
                .success(function(data){
                    console.log(data);
                   nota.asignaturas = data;
                   if (nota.asignaturas.length >0){
                        nota.id_detalle = nota.asignaturas[0]['id_detalle_curso_anual'];
                        nota.cambiar_asignatura_adm();
                    }
                  });
        }

        nota.cambiar_asignatura_adm = function() {
              $http.get('API/planificacion/get_profe_periodos/' +  nota.id_detalle)
                .success(function(data){
                    console.log(data);
                   nota.periodos = data;
                   if (nota.periodos.length >0){
                        nota.id_periodo = nota.periodos[0]['id_periodo_asignatura_anual'];
                        nota.cambiar_periodo_adm();
                   }

                   angular.forEach(nota.asignaturas, function(value, key){
                       if(value['id_detalle_curso_anual'] == nota.id_detalle){
                        nota.nombre_asignatura = value['nombre_asignatura'];
                       }
                   });
            });
        }

        nota.cambiar_periodo_adm = function() {
                    angular.forEach(nota.periodos, function(value, key){
                       if(value['id_periodo_asignatura_anual'] == nota.id_periodo){
                        nota.cantidad_notas = value['cantidad_notas'];
                        nota.c_notas = nota.cantidad_notas;
                        nota.traer_notas_adm();
                       }
                   });
        }

        nota.traer_notas_adm = function() {
            $http.post('API/planificacion/get_notas', { id_curso_anual: nota.id_curso_selec, id_asignatura: nota.id_detalle,
               id_periodo: nota.id_periodo, cantidad_notas: nota.cantidad_notas})
                .success(function(data){
                    console.log(data);
                    nota.notas = data;
                    nota.promediar();
            });
        }
    //
    nota.subir = function(){
        console.log([nota.usuario, nota.profesor]);
        $http.post('API/usuario/subir_profesor', { usuario: nota.usuario, profesor: nota.profesor })
        .success(function(data){
            console.log(data);
            $location.path("/usuarios/listado/"+2);
        });
    };


    nota.promediar(0);
    nota.traer_cursos();
    nota.traer_periodos_alumno();
    console.log(nota.permisos);
    if(nota.permisos == 'apd'){
        nota.traer_alumnos_apoderado();
    }else if(nota.permisos == 'adm' ){
        nota.crear_arreglo();
        nota.crear_arreglo_admin();
    }
}/**
*Controlador PARA GESTIONAR LAS NOTAS
*/

function MiHorarioCtrl($http, $location, $stateParams, $element, $state, ServiceNotificaciones, ordenarDatos){

    horario = this;
    horario.cursos = {};
    horario.asignaturas = {};
    horario.periodos = {};
    horario.permisos = $state.usuario.roles[0];
    horario.id_usuario = $state.usuario.permisos.id_usuario;
    horario.cursos_anuales = {};

    horario.nombre_curso = '';
    horario.id_curso  = 0;
    horario.cursos_selec = {};

    horario.traer_cursos_adm = function(){
        $http.get('API/planificacion/get_arreglo_cursos')
                    .success(function(data){
                        horario.cursos_selec = data;
                        if(horario.cursos_selec.length > 0)
                        {
                            horario.id_curso_selec = horario.cursos_selec[0]['id_curso_anual'];
                            horario.traer_horario();
                        }
                    });
    }


    horario.traer_horario = function(){
        $http.get('API/horario/get_horario/' + horario.id_curso_selec)
        .success(function(data){
            horario.respaldo = data;
            horario.horario = ordenarDatos.desdeAPI(data);
        });
    }

    horario.cambiar_curso_adm = function(){
        horario.traer_horario();
    }

    horario.cambiar_curso_apd = function(id_curso){
        horario.id_curso_selec = id_curso;
        horario.traer_horario();
    }


    horario.traer_alumnos_apoderado = function(){
           $http.get('API/planificacion/traer_alumnos_apoderado')
            .success(function(data){
                console.log(data);
                horario.alumnos_asignados = data;
                 if(horario.alumnos_asignados.length > 0){
                    horario.id_usuario = horario.alumnos_asignados[0]['id_usuario'];
                    horario.id_curso_selec = horario.alumnos_asignados[0]['id_curso'];
                    horario.traer_horario();
                }
            });
    }

    horario.traer_bloques = function(){
        $http.get('API/planificacion/get_bloques')
        .success(function(data){
            horario.bloques = data;
        });
    }

    horario.traer_bloques();
    if(horario.permisos == 'apd'){
    horario.traer_alumnos_apoderado();
    }else if(horario.permisos == 'adm' ){
        horario.traer_cursos_adm();
    }else {
        horario.id_curso_selec = horario.permisos = $state.usuario.id_curso_anual;
       horario.traer_horario();
    }
}/**
*Controlador PARA GESTIONAR LAS NOTAS
*/
function AsistenciaCtrl($http, $location, DTOptionsBuilder, $stateParams, toaster, $state){
    nota = this;
    nota.cursos = {};
    nota.asignaturas = {};
    nota.periodos = {};
    nota.esperar = false;
    nota.bloqueo_year = false;

    var f = new Date();
    var fecha = f.getFullYear();
    if($state.year.year == fecha){
        nota.bloqueo_year = false;
        nota.esperar = false;        
    }
    else
    {
        nota.bloqueo_year = true;
        nota.esperar = true;
    }

    var hoy = new Date();

    nota.permisos = $state.usuario.roles[0];
    nota.id_usuario = $state.usuario.permisos.id_usuario;
    nota.fecha_seleccionada = hoy;

    nota.traer_dias = function () {
         $http.get('API/planificacion/get_dias')
            .success(function(data){
               nota.dias = data;
               if(nota.dias.length >0){
                nota.lunes = nota.dias[0]['lunes'];
                nota.martes = nota.dias[0]['martes'];
                nota.miercoles = nota.dias[0]['miercoles'];
                nota.jueves = nota.dias[0]['jueves'];
                nota.viernes = nota.dias[0]['viernes'];

                nota.lu = nota.dias[0]['lu'];
                nota.ma = nota.dias[0]['ma'];
                nota.mi = nota.dias[0]['mi'];
                nota.ju = nota.dias[0]['ju'];
                nota.vi = nota.dias[0]['vi'];
               }
        });
    }

    nota.crear_arreglo = function () {
        //console.log(enlace.curso);
         $http.get('API/planificacion/get_arreglo_cursos')
        .success(function(data){
            nota.cursos = data;
            if(nota.cursos.length > 0)
            {
                nota.id_curso = nota.cursos[0]['id_curso_anual'];
                nota.cambiar_curso_adm();
            }
        });
    };

    nota.cambiar_curso_adm = function() {
        $http.get('API/planificacion/get_curso_asignaturas/' +  nota.id_curso)
            .success(function(data){
               nota.asignaturas = data;
               if (nota.asignaturas.length >0){
                    nota.id_detalle = nota.asignaturas[0]['id_detalle_curso_anual'];
                    nota.cambiar_asignatura_adm();
                }
              });
    }

    nota.cambiar_asignatura_adm = function() {
          $http.get('API/planificacion/get_profe_periodos/' +  nota.id_detalle)
            .success(function(data){
               nota.periodos = data;
               if (nota.periodos.length >0){
                    nota.id_periodo = nota.periodos[0]['id_periodo_asignatura_anual'];
                    nota.traer_periodos_adm();
               }

               angular.forEach(nota.asignaturas, function(value, key){
                   if(value['id_detalle_curso_anual'] == nota.id_detalle){
                    nota.nombre_asignatura = value['nombre_asignatura'];
                   }
               });
        });
    }

    nota.traer_periodos_adm = function(){
       $http.get('API/planificacion/get_profe_periodos/' +  nota.id_detalle)
            .success(function(data){
            nota.periodos_actual = data;
            if(nota.periodos_actual.length > 0){
                nota.id_periodo_seleccionado = nota.periodos_actual[0]['id_periodo_asignatura_anual'];
                nota.fecha_inicio = nota.periodos_actual[0]['fecha_inicio'];
                nota.fecha_fin = nota.periodos_actual[0]['fecha_fin'];
                nota.traer_semanas_admin();
                                                }
                              });
    };

    nota.traer_semanas_admin = function () {
         $http.post('API/planificacion/get_fecha_adm',{fecha_inicio: nota.fecha_inicio, fecha_fin: nota.fecha_fin})
            .success(function(data){
            nota.semanas = data;
            if(nota.semanas.length > 0){
                nota.fecha_seleccionada = nota.semanas[0]['viernes'];
                nota.traer_dias_admin();
            }
        });
    };

    nota.cambiar_periodo_adm = function() {           
                angular.forEach(nota.periodos_actual, function(value, key){
                   if(value['id_periodo_asignatura_anual'] == nota.id_periodo){
                    nota.fecha_inicio = value['fecha_inicio'];
                    nota.fecha_fin = value['fecha_fin'];
                    nota.traer_semanas_admin();
                   }
               });
    };

    nota.traer_dias_admin = function () {
         $http.post('API/planificacion/get_dias_admin',{fecha: nota.fecha_seleccionada})
            .success(function(data){
               nota.dias = data;
               if(nota.dias.length >0){
                nota.lunes = nota.dias[0]['lunes'];
                nota.martes = nota.dias[0]['martes'];
                nota.miercoles = nota.dias[0]['miercoles'];
                nota.jueves = nota.dias[0]['jueves'];
                nota.viernes = nota.dias[0]['viernes'];

                nota.lu = nota.dias[0]['lu'];
                nota.ma = nota.dias[0]['ma'];
                nota.mi = nota.dias[0]['mi'];
                nota.ju = nota.dias[0]['ju'];
                nota.vi = nota.dias[0]['vi'];
                nota.traer_asistencia();
               }
        });
    }

    nota.traer_cursos = function() {
            $http.get('API/planificacion/get_cursos_profe')
            .success(function(data){
                nota.cursos = data;
                if (nota.cursos.length >0){
                    nota.id_curso = nota.cursos[0]['id_curso_anual'];
                    nota.cambiar_curso();
                }
        });
    };

    nota.cambiar_curso = function() {
        $http.get('API/planificacion/get_profe_asignaturas/' +  nota.id_curso)
            .success(function(data){
               nota.asignaturas = data;
               if (nota.asignaturas.length >0){
                    nota.id_detalle = nota.asignaturas[0]['id_detalle_curso_anual'];
                    nota.cambiar_asignatura();
                }
               angular.forEach(nota.cursos, function(value, key){
                   if(value['id_curso_anual'] == nota.id_curso){
                    nota.nombre_curso = value['nombre_curso_anual'];
                   }
               });
        });
    }


    nota.cambiar_asignatura = function() {
          $http.get('API/planificacion/get_profe_periodo_actual/' +  nota.id_detalle)
            .success(function(data){
               nota.periodos = data;
               if (nota.periodos.length >0){
                    nota.id_periodo = nota.periodos[0]['id_periodo_asignatura_anual'];
                    nota.nombre_periodo =  nota.periodos[0]['nombre_periodo'];
                    nota.cambiar_periodo();
               }
        });
    }

    nota.cambiar_periodo = function() {
                angular.forEach(nota.periodos, function(value, key){
                   if(value['id_periodo_asignatura_anual'] == nota.id_periodo){
                    nota.cantidad_notas = value['cantidad_notas'];
                    nota.traer_asistencia();
                   }
               });
        }
    nota.traer_asistencia = function() {
        nota.esperar =true;
        $http.post('API/planificacion/get_asistencia', { id_curso_anual: nota.id_curso, id_asignatura: nota.id_detalle,
           id_periodo: nota.id_periodo, fecha: nota.fecha_seleccionada})
            .success(function(data){
                nota.asistencias = data;
                if(nota.bloqueo_year){
                    nota.esperar = true;
                }
                else
                {
                    nota.esperar = false;
                }
        });
    }

    nota.guardar_asistencia = function() {
        if(nota.asistencias.length > 0){
            if(nota.permisos == 'prf'){
                $http.post('API/planificacion/guardar_asistencia', { asistencia: nota.asistencias})
                .success(function(data){

                    toaster.pop({
                        type: 'success',
                        title: 'Correcto',
                        body: 'asistencia guardada exitosamente.',
                        showCloseButton: true,
                        timeout: 10000
                    });

                    nota.traer_asistencia();
            });
            } else {
                 $http.post('API/planificacion/guardar_asistencia_admin', { asistencia: nota.asistencias})
                .success(function(data){

                    toaster.pop({
                        type: 'success',
                        title: 'Correcto',
                        body: 'asistencia guardada exitosamente.',
                        showCloseButton: true,
                        timeout: 10000
                    });

                    nota.traer_asistencia();
                }); 
            }         
        } else {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'El curso no tiene alumnos.',
                showCloseButton: true,
                timeout: 10000
                        });
                }

    };

    nota.actualizar_json = function(){
    }

    if(nota.permisos == 'prf'){
    nota.traer_dias();
    nota.traer_cursos();        
    }else{
        nota.crear_arreglo();
    }

}
/**
*Controlador PARA LISTAR USUARIOS
*/
function ProductoCtrl($http, $location, $stateParams, toaster, $sce){
    var producto = this;
    producto.info = {};
    producto.detalle = {};

    if (typeof $stateParams.id_implemento !== 'undefined') {
        $http.get('API/implemento/get_implemento/' + $stateParams.id_implemento)
        .success(function(data){
            producto.info = data.implemento;
            producto.detalle = data.adicional;
            if (producto.info.ruta_imagen == null) {
                producto.info.ruta_imagen="sin_imagen.jpg";
            }
            if (producto.detalle.ruta_imagen_2 == null) {
                producto.detalle.ruta_imagen_2 = "sin_imagen.jpg";
            }
            if (producto.detalle.ruta_imagen_3 == null) {
                producto.detalle.ruta_imagen_3 = "sin_imagen.jpg";
            }
            producto.info.cantidad = 1;
        });
    }

    producto.trustAsHtml = function(string){
        return $sce.trustAsHtml(string);
    }

    producto.mostrar_mensaje = function(){
        toaster.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Implemento agregado correctamente al Carro de Compras.',
            showCloseButton: true,
            timeout: 10000
        });
    }

    producto.mostrarUsuario = function(id_usuario){
        producto.muestra = true;
        $http.get('API/usuario/get_usuario/' + id_usuario)
        .success(function(data){
            producto.usuario_show = data;
        });
    };

    producto.editarUsuario = function(id_usuario){
         $location.path("/usuarios/modificar_alumno/" + id_usuario);
    };

    producto.volver = function(){
        $location.path("/implementos/productos/mostrar");
    }

    producto.ir_carro = function(){
        $location.path("/implementos/productos/carro");
    }

    producto.agregar_producto = function(){
        $http.post('API/carro/agregar_implemento', { implemento: producto.info })
        .success(function(data){
            producto.mostrar_mensaje();
        });
    }
}
/**
*Controlador PARA LISTAR EL CARRO DE COMPRA
*/
function CarroCtrl($http, $location, $stateParams, toaster){
    var carro = this;
    carro.productos = {};

    carro.volver = function(){
        $location.path("/implementos/productos/mostrar");
    }

    carro.agregar_carro = function(){
        $http.post('API/carro/agregar_implemento', { implemento: carro.productos })
        .success(function(data){

        });
    }

    carro.mostrar_mensaje = function(tipo, mensaje){
        toaster.pop({
            type: tipo,
            title: 'Aviso',
            body: mensaje,
            showCloseButton: true,
            timeout: 10000
        });
    }

    carro.eliminar_producto = function(id_implemento){
        $http.post('API/carro/quitar_implemento/' + id_implemento)
        .success(function(data){
            carro.listar();
            carro.mostrar_mensaje('success','Implemento borrado correctamente del Carro de Compras.');
        });
    }

    carro.limpiar = function(){
        $http.post('API/carro/limpiar_carro')
        .success(function(data){
            carro.listar();
            carro.mostrar_mensaje('warning','Se ha vaceado el Carro de Compras.');
        });
    }

    carro.sumar = function(){
        var mult = 0;
        carro.suma = 0;
        for (var i = carro.productos.length - 1; i >= 0; i--) {
            mult = carro.productos[i]['cantidad'] * carro.productos[i]['precio_implemento'];
            carro.suma += mult;
        }
    }

    carro.enviar_total = function(){
        if(carro.productos.length > 0){
            $http.post('API/carro/actualizar_carro/' + carro.suma)
            .success(function(data){
                $location.path("/implementos/productos/pago");
            });
        }
        else{
            carro.mostrar_mensaje('error','No hay productos en el Carro.');
        }

    }

    carro.listar = function(){
        $http.get('API/carro/listar_carro')
        .success(function(data){
            carro.productos = data;
            carro.cant = carro.productos.length;
            carro.sumar();
        });
    }

    carro.preparebody = function(tour){
        $('body').addClass('tour-open')
    };

    carro.clearbody = function(tour){
        $('body').removeClass('tour-close')
    }

    carro.listar();
}
/**
*Controlador PARA LISTAR EL PAGO
*/
function PagoCtrl($http, $location, $stateParams, toaster, $timeout){
    var pago = this;
    pago.detalle = {};
    pago.tarjeta = {};
    pago.tarjeta.icono = 'fa-credit-card';
    pago.tarjeta.valida = false;

    pago.volver = function(){
        $location.path("/implementos/productos/carro");
    }

    pago.mostrar_mensaje = function(){
        toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'El Número de la Tarjeta no es Valido',
            showCloseButton: true,
            timeout: 10000
        });
    }

    pago.mostrar_mensaje_exitoso = function(){
        toaster.pop({
            type: 'success',
            title: '¡Compra Exitosa!',
            body: 'Se le envio a su correo el Comprobate de su Compra',
            showCloseButton: true,
            timeout: 5000
        });
        $timeout(function(){
            $location.path("/implementos/productos/mostrar")
        }, 5000);
    }

    pago.realizar_pago = function(){
        console.log(pago.detalle);
        console.log(pago.tarjeta);
        if(pago.tarjeta.valida){
            pago.loginLoading = true;
            $timeout(function() { pago.loginLoading = 0.1; }, 500);
            $timeout(function() { pago.loginLoading += 0.2; }, 1000);
            $timeout(function() { pago.loginLoading += 0.3; }, 1500);
            $http.post('API/pago/realizar_pago', { detalle: pago.detalle, tarjeta: pago.tarjeta })
            .success(function(data){
                console.log(data);
                pago.loginLoading = false;
                pago.mostrar_mensaje_exitoso();
            });
        }
        else{
            pago.mostrar_mensaje();
        }
    }

    pago.paypal = function(){
        console.log(pago.detalle);
        pago.loginLoading = true;
        $timeout(function() { pago.loginLoading = 0.1; }, 500);
        $timeout(function() { pago.loginLoading += 0.2; }, 1000);
        $timeout(function() { pago.loginLoading += 0.3; }, 1500);
        $http.post('API/pago/realizar_pago_paypal', { detalle: pago.detalle })
        .success(function(data){
            console.log(data);
            pago.loginLoading = false;
            pago.mostrar_mensaje_exitoso();
        });
    }

    pago.calcular_cuotas = function(){
        var interes=0.01;
        var valor_cuota=0;

        if (pago.detalle.cantidad_cuotas>3) {
            valor_cuota=(interes*(pago.detalle.neto))/(1-(Math.pow((1+interes),-pago.detalle.cantidad_cuotas)));
        }
        else{
            valor_cuota=pago.detalle.neto / pago.detalle.cantidad_cuotas;
        }
        pago.detalle.cuota_total=valor_cuota;
        console.log(pago.detalle.cuota_total);
    }

    pago.verificar_tipo_tarjeta = function(){
        var num = pago.tarjeta.numero_cuenta;
        pago.tarjeta.valida = false;

        if(num){

            var charCount = num.length;

            if(charCount == 1) {
                if(num == "4"){
                    pago.tarjeta.tipo = 'VISA';
                    pago.tarjeta.icono = 'fa-cc-visa text-success';
                }
            }

            if(charCount == 2){
                if(num == "34" || num == "37"){
                    pago.tarjeta.tipo = 'AMEX';
                    pago.tarjeta.icono = 'fa-cc-amex text-success';
                } else if( num == "51" || num == "55" || num == "53"){
                    pago.tarjeta.tipo = 'MASTER CARD';
                    pago.tarjeta.icono = 'fa-cc-mastercard text-warning';
                } else if( num == "55" ){
                    pago.tarjeta.tipo = 'DISCOVER';
                    pago.tarjeta.icono = 'fa-cc-discover text-danger';
                }
            }

            if(charCount == 3){
                if(num == "644"){
                    pago.tarjeta.tipo = 'DISCOVER';
                    pago.tarjeta.icono = 'fa-cc-discover text-danger';
                }
            }

            if(charCount == 4){
                if(num == "6011"){
                    pago.tarjeta.tipo = 'DISCOVER';
                    pago.tarjeta.icono = 'fa-cc-discover text-danger';
                }
            }

            if(charCount == 13 || charCount == 14 || charCount == 15 || charCount == 16){
                var valid = pago.validar_tarjeta(num, charCount);
                if(valid){
                    pago.tarjeta.valida = true;
                }
                else {
                    pago.tarjeta.valida = false;
                }
            }
        }
        else{
            pago.tarjeta.tipo = '';
            pago.tarjeta.icono = 'fa-credit-card';
        }
    }

    pago.validar_tarjeta = function(ccNum, charCount){
        var double = true;
        var numArr = [];
        var sumTotal = 0;
        for(i=0; i<charCount; i++){
            var digit = parseInt(ccNum.charAt(i));

            if(double){
                digit = digit * 2;
                digit = pago.toSingle(digit);
                double = false;
            } else {
                double = true;
            }
            numArr.push(digit);
        }


        for(i=0; i<numArr.length; i++){
            sumTotal += numArr[i];
        }
        var diff = eval(sumTotal % 10);
        //console.log(diff);
        //console.log(diff == "0");
        return (diff == "0");
    }

    pago.toSingle = function(digit){
        if(digit > 9){
            var tmp = digit.toString();
            var d1 = parseInt(tmp.charAt(0));
            var d2 = parseInt(tmp.charAt(1));
            return (d1 + d2);
        } else {
            return digit;
        }
    }

    pago.listar = function(){
        $http.get('API/pago/listar_pago')
        .success(function(data){
            pago.detalle = data;
            pago.detalle.cantidad_cuotas = 1;
            pago.calcular_cuotas();
            console.log(pago.detalle);
        });
    }

    pago.listar();
}
/**
*Controlador PARA EL CLIENTE
*/
function FormularioCliente($http, $location, $stateParams){
    cliente = this;
    cliente.usuario = {};
    cliente.empresa = {};

    if (typeof $stateParams.id_empresa !== 'undefined') {
        console.log($stateParams.id_empresa);
        $http.get('API/cliente/get_empresa/' + $stateParams.id_empresa)
        .success(function(data){
            cliente.usuario = data.usuario;
            cliente.empresa = data.empresa;
        });
    }

    cliente.subir = function(){
        console.log([cliente.usuario, cliente.empresa]);
        $http.post('API/cliente/subir_cliente', { usuario: cliente.usuario, empresa: cliente.empresa })
        .success(function(data){
            console.log(data);
            $location.path("/clientes/lista");
        });
    };
    cliente.volver = function(){
        $location.path("/clientes/lista");
    }
}
/**
*Controlador Solicitar Acceso
*/
function FormularioSolicitarAcceso($http, $location, $stateParams){
    cliente = this;
    cliente.usuario = {};
    cliente.empresa = {
        id_tipo_cliente: 5
    };

    cliente.subir = function(){
        console.log([cliente.usuario, cliente.empresa]);
        $http.post('API/cliente/subir_cliente', { usuario: cliente.usuario, empresa: cliente.empresa })
        .success(function(data){
            console.log(data);
            $location.path("/login");
        });
    };
}
/**
*Controlador GENERICO QUE DESPLEGA UN TABLA DESDE UNA API EN ESPECIFICO
*/
function TablaCtrl($http, DTOptionsBuilder, $element, $location, $state, $stateParams, $uibModal, SweetAlert){
    var table = this;
    var urlMod = $element.attr('url-mod');
    var urlGet = $element.attr('url-get');
    var title = $element.attr('title');

    table.data = [];

    table.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: title},
            {extend: 'pdf', title: title},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ])
        .withLanguageSource('js/language/datatables/es.json');

    $http.get(urlGet).success(function(data){
        table.data = data;
        console.log(data);
    });

    table.mod = function(id_element){
        $location.path(urlMod + id_element);
    }

    table.sumAttr = function(attr){
        var sum = 0;
        $.each(table.data, function(index, value){
            sum += parseInt(value[attr]);
        });
        return sum;
    }

    table.open1 = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/implementos/modal_pedido.html',
            controller: ModalInstanceCtrl,
            resolve: {
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.nueva_asignatura = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_asignatura.html',
            controller: NuevaAsignaturaCtrl,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                item: function () {
                    return 1;
                }
            }
        });
    };

    table.modificar_asignatura = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_asignatura.html',
            controller: NuevaAsignaturaCtrl,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.nuevo_curso = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_curso.html',
            controller: NuevoCursoCtrl,
            resolve: {
                item: function () {
                    return 1;
                }
            }
        });
    };

    table.modificar_curso = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_curso.html',
            controller: NuevoCursoCtrl,
            resolve: {
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.nuevo_periodo = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_periodo.html',
            controller: NuevoPeriodoCtrl,
            resolve: {
                item: function () {
                    return 1;
                    }
                }
            });
        };

    table.modificar_periodo = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/asignaciones/modal_periodo.html',
            controller: NuevoPeriodoCtrl,
            resolve: {
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.nuevo_bloque = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/horario/modal_bloque.html',
            controller: NuevoBloqueCtrl,
            resolve: {
                item: function () {
                    return 1;
                }
            }
        });
    };

    table.modificar_bloque = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/horario/modal_bloque.html',
            controller: NuevoBloqueCtrl,
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
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.nuevo_proveedor = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/admin/proveedor_mod.html',
            controller: NuevoProveedorCtrl,
            resolve: {
                item: function () {
                    return 1;
                }
            }
        });
    };

    table.modificar_proveedor = function (selectedItem) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/admin/proveedor_mod.html',
            controller: NuevoProveedorCtrl,
            resolve: {
                item: function () {
                    return selectedItem;
                }
            }
        });
    };

    table.eliminar_proveedor = function(proveedor){
        SweetAlert.swal({
                title: "¿Esta seguro de Eliminar?",
                text: "Perderá todos los datos del Proveedor.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Eliminado", "El Proveedor fue borrado correctamente.", "success");
                    $http.get('API/pedido/eliminar_proveedor/' + proveedor.id_proveedor_material)
                    .success(function(data){
                        console.log(data);
                    });
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                }
                else {
                    SweetAlert.swal("Cancelado", "El Proveedor no se eliminó.", "error");
                }
            });
    }

    table.eliminar_asignatura = function(asignatura){
        SweetAlert.swal({
                title: "¿Esta seguro de Eliminar?",
                text: "Perderá todos los datos de la Asignatura.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Eliminada", "La Asignatura fue borrada correctamente.", "success");
                    $http.get('API/planificacion/eliminar_asignatura/' + asignatura.id_asignatura)
                    .success(function(data){
                        console.log(data);
                    });
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                }
                else {
                    SweetAlert.swal("Cancelado", "La Asignatura no se eliminó.", "error");
                }
            });
    }

    table.eliminar_nivel = function(curso){
        SweetAlert.swal({
                title: "¿Esta seguro de Eliminar?",
                text: "Perderá todos los datos del Nivel.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Eliminado", "El Nivel fue borrado correctamente.", "success");
                    $http.get('API/planificacion/eliminar_curso/' + curso.id_curso)
                    .success(function(data){
                        console.log(data);
                    });
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                }
                else {
                    SweetAlert.swal("Cancelado", "El Nivel no se eliminó.", "error");
                }
            });
    }

    table.eliminar_periodo = function(periodo){
        SweetAlert.swal({
                title: "¿Esta seguro de Eliminar?",
                text: "Perderá todos los datos del Periodo.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Eliminado", "El Periodo fue borrado correctamente.", "success");
                    $http.get('API/planificacion/eliminar_periodo/' + periodo.id_periodo)
                    .success(function(data){
                        console.log(data);
                    });
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                }
                else {
                    SweetAlert.swal("Cancelado", "El Periodo no se eliminó.", "error");
                }
            });
    }

    table.eliminar_bloque = function(bloque){
        SweetAlert.swal({
                title: "¿Esta seguro de Eliminar?",
                text: "Perderá todos los datos del Bloque.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f44242",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Eliminada", "El Bloque fue borrado correctamente.", "success");
                    $http.get('API/planificacion/eliminar_bloque/' + bloque.id_bloque)
                    .success(function(data){
                        console.log(data);
                    });
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                }
                else {
                    SweetAlert.swal("Cancelado", "El Bloque no se eliminó.", "error");
                }
            });
    }

    table.preparebody = function(tour){
        $('body').addClass('tour-open')
    };

    table.clearbody = function(tour){
        $('body').removeClass('tour-close')
    }
}
/**
*Controlador QUE DESPLEGA UN MODAL PARA REALIZAR PEDIDO DE PRODUCTOS
*/
function ModalInstanceCtrl ($scope, $uibModalInstance, item, $http) {
    $scope.datos = {};
    $scope.datos.id_implemento=item.id_implemento;
    $scope.datos.nombre_implemento = item.nombre_implemento;
    $scope.descripcion_implemento = item.descripcion_implemento;
    $scope.datos.precio_implemento = item.precio_implemento;
    $scope.stock_implemento = item.stock_implemento;
    $scope.ruta_imagen = item.ruta_imagen;
    $scope.datos.cantidad = 1;


    $scope.calcular = function(){
        $scope.total= $scope.datos.precio_implemento * $scope.datos.cantidad;
    }

    $scope.ok = function () {
       console.log($scope.datos);
        $http.post('API/proveedor/send_email', {datos: $scope.datos})
        .success(function(data){
            console.log(data);
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.calcular();
};
/**
*Controlador PARA CREAR NUEVAS CURSO
*/
function NuevoCursoCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    if (item != 1) {
        $scope.datos.id_curso=item.id_curso;
        $scope.datos.descripcion_curso = item.descripcion_curso;
        $scope.datos.limite_curso = item.limite_curso;
    }

    $scope.guardar = function () {
        console.log($scope.datos);
        $http.post('API/planificacion/subir_curso', {datos: $scope.datos})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA CREAR NUEVAS PERIODO
*/
function NuevoPeriodoCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    if (item != 1) {
        $scope.datos.id_periodo=item.id_periodo;
        $scope.datos.nombre_periodo = item.nombre_periodo;
        $scope.datos.fecha_inicio = item.fecha_inicio;
        $scope.datos.fecha_fin = item.fecha_fin;
    }

    $scope.guardar = function () {
        console.log($scope.datos);
        $http.post('API/planificacion/subir_periodo', {datos: $scope.datos})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA CREAR NUEVAS ASIGNATURAS
*/
function NuevaAsignaturaCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    if (item != 1) {
        $scope.datos.id_asignatura=item.id_asignatura;
        $scope.datos.nombre_asignatura = item.nombre_asignatura;
        $scope.datos.horas_asignatura = item.horas_asignatura;
        $scope.datos.descripcion_asignatura = item.descripcion_asignatura;
        $scope.datos.id_especialidad = item.id_especialidad;
        console.log($scope.datos);
    }

    $scope.guardar = function () {
        console.log($scope.datos, $scope.niveles);
        $http.post('API/planificacion/subir_asignatura', {datos: $scope.datos, niveles: $scope.niveles})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.traer_niveles = function(){
        $http.get('API/planificacion/get_info_cursos/' + $scope.datos.id_asignatura)
        .success(function(data){
            $scope.niveles = data;
            console.log(data);
        });
    }

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.traer_niveles();
};
/**
*Controlador PARA CREAR NUEVAS ASIGNATURAS
*/
function NuevoBloqueCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    if (item != 1) {
        $scope.datos.id_bloque=item.id_bloque;
        $scope.datos.hora_inicio = item.hora_inicio;
        $scope.datos.hora_fin = item.hora_fin;
    }

    $scope.guardar = function () {
        var f = new Date($scope.datos.hora_inicio);
        hora = f.getHours() + ':' + f.getMinutes();
        $scope.datos.hora_inicio_mostrar = hora;

        var t = new Date($scope.datos.hora_fin);
        hora = t.getHours() + ':' + t.getMinutes();
        $scope.datos.hora_fin_mostrar = hora;

        var x = new Date($scope.datos.hora_inicio);
        hora = x.getFullYear() + '-' + x.getMonth() + '-' + x.getDay() + ' ' + x.getHours() + ':' + x.getMinutes();
        $scope.datos.hora_inicio = hora;

        var x = new Date($scope.datos.hora_fin);
        hora = x.getFullYear() + '-' + x.getMonth() + '-' + x.getDay() + ' ' + x.getHours() + ':' + x.getMinutes();
        $scope.datos.hora_fin = hora;

        console.log($scope.datos);
        $http.post('API/planificacion/subir_bloque', {datos: $scope.datos})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA CREAR NUEVOS PROVEEDORES
*/
function NuevoProveedorCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    if (item != 1) {
        console.log(item);
        $scope.datos.id_proveedor_material = item.id_proveedor_material;
        $scope.datos.rut_proveedor_material = item.rut_proveedor_material;
        $scope.datos.razon_social = item.razon_social;
        $scope.datos.direccion_proveedor_material = item.direccion_proveedor_material;
        $scope.datos.telefono_proveedor_material = item.telefono_proveedor_material;
        console.log($scope.datos);
    }

    $scope.guardar = function () {
        $http.post('API/pedido/subir_proveedor', {datos: $scope.datos})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA LSITAR TODOS LOS MATERIALES
*/
function ListaCtrl ($http, $state, $element, DTOptionsBuilder, $uibModal) {
    var lista = this;
    var title = $element.attr('title');

    lista.materiales = [];
    lista.pedidos = [];
    lista.pedidos_pendientes = [];
    lista.planes = [];

    lista.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: title},
            {extend: 'pdf', title: title},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ])
        .withLanguageSource('js/language/datatables/es.json');

    $http.get('API/material/get_materiales/' + 1)
    .success(function(data){
        lista.materiales = data;
    });

    $http.get('API/material/get_tipos_material')
    .success(function(data){
        lista.tipos_material = data;
        console.log(lista.tipos_material);
    });

    $http.get('API/material/get_pedidos')
    .success(function(data){
        lista.pedidos = data;
        console.log(lista.pedidos);
    });

    $http.get('API/material/get_pedidos_pendientes')
    .success(function(data){
        lista.pedidos_pendientes = data;
        console.log(lista.pedidos_pendientes);
    });

    $http.get('API/material/get_planes')
    .success(function(data){
        lista.planes = data;
        console.log(lista.planes);
    });

    lista.nueva_cuenta = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/admin/cuenta_mod.html',
            controller: NuevaCuentaCtrl,
            resolve: {
                item: function () {
                    return 1;
                }
            }
        });
    };

    lista.modificar_cuenta = function (cuenta) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/admin/cuenta_mod.html',
            controller: NuevaCuentaCtrl,
            resolve: {
                item: function () {
                    return cuenta;
                }
            }
        });
    };
};
/**
*Controlador PARA CREAR NUEVAS CUENTAS
*/
function NuevaCuentaCtrl ($scope, $uibModalInstance, item, $http, $state) {
    $scope.datos = {};

    console.log(item);

    if (typeof item !== 'undefined') {
        $scope.datos.id_plan_cuenta = item.id_plan_cuenta;
        $scope.datos.nombre_plan_cuenta = item.nombre_plan_cuenta;
        $scope.datos.descripcion_plan_cuenta = item.descripcion_plan_cuenta;
    }

    $scope.guardar = function () {
        console.log($scope.datos);
        $http.post('API/material/subir_cuenta', {cuenta: $scope.datos})
        .success(function(data){
            //$state.reload();
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close();
            console.log('guardado');
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA GESTIONAR USUARIOS
*/
function FormularioMaterialCtrl($http, $location, $stateParams){
    material = this;
    material.datos = {};

    console.log('pasaa');

    material.volver = function(){
        $location.path("/talleres/inventario/lista");
    }

    material.volver_tipo_material = function(){
        $location.path("/talleres/inventario/lista/tipo");
    }

    material.subir = function(){
        console.log(material.datos);
        $http.post('API/material/subir_material', { material: material.datos })
        .success(function(data){
            console.log(data);
            material.volver();
        });
    };

    material.subir_tipo_material = function(){
        console.log(material.datos);
        $http.post('API/material/subir_tipo_material', { tipo_material: material.datos })
        .success(function(data){
            console.log(data);
            material.volver_tipo_material();
        });
    };

    if (typeof $stateParams.id_material !== 'undefined') {
        console.log($stateParams.id_material);
        $http.get('API/material/get_material/' + $stateParams.id_material)
        .success(function(data){
            material.datos = data;
            console.log(material.datos);
        });
    }

    if (typeof $stateParams.id_tipo_material !== 'undefined') {
        console.log($stateParams.id_tipo_material);
        $http.get('API/material/get_tipo_material/' + $stateParams.id_tipo_material)
        .success(function(data){
            material.datos = data;
            console.log(material.datos);
        });
    }
}
/**
*Controlador PARA el INGRESO DE FACTURAS
*/
function PedidoTallerCtrl($http, $location, $state, $element, $stateParams, toaster, SweetAlert, $uibModal){
    pedido = this;
    pedido.info = {};
    pedido.data = {};
    pedido.proveedores = {};
    //pedido.compra = {};
    pedido.data.filas = [];
    pedido.sectores = {};
    pedido.bloquear = false;

    pedido.primer_paso = true;
    pedido.segundo_paso = false;
    //pedido.compra.seleccion = 'Ferretería 1';

    pedido.traer_seccion = function(){
        $http.get('API/material/get_sectores')
        .success(function(data){
            pedido.sectores = data;
            pedido.asignar_nombre();
        });
    };

    pedido.asignar_nombre = function(){
        console.log(pedido.sectores);
        angular.forEach(pedido.sectores, function(value, key){
            if (pedido.info.id_sector == pedido.sectores[key].id_sector) {
                pedido.info.id_responsable = pedido.sectores[key].responsable_sector;
                pedido.info.nombre_responsable = pedido.sectores[key].nombres_usuario + ' ' + pedido.sectores[key].apellido_paterno + ' ' + pedido.sectores[key].apellido_materno;
            }
        });
    };

    pedido.subir = function(){
        pedido.info.estado_orden = 'Pendiente';
        console.log([pedido.info, pedido.data]);
        $http.post('API/material/subir_pedido', { info: pedido.info, detalle: pedido.data})
        .success(function(data){
            console.log(data);
            pedido.volver();
        });
    };

    pedido.subir_cotizacion = function(){
        console.log([pedido.info, pedido.data, pedido.proveedores]);
        if (pedido.validar_proveedores()) {
            $http.post('API/material/subir_cotizacion', { info: pedido.info, detalle: pedido.data, proveedores: pedido.proveedores})
            .success(function(data){
                console.log(data);
                $location.path("/administracion/solicitud/cotizacion");
            });
        }
        else{
            pedido.mostrar_mensaje();
        }
    };

    pedido.enviar = function(){
        pedido.info.estado_orden = 'Enviada';
        console.log([pedido.info, pedido.data]);
        $http.post('API/material/subir_pedido', { info: pedido.info, detalle: pedido.data})
        .success(function(data){
            console.log(data);
            pedido.volver();
        });
    };

    pedido.confirmacion = function () {
        SweetAlert.swal({
                title: "¿Esta seguro de Enviar?",
                text: "Ya no podrá modificar el Pedido.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, enviar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Enviado", "El Pedido fue enviado para su Revisión.", "success");
                    pedido.enviar();
                }
                else {
                    SweetAlert.swal("Cancelado", "Su Pedido no se envío.", "error");
                    //pedido.enviar();
                }
            });
    }

    pedido.confirmacion_cotizacion = function () {
        SweetAlert.swal({
                title: "¿Esta seguro?",
                text: "Ya no podrá modificar la Cotización.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, confirmar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Listo", "El Cotización fue enviada para su Análisis Comparativo.", "success");
                    pedido.info.estado_orden = 'Análisis Comparativo';
                    pedido.subir_cotizacion();
                }
                else {
                    SweetAlert.swal("Cancelado", "Su Cotización no se confirmo.", "error");
                }
            });
    }

    pedido.validar_proveedores = function(){
        var result = true;
        for (var i = pedido.info.cantidad_proveedores - 1; i >= 0; i--) {
            if (typeof pedido.proveedores[i] == 'undefined') {
                result = false;
            }
        }
        return result;
    }

    pedido.aprobar = function () {
        SweetAlert.swal({
                title: "¿Esta seguro de Aprobarlo?",
                text: "Ya no podrá volver atras.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, aprobar",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Aprobado", "El Pedido fue Aprobado para su posterior Cotización.", "success");
                    pedido.aprobar_solicitud();
                } else {
                    SweetAlert.swal("Cancelado", "Su Pedido no se envío.", "error");
                    //pedido.enviar();
                }
            });
    }

    pedido.obtener_correlativo = function(){
        $http.get('API/material/get_correlativo')
        .success(function(data){
            pedido.info.correlativo_orden = parseInt(data) + 1;
        });
    };

    pedido.mostrar_material = function(fila){
        console.log(fila);
        $http.get('API/material/get_material/' + fila.id_material)
        .success(function(data){
            fila.unidad_medida = data.unidad_medida;
            fila.marca_material = data.marca_material;
            fila.modelo_material = data.modelo_material;
            fila.medida_material = data.medida_material;
        });
    }

    pedido.addFila = function(){
        var n_fila = {
            cantidad_material: 0
        };
        pedido.data.filas.push(n_fila);
    };

    pedido.eliminar = function (fila){
        var index = pedido.data.filas.indexOf(fila);
        if (index > -1) {
            pedido.data.filas.splice(index, 1);
            if(pedido.data.filas.length < 1){
                pedido.addFila();
            }
        }
    };

    pedido.rechazar = function (orden_material) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/admin/rechazar_pedido.html',
            controller: RechazarPedidoCtrl,
            resolve: {
                item: function () {
                    return orden_material;
                }
            }
        });
    };

    pedido.aprobar_solicitud = function () {
        console.log(pedido.info);
        $http.post('API/material/aprobar', {datos: pedido.info})
        .success(function(data){
            console.log(data);
            $location.path("/administracion/solicitud/pendientes");
        });
    };

    pedido.conseguir_descripcion = function(fila){
        var id_material = fila.id_material;
        $http.get('API/material/get_descripcion_material/' + id_material)
        .success(function(data){
            fila.descripcion_material = data;
        });
    }

    pedido.habilitar_ordenar = function(){
        pedido.habilitar = true;
    }

    pedido.ordenar_datos = function(){
        if (pedido.habilitar) {
            for (var i = pedido.data.filas.length - 1; i >= 0; i--) {
                if (pedido.data.filas[i].proveedor_1 != 0) {
                    pedido.data.filas[i].valor_menor = parseInt(pedido.data.filas[i].proveedor_1);
                    pedido.data.filas[i].proveedor_seleccion = pedido.proveedores[0].id_proveedor_material;
                    pedido.data.filas[i].proveedor_mostrar = pedido.proveedores[0].razon_social;
                }
                if (pedido.data.filas[i].proveedor_2 != 0) {
                    if (parseInt(pedido.data.filas[i].proveedor_2) < pedido.data.filas[i].valor_menor) {
                        pedido.data.filas[i].valor_menor = parseInt(pedido.data.filas[i].proveedor_2);
                        pedido.data.filas[i].proveedor_seleccion = pedido.proveedores[1].id_proveedor_material;
                        pedido.data.filas[i].proveedor_mostrar = pedido.proveedores[1].razon_social;
                    }            
                }
                if (pedido.data.filas[i].proveedor_3 != 0) {
                    if (parseInt(pedido.data.filas[i].proveedor_3) < pedido.data.filas[i].valor_menor) {
                        pedido.data.filas[i].valor_menor = parseInt(pedido.data.filas[i].proveedor_3);
                        pedido.data.filas[i].proveedor_seleccion = pedido.proveedores[2].id_proveedor_material;
                        pedido.data.filas[i].proveedor_mostrar = pedido.proveedores[2].razon_social;
                    }            
                }
                if (pedido.data.filas[i].proveedor_4 != 0) {
                    if (parseInt(pedido.data.filas[i].proveedor_4) < pedido.data.filas[i].valor_menor) {
                        pedido.data.filas[i].valor_menor = parseInt(pedido.data.filas[i].proveedor_4);
                        pedido.data.filas[i].proveedor_seleccion = pedido.proveedores[3].id_proveedor_material;
                        pedido.data.filas[i].proveedor_mostrar = pedido.proveedores[3].razon_social;
                    }            
                }
                if (pedido.data.filas[i].proveedor_5 != 0) {
                    if (parseInt(pedido.data.filas[i].proveedor_2) < pedido.data.filas[i].valor_menor) {
                        pedido.data.filas[i].valor_menor = parseInt(pedido.data.filas[i].proveedor_5);
                        pedido.data.filas[i].proveedor_seleccion = pedido.proveedores[4].id_proveedor_material;
                        pedido.data.filas[i].proveedor_mostrar = pedido.proveedores[4].razon_social;
                    }            
                }
            }
        }
    }

    pedido.generar_ordenes = function(){
        pedido.primer_paso = false;
        pedido.segundo_paso = true;
        pedido.ordenar_datos_orden();
    }

    pedido.cancelar_impresion = function(){
        pedido.primer_paso = true;
        pedido.segundo_paso = false;
    }

    pedido.ordenar_datos_orden = function(){
        var filas = pedido.data.filas;
        var proveedores = pedido.proveedores

        var orden_compra = [];
        
        for (var i = proveedores.length - 1; i >= 0; i--) {
            var superArray = [];
            superArray['id_proveedor_material'] = proveedores[i].id_proveedor_material;
            superArray['razon_social'] = proveedores[i].razon_social;
            superArray['rut_proveedor_material'] = proveedores[i].rut_proveedor_material;
            superArray['direccion_proveedor_material'] = proveedores[i].direccion_proveedor_material;
            superArray['telefono_proveedor_material'] = proveedores[i].telefono_proveedor_material;
            superArray['comentario'] = '';
            var new_filas = [];
            superArray['filas'] = new_filas;
            orden_compra.push(superArray);
        }

        for (var i = filas.length - 1; i >= 0; i--) {
            for (var j = orden_compra.length - 1; j >= 0; j--) {
                if (filas[i].proveedor_seleccion == orden_compra[j].id_proveedor_material) {
                    var arreglo_Temp = [];
                    arreglo_Temp['cantidad_material'] = filas[i].cantidad_material;
                    arreglo_Temp['descripcion_material'] = filas[i].descripcion_material;
                    arreglo_Temp['id_material'] = filas[i].id_material;
                    arreglo_Temp['marca_material'] = filas[i].marca_material;
                    arreglo_Temp['medida_material'] = filas[i].medida_material;
                    arreglo_Temp['modelo_material'] = filas[i].modelo_material;
                    arreglo_Temp['unidad_medida'] = filas[i].unidad_medida;
                    arreglo_Temp['valor_menor'] = filas[i].valor_menor;
                    orden_compra[j].filas.push(arreglo_Temp);
                }
            }
        }

        pedido.cantidad_item = 0;
        for (var i = orden_compra.length - 1; i >= 0; i--) {
            if (orden_compra[i].filas.length > 0) {
                pedido.cantidad_item++;
            }
        }

        pedido.gran_orden_compra = orden_compra;
        console.log(pedido.gran_orden_compra);
    }

    pedido.cambiar_seleccion_proveedor = function(fila, proveedor){
        fila.proveedor_seleccion = proveedor.id_proveedor_material;
        fila.proveedor_mostrar = proveedor.razon_social;
    }

    pedido.validar = function(fila){
        if (isNaN(fila.proveedor_1)) {fila.proveedor_1 = 0};
        if (isNaN(fila.proveedor_2)) {fila.proveedor_2 = 0};
        if (isNaN(fila.proveedor_3)) {fila.proveedor_3 = 0};
        if (isNaN(fila.proveedor_3)) {fila.proveedor_4 = 0};
        if (isNaN(fila.proveedor_3)) {fila.proveedor_5 = 0};
        return fila;
    };

    pedido.mostrar_mensaje = function(){
        toaster.pop({
            type: 'error',
            title: 'Error',
            body: 'Debe seleccionar los proveedores.',
            showCloseButton: true,
            timeout: 10000
        });
    }

    pedido.volver = function(){
        $location.path("/talleres/movimientos/pedidos");
    }

    pedido.volver_cotizacion = function(){
        $location.path("/administracion/solicitud/cotizacion");
    }

    pedido.volver_comparacion = function(){
        $location.path("/administracion/solicitud/comparacion");
    }

    pedido.volver_solicitud = function(){
        $location.path("/administracion/solicitud/pendientes");
    }

    if (typeof $stateParams.id_orden_material !== 'undefined') {
        $http.get('API/material/get_pedido/' + $stateParams.id_orden_material)
        .success(function(data){
            pedido.info = data.info;
            pedido.data.filas = data.detalle;
            pedido.proveedores = data.proveedores;
            console.log([pedido.info, pedido.data]);
            if (pedido.info.estado_orden != 'Pendiente') {
                pedido.bloquear = true;
            }
            pedido.traer_seccion();
            angular.forEach(pedido.data.filas, function(value, key){
                pedido.mostrar_material(pedido.data.filas[key]);
            });
            pedido.ordenar_datos();
        });
    }
    else{
        pedido.obtener_correlativo();
        pedido.traer_seccion();
    }

    pedido.enviar_comentarios = function (select) {
        pedido.gran_orden_compra[select].comentario = pedido.comentario_orden[select];
        pedido.gran_orden_compra_seleccion = pedido.gran_orden_compra[select];
        console.log(pedido.gran_orden_compra_seleccion);
        //pedido.imprimir_orden();
        setTimeout(function () { pedido.imprimir_orden(); }, 500);
    };

    //////////IMPRIMIR///////////
    var css = "";
    $http.get('css/pdf_orden_compra.html').success(function(data){
        css = data;
    });

    pedido.imprimir_orden = function(){
        var newWindow = window.open();
        var html = $element.find("#datos_imprimir").html();
        html += css;

        newWindow.document.write(html);
    }
}
/**
*Controlador PARA RECHAZAR LAS SOLICITUDES
*/
function RechazarPedidoCtrl ($scope, $uibModalInstance, item, $http, $state, $location) {
    $scope.datos = {};
    console.log(item.id_orden_material);
    $scope.datos.id_orden_material = item.id_orden_material;

    $scope.enviar = function () {
        console.log($scope.descripcion_rechazo);
        $http.post('API/material/rechazar', {datos: $scope.datos})
        .success(function(data){
            $location.path("/administracion/solicitud/pendientes");
            $uibModalInstance.close();
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA GENERAR LAS ORDENES DE COMPRA
*/
function OrdenCompraCtrl ($scope, $uibModalInstance, item, $http, $state, $location, $element) {
    $scope.datos = {};
    $scope.pedido = item[0];
    $scope.filas = item[1].filas;
    $scope.proveedores = item[2];
    console.log($scope.proveedores);
    $scope.orden_compra = [];
    
    for (var i = $scope.proveedores.length - 1; i >= 0; i--) {
        var superArray = [];
        superArray['id_proveedor_material'] = $scope.proveedores[i].id_proveedor_material;
        superArray['razon_social'] = $scope.proveedores[i].razon_social;
        superArray['rut_proveedor_material'] = $scope.proveedores[i].rut_proveedor_material;
        superArray['direccion_proveedor_material'] = $scope.proveedores[i].direccion_proveedor_material;
        superArray['telefono_proveedor_material'] = $scope.proveedores[i].telefono_proveedor_material;
        superArray['comentario'] = '';
        var filas = [];
        superArray['filas'] = filas;
        $scope.orden_compra.push(superArray);
    }

    for (var i = $scope.filas.length - 1; i >= 0; i--) {
        for (var j = $scope.orden_compra.length - 1; j >= 0; j--) {
            if ($scope.filas[i].proveedor_seleccion == $scope.orden_compra[j].id_proveedor_material) {
                var arreglo_Temp = [];
                arreglo_Temp['cantidad_material'] = $scope.filas[i].cantidad_material;
                arreglo_Temp['descripcion_material'] = $scope.filas[i].descripcion_material;
                arreglo_Temp['id_material'] = $scope.filas[i].id_material;
                arreglo_Temp['marca_material'] = $scope.filas[i].marca_material;
                arreglo_Temp['medida_material'] = $scope.filas[i].medida_material;
                arreglo_Temp['modelo_material'] = $scope.filas[i].modelo_material;
                arreglo_Temp['unidad_medida'] = $scope.filas[i].unidad_medida;
                arreglo_Temp['valor_menor'] = $scope.filas[i].valor_menor;
                $scope.orden_compra[j].filas.push(arreglo_Temp);
            }
        }
    }

    $scope.cantidad = 0;
    for (var i = $scope.orden_compra.length - 1; i >= 0; i--) {
        if ($scope.orden_compra[i].filas.length > 0) {
            $scope.cantidad++;
        }
    }

    $scope.enviar = function () {
        for (var i = $scope.orden_compra.length - 1; i >= 0; i--) {
            $scope.orden_compra[i].comentario = $scope.comentario_orden[i];
        }
        $scope.imprimir();
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };

    //////////IMPRIMIR///////////
    var css = "";
    $http.get('css/pdf_orden_compra.html').success(function(data){
        css = data;
    });

    $scope.imprimir = function(){
        var newWindow = window.open();
        var html = $element.find("#datos_imprimir").html();
        html += css;

        //console.log(html);
        newWindow.document.write(html);
    }
};
/**
*Controlador PARA CARGAR LOS DATOS DE LOS SELECT
*/
function SelectCtrl($http, $element){
    var seleccion = this;
    var urlGet = $element.attr("url-get");
    seleccion.data = [];

    seleccion.traer = function(){
        $http.get(urlGet).success(function(data){
            seleccion.data = data;
            console.log(seleccion.data);
        });
    }

    seleccion.traer();
}
/**
*Controlador PARA CARGAR LOS DATOS DE LIBROS DE BIBLIOTECA
*/
function SelectBiblioCtrl($http, $element, PreCarga){
    var seleccion = this;
    var urlGet = $element.attr("url-get");
    seleccion.data = [];

    seleccion.traer = function(){
        $http.get(urlGet).success(function(data){
            seleccion.data = data;
            PreCarga.llenar_libros_cantidad(data)
        });
    }

    var datos = PreCarga.get_libros_cantidad();

    if (datos.length > 0) {
        seleccion.data = datos;
    }
    else{
        seleccion.traer();
    }

}
/**
*Controlador PARA CARGAR LOS DATOS DE LOS SELECT CON RUT
*/
function RutSelectCtrl($http, $element){
    var rutSelect = this;
    var urlGet = $element.attr("url-get");

    rutSelect.traer = function(){
        $http.get(urlGet).success(function(data){
            rutSelect.proveedores = data;
            console.log(rutSelect.proveedores);
        });
    }

    rutSelect.traer();
}
/**
 * imageCrop - CONTROLADOR PARA IMPORTAR IMAGENES
 */
function CambiarImagen($http, $location, $scope, $stateParams, $state) {

    $scope.dupa = "dasdasdas";
    $scope.numero_imagen = 0;

    $scope.myImage='data:image/jpeg;base64,/9j/4RgxRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAoAAAAEBAAMAAAABAeAAAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxNjowOTowNSAwMTowMTo1MgAAAAAEkAAABwAAAAQwMjIxoAEAAwAAAAEAAQAAoAIABAAAAAEAAAHgoAMABAAAAAEAAAHgAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAW4BGwAFAAAAAQAAAXYBKAADAAAAAQACAAACAQAEAAAAAQAAAX4CAgAEAAAAAQAAFqsAAAAAAAAASAAAAAEAAABIAAAAAf/Y/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACgAKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDsQ1SDVINUg1JTENUg1SDVINSUxDU+1TDU4akphtT7VPan2pKR7UtqJtT7UlItqW1E2pbUlItqbajbUxakpCWqJajFqYtSUhLVEtRi1RLUlIC1RLUYtUS1JT//0O4DVMNTgKYakpiGqQapAKQCSmIan2qYanhJTDan2qcJ4SUj2p9qnCUJKR7UtqJCUJKR7U21EhNCSkRamLUUhMQkpCWqJajEKJakpAWqJajEKBakp//R78BTASAUwElLAKQCcBSASUsAnhOApQkpjCeE8J4SUxhKFKFUu6t0qg7bcylru7d4J/zWbklNmEoVNnXOivMDNqBP7x2/9WGq5W+u1nqVPbYw8PYQ4f5zUlLQmhEhNCSkZCYhEIUSElIyFEhFIUSElISFAhGIUCElP//S9EAUwEwUgElLgKQCQCcJKUApQknSUtCzOsddxemNNcerlESKgYDR+/e//Bs/6b0TrfVG9MwzY2HZFh2UMPG6JNj/APg6vpO/zFl/V7onrR1TqANtlp9Sllmsz/2qu/ee/wDwLP8AB/5nppTXZgdf69FuXacfEdq1rgWsg/6LFaQ6z/jMh60Kfqf01jQLbLrT3ghjfk2tv/f1vQlCSnEf9UukOEN9Znm2wn/z4Hqhb9Vs/Cf6/Sskl412z6Tz/bb+ht/q2tYuqhRe5rGl7yGtaC5znGAAOXOKSnnOm/WZ7bvsfWG+ja07TeRsgnj7TV/gv+OZ+iXRQuVzbLPrJ1EU4NbW0YwIOU8QSD++fpem938xR9P/AAyP9W+pX0ZDui5o2vrJbRu5aW6uxt35zNv6TG/kf9bSU9EQokKaYhJTAhRIUyFEhJSMhQIRSFAhJT//0/RwpBRCmElMgnCYKQSUuE6ZSbyElPJ5rf2z9ZxiO1xsb2OH8iuH5H/bt36BdYABoBHkuW+qA9bOzsp2riBr/wAa+yx3/UNXVDkJKeX6n9Yi/Jc3Bzn49dYNZH2Ztoc9pdusa99jHbfzfoq2Prf0uNa7yf6jf/Si5Oz+dt/4x/8A1TlYorprxn5mQw3N9QUY+OCQH2lvqOdaWfpfSqY5n6Ov+ft/RpKek/54dL/0WQSdAAxpJJ4A/SKr9Zrsuyio5FjMHp9m0+k505FjvpEOoaPTd6P+h+0en/hLrFPGwhifY83LZiYea+0V047K3AOFkN9N8Pud9pb+Zez2U/zdiyf+cPVvXtu3ta+0wa3NDmsDZAqr3fR2/n/6RJT0X1fz+kW0nD6c17PRG9wsEOfPtdc57S71HbvpKh9bsR1VmP1TH9lrXBj3D95v6TGs/s7XV/5iF9VbrL+sZV9pBstqL3kCBJezgLY+sjA/omV4sDXg+bHNekpuYmS3LxacpmjbmNfHhuGrf7LkQrL+q7y7otTT/g32M+W9zh/1S1CkpiVEqZUCkpiVAqZUHJKf/9T0cKYQwphJTMKQUApBJTIJ28hRCdJTzH1TJo6lnYbtHAER/wATY6t3/n1dUOQuS6qXdH+sVfUQD6F/vcB3Eells/rfRvXUi2r0/V3t9Lbv9SRt2xu9Td9HZtSU+dWfztnOtjwANSSXugBdDhYp6Pj42V1Kypgdc57cewEuY57BV6ldlbbHeuxrf0vt9HYgdGZRZ1u1/Tsc5NLX7xkXuLW1NcSXvYxrDvssn9W3/pvT/trSzvq1Zn5TsnIznlxkMaK27WNnSuv3f5376SnGyMo/b29SzcqjLvrO7GxsZznsBGtTX2OZU2mmt/6Sz/DXrK17mSdSfEnUldN/zMr/AO5r/wDttv8A5JL/AJmV/wDc1/8A223/AMkkpq/U/wD5Sv8A+I/7+1bX1lsFfRckEwbNtbfMuc0f9Sm6R0GnpdtlwuddZY3ZLgGgNnd9Fv7zll/WnKfmZmP0jG91gcC8f8K8bam/9aqc62xJTpfVivZ0Wknmx1j/AJF7tv8A0WrUKhRSzHorx6/oUsbW34NG1SKSliolSKgUlLFQKkSoFJT/AP/V9FBUgUMFTBSUkBUgUMFSBSUzBTyoAp5SU1uq9Or6lhux3na+d1Nn7rx9F39X8x/8hcg63OaxnQ8277Hj12fpS8EhoPubucP5zH/Po/wX+k/Rs/RdzKpdT6TidSrAuBbawEVXs+m3y/l1/wDBvSU2MHDxsLFZRitioe4OmS8n/Cvf+e96sSuSbjfWPoRIxf1rEBna1psZ86P5+j/rP6NGq+utY9uRilrxz6bx/wBRaGOakp6eU0rnLPrrhgezGsJ/lvY0fgbFXd1f6xdW/R4FBoqdzZXI088u7axv/WW+okp1Oudfp6cx1NJD8wiQ0/RrB/wl/wD3yr89Vvq30i2ou6lm7vtNs+m1/wBMB+tl1k/4a/8A8Dr/AOMU+k/VmjDe3JzHDIyQdzWiTWx37/u911v/AAti2pSUuSmJTEpiUlKJUSUiVElJSiVAlOSoEpKf/9b0AFTBQQ5TBSUlBUgUIFSBSUlBTyhgpwUlJJSlQlKUlJJULK6bf52tln9dod/1QSlKUlMWYuJWZroqYfFrGg/g1FLieTKhKUpKZSmlRlNKSmRKYlRJTEpKXJUSUxcokpKUSoOKRKgSkp//1+6DlIOQQ5SDklJw5SBQQ5OHJKTByfchBycOSUllPuQtyfckpJKeUPcluSUklNuUNybckpJuTblDcm3JKZFyYuUS5RLklMi5RJUS5RLklLlyiXJi5QLklP8A/9Dsg5SDkEOUg5JSYOUg5BDlIOSUmDk+5BDlLckpLuT7kHcn3JKS7ktyHuS3JKSbktyHuTbklJNybcobk25JTMuTFygXKJckpmXKJcoFyYuSUyLlAuUS5RLklP8A/9n/7SAAUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACI/IAOEJJTQQlAAAAAAAQFvCO2U3kA2mwsI2i9x/z9zhCSU0EOgAAAAABDQAAABAAAAABAAAAAAALcHJpbnRPdXRwdXQAAAAFAAAAAFBzdFNib29sAQAAAABJbnRlZW51bQAAAABJbnRlAAAAAEltZyAAAAAPcHJpbnRTaXh0ZWVuQml0Ym9vbAAAAAALcHJpbnRlck5hbWVURVhUAAAAEABTAEUAQwAzADAAQwBEAEEANwAxADYANgBBAEEANwAAAAAAD3ByaW50UHJvb2ZTZXR1cE9iamMAAAARAEEAagB1AHMAdABlACAAZABlACAAcAByAHUAZQBiAGEAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0ECgAAAAAAAQAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADWQAAAAYAAAAAAAAAAAAAAeAAAAHgAAAAEgBmAG8AdABvAC0AbgBvAC0AZABpAHMAcABvAG4AaQBiAGwAZQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAB4AAAAeAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAeAAAAAAUmdodGxvbmcAAAHgAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAHgAAAAAFJnaHRsb25nAAAB4AAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0NvbG9yVHlwZQAAAABOb25lAAAACXRvcE91dHNldGxvbmcAAAAAAAAACmxlZnRPdXRzZXRsb25nAAAAAAAAAAxib3R0b21PdXRzZXRsb25nAAAAAAAAAAtyaWdodE91dHNldGxvbmcAAAAAADhCSU0EKAAAAAAADAAAAAI/8AAAAAAAADhCSU0EFAAAAAAABAAAAAM4QklNBAwAAAAAFscAAAABAAAAoAAAAKAAAAHgAAEsAAAAFqsAGAAB/9j/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////7QAMQWRvYmVfQ00AAf/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAKAAoAMBIgACEQEDEQH/3QAEAAr/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/AOxDVINUg1SDUlMQ1SDVINUg1JTENT7VMNThqSmG1PtU9qfakpHtS2om1PtSUi2pbUTaltSUi2ptqNtTFqSkJaolqMWpi1JSEtUS1GLVEtSUgLVEtRi1RLUlP//Q7gNUw1OAphqSmIapBqkApAJKYhqfaphqeElMNqfapwnhJSPan2qcJQkpHtS2okJQkpHtTbUSE0JKRFqYtRSExCSkJaolqMQolqSkBaolqMQoFqSn/9HvwFMBIBTASUsApAJwFIBJSwCeE4ClCSmMJ4TwnhJTGEoUoVS7q3SqDttzKWu7t3gn/NZuSU2YShU2dc6K8wM2oE/vHb/1Yarlb67WepU9tjDw9hDh/nNSUtCaESE0JKRkJiEQhRISUjIUSEUhRISUhIUCEYhQISU//9L0QBTATBSASUuApAJAJwkpQClCSdJS0LM6x13F6Y01x6uURIqBgNH797/8Gz/pvROt9Ub0zDNjYdkWHZQw8bok2P8A+Dq+k7/MWX9XuietHVOoA22Wn1KWWazP/aq7957/APAs/wAH/memlNdmB1/r0W5dpx8R2rWuBayD/osVpDrP+MyHrQp+p/TWNAtsutPeCGN+Ta2/9/W9CUJKcR/1S6Q4Q31mebbCf/PgeqFv1Wz8J/r9KySXjXbPpPP9tv6G3+ra1i6qFF7msaXvIa1oLnOcYAA5c4pKec6b9Zntu+x9Yb6NrTtN5GyCePtNX+C/45n6JdFC5XNss+snURTg1tbRjAg5TxBIP75+l6b3fzFH0/8ADI/1b6lfRkO6Lmja+sltG7lpbq7G3fnM2/pMb+R/1tJT0RCiQppiElMCFEhTIUSElIyFAhFIUCElP//T9HCkFEKYSUyCcJgpBJS4TplJvISU8nmt/bP1nGI7XGxvY4fyK4fkf9u3foF1gAGgEeS5b6oD1s7OynauIGv/ABr7LHf9Q1dUOQkp5fqf1iL8lzcHOfj11g1kfZm2hz2l26xr32Mdt/N+irY+t/S41rvJ/qN/9KLk7P523/jH/wDVOViiumvGfmZDDc31BRj44JAfaW+o51pZ+l9Kpjmfo6/5+39Gkp6T/nh0v/RZBJ0ADGkkngD9Iqv1muy7KKjkWMwen2bT6TnTkWO+kQ6ho9N3o/6H7R6f+EusU8bCGJ9jzctmJh5r7RXTjsrcA4WQ303w+532lv5l7PZT/N2LJ/5w9W9e27e1r7TBrc0OawNkCqvd9Hb+f/pElPRfV/P6RbScPpzXs9Eb3CwQ58+11zntLvUdu+kqH1uxHVWY/VMf2WtcGPcP3m/pMaz+ztdX/mIX1Vusv6xlX2kGy2oveQIEl7OAtj6yMD+iZXiwNeD5sc16Sm5iZLcvFpymaNuY18eG4at/suRCsv6rvLui1NP+DfYz5b3OH/VLUKSmJUSplQKSmJUCplQckp//1PRwphDCmElMwpBQCkElMgnbyFEJ0lPMfVMmjqWdhu0cARH/ABNjq3f+fV1Q5C5Lqpd0f6xV9RAPoX+9wHcR6WWz+t9G9dSLavT9Xe30tu/1JG3bG71N30dm1JT51Z/O2c62PAA1JJe6AF0OFino+PjZXUrKmB1zntx7AS5jnsFXqV2Vtsd67Gt/S+30diB0ZlFnW7X9Oxzk0tfvGRe4tbU1xJe9jGsO+yyf1bf+m9P+2tLO+rVmflOycjOeXGQxorbtY2dK6/d/nfvpKcbIyj9vb1LNyqMu+s7sbGxnOewEa1NfY5lTaaa3/pLP8NesrXuZJ1J8SdSV03/Myv8A7mv/AO22/wDkkv8AmZX/ANzX/wDbbf8AySSmr9T/APlK/wD4j/v7VtfWWwV9FyQTBs21t8y5zR/1KbpHQael22XC511ljdkuAaA2d30W/vOWX9acp+ZmY/SMb3WBwLx/wrxtqb/1qpzrbElOl9WK9nRaSebHWP8AkXu2/wDRatQqFFLMeivHr+hSxtbfg0bVIpKWKiVIqBSUsVAqRKgUlP8A/9X0UFSBQwVMFJSQFSBQwVIFJTMFPKgCnlJTW6r06vqWG7Hedr53U2fuvH0Xf1fzH/yFyDrc5rGdDzbvsePXZ+lLwSGg+5u5w/nMf8+j/Bf6T9Gz9F3Mql1PpOJ1KsC4FtrARVez6bfL+XX/AMG9JTYwcPGwsVlGK2Kh7g6ZLyf8K9/573qxK5JuN9Y+hEjF/WsQGdrWmxnzo/n6P+s/o0ar661j25GKWvHPpvH/AFFoY5qSnp5TSucs+uuGB7Mawn+W9jR+BsVd3V/rF1b9HgUGip3NlcjTzy7trG/9Zb6iSnU651+npzHU0kPzCJDT9GsH/CX/APfKvz1W+rfSLai7qWbu+02z6bX/AEwH62XWT/hr/wDwOv8A4xT6T9WaMN7cnMcMjJB3NaJNbHfv+73XW/8AC2LalJS5KYlMSmJSUolRJSJUSUlKJUCU5KgSkp//1vQAVMFBDlMFJSUFSBQgVIFJSUFPKGCnBSUklKVCUpSUklQsrpt/na2Wf12h3/VBKUpSUxZi4lZmuiph8WsaD+DUUuJ5MqEpSkplKaVGU0pKZEpiVElMSkpclRJTFyiSkpRKg4pEqBKSn//X7oOUg5BDlIOSUnDlIFBDk4ckpMHJ9yEHJw5JSWU+5C3J9ySkkp5Q9yW5JSSU25Q3JtySkm5NuUNybckpkXJi5RLlEuSUyLlElRLlEuSUuXKJcmLlAuSU/wD/0OyDlIOQQ5SDklJg5SDkEOUg5JSYOT7kEOUtySku5PuQdyfckpLuS3Ie5LckpJuS3Ie5NuSUk3JtyhuTbklMy5MXKBcolySmZcolygXJi5JTIuUC5RLlEuSU/wD/2QA4QklNBCEAAAAAAFUAAAABAQAAAA8AQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAAAATAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwACAAQwBTADYAAAABADhCSU0EBgAAAAAABwAIAAAAAQEA/+EPL2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MzIFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDEyLTA3LTExVDEyOjQwOjA1LTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgeG1wTU06RG9jdW1lbnRJRD0idXVpZDoxNzI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkI2NTA3QTFENzNFNjExQTRFNkM0MjYzOURCNDA5NCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjE3Mjg2NTAxNzNDQkUxMTFCMTFFODFEQkQxQzg3MEFCIiBwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD0iMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wUmlnaHRzOk1hcmtlZD0iRmFsc2UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDoxMjI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDoxMjI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MUI2NTA3QTFENzNFNjExQTRFNkM0MjYzOURCNDA5NCIgc3RFdnQ6d2hlbj0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyQjY1MDdBMUQ3M0U2MTFBNEU2QzQyNjM5REI0MDk0IiBzdEV2dDp3aGVuPSIyMDE2LTA5LTA1VDAxOjAxOjUyLTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAABAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAA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Yf8AFffuvdYjD+f94H/FLe/de64+Fv8AfW/4r7917rH4v8F/33+w9+691jMVvrf/AG49+691jMIP0t/trf8AFffuvdY2iI/3rn37r3WIxfiw/wBcW/4n37r3WExA/n/Y25/2/v3XusLQfX/W+v1/230t9ffuvdYDCRfngf77/D37r3WBovqbWtxxa3+v/j9ffuvdYGhv9Lf8V/2H09+691HaL6kf8isP6e/de6jtH/X8cm3+P9eP8PfuvdYGi/pb/ev9cn/W9+691HaP8mx/x/3jn8+/de6jNDf6f7bi3+29+691FaL6/wBP945/4j37r3UZ47kjj/W/H+uP6ce/de6jPF+P99/S49+691FeIN9P9t/vHN/r7917qI8R+vH+P9P6e/de6iPHf8AH/ffT37r3X//Q2O1iA+tv955/4p7917qUkVyBx/rfj/iPz7917qUkX+tb/W/3of6/v3XupSR/S35/P+8f7yffuvdSVitYm3+9n/jV/fuvdSFi+lgBf/b8+/de6krFyOB/rfU/483449+691JWID+n+sLm/wDsffuvdSFiJva3+w/3w9+691nWH/Acc/1/3k/T37r3UhYgv1/33+x49+691nEZ/oB/xP8AtvfuvdZxF/UD/Y/8U59+691kWMfS3J/px+P9tx7917rKsR4+g/H4v/vj7917rKIT+f8Ab/8AIiffuvdZVh/Nh9fwB/h+eD9PfuvdZhEP8P8Ae/8Ae/fuvdZFjH0tf/eP+J9+691zEX+AH+vz/wAV9+691zERPH+9f0/3i3v3Xusgh/qP9jf/AIoT7917rvw/63+9/wC9gj37r3XLxD/D/kke/de65BB+ef8AeP8AiffuvdcxHfkD/ef+N+/de694v9p/3n/jfv3Xuu/Gf9SP949+6917xn/Uj/ePfuvde8Z/1I/3j37r3XvGf9SP949+69114v8Aaf8Aef8Ajfv3XuujGB9R/vP/ABv37r3XEoPxx/vP/E+/de64+If4f8kj37r3XHwj/D/bn37r3XEwn8C3+83/ANuffuvdcDGRxcf43/3x9+691wMX+A/2HH/FPfuvdY2jB4+n9fz/AMT7917rGYf9b/Ycf8av7917rC0HHNuf8Bz/AL37917rGYT+Bb/eb/7c+/de6wtFf+h/xHB/3n37r3WNowT+OOPpf6f4+/de6wtF/S35N/fuvdYW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/wDerf77n37r3UR4/r/r/W3P+x9+691FdPqOL/1/r/r/AOw9+691DdLXHNjf/Yf7H37r3UR4+P8Aif8AiD/h7917qE6W4tx9Le/de6//0ttBE/A/2J9+691Oji4/H+x/H/FSffuvdSkT8D/Yn37r3UuOP6f7e39fzz7917qWiWI/r+P6D37r3UlI/wA8X/r/AE+lwPfuvdSlT+gsP6/77k+/de6kJHx+P9f8+/de6lLHb68f4f1/2N/fuvdZlT+lv6X/AK/8T7917rOkf5/3n/inv3XupKxfn/W5/wBh+P8AX9+691lCDji5/wB74/x49+691mEZuL/7b/iPfuvdZlit/Qf7yffuvdZAg+n1J4/3n37r3WUIfzx7917rmsd7/n/eP+J9+691lEdv6D/WH/IvfuvdZBHfkD6H+v8AxX37r3WQR2/oP9Yf8i9+691yCD88/wC8f8T7917rsKB+L/6/Pv3XuuYW/wBAP8foPfuvdctDf63++/wv7917r2g/4f7z/wAU9+69134/8f8AeP8Ajfv3XuveP/H/AHj/AI37917r3j/x/wB4/wCN+/de694/8f8AeP8Ajfv3XuveP/H/AHj/AI37917r3j/x/wB4/wCN+/de660H/D/ef+Ke/de660N/T/eR/wAV9+691xK/1Av/ALA+/de64lQTe1v8BwPfuvddFB+OP95/4n37r3XAx/ng/wCw59+691jMdh/Qn6H6/wC9Ee/de64GO/8AQ/64/wCR+/de6xNHa34/3m/+8+/de6xlD/QH/ff4+/de6xFB+OP959+691jMX+AP+tx/t+ffuvdYSh/wPv3XusRQG/4P+9f7D6e/de6wtF9T/vP+x/p/X37r3UZ47f0uf6fTj37r3WBk/qP9j/vuffuvdYGiv/jx9fpb/effuvdRnj/P+P1H/E/6/v3Xuo7J/Uf4X9+691FeO39Af94P0/23v3XuozJe/wDX+h+nv3Xuockf+8H/AG3/ABX37r3UV0/Btf8AB9+691Ekj4P44vb/AIn6+/de6hOn4P1/B9+691EdLX4H05H++4+nv3Xuokkd+R/yL/A/4e/de6//09t+OP8AJ/5F/gP8ffuvdS1S4/oPx/vr+/de6mJH/rfT8/Qe/de6lqn0sP8AC/8AvuffuvdSUjta4/4qb/63Pv3XupKxn+nH9P8AX/3rk+/de6lp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Vb8n6f737917qSq/k3vfge/de6lKtufz/vX/ABv37r3WVVvyfp/vfv3XupCJf63sOAP99z7917rKBfge/de6zKlrfUn37r3WYJ/X/be/de6zKl7fge/de6ygAfQe/de65hSf9b+v+++vv3XuuYQfnn/ePfuvdZQpP49+691z0L/if99/h7917rIAfwD/AE9+691zCf1Nv8P+N+/de670L/if99/h7917rlbSDYc/6/1/2PPv3XuvX+nB5/2w/wBj7917rCXBc21MVJvp4T6/ovzqcf09+690x5/dO29q42ozO581jcDi6dS89flqyChp4VW4JdpnXTbT/j7917onu/P5iXxW2IWjj3xLvOoQ6TDsLHy7l0SFiNM0kMsUKAMfUbkD6+/de6KVuf8Am+bapppqfZnTmczAu329Tk9xU+NllQHgvjP4ZJJGx/p5Tb37r3QO1382/tOYTrjuttsULSXNKamaqrdF/osqxz0+sr9D9PfuvdJ5f5sne9ww2nsNgqgOhxWTQlhe4D/xk2Dfjj37r3Six/8ANw7RhZP4p1ptmuA5lSlqKmg1AEGwkmnqRGCL82Pv3Xuhk2r/ADgdpV0opd2dPZ/ESKUEk+E3HS59NHp8kgp0xVJIhAuQus3PHv3XujY7B/mJ/FjfssUQ35Js6pfTGtPvrGybeDztx4YqiaWWGRtRsORf37r3RxsHuLb+5cbBldv5nF5zH1UYmp6zG1sNTTzRElRIrwu/oJH+Hv3XunlQD9PUCeHXkf0II/Frf19+6912UYWt6uf9aw/2J59+691xI/BB5/5H7917rgUH449+691jKm3I4/339PfuvdYyg/HH+8+/de6xkEfX37r3XAqD/r/19+691iZP68j+v++59+691iZPyP8Abf8AFPfuvdYGT6kXvf6f73/sffuvdYiPqCPfuvdYWT/Akf77+nv3Xuo7Lb/W9+691iZb8j6/n/H37r3UVkt9Pob3/wAPfuvdRmW3+IP++t7917qM6fg3tfg+/de6jMv4N/rwffuvdRJE+v8AvP8AiP8Ab/09+691Edbf1sf94/2Pv3Xuokif7f8AH+t7917qE62/xB/2/wDj7917qHIlv8T/AMRz+PfuvdRJFvz/ALz/AI/g/wCPv3Xuv//R3HY0v9P6W5+lv+J9+691MVb8DgD37r3UyNPp/vH+A/2/PHv3Xupar9F/339ffuvdSo04/wAL8/4n37r3UhVv/rD/AH1vfuvdSlT6E/X8D37r3UlVtyfr/vXv3Xusyrfk/T/e/fuvdSlT8n/Yf4f8b9+691lVb/63v3XusyJ+B/sT7917qQifgf7E+/de6zKoH+v/AL76e/de65gXNvfuvdZAgHJ5P+8e/de6zBCf8P8Ae/8Abe/de65hQP6+/de6yhCfrx/sPfuvdcwgH+P+v7917rl7917rsKT/AMV/Hv3XuuL+jTe/N7m3pW3N2NxYEe/de671IQGUM91LgLa7gcHSOCSL/wCHv3XugU7i+RPT/RGJGW7L3hjcG00cj47ELMtTnMzNGoYU2MxkbeWWWS9l8hjW/wCR7917qnHu3+az2BuOWXF9JbeptkYmQTLFubddCmQy0sEhIjeGjE0UWJyXjP6Q03jb8n37r3VaG9ez+yOzMo2X37vrdO6ciVkSKXOZGaaKlgkkMj08CAxokDynUqlTa/v3XukLPaNVY08QAYD1MCrsR+rjm6/X37r3XMQPWgCCjar4A1U1NVVbr9T6Up4ZHCrf/WPv3XulHi9hb4y6CXE7M3RX07cRyQYDKopb6ADzUsfPPHv3XulT/oR7nEXlk6q3rHGF1iRsLUetTypCgE3+vv3XukvkNhb6w8bT5TZm6qGLX4C0m2sndZGUsCWjgk0ghTyePfuvdJmeKaEAVVPW0ZuFLZOmngVmGkadM6QsPfuvdYZYo3aKNoAijkU7SCSmna3EkRQlomJ5AP09+690IOw+1eyOrcjJl9gb73Fs6tkdZKoY/KTxCsdQqKlTAwkiqIwsajx+kED68+/de6s16M/mr75wdRS4bvLb8O8sRoiSbdW1KFKDM08a3XX/AAcyNT5WYjmYmaEpYH1XI9+691cX1H391R3lhUzfW28cZuCPQrVGNjmSDNY+TSTJSZDGyMJYKiE8NpLrf6H37r3QxeQD6nkWJH0Kg3NzyR7917rvSrAFfyLi3+P049+691xKEfTn/Ye/de6xFAf8D/vvx7917rGVI/xH9ffuvdYin9OP8P8Ajfv3XusZFjb37r3WNkvyPr/vHv3XusLLf68Ee/de6jugvY/X8H37r3WEgj6+/de6xMnBt9PyPfuvdRWW3+t7917rEyfkf7H/AB/437917qKyfkfT8j/ffj37r3URl+oPv3Xuo8if4/1t/vH19+691GZb3/qOL/63v3XuocifX/bH/X/r/t/fuvdRHX6j/bf8R7917qFIv1+vP1uPp/T37r3UN1/HFx7917qE6gf6x9+691//0tyZFt+OT/sffuvdS4lt/Tj6/wCN7+/de6mqth/if99b37r3UmNfp/U/X/Ae/de6kqv0A9+691LRfofwPp/sPfuvdS1W31+v+9f8b9+691lVb8n6f737917qUq25P1/3r/jfv3Xusqrf/W9+691IVb/4Ae/de6kKt/8AAfjjj37r3WUAD6e/de6yKt+T9P8AeffuvdZlW/A+g/P++/Pv3XusoUD/AF/6+/de6yql/rx/vfv3XusgAH09+69137917rmEP5Nv959+691zCgf4/wCv7917rkBc2/r/AF+n09+69035GsoaCkqKuvqaekoqNDLV1VVNFTUVPELlpZ6iZ40WNLc/n37r3VOPyo/mbU2GrMvsb48ijydXTvJisl2ZWxefGUmQYlGptuUrDVXTRHjySKkQb6H8+/de6pa3Vuvcm+txVm597bgyGf3DXPJNkcxk5pZ6yEMQy0t3DO0AP6FF1UfT37r3TThMPldw5Gnwe38RkNxZOsmVaLD4mgqctk5qmRvTK8ccTiN3bkvKVX/H37r3VknT38rvu3sGKmyfYeSo+r8LU+FpaatC5Pd8kbIsmuDHJ5sbFDGhCkPOraz9Lc+/de6se67/AJYHxu2YKOfcNJmt/ZWlYk1eXrZKGgm9GlxNhKOR6GXUeRrJ0n6e/de6ORtfo3qDZXiba3WeycDLToFjmxu3sdT1J0j6yVMcCzSOxHJJJ9+690KappAVQqoAAECgKoH4FueP9t7917rkFOq+on+i/gf7D8+/de64SokiMkqpJE6lXjdQyOCfyCCGBH4t7917oK9z9F9N7zDrurrDY+e8isDLktvYyqnVnuNaTSU5likBNwykMrcg39+690THsD+Vt8bN1xV021afcHXuWrnd2rsHkp6ujVyLr/uKq5VpwgYfQEAj37r3Vbncn8sLvLriGvyOxZqLtnb0Hknj/hscVBvGAxqtpWxMxp8cUVR6linckC9rk+/de6rjyuOyeDrKjF57FV+Oy9JLJTT0WQoKnG1NPVqbSpJR1kcD1R+mvSGjNuGPv3Xunna27d1bBztBubZm5cltPPUUkU8OYws0lHLHVRElIpPGyaqdk1K1M9omB+vv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bSBjWzNe1M/+1a4iCp/xHv3XukB6lIB5YWvY/Xj8n+q+/de683P9eBe3+H5/1j7917rv6f15B/PP+wH+0/8AE+/de6Np8Db/AOzf9EN+P7zZXn/X2ZuX8X/x9+691tgE3N/fuvdde/de6xS2sARcE/8AGv8Aiffuvda8n83DIxy91df4nWC9JswVUoNjoSsqq2LXb+yD9t7917qt3q3HyZPsrr/HRLeXIby22jRqPWsZro5L3/xENx/S3v3XutzL37r3XB/0/wCv/wAj/wCI9+691hP0P+sf969+691g9+691wc8W/r/AMRb37r3Udzxb+v/ABFvfuvdRpPx/sf+I9+691iP0P8ArH/evfuvdRX+gH+P++/3v37r3UR/1H/Yf70PfuvdYZPx/sf+I9+691EP1P8Arn/e/fuvdRZP7X+v/wAT7917qE/6j/sP96Hv3XuokhuCf9b/AIj37r3UST8f7H/iPfuvdN8n4/2P/Ee/de6//9bdHi4sT9Ln/ere/de6lp+of7H/AHo+/de6loeLf0/4m/v3XupYP0P44Pv3XupaHn/XHH+9+/de6zp+of7H/ej7917qWn0I/wAf99/vXv3XupKfp/1j/wAb/wCJ9+691mQ/Uf7H37r3UhD9R/sffuvdSEP1H+x9+691k9+691mU3H+I+vv3XusyH8f7b37r3WT37r3XYNjf37r3Wf37r3XBwWDLewdGQG/9plI5AF7c3/2Hv3XutQn5P4P+7XyR7swRTTHRdh50Qhxa1M7RvHUEmwIkLcEXuPfuvdGo/lbbni298m46CofS+7dkZTALH/q6taqly8BU/wBpftsc5/rx7917rZeVr8fkD6+/de65+/de697917r3v3XutQr5fG3yr+RR+untXcp/wAtQgkX/ACPfuvdF3sfqeRZmsCObsALc25PP9bD37r3XK48eqxb1KCTrCwjyBXlCqCzSyfoQAW1MC1luR7r3QgdZdYbz7g3tiuv+vsZW5vcGWmMEgjiHhxOOZv8AKcnnKpG8VLT0NNdgQxDsunk+/de6vA3F/LAwmI6U27Q9ebirIe9to1se6It411RJ9nm89HHFqx701zHRUNL4V+10X8cl5By3HuvdDh0p8i+736k31N2h0RvWo7D6loWx96GlgSk3xWU0UsUMuMM9VE8jyNEGlMStdDf68e/de6oL73393b3T2FlN4dlbb3b/ABeWteKg24dt7kSh2ZR0zuKXE4KH+GskqRIxvMLNKTc/T37r3QhdC/B/vnvjL0TRbVyOzNmyy6q3ee7qR6GCClVgaiOhxE96uvyEsd/CskSRarEsLD37r3R7vlP3R118UukaP4mdA165HceWoJ6bfW41qo6yvwtNWgyZWavqoHlhkzWZlZovCjulPTuVB4t7917qk9IwiiOPVGiIkaqrXACckE/W7j6m31Pv3XuslwSSBx/QfRRz/WxI9+691xAvfi/1I5PP0v8AW30/3n37r3Xv6/0BYm34sOLH8+/de6Nr8DSf9m86J5J1blyjW4Hp/ubuQf7cE+/de62wPfuvde9+691GkPBPLEcgA8kjkLza/v3XutY7+ZvueDc3yq3DHTSI8W0do7f2rIt+Ya5JMhW1oc2tcpXIVtzz7917oBviTgxuX5O9J4mVSIpOwMa1YR+pqGloslVwMgFxx4Te9gDb37r3W3H7917rC5ubfgf737917rE54t+T/vv+I9+691i9+691ic82/p/xPv3Xuo7nm39P+J9+691Hc82/p7917rC/0A/x/wB9/vfv3Xuoz8kD/fc/8i9+691EP1P+uf8Ae/fuvdR3IuT+P98PfuvdRT9D/rH/AHr37r3URz+P9j/vfv3XuojHkk/i/wDth7917qHJ+CPpc/7z9P8AevfuvdRJfz/wX/ivv3XuoD/X/Yf8Sffuvdf/190SP8j/AH3++59+691MBPB/Nh/vXv3XupcZ+v8AiL/77/b+/de6mLyo/wBb/euPfuvdSYz+n/bf8R7917qSOCD/AI+/de6kqbEe/de6koebf1/4j37r3WYGxv7917qQDY3/ANv/AK3v3XupANjf37r3Wf37r3XJTY/4fn37r3WcGxv7917rMDcX9+69137917rIh/H+29+6912xsRxf8/T6Bf1f7Hnj37r3Ws7/ADONnLtv5R5jKLS+LGbz2tgstA4TR58ggqosxIXsoZtaR/kkX59+690WP437/HWfenUu+Wd1ixm8qGGUBwIpKbLO+BjickhSiQZMlv6W9+691uCLIr6WRlZHQSRzKwZWBPGkgnUpvwRxb37r3UpH1Af1tz/xPv3Xuufv3Xuve/de61DPl76vlV8iRwAO19xo1zwdS0RAH49Wn/Y+/de6LuBqB9CM6COZ4uIxHf0Ranay/cTR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prYeJqP2yaikwNJ9yzKwZXaeQO7MrC9/qD7917obqWkpaGMRUVJTUcUaBVjpoYYhwPp6I1t7917qUHkYWIdbEcj8n6fUAfg+/de68t/ySf8AX+o5P+J+p9+6912SB9ffuvdcS4/HPv3XuuBc/wCsLf778e/de6xmQf4n/ff4+/de6xlz/rC3++/Hv3XusRkH+J/33+39+691jJJ+vv3XusZcfjn/AHj37r3WFn/qbn+n++4Hv3XusRYn/W/p7917rEzgcD6/717917qO0n9Ln/H+n+39+691HZ/6G5/r/T/b+/de6ws1vrcn/ffn37r3UZn+vJJ5/wBgf9j7917qOzAf4n37r3UV3+vJ+vJ9+691EZr8n6f717917qNI/wDr/wCA/wCJ/pf37r3UN3vcf7c/8R7917qLI9vzx9P9c+/de6hu/wDXk2/2H+x9+691Ckk+vJ+nH+J/417917qG7W/PP1P+t7917r//0tvaOT/Y3/2Fx/xX37r3UpW/I/2I9+691MRwwH9f99/vPv3XupSPyP6/737917qYj/7b8/4H/iffuvdSFe30+l/9t9D/AL17917qSj/4n/A/77n37r3UtXuf6H8f8j9+691nV7fUm/8AX/iOPfuvdSFcHg/X/e/fuvdZle31uffuvdZ1f/Yj37r3WdZP9iAPp9Lf7G3v3XuswYH6e/de6yByPryPfuvdZVk/ofp9Qf6f70PfuvdZQ4/PHv3XuslyPoT7917rkHP55/3j/iPfuvdcxIP6kf77/D37r3WQOf8AXFv99+Pfuvdc9Y/x/wB4/wCK+/de65eQf6o/7z7917rnrb+v+8D/AIp7917rl5P8P95/417917rvWP8AH/eP+K+/de69rH+P+8f8V9+6913rX+v+8H/inv3Xuva1/r/vB/4p7917r2tf6/7wf+Ke/de69rX/ABP++/xt7917rrWP8f8AeP8Aivv3Xuuiyn+zf+lwP+N29+6917yf4f7z/wAa9+691wLkA3PH++/p7917riZB/Un/AA5/4n37r3XHWPwD/vv9v7917rgznk3sP99+fr7917rGZB/if99/j7917rgXP44/3n37r3XAn6kn37r3XAyAf8b4Hv3XusLP/U3/AMP99x7917rEWJ/wH9P+N+/de6xlgP8AX/p7917rC8n/ACL/AIm/v3XusDv/ALAf739ffuvd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3XusLS/8UBJ9+691gaW4P+v/ALD6fX/W9+691iZ/6kfT6f7z9D+ffuvdYWkABt/t/wDYfj6c+/de6wNIST/vf+w/2Fre/de6wNJ+fr/tX0H049+691HaW/8Ahz+f+R/4e/de6jNIT/sPyf6e/de6jNIBe3+PN/6cce/de6iyS/Uf4/76/wDS/v3Xuozvyf8AX/Tf6ce/de6ivLe4+o/rf6cf8U9+691FeS1/z9Ob3/5Hb37r3UOSU3P5v/tvre/+v7917qI72BN78fW4/wCK3v7917qHJJfk/wC2/r/yL37r3USWX+lvof8AiPz/AFPv3Xuv/9HaYST/AInj/bc+/de6lpJq+v8At/8Aiv8Ar+/de6lJJa3+9/g8cE+/de6mJLwP8fx+Rx/vVvfuvdSUkt/vuRcD/iPfuvdSlkvb/Yc3/PH1/p7917qSspH+t/h7917qSkv05/r/AMF/P+Pv3XupCyf7D8/Xg/717917rOslv8Pp+eP9j9OB7917qSkv++/H+v8AUf09+691IWQXH4P9eLf7f37r3WVZCLHg/wCP++v7917rMsv++J5P+8n37r3WRX/5B4+t/wDiffuvdZhIRb6Hjj/iv59+691lE34/3k/8Vv7917rKJf8AXt/gf+Re/de6yiW/9P8AW+h/4n37r3XPWPyD/vv9t7917rnr/wBq/wB59+691z1n/D/ef+K+/de65CUj6D/ef+Ne/de65CW39T/r/wDI/fuvdc/L/iv++/2Pv3Xuu/KPzb/b/wDI/fuvdd+T/D/ef+Ne/de695P8P95/417917rl5m/31v8Ainv3XuveZv8AfW/4p7917rj5P8P95/417917r3k/w/3n/jXv3XuuvKPxp/29/wDinv3XuujLb/Un/W/5H7917rH5f8W/33+x9+691xMhPNuf9f8A417917rrWf8AD/ef+K+/de64F+D6rj/Xv/rf7H37r3XDWPwD/vv9v7917rGZePx/sPr/AL37917rEZf6/wC8n8+/de6xGa/0/H9Pof8AeT7917rEXP8AgB/vvz7917rEz8/1P9Tz+P6+/de6xNL+P9jx/vRN/fuvdYjITzwL/n/fce/de6wtIOf6/wBeLf6/v3Xuo7S35/3v6D37r3UYyfn/AHkn37r3WBpP9jb834/r/sffuvdR3l/P+J+v0/2HPv3XuozSk/Xj8XP++HPv3XuorScf0/2PP+w+nv3Xuozyf1/P4/ryL+/de6ivL9f98Pr+f8b+/de6iPJe/wDtr3/F/p/rX9+691FeS1x/sP8AH/e/p7917qI8n1v/ALb8Dj37r3UOSW/+t9OP999PfuvdQ3e31/xP+t/xPv3Xuv/S2iY5Ofzx/j/vXv3XupiSX/w/xvb/AGHv3XupSS/1+lv68f7D37r3UlJPpb+n0v8ATn/D839+691KSX6f1/1+f9t+ffuvdSlkvY/S/wCb+/de6lLIR/h+P8Ofzb/D37r3WdZR9ef+I4/r9PfuvdSVltx/yL/X/BHv3XupKyfX8f654/5H7917rOrg/nT/ALH8f7x7917rOJCP6/7A/wDEe/de6zLLz9fqPx+PfuvdZ1lvb/bW/J/x/Pv3Xusqv/Q25+h/P+wB9+691lEhH4/2xt7917rKJf8AHgX+v1P+9n37r3WQSf64P+H++Hv3Xusgf+hB/wBjf/iffuvdcxIR/wATY29+691kWX8f7y3/ACP37r3XMSjgfU/6/wDxQW9+691z8p/Or/b3/wCKe/de65CW/H04+p/4rf6+/de65iUcA2J/1/8Aig9+69135P8AD/ef+Ne/de671j8g/wC+/wBt7917r2sf4/7x/wAV9+6917WP8f8AeP8Aivv3Xuvax/j/ALx/xX37r3XtY/x/3j/ivv3XuuvJ/h/vP/Gvfuvde8n+H+8/8a9+691x8oP0sP8AXP8AxW3v3XuuJm/H+8j/AIrf37r3XAy/65H+J/5H7917rgZf6ECx5v8A4f69vfuvdcGl/wBfj/U/n/effuvdcDIT+P8Abm/v3XusZkvfm1uLA2+n9Bf37r3WMyAfg/77/Wv7917rG0v4v+fx9R/h9R7917rGZCfx/tzf37r3WEuOOb/7z/xPHv3XusTS/X/X/H1H+9f09+691gaX68/4W/P+v/tvfuvdYWkJ/wCKk/j/AIj37r3WBpLX/P8Ajf8A5H7917rA8nP/ABvge/de6jNL+f8Ae/oP9YX9+691GaQD+v8AQE/7x/X37r3WBpL3+v5+v4/1re/de6ivJbm/0P8At/8Aeeb+/de6ivL/ALe/9efp+ffuvdRXk+pP+2v9OP8AY/j37r3UV5L3A+n0+vA/3w9+691FeTi/P9b/AJ/p7917qG8huR/vF+B/T/X9+691EeTg2Jv/AF/4pf8APv3Xuockt+Pz/vv9b8e/de6//9PZ5ST/AFz/AIX+n9ePz7917qWkhHP144/437917qXHL9Pqbj/Yf8a49+691LST882/3ke/de6kJJcfn/X/ACPfuvdSVk/PP+uP+KH68j37r3UuOX/W5/P+tf8A1re/de6kK/8AjY8f4X/p/r+/de6zrKR/Uf7z/sbe/de6krJf8kX5+v1/3rn37r3WdJSv15/339OPfuvdZ0m/P1/r/j/rjj37r3WdZQf8bfX/AJFa3v3XusyyfgH/ABI/w44/p7917rKstv6/72B/j7917rOsv+vwef8AXH+HHv3Xusol/rzf6fj/AIj37r3XMSDj6g/71/sffuvdZA5P0P8Avv8AY+/de6yCS39R/rH/AJF7917rmJb/AJtx+bf8b59+691zEoP0H+8/8a9+691y1j/H/eP+K+/de65eTi+o/wC35/3j37r3XISXsAef9Y3P+39+6913rb+v+8D/AIp7917rl5P8P95/417917r3k/w/3n/jXv3XuveT/D/ef+Ne/de695P8P95/417917r3k/w/3n/jXv3XuvF/6C3+P/Gvfuvdcdbf1/3gf8U9+691xMv4vyD+Ab/7x7917roycfqJH9L/APEE+/de646x/j/vH/FffuvdcDKBx9D/ALf/AIj37r3XAy/UXv8A4i3+8EH37r3XAyE/1/wJP/Ec+/de6xmT6Am3+8f7e3Hv3XuuBk/1yf8AH/fH37r3WMzD8f7b/ifx7917rC0v4+n9CT/xq3v3XusRlv8A1P8AvH+9e/de6wtJ+CSbfj/ef9b8+/de6wtKB/vf9bj/AG359+691gebn83+v9eP6f4c/wCPv3Xuo7SE/k/65+v/ABr37r3WFpLX/P8Aj9f9a1r39+691GaQn6X/AN4/3r6e/de6wNIBz+ri/wBfx/vfv3Xuo0kv9Pxxf+tr/wCv9ffuvdRWk/2H+9/4f6309+691HeS3HI/3v8A417917qK8nPN/wDW/wCK/T8+/de6ivL9frx+Px/xvn37r3UR5L3P4/3n37r3UR5bf7bkD6f43/2Hv3XuobyX5vb/AF/+I/pb37r3UR5R9LH/AH39f8Pfuvdf/9TZpST6EE/7H/iOf6e/de6lpL/j/rn/AHri3v3XupSSX+nBP+8/n/evfuvdS0lPHPP9P+N/63v3XupSS3sb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';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);

    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    $scope.guardar = function(){
        $http.post('API/usuario/subir_imagen', { imagen: $scope.myCroppedImage })
        .success(function(data){
            $state.usuario.imagen_url = data;
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
        });
    }
}
/**
 * imageCrop - CONTROLADOR PARA IMPORTAR IMAGENES
 */
function imageCrop($http, $location, $scope, $stateParams) {

    $scope.dupa = "dasdasdas";
    $scope.mostrar = false;
    $scope.numero_imagen = 0;

    $scope.myImage='data:image/jpeg;base64,/9j/4RgxRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAoAAAAEBAAMAAAABAeAAAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxNjowOTowNSAwMTowMTo1MgAAAAAEkAAABwAAAAQwMjIxoAEAAwAAAAEAAQAAoAIABAAAAAEAAAHgoAMABAAAAAEAAAHgAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAW4BGwAFAAAAAQAAAXYBKAADAAAAAQACAAACAQAEAAAAAQAAAX4CAgAEAAAAAQAAFqsAAAAAAAAASAAAAAEAAABIAAAAAf/Y/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACgAKADASIAAhEBAxEB/90ABAAK/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDsQ1SDVINUg1JTENUg1SDVINSUxDU+1TDU4akphtT7VPan2pKR7UtqJtT7UlItqW1E2pbUlItqbajbUxakpCWqJajFqYtSUhLVEtRi1RLUlIC1RLUYtUS1JT//0O4DVMNTgKYakpiGqQapAKQCSmIan2qYanhJTDan2qcJ4SUj2p9qnCUJKR7UtqJCUJKR7U21EhNCSkRamLUUhMQkpCWqJajEKJakpAWqJajEKBakp//R78BTASAUwElLAKQCcBSASUsAnhOApQkpjCeE8J4SUxhKFKFUu6t0qg7bcylru7d4J/zWbklNmEoVNnXOivMDNqBP7x2/9WGq5W+u1nqVPbYw8PYQ4f5zUlLQmhEhNCSkZCYhEIUSElIyFEhFIUSElISFAhGIUCElP//S9EAUwEwUgElLgKQCQCcJKUApQknSUtCzOsddxemNNcerlESKgYDR+/e//Bs/6b0TrfVG9MwzY2HZFh2UMPG6JNj/APg6vpO/zFl/V7onrR1TqANtlp9Sllmsz/2qu/ee/wDwLP8AB/5nppTXZgdf69FuXacfEdq1rgWsg/6LFaQ6z/jMh60Kfqf01jQLbLrT3ghjfk2tv/f1vQlCSnEf9UukOEN9Znm2wn/z4Hqhb9Vs/Cf6/Sskl412z6Tz/bb+ht/q2tYuqhRe5rGl7yGtaC5znGAAOXOKSnnOm/WZ7bvsfWG+ja07TeRsgnj7TV/gv+OZ+iXRQuVzbLPrJ1EU4NbW0YwIOU8QSD++fpem938xR9P/AAyP9W+pX0ZDui5o2vrJbRu5aW6uxt35zNv6TG/kf9bSU9EQokKaYhJTAhRIUyFEhJSMhQIRSFAhJT//0/RwpBRCmElMgnCYKQSUuE6ZSbyElPJ5rf2z9ZxiO1xsb2OH8iuH5H/bt36BdYABoBHkuW+qA9bOzsp2riBr/wAa+yx3/UNXVDkJKeX6n9Yi/Jc3Bzn49dYNZH2Ztoc9pdusa99jHbfzfoq2Prf0uNa7yf6jf/Si5Oz+dt/4x/8A1TlYorprxn5mQw3N9QUY+OCQH2lvqOdaWfpfSqY5n6Ov+ft/RpKek/54dL/0WQSdAAxpJJ4A/SKr9Zrsuyio5FjMHp9m0+k505FjvpEOoaPTd6P+h+0en/hLrFPGwhifY83LZiYea+0V047K3AOFkN9N8Pud9pb+Zez2U/zdiyf+cPVvXtu3ta+0wa3NDmsDZAqr3fR2/n/6RJT0X1fz+kW0nD6c17PRG9wsEOfPtdc57S71HbvpKh9bsR1VmP1TH9lrXBj3D95v6TGs/s7XV/5iF9VbrL+sZV9pBstqL3kCBJezgLY+sjA/omV4sDXg+bHNekpuYmS3LxacpmjbmNfHhuGrf7LkQrL+q7y7otTT/g32M+W9zh/1S1CkpiVEqZUCkpiVAqZUHJKf/9T0cKYQwphJTMKQUApBJTIJ28hRCdJTzH1TJo6lnYbtHAER/wATY6t3/n1dUOQuS6qXdH+sVfUQD6F/vcB3Eells/rfRvXUi2r0/V3t9Lbv9SRt2xu9Td9HZtSU+dWfztnOtjwANSSXugBdDhYp6Pj42V1Kypgdc57cewEuY57BV6ldlbbHeuxrf0vt9HYgdGZRZ1u1/Tsc5NLX7xkXuLW1NcSXvYxrDvssn9W3/pvT/trSzvq1Zn5TsnIznlxkMaK27WNnSuv3f5376SnGyMo/b29SzcqjLvrO7GxsZznsBGtTX2OZU2mmt/6Sz/DXrK17mSdSfEnUldN/zMr/AO5r/wDttv8A5JL/AJmV/wDc1/8A223/AMkkpq/U/wD5Sv8A+I/7+1bX1lsFfRckEwbNtbfMuc0f9Sm6R0GnpdtlwuddZY3ZLgGgNnd9Fv7zll/WnKfmZmP0jG91gcC8f8K8bam/9aqc62xJTpfVivZ0Wknmx1j/AJF7tv8A0WrUKhRSzHorx6/oUsbW34NG1SKSliolSKgUlLFQKkSoFJT/AP/V9FBUgUMFTBSUkBUgUMFSBSUzBTyoAp5SU1uq9Or6lhux3na+d1Nn7rx9F39X8x/8hcg63OaxnQ8277Hj12fpS8EhoPubucP5zH/Po/wX+k/Rs/RdzKpdT6TidSrAuBbawEVXs+m3y/l1/wDBvSU2MHDxsLFZRitioe4OmS8n/Cvf+e96sSuSbjfWPoRIxf1rEBna1psZ86P5+j/rP6NGq+utY9uRilrxz6bx/wBRaGOakp6eU0rnLPrrhgezGsJ/lvY0fgbFXd1f6xdW/R4FBoqdzZXI088u7axv/WW+okp1Oudfp6cx1NJD8wiQ0/RrB/wl/wD3yr89Vvq30i2ou6lm7vtNs+m1/wBMB+tl1k/4a/8A8Dr/AOMU+k/VmjDe3JzHDIyQdzWiTWx37/u911v/AAti2pSUuSmJTEpiUlKJUSUiVElJSiVAlOSoEpKf/9b0AFTBQQ5TBSUlBUgUIFSBSUlBTyhgpwUlJJSlQlKUlJJULK6bf52tln9dod/1QSlKUlMWYuJWZroqYfFrGg/g1FLieTKhKUpKZSmlRlNKSmRKYlRJTEpKXJUSUxcokpKUSoOKRKgSkp//1+6DlIOQQ5SDklJw5SBQQ5OHJKTByfchBycOSUllPuQtyfckpJKeUPcluSUklNuUNybckpJuTblDcm3JKZFyYuUS5RLklMi5RJUS5RLklLlyiXJi5QLklP8A/9Dsg5SDkEOUg5JSYOUg5BDlIOSUmDk+5BDlLckpLuT7kHcn3JKS7ktyHuS3JKSbktyHuTbklJNybcobk25JTMuTFygXKJckpmXKJcoFyYuSUyLlAuUS5RLklP8A/9n/7SAAUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAA8cAVoAAxslRxwCAAACI/IAOEJJTQQlAAAAAAAQFvCO2U3kA2mwsI2i9x/z9zhCSU0EOgAAAAABDQAAABAAAAABAAAAAAALcHJpbnRPdXRwdXQAAAAFAAAAAFBzdFNib29sAQAAAABJbnRlZW51bQAAAABJbnRlAAAAAEltZyAAAAAPcHJpbnRTaXh0ZWVuQml0Ym9vbAAAAAALcHJpbnRlck5hbWVURVhUAAAAEABTAEUAQwAzADAAQwBEAEEANwAxADYANgBBAEEANwAAAAAAD3ByaW50UHJvb2ZTZXR1cE9iamMAAAARAEEAagB1AHMAdABlACAAZABlACAAcAByAHUAZQBiAGEAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0ECgAAAAAAAQAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADWQAAAAYAAAAAAAAAAAAAAeAAAAHgAAAAEgBmAG8AdABvAC0AbgBvAC0AZABpAHMAcABvAG4AaQBiAGwAZQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAB4AAAAeAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAeAAAAAAUmdodGxvbmcAAAHgAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAHgAAAAAFJnaHRsb25nAAAB4AAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRh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Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MzIFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDEyLTA3LTExVDEyOjQwOjA1LTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgeG1wTU06RG9jdW1lbnRJRD0idXVpZDoxNzI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MkI2NTA3QTFENzNFNjExQTRFNkM0MjYzOURCNDA5NCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjE3Mjg2NTAxNzNDQkUxMTFCMTFFODFEQkQxQzg3MEFCIiBwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD0iMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wUmlnaHRzOk1hcmtlZD0iRmFsc2UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDoxMjI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDoxMjI4NjUwMTczQ0JFMTExQjExRTgxREJEMUM4NzBBQiIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MUI2NTA3QTFENzNFNjExQTRFNkM0MjYzOURCNDA5NCIgc3RFdnQ6d2hlbj0iMjAxNi0wOS0wNVQwMTowMTo1Mi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyQjY1MDdBMUQ3M0U2MTFBNEU2QzQyNjM5REI0MDk0IiBzdEV2dDp3aGVuPSIyMDE2LTA5LTA1VDAxOjAxOjUyLTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAABAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAA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Yf8AFffuvdYjD+f94H/FLe/de64+Fv8AfW/4r7917rH4v8F/33+w9+691jMVvrf/AG49+691jMIP0t/trf8AFffuvdY2iI/3rn37r3WIxfiw/wBcW/4n37r3WExA/n/Y25/2/v3XusLQfX/W+v1/230t9ffuvdYDCRfngf77/D37r3WBovqbWtxxa3+v/j9ffuvdYGhv9Lf8V/2H09+691HaL6kf8isP6e/de6jtH/X8cm3+P9eP8PfuvdYGi/pb/ev9cn/W9+691HaP8mx/x/3jn8+/de6jNDf6f7bi3+29+691FaL6/wBP945/4j37r3UZ47kjj/W/H+uP6ce/de6jPF+P99/S49+691FeIN9P9t/vHN/r7917qI8R+vH+P9P6e/de6iPHf8AH/ffT37r3X//Q2O1iA+tv955/4p7917qUkVyBx/rfj/iPz7917qUkX+tb/W/3of6/v3XupSR/S35/P+8f7yffuvdSVitYm3+9n/jV/fuvdSFi+lgBf/b8+/de6krFyOB/rfU/483449+691JWID+n+sLm/wDsffuvdSFiJva3+w/3w9+691nWH/Acc/1/3k/T37r3UhYgv1/33+x49+691nEZ/oB/xP8AtvfuvdZxF/UD/Y/8U59+691kWMfS3J/px+P9tx7917rKsR4+g/H4v/vj7917rKIT+f8Ab/8AIiffuvdZVh/Nh9fwB/h+eD9PfuvdZhEP8P8Ae/8Ae/fuvdZFjH0tf/eP+J9+691zEX+AH+vz/wAV9+691zERPH+9f0/3i3v3Xusgh/qP9jf/AIoT7917rvw/63+9/wC9gj37r3XLxD/D/kke/de65BB+ef8AeP8AiffuvdcxHfkD/ef+N+/de694v9p/3n/jfv3Xuu/Gf9SP949+6917xn/Uj/ePfuvde8Z/1I/3j37r3XvGf9SP949+69114v8Aaf8Aef8Ajfv3XuujGB9R/vP/ABv37r3XEoPxx/vP/E+/de64+If4f8kj37r3XHwj/D/bn37r3XEwn8C3+83/ANuffuvdcDGRxcf43/3x9+691wMX+A/2HH/FPfuvdY2jB4+n9fz/AMT7917rGYf9b/Ycf8av7917rC0HHNuf8Bz/AL37917rGYT+Bb/eb/7c+/de6wtFf+h/xHB/3n37r3WNowT+OOPpf6f4+/de6wtF/S35N/fuvdYW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/wDerf77n37r3UR4/r/r/W3P+x9+691FdPqOL/1/r/r/AOw9+691DdLXHNjf/Yf7H37r3UR4+P8Aif8AiD/h7917qE6W4tx9Le/de6//0ttBE/A/2J9+691Oji4/H+x/H/FSffuvdSkT8D/Yn37r3UuOP6f7e39fzz7917qWiWI/r+P6D37r3UlI/wA8X/r/AE+lwPfuvdSlT+gsP6/77k+/de6kJHx+P9f8+/de6lLHb68f4f1/2N/fuvdZlT+lv6X/AK/8T7917rOkf5/3n/inv3XupKxfn/W5/wBh+P8AX9+691lCDji5/wB74/x49+691mEZuL/7b/iPfuvdZlit/Qf7yffuvdZAg+n1J4/3n37r3WUIfzx7917rmsd7/n/eP+J9+691lEdv6D/WH/IvfuvdZBHfkD6H+v8AxX37r3WQR2/oP9Yf8i9+691yCD88/wC8f8T7917rsKB+L/6/Pv3XuuYW/wBAP8foPfuvdctDf63++/wv7917r2g/4f7z/wAU9+69134/8f8AeP8Ajfv3XuveP/H/AHj/AI37917r3j/x/wB4/wCN+/de694/8f8AeP8Ajfv3XuveP/H/AHj/AI37917r3j/x/wB4/wCN+/de660H/D/ef+Ke/de660N/T/eR/wAV9+691xK/1Av/ALA+/de64lQTe1v8BwPfuvddFB+OP95/4n37r3XAx/ng/wCw59+691jMdh/Qn6H6/wC9Ee/de64GO/8AQ/64/wCR+/de6xNHa34/3m/+8+/de6xlD/QH/ff4+/de6xFB+OP959+691jMX+AP+tx/t+ffuvdYSh/wPv3XusRQG/4P+9f7D6e/de6wtF9T/vP+x/p/X37r3UZ47f0uf6fTj37r3WBk/qP9j/vuffuvdYGiv/jx9fpb/effuvdRnj/P+P1H/E/6/v3Xuo7J/Uf4X9+691FeO39Af94P0/23v3XuozJe/wDX+h+nv3Xuockf+8H/AG3/ABX37r3UV0/Btf8AB9+691Ekj4P44vb/AIn6+/de6hOn4P1/B9+691EdLX4H05H++4+nv3Xuokkd+R/yL/A/4e/de6//09t+OP8AJ/5F/gP8ffuvdS1S4/oPx/vr+/de6mJH/rfT8/Qe/de6lqn0sP8AC/8AvuffuvdSUjta4/4qb/63Pv3XupKxn+nH9P8AX/3rk+/de6lp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Vb8n6f737917qSq/k3vfge/de6lKtufz/vX/ABv37r3WVVvyfp/vfv3XupCJf63sOAP99z7917rKBfge/de6zKlrfUn37r3WYJ/X/be/de6zKl7fge/de6ygAfQe/de65hSf9b+v+++vv3XuuYQfnn/ePfuvdZQpP49+691z0L/if99/h7917rIAfwD/AE9+691zCf1Nv8P+N+/de670L/if99/h7917rlbSDYc/6/1/2PPv3XuvX+nB5/2w/wBj7917rCXBc21MVJvp4T6/ovzqcf09+690x5/dO29q42ozO581jcDi6dS89flqyChp4VW4JdpnXTbT/j7917onu/P5iXxW2IWjj3xLvOoQ6TDsLHy7l0SFiNM0kMsUKAMfUbkD6+/de6KVuf8Am+bapppqfZnTmczAu329Tk9xU+NllQHgvjP4ZJJGx/p5Tb37r3QO1382/tOYTrjuttsULSXNKamaqrdF/osqxz0+sr9D9PfuvdJ5f5sne9ww2nsNgqgOhxWTQlhe4D/xk2Dfjj37r3Six/8ANw7RhZP4p1ptmuA5lSlqKmg1AEGwkmnqRGCL82Pv3Xuhk2r/ADgdpV0opd2dPZ/ESKUEk+E3HS59NHp8kgp0xVJIhAuQus3PHv3XujY7B/mJ/FjfssUQ35Js6pfTGtPvrGybeDztx4YqiaWWGRtRsORf37r3RxsHuLb+5cbBldv5nF5zH1UYmp6zG1sNTTzRElRIrwu/oJH+Hv3XunlQD9PUCeHXkf0II/Frf19+6912UYWt6uf9aw/2J59+691xI/BB5/5H7917rgUH449+691jKm3I4/339PfuvdYyg/HH+8+/de6xkEfX37r3XAqD/r/19+691iZP68j+v++59+691iZPyP8Abf8AFPfuvdYGT6kXvf6f73/sffuvdYiPqCPfuvdYWT/Akf77+nv3Xuo7Lb/W9+691iZb8j6/n/H37r3UVkt9Pob3/wAPfuvdRmW3+IP++t7917qM6fg3tfg+/de6jMv4N/rwffuvdRJE+v8AvP8AiP8Ab/09+691Edbf1sf94/2Pv3Xuokif7f8AH+t7917qE62/xB/2/wDj7917qHIlv8T/AMRz+PfuvdRJFvz/ALz/AI/g/wCPv3Xuv//R3HY0v9P6W5+lv+J9+691MVb8DgD37r3UyNPp/vH+A/2/PHv3Xupar9F/339ffuvdSo04/wAL8/4n37r3UhVv/rD/AH1vfuvdSlT6E/X8D37r3UlVtyfr/vXv3Xusyrfk/T/e/fuvdSlT8n/Yf4f8b9+691lVb/63v3XusyJ+B/sT7917qQifgf7E+/de6zKoH+v/AL76e/de65gXNvfuvdZAgHJ5P+8e/de6zBCf8P8Ae/8Abe/de65hQP6+/de6yhCfrx/sPfuvdcwgH+P+v7917rl7917rsKT/AMV/Hv3XuuL+jTe/N7m3pW3N2NxYEe/de671IQGUM91LgLa7gcHSOCSL/wCHv3XugU7i+RPT/RGJGW7L3hjcG00cj47ELMtTnMzNGoYU2MxkbeWWWS9l8hjW/wCR7917qnHu3+az2BuOWXF9JbeptkYmQTLFubddCmQy0sEhIjeGjE0UWJyXjP6Q03jb8n37r3VaG9ez+yOzMo2X37vrdO6ciVkSKXOZGaaKlgkkMj08CAxokDynUqlTa/v3XukLPaNVY08QAYD1MCrsR+rjm6/X37r3XMQPWgCCjar4A1U1NVVbr9T6Up4ZHCrf/WPv3XulHi9hb4y6CXE7M3RX07cRyQYDKopb6ADzUsfPPHv3XulT/oR7nEXlk6q3rHGF1iRsLUetTypCgE3+vv3XukvkNhb6w8bT5TZm6qGLX4C0m2sndZGUsCWjgk0ghTyePfuvdJmeKaEAVVPW0ZuFLZOmngVmGkadM6QsPfuvdYZYo3aKNoAijkU7SCSmna3EkRQlomJ5AP09+690IOw+1eyOrcjJl9gb73Fs6tkdZKoY/KTxCsdQqKlTAwkiqIwsajx+kED68+/de6s16M/mr75wdRS4bvLb8O8sRoiSbdW1KFKDM08a3XX/AAcyNT5WYjmYmaEpYH1XI9+691cX1H391R3lhUzfW28cZuCPQrVGNjmSDNY+TSTJSZDGyMJYKiE8NpLrf6H37r3QxeQD6nkWJH0Kg3NzyR7917rvSrAFfyLi3+P049+691xKEfTn/Ye/de6xFAf8D/vvx7917rGVI/xH9ffuvdYin9OP8P8Ajfv3XusZFjb37r3WNkvyPr/vHv3XusLLf68Ee/de6jugvY/X8H37r3WEgj6+/de6xMnBt9PyPfuvdRWW3+t7917rEyfkf7H/AB/437917qKyfkfT8j/ffj37r3URl+oPv3Xuo8if4/1t/vH19+691GZb3/qOL/63v3XuocifX/bH/X/r/t/fuvdRHX6j/bf8R7917qFIv1+vP1uPp/T37r3UN1/HFx7917qE6gf6x9+691//0tyZFt+OT/sffuvdS4lt/Tj6/wCN7+/de6mqth/if99b37r3UmNfp/U/X/Ae/de6kqv0A9+691LRfofwPp/sPfuvdS1W31+v+9f8b9+691lVb8n6f737917qUq25P1/3r/jfv3Xusqrf/W9+691IVb/4Ae/de6kKt/8AAfjjj37r3WUAD6e/de6yKt+T9P8AeffuvdZlW/A+g/P++/Pv3XusoUD/AF/6+/de6yql/rx/vfv3XusgAH09+69137917rmEP5Nv959+691zCgf4/wCv7917rkBc2/r/AF+n09+69035GsoaCkqKuvqaekoqNDLV1VVNFTUVPELlpZ6iZ40WNLc/n37r3VOPyo/mbU2GrMvsb48ijydXTvJisl2ZWxefGUmQYlGptuUrDVXTRHjySKkQb6H8+/de6pa3Vuvcm+txVm597bgyGf3DXPJNkcxk5pZ6yEMQy0t3DO0AP6FF1UfT37r3TThMPldw5Gnwe38RkNxZOsmVaLD4mgqctk5qmRvTK8ccTiN3bkvKVX/H37r3VknT38rvu3sGKmyfYeSo+r8LU+FpaatC5Pd8kbIsmuDHJ5sbFDGhCkPOraz9Lc+/de6se67/AJYHxu2YKOfcNJmt/ZWlYk1eXrZKGgm9GlxNhKOR6GXUeRrJ0n6e/de6ORtfo3qDZXiba3WeycDLToFjmxu3sdT1J0j6yVMcCzSOxHJJJ9+690KappAVQqoAAECgKoH4FueP9t7917rkFOq+on+i/gf7D8+/de64SokiMkqpJE6lXjdQyOCfyCCGBH4t7917oK9z9F9N7zDrurrDY+e8isDLktvYyqnVnuNaTSU5likBNwykMrcg39+690THsD+Vt8bN1xV021afcHXuWrnd2rsHkp6ujVyLr/uKq5VpwgYfQEAj37r3Vbncn8sLvLriGvyOxZqLtnb0Hknj/hscVBvGAxqtpWxMxp8cUVR6linckC9rk+/de6rjyuOyeDrKjF57FV+Oy9JLJTT0WQoKnG1NPVqbSpJR1kcD1R+mvSGjNuGPv3Xunna27d1bBztBubZm5cltPPUUkU8OYws0lHLHVRElIpPGyaqdk1K1M9omB+vv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bSBjWzNe1M/+1a4iCp/xHv3XukB6lIB5YWvY/Xj8n+q+/de683P9eBe3+H5/1j7917rv6f15B/PP+wH+0/8AE+/de6Np8Db/AOzf9EN+P7zZXn/X2ZuX8X/x9+691tgE3N/fuvdde/de6xS2sARcE/8AGv8Aiffuvda8n83DIxy91df4nWC9JswVUoNjoSsqq2LXb+yD9t7917qt3q3HyZPsrr/HRLeXIby22jRqPWsZro5L3/xENx/S3v3XutzL37r3XB/0/wCv/wAj/wCI9+691hP0P+sf969+691g9+691wc8W/r/AMRb37r3Udzxb+v/ABFvfuvdRpPx/sf+I9+691iP0P8ArH/evfuvdRX+gH+P++/3v37r3UR/1H/Yf70PfuvdYZPx/sf+I9+691EP1P8Arn/e/fuvdRZP7X+v/wAT7917qE/6j/sP96Hv3XuokhuCf9b/AIj37r3UST8f7H/iPfuvdN8n4/2P/Ee/de6//9bdHi4sT9Ln/ere/de6lp+of7H/AHo+/de6loeLf0/4m/v3XupYP0P44Pv3XupaHn/XHH+9+/de6zp+of7H/ej7917qWn0I/wAf99/vXv3XupKfp/1j/wAb/wCJ9+691mQ/Uf7H37r3UhD9R/sffuvdSEP1H+x9+691k9+691mU3H+I+vv3XusyH8f7b37r3WT37r3XYNjf37r3Wf37r3XBwWDLewdGQG/9plI5AF7c3/2Hv3XutQn5P4P+7XyR7swRTTHRdh50Qhxa1M7RvHUEmwIkLcEXuPfuvdGo/lbbni298m46CofS+7dkZTALH/q6taqly8BU/wBpftsc5/rx7917rZeVr8fkD6+/de65+/de697917r3v3XutQr5fG3yr+RR+untXcp/wAtQgkX/ACPfuvdF3sfqeRZmsCObsALc25PP9bD37r3XK48eqxb1KCTrCwjyBXlCqCzSyfoQAW1MC1luR7r3QgdZdYbz7g3tiuv+vsZW5vcGWmMEgjiHhxOOZv8AKcnnKpG8VLT0NNdgQxDsunk+/de6vA3F/LAwmI6U27Q9ebirIe9to1se6It411RJ9nm89HHFqx701zHRUNL4V+10X8cl5By3HuvdDh0p8i+736k31N2h0RvWo7D6loWx96GlgSk3xWU0UsUMuMM9VE8jyNEGlMStdDf68e/de6oL73393b3T2FlN4dlbb3b/ABeWteKg24dt7kSh2ZR0zuKXE4KH+GskqRIxvMLNKTc/T37r3QhdC/B/vnvjL0TRbVyOzNmyy6q3ee7qR6GCClVgaiOhxE96uvyEsd/CskSRarEsLD37r3R7vlP3R118UukaP4mdA165HceWoJ6bfW41qo6yvwtNWgyZWavqoHlhkzWZlZovCjulPTuVB4t7917qk9IwiiOPVGiIkaqrXACckE/W7j6m31Pv3XuslwSSBx/QfRRz/WxI9+691xAvfi/1I5PP0v8AW30/3n37r3Xv6/0BYm34sOLH8+/de6Nr8DSf9m86J5J1blyjW4Hp/ubuQf7cE+/de62wPfuvde9+691GkPBPLEcgA8kjkLza/v3XutY7+ZvueDc3yq3DHTSI8W0do7f2rIt+Ya5JMhW1oc2tcpXIVtzz7917oBviTgxuX5O9J4mVSIpOwMa1YR+pqGloslVwMgFxx4Te9gDb37r3W3H7917rC5ubfgf737917rE54t+T/vv+I9+691i9+691ic82/p/xPv3Xuo7nm39P+J9+691Hc82/p7917rC/0A/x/wB9/vfv3Xuoz8kD/fc/8i9+691EP1P+uf8Ae/fuvdR3IuT+P98PfuvdRT9D/rH/AHr37r3URz+P9j/vfv3XuojHkk/i/wDth7917qHJ+CPpc/7z9P8AevfuvdRJfz/wX/ivv3XuoD/X/Yf8Sffuvdf/190SP8j/AH3++59+691MBPB/Nh/vXv3XupcZ+v8AiL/77/b+/de6mLyo/wBb/euPfuvdSYz+n/bf8R7917qSOCD/AI+/de6kqbEe/de6koebf1/4j37r3WYGxv7917qQDY3/ANv/AK3v3XupANjf37r3Wf37r3XJTY/4fn37r3WcGxv7917rMDcX9+69137917rIh/H+29+6912xsRxf8/T6Bf1f7Hnj37r3Ws7/ADONnLtv5R5jKLS+LGbz2tgstA4TR58ggqosxIXsoZtaR/kkX59+690WP437/HWfenUu+Wd1ixm8qGGUBwIpKbLO+BjickhSiQZMlv6W9+691uCLIr6WRlZHQSRzKwZWBPGkgnUpvwRxb37r3UpH1Af1tz/xPv3Xuufv3Xuve/de61DPl76vlV8iRwAO19xo1zwdS0RAH49Wn/Y+/de6LuBqB9CM6COZ4uIxHf0Ranay/cTR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prYeJqP2yaikwNJ9yzKwZXaeQO7MrC9/qD7917obqWkpaGMRUVJTUcUaBVjpoYYhwPp6I1t7917qUHkYWIdbEcj8n6fUAfg+/de68t/ySf8AX+o5P+J+p9+6912SB9ffuvdcS4/HPv3XuuBc/wCsLf778e/de6xmQf4n/ff4+/de6xlz/rC3++/Hv3XusRkH+J/33+39+691jJJ+vv3XusZcfjn/AHj37r3WFn/qbn+n++4Hv3XusRYn/W/p7917rEzgcD6/717917qO0n9Ln/H+n+39+691HZ/6G5/r/T/b+/de6ws1vrcn/ffn37r3UZn+vJJ5/wBgf9j7917qOzAf4n37r3UV3+vJ+vJ9+691EZr8n6f717917qNI/wDr/wCA/wCJ/pf37r3UN3vcf7c/8R7917qLI9vzx9P9c+/de6hu/wDXk2/2H+x9+691Ckk+vJ+nH+J/417917qG7W/PP1P+t7917r//0tvaOT/Y3/2Fx/xX37r3UpW/I/2I9+691MRwwH9f99/vPv3XupSPyP6/737917qYj/7b8/4H/iffuvdSFe30+l/9t9D/AL17917qSj/4n/A/77n37r3UtXuf6H8f8j9+691nV7fUm/8AX/iOPfuvdSFcHg/X/e/fuvdZle31uffuvdZ1f/Yj37r3WdZP9iAPp9Lf7G3v3XuswYH6e/de6yByPryPfuvdZVk/ofp9Qf6f70PfuvdZQ4/PHv3XuslyPoT7917rkHP55/3j/iPfuvdcxIP6kf77/D37r3WQOf8AXFv99+Pfuvdc9Y/x/wB4/wCK+/de65eQf6o/7z7917rnrb+v+8D/AIp7917rl5P8P95/417917rvWP8AH/eP+K+/de69rH+P+8f8V9+6913rX+v+8H/inv3Xuva1/r/vB/4p7917r2tf6/7wf+Ke/de69rX/ABP++/xt7917rrWP8f8AeP8Aivv3Xuuiyn+zf+lwP+N29+6917yf4f7z/wAa9+691wLkA3PH++/p7917riZB/Un/AA5/4n37r3XHWPwD/vv9v7917rgznk3sP99+fr7917rGZB/if99/j7917rgXP44/3n37r3XAn6kn37r3XAyAf8b4Hv3XusLP/U3/AMP99x7917rEWJ/wH9P+N+/de6xlgP8AX/p7917rC8n/ACL/AIm/v3XusDv/ALAf739ffuvd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3XusLS/8UBJ9+691gaW4P+v/ALD6fX/W9+691iZ/6kfT6f7z9D+ffuvdYWkABt/t/wDYfj6c+/de6wNIST/vf+w/2Fre/de6wNJ+fr/tX0H049+691HaW/8Ahz+f+R/4e/de6jNIT/sPyf6e/de6jNIBe3+PN/6cce/de6iyS/Uf4/76/wDS/v3Xuozvyf8AX/Tf6ce/de6ivLe4+o/rf6cf8U9+691FeS1/z9Ob3/5Hb37r3UOSU3P5v/tvre/+v7917qI72BN78fW4/wCK3v7917qHJJfk/wC2/r/yL37r3USWX+lvof8AiPz/AFPv3Xuv/9HaYST/AInj/bc+/de6lpJq+v8At/8Aiv8Ar+/de6lJJa3+9/g8cE+/de6mJLwP8fx+Rx/vVvfuvdSUkt/vuRcD/iPfuvdSlkvb/Yc3/PH1/p7917qSspH+t/h7917qSkv05/r/AMF/P+Pv3XupCyf7D8/Xg/717917rOslv8Pp+eP9j9OB7917qSkv++/H+v8AUf09+691IWQXH4P9eLf7f37r3WVZCLHg/wCP++v7917rMsv++J5P+8n37r3WRX/5B4+t/wDiffuvdZhIRb6Hjj/iv59+691lE34/3k/8Vv7917rKJf8AXt/gf+Re/de6yiW/9P8AW+h/4n37r3XPWPyD/vv9t7917rnr/wBq/wB59+691z1n/D/ef+K+/de65CUj6D/ef+Ne/de65CW39T/r/wDI/fuvdc/L/iv++/2Pv3Xuu/KPzb/b/wDI/fuvdd+T/D/ef+Ne/de695P8P95/417917rl5m/31v8Ainv3XuveZv8AfW/4p7917rj5P8P95/417917r3k/w/3n/jXv3XuuvKPxp/29/wDinv3XuujLb/Un/W/5H7917rH5f8W/33+x9+691xMhPNuf9f8A417917rrWf8AD/ef+K+/de64F+D6rj/Xv/rf7H37r3XDWPwD/vv9v7917rGZePx/sPr/AL37917rEZf6/wC8n8+/de6xGa/0/H9Pof8AeT7917rEXP8AgB/vvz7917rEz8/1P9Tz+P6+/de6xNL+P9jx/vRN/fuvdYjITzwL/n/fce/de6wtIOf6/wBeLf6/v3Xuo7S35/3v6D37r3UYyfn/AHkn37r3WBpP9jb834/r/sffuvdR3l/P+J+v0/2HPv3XuozSk/Xj8XP++HPv3XuorScf0/2PP+w+nv3Xuozyf1/P4/ryL+/de6ivL9f98Pr+f8b+/de6iPJe/wDtr3/F/p/rX9+691FeS1x/sP8AH/e/p7917qI8n1v/ALb8Dj37r3UOSW/+t9OP999PfuvdQ3e31/xP+t/xPv3Xuv/S2iY5Ofzx/j/vXv3XupiSX/w/xvb/AGHv3XupSS/1+lv68f7D37r3UlJPpb+n0v8ATn/D839+691KSX6f1/1+f9t+ffuvdSlkvY/S/wCb+/de6lLIR/h+P8Ofzb/D37r3WdZR9ef+I4/r9PfuvdSVltx/yL/X/BHv3XupKyfX8f654/5H7917rOrg/nT/ALH8f7x7917rOJCP6/7A/wDEe/de6zLLz9fqPx+PfuvdZ1lvb/bW/J/x/Pv3Xusqv/Q25+h/P+wB9+691lEhH4/2xt7917rKJf8AHgX+v1P+9n37r3WQSf64P+H++Hv3Xusgf+hB/wBjf/iffuvdcxIR/wATY29+691kWX8f7y3/ACP37r3XMSjgfU/6/wDxQW9+691z8p/Or/b3/wCKe/de65CW/H04+p/4rf6+/de65iUcA2J/1/8Aig9+69135P8AD/ef+Ne/de671j8g/wC+/wBt7917r2sf4/7x/wAV9+6917WP8f8AeP8Aivv3Xuvax/j/ALx/xX37r3XtY/x/3j/ivv3XuuvJ/h/vP/Gvfuvde8n+H+8/8a9+691x8oP0sP8AXP8AxW3v3XuuJm/H+8j/AIrf37r3XAy/65H+J/5H7917rgZf6ECx5v8A4f69vfuvdcGl/wBfj/U/n/effuvdcDIT+P8Abm/v3XusZkvfm1uLA2+n9Bf37r3WMyAfg/77/Wv7917rG0v4v+fx9R/h9R7917rGZCfx/tzf37r3WEuOOb/7z/xPHv3XusTS/X/X/H1H+9f09+691gaX68/4W/P+v/tvfuvdYWkJ/wCKk/j/AIj37r3WBpLX/P8Ajf8A5H7917rA8nP/ABvge/de6jNL+f8Ae/oP9YX9+691GaQD+v8AQE/7x/X37r3WBpL3+v5+v4/1re/de6ivJbm/0P8At/8Aeeb+/de6ivL/ALe/9efp+ffuvdRXk+pP+2v9OP8AY/j37r3UV5L3A+n0+vA/3w9+691FeTi/P9b/AJ/p7917qG8huR/vF+B/T/X9+691EeTg2Jv/AF/4pf8APv3Xuockt+Pz/vv9b8e/de6//9PZ5ST/AFz/AIX+n9ePz7917qWkhHP144/437917qXHL9Pqbj/Yf8a49+691LST882/3ke/de6kJJcfn/X/ACPfuvdSVk/PP+uP+KH68j37r3UuOX/W5/P+tf8A1re/de6kK/8AjY8f4X/p/r+/de6zrKR/Uf7z/sbe/de6krJf8kX5+v1/3rn37r3WdJSv15/339OPfuvdZ0m/P1/r/j/rjj37r3WdZQf8bfX/AJFa3v3XusyyfgH/ABI/w44/p7917rKstv6/72B/j7917rOsv+vwef8AXH+HHv3Xusol/rzf6fj/AIj37r3XMSDj6g/71/sffuvdZA5P0P8Avv8AY+/de6yCS39R/rH/AJF7917rmJb/AJtx+bf8b59+691zEoP0H+8/8a9+691y1j/H/eP+K+/de65eTi+o/wC35/3j37r3XISXsAef9Y3P+39+6913rb+v+8D/AIp7917rl5P8P95/417917r3k/w/3n/jXv3XuveT/D/ef+Ne/de695P8P95/417917r3k/w/3n/jXv3XuvF/6C3+P/Gvfuvdcdbf1/3gf8U9+691xMv4vyD+Ab/7x7917roycfqJH9L/APEE+/de646x/j/vH/FffuvdcDKBx9D/ALf/AIj37r3XAy/UXv8A4i3+8EH37r3XAyE/1/wJP/Ec+/de6xmT6Am3+8f7e3Hv3XuuBk/1yf8AH/fH37r3WMzD8f7b/ifx7917rC0v4+n9CT/xq3v3XusRlv8A1P8AvH+9e/de6wtJ+CSbfj/ef9b8+/de6wtKB/vf9bj/AG359+691gebn83+v9eP6f4c/wCPv3Xuo7SE/k/65+v/ABr37r3WFpLX/P8Aj9f9a1r39+691GaQn6X/AN4/3r6e/de6wNIBz+ri/wBfx/vfv3Xuo0kv9Pxxf+tr/wCv9ffuvdRWk/2H+9/4f6309+691HeS3HI/3v8A417917qK8nPN/wDW/wCK/T8+/de6ivL9frx+Px/xvn37r3UR5L3P4/3n37r3UR5bf7bkD6f43/2Hv3XuobyX5vb/AF/+I/pb37r3UR5R9LH/AH39f8Pfuvdf/9TZpST6EE/7H/iOf6e/de6lpL/j/rn/AHri3v3XupSSX+nBP+8/n/evfuvdS0lPHPP9P+N/63v3XupSS3sb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';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);

    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    $scope.guardar = function(){
        console.log('pasa');
        $scope.cancelar_edicion()
        $http.post('API/implemento/subir_imagen', { imagen: $scope.myCroppedImage, numero: $scope.numero_imagen, id: $scope.id_implemento })
        .success(function(data){
            console.log(data);
            $scope.cargar_imagenes($scope.id_implemento);
            /*$location.path("/implementos/listar");*/
        });
    }

    $scope.cargar_imagenes = function(id_prod){
        $http.get('API/implemento/get_implemento/' + id_prod)
        .success(function(data){
            $scope.imagen1 = 'img/implementos/' + data.implemento['ruta_imagen'];
            $scope.imagen2 = 'img/implementos/' + data.adicional['ruta_imagen_2'];
            $scope.imagen3 = 'img/implementos/' + data.adicional['ruta_imagen_3'];
            $scope.id_implemento = data.implemento['id_implemento'];
            console.log(data);
        });
    }

    $scope.editar_imagen = function(num){
        $scope.mostrar = true;
        $scope.numero_imagen = num;
    }

    $scope.cancelar_edicion = function(){
        $scope.mostrar = false;
    }

    if (typeof $stateParams.id_implemento !== 'undefined') {
        console.log($stateParams.id_implemento);
        $scope.cargar_imagenes($stateParams.id_implemento);
    }
}
/**
*Controlador PARA GESTIONAR EL ASISTENTE
*/
function wizardCtrl($scope, $rootScope) {
    // All data will be store in this object
    $scope.formData = {};

    // After process wizard
    $scope.processForm = function() {
        alert('Wizard completed');
    };
}
/**
*Controlador PARA CREAR NUEVAS PLANIFICACIONES DE CURSO
*/
function AsignacionCursoCtrl ($http, $state, $location) {
    var enlace = this;
    enlace.curso = {};
    enlace.cursos_anuales = {};
    enlace.cursos_anual = {};
    enlace.sectores = {};
    enlace.info = {};
    enlace.detalle_curso_anual = {};
    enlace.profe_asignaturas = {};
    enlace.cursos_listado = {};

    enlace.bloqueo_year = false;

    var f = new Date();
    var fecha = f.getFullYear();
    
    if($state.year.year >= fecha){
        enlace.bloqueo_year = false;
    }
    else
    {
        enlace.bloqueo_year = true;
    }


    enlace.primer = true;

     var hoy = new Date();
     enlace.info.fecha = hoy;

    enlace.traer = function () {
         $http.get('API/planificacion/get_cursos')
            .success(function(data){
            enlace.curso = data;
            //console.log(data);
            //enlace.cursos_anuales = enlace.crear_arreglo();
            //console.log(enlace.cursos_anuales);
        });
    };

    enlace.traer_seccion = function(){
        $http.get('API/planificacion/get_especialidades')
        .success(function(data){
            enlace.sectores = data;
            //enlace.asignar_nombre();
        });
    };

    enlace.traer_asignaturas_profe = function(){
        $http.get('API/planificacion/get_asignaturas_profe')
        .success(function(data){
            enlace.profe_asignaturas = data;
            //console.log(enlace.profe_asignaturas);
        });
    };

    enlace.crear_arreglo = function () {
        //console.log(enlace.curso);
         $http.get('API/planificacion/get_arreglo_cursos')
        .success(function(data){
            enlace.cursos_anuales = data;
            console.log(enlace.cursos_anuales);
        });
        enlace.cursos_anuales
    };

    enlace.guardar = function () {
        console.log(enlace.curso);
        $http.post('API/planificacion/subir_plan_paso_uno', {datos: enlace.curso})
        .success(function(data){
            $location.path("asignaciones/asistentes/enlazar/paso_dos");
        });
    };

    enlace.guardar_curso_anual = function () {
        var todos = true;
        angular.forEach(enlace.cursos_anuales, function(value, key){
            if(value.id_profesor == 0 || value.id_especialidad == 0){
                todos = false;
            }
        });
        if(todos){
            $http.post('API/planificacion/subir_plan_paso_dos', {datos: enlace.cursos_anuales})
            .success(function(data){
                $location.path("asignaciones/asistentes/enlazar/paso_tres");
            });
        }
        else{
            alert("Seleccione los profesores y las especialidades");
        }
    };

    enlace.guardar_detalle_curso_anual = function () {
        //console.log(enlace.detalle_curso_anual);
        enlace.subida_cargando = true;
        $http.post('API/planificacion/subir_plan_paso_tres', {datos: enlace.detalle_curso_anual})
         .success(function(data){
            enlace.subida_cargando = false;
            $location.path("asignaciones/asistentes/enlazar/paso_cuatro");
         });
    };

     enlace.traer_curso_anual = function () {
         $http.get('API/planificacion/get_cursos_anuales')
            .success(function(data){
            enlace.cursos_anual = data;
            console.log(enlace.cursos_anual);
        });
    };

     enlace.traer_curso_anual_listado = function () {
         $http.get('API/planificacion/get_cursos_anuales_listado')
            .success(function(data){
            enlace.cursos_listado = data;
            console.log(enlace.cursos_listado);
        });
    };

    //var arreglo_Temp = [];
    enlace.traer_asignaturas = function(){
         $http.get('API/planificacion/get_materias')
        .success(function(data){
            enlace.detalle_curso_anual = data;
            console.log(enlace.detalle_curso_anual);
        });
    };

    enlace.traer();
    enlace.traer_seccion();
    enlace.crear_arreglo();
    enlace.traer_curso_anual();
    enlace.traer_asignaturas();
    enlace.traer_asignaturas_profe();
    enlace.traer_curso_anual_listado();

    if ($state.current.name == 'asistentes.enlace') {
        $location.path("asignaciones/asistentes/enlazar/paso_uno");
    }
};
/**
*Controlador PARA GESTIONAR LA BASE DE DATOS EN TIEMPO REAL
*/
function TopNavbarCtrl ($location, $scope, $http, $state, ServiceNotificaciones, $firebaseArray, $firebaseObject) {

    var notificaciones = ServiceNotificaciones.get_notificaciones();
    notificaciones.on('value', function(snapshot){
        console.log('Actualizadas las notificaciones');
    });

    $scope.listado_notificaciones = $firebaseArray(notificaciones);

    $scope.year = $state.year;
    $scope.id_usuario_actual = $state.usuario.permisos.id_usuario;
    console.log($scope.id_usuario_actual);

    var f = new Date();
    var fecha = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
    var hora = f.getHours() + ":" + f.getMinutes();

    $scope.change_year = function(id_year){
        $http.post('API/fecha/cambiar_year/' + id_year)
        .success(function(data){
            console.log(data);
            $scope.mostrar_opcion_year();
            location.reload();
        });
    }

    $scope.crear_year = function(){
        var year = new Date().getFullYear();
        year++;
        $http.post('API/fecha/crear_year/' + year)
        .success(function(data){
            $scope.traer_years();
            $scope.mostrar_opcion_year();
        });
    }

    $scope.mostrar_opcion_year = function(){
        var year_actual = new Date().getFullYear();
        var year_ultimo = $scope.years[($scope.years.length)-1]['year'];
        if (year_ultimo == year_actual) {
            $scope.ver_opcion_year = true;
        }
        else{
            $scope.ver_opcion_year = false;
        }
    }

    $scope.traer_years = function(){
        $http.get('API/fecha/get_years').success(function(data){
            $scope.years = data;
            $scope.mostrar_opcion_year();
        }); 
    }

    $scope.hacer_busqueda = function(){
        $location.path('inicio/busqueda/' + $scope.busqueda);
    }
    
    $scope.agregar_notificacion = function(){
        $scope.listado_notificaciones.$add({
            titulo : 'Nueva',
            remitente: 'Desconocido',
            fecha : fecha,
            hora: hora,
            texto: 'Nueva Notificación sobre otra cosa',
            link: '',
            leida: false
        });
    };

    $scope.eliminar_notificaciones = function(){
        for (var i = $scope.listado_notificaciones.length - 1; i >= 0; i--) {
            if ($scope.listado_notificaciones[i].id_usuario == $scope.id_usuario_actual) {
                var item = $scope.listado_notificaciones[i];
                $scope.listado_notificaciones.$remove(i).then(function(notificaciones) {
                    notificaciones.key === item.$id; // true
                });
            }
        }
    }

    $scope.eliminar_notificacion = function(id){
        var item = $scope.listado_notificaciones[id];
        $scope.listado_notificaciones.$remove(id).then(function(notificaciones) {
            notificaciones.key === item.$id; // true
        });
    }

    $scope.traer_years();
};
/**
*Controlador PARA ASIGNAR LOS ALUMNOS A LOS CURSOS
*/
function AsignacionAlumnoCursoCtrl ($http, $state, $location, toaster) {
    var enlace = this;
    enlace.alumnos = [];
    enlace.alumnos_asignados = [];
    enlace.cursos = {};
    enlace.niveles = {};
    enlace.cantidad = 0;
    enlace.bloqueo_year = false;

    var f = new Date();
    var fecha = f.getFullYear();
    console.log(fecha);
    if($state.year.year == fecha){
        enlace.bloqueo_year = false;
    }
    else
    {
        enlace.bloqueo_year = true;
    }

    enlace.traer_alumnos = function () {
         $http.get('API/planificacion/get_alumnos/' + enlace.id_nivel)
        .success(function(data){
            enlace.alumnos = data;
            enlace.cantidad_alumnos = data.length;
        });
    };

    enlace.traer_alumnos_asignados = function () {
         $http.get('API/planificacion/get_alumnos_asignados/' + enlace.id_curso)
        .success(function(data){
            enlace.alumnos_asignados = data;
        });
    };

    enlace.traer_cursos = function(){
        $http.get('API/planificacion/get_cursos_anuales_nivel')
        .success(function(data){
           enlace.cursos = data;
            if(enlace.cursos.length > 0){
                if(enlace.id_curso > 0){
                     for (var i = enlace.cursos.length - 1; i >= 0; i--) {
                        if (enlace.cursos[i]['id_curso_anual'] == enlace.id_curso) {
                            enlace.cupos = enlace.cursos[i]['cupos'];
                        }
                    }
                } else {
                    enlace.cambiar_curso(enlace.cursos[0]['id_curso_anual'],enlace.cursos[0]['id_curso'],enlace.cursos[0]['cupos'],enlace.cursos[0]['nombre_curso_anual'],0);
                }
            } 

        });
    }

    enlace.cambiar_curso = function(id_curso, id_nivel, cupos, nombre, index){
        enlace.selected = index; 
        enlace.id_curso = id_curso;
        enlace.id_nivel = id_nivel;
        enlace.traer_alumnos_asignados();
        enlace.traer_alumnos();
        enlace.cupos = cupos;
        enlace.nivel = id_nivel;
        enlace.nombre_curso = nombre;
    };


    enlace.pasar_alumnos = function() {
        
        $http.post('API/planificacion/agregar_alumnos_curso', {datos: enlace.alumnos, id_curso: enlace.id_curso})
         .success(function(data){
            enlace.traer_cursos();
            enlace.traer_alumnos_asignados();
            enlace.traer_alumnos();            
         });
    }

    enlace.random_alumnos = function() {
        if(enlace.cupos >= enlace.cantidad && enlace.cantidad_alumnos >= enlace.cantidad && enlace.cantidad > 0 ){
        $http.post('API/planificacion/random_alumnos_curso', {datos: enlace.alumnos, id_curso: enlace.id_curso, cantidad: enlace.cantidad})

         .success(function(data){
            enlace.traer_cursos();
            enlace.traer_alumnos_asignados();
            enlace.traer_alumnos();            
         });
        }else {

                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'La cantidad excede los cupos del curso y/o la cantidad disponible. O la cantidad es igual o menor a 0',
                    showCloseButton: true,
                    timeout: 10000
                });
            
        }
    }

    //random_alumnos_curso

    enlace.guardar = function () {
        console.log(enlace.alumnos_asignados);
         $http.post('API/planificacion/remover_alumnos_curso', {datos: enlace.alumnos_asignados})
         .success(function(data){
            enlace.traer_cursos();
            enlace.traer_alumnos_asignados();
            enlace.traer_alumnos();
            
        //     $location.path("asignaciones/asistentes/enlazar/paso_dos");
         });
    };

    //enlace.traer_alumnos();
    enlace.traer_cursos();
};
/**
 * GestionarHorarioCtrl - Controlador para el HORARIO
 */
function GestionarHorarioCtrl($scope, $http, $uibModal, $timeout, ordenarDatos) {
    $scope.bloques = {};
    $scope.cursos = {};
    $scope.asignaturas = {};
    $scope.horario = {};
    $scope.horario.lunes = [];
    $scope.horario.martes = [];
    $scope.horario.miercoles = [];
    $scope.horario.jueves = [];
    $scope.horario.viernes = [];
    $scope.horario.pendientes = [];
    $scope.respaldo = {};

    $scope.nuevo_horario = true;
    $scope.nuevos_cambios = false;
    $scope.estado_cambios = 'Todos los Cambios Guardados';
    $scope.color_cambios = 'success';

    $scope.sortableOptions = {
        connectWith: ".connectList",
        start: function(e, ui){
            //
        },
        update: function(e, ui) {
            var arrayTemp = $scope.$eval(ui.item.sortable.droptarget.attr('ng-model'));
            var hay_cupos = false;
            var cantidad = $scope.bloques.length;
            if (ui.item.sortable.droptargetModel.length >= cantidad) {
                if (false) { //itemModel.id_asignatura == 0
                    ui.item.sortable.cancel();
                }
                else{
                    for (var i = arrayTemp.length - 1; i >= 0; i--) {
                        if (arrayTemp[i].id_asignatura == null) {
                            hay_cupos = true;
                        }
                    }
                    if (!hay_cupos && ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {
                        ui.item.sortable.cancel();
                    }
                }
            }
        },
        stop: function(e, ui) {
            var originNgModel = ui.item.sortable.sourceModel;
            var destinoNgModel = ui.item.sortable.droptargetModel;
            var cantidad = $scope.bloques.length;
            //var itemModel = destinoNgModel[ui.item.sortable.dropindex];
            //var arrayTemp = $scope.$eval(ui.item.sortable.droptarget.attr('ng-model'));
            //var arrayTemp = destinoNgModel;
            var stop = true;
            for (var i = destinoNgModel.length - 1; i >= 0 && stop; i--) {
                if (destinoNgModel[i].id_asignatura == null) {
                    destinoNgModel.splice(i, 1);
                    stop = false;
                }
            }
            if (ui.item.sortable.sourceModel.length < cantidad) {
                $scope.agregar_libre(originNgModel);
            }
            $scope.cambios();
        }
    };

    $scope.cambios = function(){
        $scope.nuevos_cambios = true;
        $scope.estado_cambios = 'Hay Cambios Pendientes por Guardar';
        $scope.color_cambios = 'danger';
    }

    $scope.traer_bloques = function(){
        $http.get('API/planificacion/get_bloques')
        .success(function(data){
            $scope.bloques = data;
            console.log($scope.bloques);
        });
    }

    $scope.traer_cursos = function(){
        $http.get('API/planificacion/get_cursos_anuales')
        .success(function(data){
            $scope.cursos = data;
            console.log($scope.cursos);
            $scope.nombre_curso_seleccionado = $scope.cursos[0].nombre_curso_anual;
            $scope.id_curso_anual_seleccionado = $scope.cursos[0].id_curso_anual;
            $scope.id_curso_seleccionado = $scope.cursos[0].id_curso;
            $scope.traer_horario();
        });
    }

    $scope.traer_asignaturas = function(){
        $http.get('API/horario/get_asignaturas_cursos/' + $scope.id_curso_anual_seleccionado + '/' + $scope.id_curso_seleccionado)
        .success(function(data){
            $scope.asignaturas = data;
            $scope.armar_pendientes();
        });
    }

    $scope.armar_pendientes = function(){
        var nuevos_pendientes = [];
        var cantidad_bloques = $scope.bloques.length;
        for (var i = $scope.asignaturas.length - 1; i >= 0; i--) {
            for (var j = $scope.asignaturas[i].horas_asignatura - 1; j >= 0; j--) {
                var temporal = [];
                temporal['id_asignatura'] = $scope.asignaturas[i].id_asignatura;
                temporal['id_profesor'] = $scope.asignaturas[i].id_profesor;
                temporal['nombre'] = $scope.asignaturas[i].nombre_asignatura;
                temporal['statusClass'] = 'info';
                nuevos_pendientes.push(temporal);
            }
        }
        if ($scope.nuevo_horario) {
            $scope.horario.pendientes = [];
            $scope.horario.pendientes = nuevos_pendientes;
            $scope.llenar_libres();
        }
        else{
            $scope.arreglar_pendientes(nuevos_pendientes);
        }
    }

    $scope.arreglar_pendientes = function(data){
        for (var i = $scope.horario.pendientes.length - 1; i >= 0; i--) {
            if ($scope.horario.pendientes[i].id_asignatura == null){
                $scope.horario.pendientes.splice(i, 1);
            }
        }
        for (var i = $scope.respaldo.length - 1; i >= 0; i--) {
            if ($scope.respaldo[i].dia_semana != 'pendientes') {
                for (var j = data.length - 1; j >= 0; j--) {
                    if (data[j].id_asignatura == $scope.respaldo[i].id_asignatura) {
                        data.splice(j, 1);
                    }
                }
            }
        }
        $scope.horario.pendientes = data;
    }

    $scope.agregar_libre = function(lista){
        temporal = [];
        temporal['id_asignatura'] = null;
        temporal['id_profesor'] = null;
        temporal['nombre'] = 'Bloque Libre';
        temporal['statusClass'] = 'warning';
        lista.push(temporal);
    }

    $scope.llenar_libres = function(){
        var cantidad_bloques = $scope.bloques.length;
        $scope.horario.lunes = [];
        $scope.horario.martes = [];
        $scope.horario.miercoles = [];
        $scope.horario.jueves = [];
        $scope.horario.viernes = [];
        for (var i = cantidad_bloques - 1; i >= 0; i--) {
            $scope.agregar_libre($scope.horario.lunes);
            $scope.agregar_libre($scope.horario.martes);
            $scope.agregar_libre($scope.horario.miercoles);
            $scope.agregar_libre($scope.horario.jueves);
            $scope.agregar_libre($scope.horario.viernes);
        }
    }

    $scope.asignar_curso = function(nombre, id, curso){
        $scope.nombre_curso_seleccionado = nombre;
        $scope.id_curso_seleccionado = curso;
        $scope.id_curso_anual_seleccionado = id;
        $scope.traer_horario();
    }

    $scope.traer_horario = function(){
        $http.get('API/horario/get_horario/' + $scope.id_curso_anual_seleccionado)
        .success(function(data){
            $scope.respaldo = data;
            $scope.horario = ordenarDatos.desdeAPI(data);
            if (data.length < 1) { $scope.nuevo_horario = true; }
            else{ $scope.nuevo_horario = false; }
            $scope.traer_asignaturas();
        });
    }

    $scope.guardar_horario = function(){
        $scope.cargando = true;
        var subir = ordenarDatos.paraAPI($scope.horario, $scope.id_curso_anual_seleccionado, $scope.bloques);
        $http.post('API/horario/subir_horario', { horario: subir })
        .success(function(data){
            $timeout(function(){
                $scope.cargando = false;
                $scope.nuevos_cambios = false;
                $scope.estado_cambios = 'Todos los Cambios Guardados';
                $scope.color_cambios = 'success';
            },1000)
        });
    }

    $scope.traer_bloques();
    $scope.traer_cursos();

}
/**
 * CalendarCtrl - Controlador para el Calendario
 * Datos de los eventos para el calendario
 */
function BibliotecaCtrl($http, $uibModal, SweetAlert, DTOptionsBuilder, $element, PreCarga) {
    var biblio = this;
    biblio.libros = [];
    biblio.libro_show = [];
    biblio.pedidos = [];
    biblio.atrazados = [];
    biblio.completos = [];
    biblio.cancelados = [];
    biblio.muestra = false;

    biblio.vista = 1;
    biblio.c_pedidos = 0;
    biblio.c_atrazados = 0;
    biblio.c_completos = 0;
    biblio.c_cancelados = 0;

    biblio.libros_Select = [];
    biblio.cancelar = false;

    var title = 'Biblioteca';

    biblio.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: title},
            {extend: 'pdf', title: title},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ])
        .withLanguageSource('js/language/datatables/es.json');

    biblio.traer_libros_pedidos = function(){
        $http.get('API/biblioteca/get_libros_pedidos')
        .success(function(data){
            biblio.pedidos = data;
            biblio.c_pedidos = biblio.pedidos.length;
            biblio.mostrar();
        });
    }

    biblio.traer_libros_atrazados = function(){
        $http.get('API/biblioteca/get_libros_atrazados')
        .success(function(data){
            biblio.atrazados = data;
            biblio.c_atrazados = biblio.atrazados.length;
            biblio.mostrar();
        });
    }

    biblio.traer_libros_completos = function(){
        $http.get('API/biblioteca/get_libros_completos')
        .success(function(data){
            biblio.completos = data;
            biblio.c_completos = biblio.completos.length;
            biblio.mostrar();
        });
    }

    biblio.traer_libros_cancelados = function(){
        $http.get('API/biblioteca/get_libros_cancelados')
        .success(function(data){
            biblio.cancelados = data;
            biblio.c_cancelados = biblio.cancelados.length;
            biblio.mostrar();
        });
    }

    biblio.traer_libros = function(){
        $http.get('API/biblioteca/get_libros')
        .success(function(data){
            biblio.libros = data;
            PreCarga.llenar_libros(data);
        });
    }


    biblio.mostrar_libro = function(id_libro){
        biblio.muestra = true;
        console.log(id_libro);
        for (var i = biblio.libros.length - 1; i >= 0; i--) {
            if (biblio.libros[i]['id_libro'] == id_libro) {
                biblio.libro_show = biblio.libros[i];
            }
        }
        console.log(biblio.libro_show);
    }

    biblio.nuevo_pedido = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/biblioteca/modal_pedido.html',
            controller: NuevoPedidoLibroCtrl,
            windowClass: 'style="width=90%"',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
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
                        }
                    ]);
                },
                item: function () {
                    return 1;
                }
            }
        });
    };

    biblio.nuevo_libro = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modulos/biblioteca/modal_libro.html',
                controller: NuevoLibroCtrl,
                windowClass: 'style="width=90%"',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
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
                                name: 'angular-ladda',
                                files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                            }
                        ]);
                    },
                    item: function () {
                        return 0;
                    }
                }
            });
        };

    biblio.editar_libro = function (libro) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/modulos/biblioteca/modal_libro.html',
                controller: NuevoLibroCtrl,
                windowClass: 'style="width=90%"',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                            },
                            {
                                name: 'ui.select',
                                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
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
                                name: 'angular-ladda',
                                files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
                            }
                        ]);
                    },
                    item: function () {
                        return libro;
                    }
                }
            });
        };

    biblio.cambiar_estado_pedido = function (fila) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modulos/biblioteca/modal_pedido_mod.html',
            controller: EstadoPedidoLibroCtrl,
            windowClass: 'style="width=90%"',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
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
                        }
                    ]);
                },
                item: function () {
                    return fila;
                }
            }
        });
    };

    biblio.refrescar = function(){
        biblio.indice = 0;
        biblio.traer_libros_pedidos();
        biblio.traer_libros_atrazados();
        biblio.traer_libros_completos();
        biblio.traer_libros_cancelados();
    }

    biblio.cancelar_pedido = function (fila){ SweetAlert.swal({
                title: "¿Esta seguro de dar como perdido el libro?",
                text: "El libro se podra dar como devuelto en cualquier momento.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, perdido",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Perdido",
                     "El libro se paso a perdidos, este libro no fue sumado a la cantidad existente.", "success");
                    console.log(fila);
                    biblio.libro_perdido(fila);
                }
                else {
                    SweetAlert.swal("Cancelado", "El libro no se dio por perdido.", "error");
                    //pedido.enviar();
                }
            });
    };

    biblio.cambiar_vista = function(vista){
        biblio.vista = vista;
        biblio.mostrar();
    }

    biblio.mostrar = function(){
        if(biblio.vista == 1){
            biblio.cancelar = false;
            biblio.libros_Select = biblio.pedidos;
        }else if(biblio.vista == 2){
            biblio.cancelar = false; 
            biblio.libros_Select = biblio.atrazados;  
        }else if(biblio.vista == 3){    
            biblio.cancelar = true;
            biblio.libros_Select = biblio.completos; 
        }else{ 
            biblio.cancelar = true;
            biblio.libros_Select = biblio.cancelados;
        }
    }

    biblio.libro_perdido = function (fila){
        console.log(fila);
        $http.post('API/biblioteca/devolver_pedido', {item: fila, estado: 'perdido'})
        .success(function(data){
            biblio.refrescar();
            //console.log('si jajaja');
        });        
    }

    biblio.refrescar();

    var datos = PreCarga.get_libros();

    if (datos.length > 0) {
        biblio.libros = datos;
    }
    else{
        biblio.traer_libros();
        /*PreCarga.cargar_libros();
        datos = PreCarga.get_libros();
        biblio.libros = datos;*/
    }

}
/**
*Controlador PARA CREAR NUEVOS PEDIDOS
*/
function NuevoPedidoLibroCtrl ($scope, $uibModalInstance, item, $http, $state, toaster, PreCarga) {
    $scope.datos = {};
    $scope.datos.id_alumno = 0;
        var hoy = new Date();

    $scope.datos.libros = [{id_libro: 0, dias: 1,titulo: '', cantidad: 0}];

    $scope.guardar = function () {
        console.log($scope.datos.libros);
        if($scope.datos.id_alumno != 0){
            todos = false;
            for (var i = 0; i < $scope.datos.libros.length; i++) {
                if($scope.datos.libros[i]['id_libro'] != 0){
                    todos = true;
                }
            }

            guardar = true;
            max = 0;
            angular.forEach($scope.datos.libros, function(value, key){
                max = value['cantidad'];
                console.log(max);
                titulo = value['titulo'];
                cant = 0;
                for (var i = 0; i < $scope.datos.libros.length; i++) {
                   if( $scope.datos.libros[i]['id_libro'] == value['id_libro']){
                    cant++;
                   }
                }
                if(cant > max){
                    guardar = false;
                }
            });

            if(!guardar){
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'el titulo: ' + titulo  + ' Excede la cantidad en existencia.     Cantidad Actual: ' + max,
                    showCloseButton: true,
                    timeout: 10000
                });
                return false;
            }

            if(todos){
                $http.post('API/biblioteca/guardar_pedido', {id_alumno: $scope.datos.id_alumno, libros: $scope.datos.libros})
                .success(function(data){
                    $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                    PreCarga.cargar_libros_cantidad();
                    $uibModalInstance.close()
                    console.log('si jajaja');
                });
            }
            else{
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Seleccione al menos un libro.',
                    showCloseButton: true,
                    timeout: 10000
                });

            }
        }  
        else {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'Debe seleccionar el alumno.',
                showCloseButton: true,
                timeout: 10000
            });
        }
     };


    $scope.seleccionar_cantida = function(fila){
            console.log(fila);
                $http.get('API/biblioteca/get_libros_mostrar/' + fila.id_libro)
                .success(function(data){
                    fila.cantidad = data.cantidad;
                    fila.titulo = data.titulo_libro;
                    console.log(data);
                });
    }

    $scope.addFila = function(){
        var n_fila = {
            id_libro: 0,
            dias: 1,
            cantidad: 0
            ,titulo: ''
        };
        $scope.datos.libros.push(n_fila);
    };

    $scope.eliminar = function (fila){
        var index = $scope.datos.libros.indexOf(fila);
        if (index > -1) {
            $scope.datos.libros.splice(index, 1);
            if($scope.datos.libros.length < 1){
                $scope.addFila();
            }
        }
    };

    $scope.cancelar = function () {
       $uibModalInstance.dismiss('cancel');
    };

}
/**
*Controlador PARA MODIFICAR PEDIDOS
*/
function EstadoPedidoLibroCtrl ($scope, $uibModalInstance, item, $http, $state, toaster, SweetAlert) {
    $scope.datos = {};
    $scope.estado = [];
    $scope.estado.devolver = false;
    $scope.estado.cancelar = false;

    if (typeof item != 'undefined') {
        $scope.datos = item;
        console.log(item.estado);
        if(item.estado == 'perdido'){
            $scope.estado.cancelar = true;
            $scope.estado.devolver = false;
        }else if(item.estado == 'completo'){
            $scope.estado.cancelar = true;
            $scope.estado.devolver = true;
        }
    }

    $scope.devolver = function () {
        $http.post('API/biblioteca/devolver_pedido', {item: $scope.datos, estado: 'completo'})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close()
            //console.log('si jajaja');
        });
     };

    $scope.cancelar_pedido_si = function (){
        $http.post('API/biblioteca/devolver_pedido', {item: $scope.datos, estado: 'perdido'})
        .success(function(data){
            $state.transitionTo($state.current, {seqId: ''}, { reload: true});
            $uibModalInstance.close()
        });
    };


     $scope.cancelar_pedido = function (){ SweetAlert.swal({
                title: "¿Esta seguro de dar como perdido el libro?",
                text: "El libro se podra dar como devuelto en cualquier momento.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65C78E",
                confirmButtonText: "Si, perdido",
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal("Perdido",
                     "El libro se paso a perdidos, este libro no fue sumado a la cantidad existente.", "success");
                    $scope.cancelar_pedido_si();
                }
                else {
                    SweetAlert.swal("Cancelado", "El libro no se dio por perdido.", "error");
                }
            });
    };

    $scope.cancelar = function () {
       $uibModalInstance.dismiss('cancel');
    };
}
/**
*Controlador PARA BUSCAR
*/
function BusquedaCtrl ($scope, $http, $state, $stateParams, BusquedaJson) {

    $scope.secciones = [];

    var datos = BusquedaJson.get_jsonBusqueda();
    var roles = $state.usuario.roles;

    for (var i = datos.length - 1; i >= 0; i--) {
        for (var k = datos[i].rol.length - 1; k >= 0; k--) {
            for (var j = roles.length - 1; j >= 0; j--) {
                if (datos[i].rol[k] == roles[j]) {
                    $scope.secciones.push(datos[i]);
                }
            }
        }
    }

    console.log(datos);
    console.log($scope.secciones);

    if (typeof $stateParams.busqueda !== 'undefined') {
        $scope.busqueda = $stateParams.busqueda;
    }
}
/**
*Controlador PARA CREAR NUEVOS LIBROS
*/
function NuevoLibroCtrl ($scope, $uibModalInstance, item, $http, $state, toaster, PreCarga) {
    $scope.datos = {};
    var hoy = new Date();

    if (item == 0) {
        $scope.datos={id_libro: 0, codigo_libro: '', rango_libro: '', titulo_libro: '', autor_libro: '',
                        editorial_libro: '', estado_libro: '', cantidad: 0, valor_unitario: 0, fecha_recepcion: hoy,
                        origen:'', observacion: '' };
    }else{
        $scope.datos = item;
    }

    $scope.guardar = function () {
        $scope.cargando = true;
        $http.post('API/biblioteca/guardar_libro', {datos: $scope.datos})
        .success(function(data){
            $http.get('API/biblioteca/get_libros')
            .success(function(data){
                PreCarga.llenar_libros(data);
                $state.transitionTo($state.current, {seqId: ''}, { reload: true});
                $uibModalInstance.close()
                $scope.cargando = false;
            });
        });
     };

    $scope.cancelar = function () {
       $uibModalInstance.dismiss('cancel');
    };
};
/**
*Controlador PARA GESTIONAR LAS NOTICIAS
*/
function NoticiasCtrl ($scope, $state, ServiceNotificaciones, $firebaseArray, serviceFecha, $sce, $http) {
    $scope.datos = {};
    $scope.data = {};
    $scope.estado_publicacion = false;
    $scope.modificar_publicacion = false;

    $scope.moderador = $state.usuario.permisos.moderacion;
    $scope.tipo_usuario = $state.usuario.tipo_usuario;
    console.log($scope.tipo_usuario);

    $scope.datos.imagen_url = $state.usuario.imagen_url;
    $scope.datos.fecha = serviceFecha.fecha;
    $scope.datos.comentarios = [{ 'autor': 'prueba', 'contenido': 'test' }];
    $scope.datos.autor = $state.usuario.nombres_usuario + ' ' + $state.usuario.apellido_paterno + ' ' + $state.usuario.apellido_materno;
    $scope.datos.id_autor = $state.usuario.permisos.id_usuario;
    $scope.datos.id_curso_alumno = $state.usuario.id_curso_anual;

    var noticias = ServiceNotificaciones.get_noticias();
    $scope.listado_noticias = $firebaseArray(noticias);
    
    noticias.on('value', function(snapshot){
        console.log('Actualizadas las noticias');
    });

    $scope.imageUpload = function(files) {
        uploadEditorImage(files);
    };

    function uploadEditorImage(files) {
        if (files != null) {
            console.log(files[0]);
            $http.post('API/implemento/subir_imagen_noticia', { file: files[0] })
            .success(function(data) {
                var editor = $.summernote.eventHandler.getModule(),
                    uploaded_file_name = data,
                    file_location = 'img/noticias' + uploaded_file_name;
                editor.insertImage($scope.editable, file_location, uplaoded_file_name);
            });
        }
    };

    $scope.nueva_publicacion = function(){
        $scope.datos.titulo = '';
        $scope.datos.contenido = '';
        $scope.datos.destino = 'institucional';
        $scope.datos.id_curso_anual = '';
        $scope.datos.id_usuario = '';
        $scope.estado_publicacion = true;
    }

    $scope.cancelar = function(){
        $scope.estado_publicacion = false;
        $scope.modificar_publicacion = false;
    }

    $scope.subir_publicacion = function(){
        $scope.estado_publicacion = false;
        if ($scope.modificar_publicacion) {
            $scope.listado_noticias[$scope.idx].contenido = $scope.datos.contenido;
            $scope.listado_noticias[$scope.idx].titulo = $scope.datos.titulo;
            $scope.listado_noticias[$scope.idx].privacidad = $scope.datos.destino;
            $scope.listado_noticias[$scope.idx].id_usuario = $scope.datos.id_usuario;
            $scope.listado_noticias[$scope.idx].id_curso_anual = $scope.datos.id_curso_anual;
            $scope.listado_noticias.$save($scope.idx).then(function(noticias) {
                noticias.key === $scope.listado_noticias[$scope.idx].$id; // true
            });
            $scope.modificar_publicacion = false;
        }
        else{
            var estado = ServiceNotificaciones.agregar_noticia($scope.datos);
        }
        if ($scope.datos.destino == 'usuario') {
            ServiceNotificaciones.agregar_notificacion_noticia($scope.datos);
        }
        else if ($scope.datos.destino == 'curso'){
            ServiceNotificaciones.agregar_notificacion_noticia_curso($scope.datos);
        }
    }

    $scope.options = {
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    };

    $scope.agregar_comentario = function(id, index){
        var idx = $scope.listado_noticias.length - index - 1;
        var new_comment = {
           'autor' : $scope.datos.autor,
           'id_autor' : $scope.datos.id_autor,
           'contenido' : $scope.data.comentario_nuevo,
           'imagen_url' : $scope.datos.imagen_url,
           'fecha': $scope.datos.fecha
        };
        console.log(new_comment);
        $scope.listado_noticias[idx].comentarios.push(new_comment);
        $scope.listado_noticias.$save(idx).then(function(noticias) {
            noticias.key === $scope.listado_noticias[idx].$id; // true
        });
        $scope.data.comentario_nuevo = '';
        if ($scope.listado_noticias[idx].id_autor != $scope.datos.id_autor) {
            ServiceNotificaciones.agregar_notificacion_comentario($scope.datos, $scope.listado_noticias[idx].id_autor);
        }
    }

    $scope.eliminar_comentario = function(noticia, id_comment){
        noticia.comentarios.splice(id_comment, 1);
        var item = $scope.listado_noticias[noticia];
        $scope.listado_noticias.$save(noticia).then(function(noticias) {
            noticias.key === item.$id; // true
        });
    }

    $scope.editar_noticia = function(id, index){
        $scope.idx = $scope.listado_noticias.length - index - 1;
        console.log($scope.listado_noticias[$scope.idx]);
        $scope.datos.titulo = $scope.listado_noticias[$scope.idx].titulo;
        $scope.datos.contenido = $scope.listado_noticias[$scope.idx].contenido;
        $scope.estado_publicacion = true;
        $scope.modificar_publicacion = true;
    }

    $scope.eliminar_noticia = function(id, index){
        var idx = $scope.listado_noticias.length - index - 1;
        var item = $scope.listado_noticias[idx];
        $scope.listado_noticias.$remove(idx).then(function(noticias) {
            noticias.key === item.$id; // true
        });
    }

    $scope.trustAsHtml = function(string){
        return $sce.trustAsHtml(string);
    }
};

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('CambiarYearCtrl', CambiarYearCtrl)
    .controller('LoginCtrl', LoginCtrl)
    .controller('TopNavbarCtrl', TopNavbarCtrl)
    .controller('FormularioSolicitarAcceso', ['$http', '$location', '$stateParams', FormularioSolicitarAcceso])
    .controller('NuevaClaveCtrl', NuevaClaveCtrl)
    .controller('FormularioCtrl', FormularioCtrl)
    .controller('MatriculaCtrl', MatriculaCtrl)
    .controller('NuevoUsuarioCtrl', NuevoUsuarioCtrl)
    .controller('ListaUsuarios', ['$http', '$location', '$stateParams', ListaUsuarios])
    .controller('ProductoCtrl', ['$http', '$location', '$stateParams', 'toaster', '$sce', ProductoCtrl])
    .controller('CarroCtrl', ['$http', '$location', '$stateParams', 'toaster', CarroCtrl])
    .controller('PagoCtrl', PagoCtrl)
    .controller('FormularioUsuario', FormularioUsuario)
    .controller('FormularioProveedor', ['$http', '$location', '$stateParams', FormularioProveedor])
    .controller('FormularioProducto', ['$http', '$location', '$stateParams', FormularioProducto])
    .controller('FormularioProfesor', ['$http', '$location', '$stateParams', FormularioProfesor])
    .controller('FormularioCliente', ['$http', '$location', '$stateParams', FormularioCliente])
    .controller('TablaCtrl', TablaCtrl)
    .controller('RutSelectCtrl', RutSelectCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('NuevoCursoCtrl', NuevoCursoCtrl)
    .controller('NuevoPeriodoCtrl', NuevoPeriodoCtrl)
    .controller('NuevaAsignaturaCtrl', NuevaAsignaturaCtrl)
    .controller('NuevoBloqueCtrl', NuevoBloqueCtrl)
    .controller('NuevoProveedorCtrl', NuevoProveedorCtrl)
    .controller('AsignacionCursoCtrl', AsignacionCursoCtrl)
    .controller('AsignacionAlumnoCursoCtrl', AsignacionAlumnoCursoCtrl)
    .controller('CalificacionCtrl', CalificacionCtrl)
    .controller('MiHorarioCtrl', MiHorarioCtrl)
    .controller('AsistenciaCtrl', AsistenciaCtrl)
    .controller('PedidoTallerCtrl', PedidoTallerCtrl)
    .controller('ListaCtrl', ListaCtrl)
    .controller('FormularioMaterialCtrl', FormularioMaterialCtrl)
    .controller('NuevaCuentaCtrl', NuevaCuentaCtrl)
    .controller('RechazarPedidoCtrl', RechazarPedidoCtrl)
    .controller('OrdenCompraCtrl', OrdenCompraCtrl)
    .controller('SelectCtrl', SelectCtrl)
    .controller('SelectBiblioCtrl', SelectBiblioCtrl)
    .controller('CambiarImagen', CambiarImagen)
    .controller('wizardCtrl', wizardCtrl)
    .controller('GestionarHorarioCtrl', GestionarHorarioCtrl)
    .controller('BibliotecaCtrl', BibliotecaCtrl)
    .controller('NuevoPedidoLibroCtrl', NuevoPedidoLibroCtrl)
    .controller('EstadoPedidoLibroCtrl', EstadoPedidoLibroCtrl)
    .controller('BusquedaCtrl', BusquedaCtrl)
    .controller('NuevoLibroCtrl', NuevoLibroCtrl)
    .controller('NoticiasCtrl', NoticiasCtrl)
    .controller('imageCrop', imageCrop);
