function principal($q, $http, $timeout, $state){
	var _identity = undefined,
	_anual = undefined,
	_authenticated = false;

	return {
		getIdentity: function(){
			return _identity;
		},
		getYear: function(){
			return _anual;
		},
		isIdentityResolved: function() {
			return angular.isDefined(_identity);
		},
		isAuthenticated: function() {
			return _authenticated;
		},
		isInRole: function(role) {
			if (!_authenticated || !_identity.roles) return false;
			return _identity.roles.indexOf(role) != -1;
		},
		isInAnyRole: function(roles) {
			if (!_authenticated || !_identity.roles) return false;

			for (var i = 0; i < roles.length; i++) {
				if (this.isInRole(roles[i])) return true;
			}

			return false;
		},
		authenticate: function(identity, anual) {
			_identity = identity;
			_anual = anual;
			_authenticated = identity != null;
		},
		identity: function(force, $state) {
			var deferred = $q.defer();

			if (force === true) _identity = undefined;
			if (angular.isDefined(_identity)) {
				deferred.resolve(_identity);
				return deferred.promise;
			}
          	$http.get('API/session/session_alive', 
                { ignoreErrors: true })
			.success(function(data) {
				if(data.status == 'OK'){
					_identity = data.user;
					_anual = data.year;
					_authenticated = true;
					deferred.resolve(_anual);
					deferred.resolve(_identity);
				}
				else{
					_identity = null;
					_authenticated = false;
					deferred.resolve(_identity);
				}
			})
			.error(function () {
				
				_identity = null;
				_authenticated = false;
				deferred.resolve(_identity);
			});
			return deferred.promise;
		}
	};
}
function authorization($rootScope, $state, principal){
	return {
		authorize: function() {
			return principal.identity()
			.then(function() {
				
				//console.log(principal.getIdentity());
				$state.usuario = principal.getIdentity();
				$state.year = principal.getYear();
				var isAuthenticated = principal.isAuthenticated();

				if ($rootScope.toState.data.roles
				&& $rootScope.toState
				.data.roles.length > 0 
				&& !principal.isInAnyRole(
				$rootScope.toState.data.roles))
				{
					
					if (isAuthenticated) {
						// user is signed in but not
						// authorized for desired state
						console.log("pasaaaaa");
						$state.go('login');
						
					}
					else {
						
						// user is not authenticated. Stow
						// the state they wanted before you
						// send them to the sign-in state, so
						// you can return them when you're done
						$rootScope.returnToState = $rootScope.toState;
						$rootScope.returnToStateParams = $rootScope.toStateParams;
						// now, send them to the signin state
						// so they can log in
						$state.go('login');
					}
				}
			});
		}
    };
}

function varStorage(){
	var _vars = {};
	return {
		addVar: function(key, val){
			_vars[key] = val;
		},
		getVar: function(key){
			return _vars[key];
		},
		resetVars: function(){
			_vars = {};
		},
		getVars: function(){
			return _vars;
		}
	}
}

function ordenarDatos(){
	return{
		desdeAPI: function(data){
			var lista = {};
			lista.lunes = [];
			lista.martes = [];
			lista.miercoles = [];
			lista.jueves = [];
			lista.viernes = [];
			lista.pendientes = [];
			$.each(data, function(index, val){
				if(val.dia_semana == 'lunes'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.lunes.push(temporal);
				}
				if(val.dia_semana == 'martes'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.martes.push(temporal);
				}
				if(val.dia_semana == 'miercoles'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.miercoles.push(temporal);
				}
				if(val.dia_semana == 'jueves'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.jueves.push(temporal);
				}
				if(val.dia_semana == 'viernes'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.viernes.push(temporal);
				}
				if(val.dia_semana == 'pendientes'){
					var temporal = [];
					temporal['id_asignatura'] = val['id_asignatura'];
					temporal['id_profesor'] = val['id_profesor'];
					if (val['nombre_asignatura'] != null) {
						temporal['nombre'] = val['nombre_asignatura'];
						temporal['statusClass'] = 'info';
					}
					else{
						temporal['nombre'] = 'Bloque Libre';
						temporal['statusClass'] = 'warning';
					}
					lista.pendientes.push(temporal);
				}
			});
			return lista;
		},
		paraAPI: function(horario, id_curso, bloques){
			console.log(horario.lunes);
			var lista = [];
			var json = {};
			var dia = 'lunes';
			$.each(horario.lunes, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso, id_bloque: bloques[index].id_bloque};
				lista.push(json);
			})
			dia = 'martes';
			$.each(horario.martes, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso, id_bloque: bloques[index].id_bloque};
				lista.push(json);
			})
			dia = 'miercoles';
			$.each(horario.miercoles, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso, id_bloque: bloques[index].id_bloque};
				lista.push(json);
			})
			dia = 'jueves';
			$.each(horario.jueves, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso, id_bloque: bloques[index].id_bloque};
				lista.push(json);
			})
			dia = 'viernes';
			$.each(horario.viernes, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso, id_bloque: bloques[index].id_bloque};
				lista.push(json);
			})
			dia = 'pendientes';
			$.each(horario.pendientes, function(index, val){
				json = {id_asignatura: val.id_asignatura, id_profesor: val.id_profesor, dia_semana: dia, id_curso_anual: id_curso};
				lista.push(json);
			})
			return lista;
		},
		ordenarLista: function(nodos){
			var lista = [];
			var indice = 0;
			$.each(nodos, function(index, val){
				lista.push(val);
				indice++;
				$.each(val.nodes, function(index2, val2){
					lista.push(val2);
					indice++;
					$.each(val2.nodes, function(index3, val3){
						lista.push(val3);
						indice++;
						$.each(val3.nodes, function(index4, val4){
							lista.push(val4);
							indice++;
						});
					})
				})
			});
			return lista;
		}
	}
}

function tools(){
	var index = function (obj,is, value) {
		    if (typeof is == 'string')
		        return index(obj,is.split('.'), value);
		    else if (is.length==1 && value!==undefined)
		        return obj[is[0]] = value;
		    else if (is.length==0)
		        return obj;
		    else
		        return index(obj[is[0]],is.slice(1), value);
		};
	return {
		index: index
	}
}

function serviceFecha(){

	var d = new Date();
	var semana = new Array(7);
	semana[0] =  "Domingo";
	semana[1] = "Lunes";
	semana[2] = "Martes";
	semana[3] = "Miercoles";
	semana[4] = "Jueves";
	semana[5] = "Viernes";
	semana[6] = "Sábado";

	var nombre_dia = semana[d.getDay()];
    var hora = d.getHours();
    var minutos = d.getMinutes();
    var dia = d.getDate();
    var mes = d.getMonth();
    var year = d.getFullYear();
    var fecha = nombre_dia + ' a las ' + hora + ':' + minutos + ' - ' + dia + '.' + mes + '.' + year;

	return {
		fecha: fecha
	}
}

function ServiceNotificaciones($firebaseObject, $firebaseArray, serviceFecha, $http){
	//var ref = new Firebase("https://agiliza-4670f.firebaseio.com/notificaciones");
	var notificaciones = firebase.database().ref().child("notificaciones");
	var noticias = firebase.database().ref().child("noticias");
	
    var listado_notificaciones = $firebaseArray(notificaciones);
    var listado_noticias = $firebaseArray(noticias);

	return{
		get_notificaciones: function(){
			return notificaciones;
		},
		agregar_notificacion: function(datos, nombre_asignatura){
		    for (var i = datos.length - 1; i >= 0; i--) {
		    	titulo = 'Nueva Calificación';
		    	texto = 'Tienes una nueva nota en ' + nombre_asignatura;
		    	imagen_url = 'img/extras/nota.png';
		    	listado_notificaciones.$add({
		            id_usuario : datos[i].id_usuario,
		            titulo: titulo,
		            contenido: texto,
		            imagen_url: imagen_url,
		            fecha: serviceFecha.fecha
		        });
		    }
			return true;
		},
		agregar_notificacion_comentario: function(datos, id_usuario){
		    titulo = 'Nuevo Comentario';
	    	texto = datos.autor + ' ha comentado una de tus noticias';
	    	imagen_url = 'img/perfil/' + datos.imagen_url;
	    	listado_notificaciones.$add({
	            id_usuario : id_usuario,
	            titulo: titulo,
	            contenido: texto,
	            imagen_url: imagen_url,
	            fecha: serviceFecha.fecha
	        });
			return true;
		},
		agregar_notificacion_noticia: function(datos){
		    titulo = 'Nueva Noticia';
	    	texto = 'Se ha publicado una noticia, con privacidad dirigida a ti';
	    	imagen_url = 'img/extras/noticia.png';
	    	listado_notificaciones.$add({
	            id_usuario : datos.id_usuario,
	            titulo: titulo,
	            contenido: texto,
	            imagen_url: imagen_url,
	            fecha: serviceFecha.fecha
	        });
			return true;
		},
		agregar_notificacion_noticia_curso: function(datos){
		    titulo = 'Nueva Noticia';
	    	texto = 'Se ha publicado una noticia, con privacidad dirigida a tu curso';
	    	imagen_url = 'img/extras/noticia.png';
	    	var alumnos = [];
	    	$http.get('API/planificacion/get_alumnos_asignados/' + datos.id_curso_anual)
	        .success(function(data){
	            alumnos = data;
	            for (var i = alumnos.length - 1; i >= 0; i--) {
	            	listado_notificaciones.$add({
			            id_usuario : alumnos[i].id_usuario,
			            titulo: titulo,
			            contenido: texto,
			            imagen_url: imagen_url,
			            fecha: serviceFecha.fecha
			        });
	            }
	        });
			return true;
		},
		get_noticias: function(){
			return noticias;
		},
		agregar_noticia: function(datos){
			if (datos.id_usuario == undefined) {
				datos.id_usuario = 0;
			}
			if (datos.id_curso_anual == undefined) {
				datos.id_curso_anual = 0;
			}
			console.log(datos);
			listado_noticias.$add({
	            titulo : datos.titulo,
	            contenido: datos.contenido,
	            autor: datos.autor,
	            id_autor: datos.id_autor,
	            imagen_url: datos.imagen_url,
	            fecha: datos.fecha,
	            privacidad: datos.destino,
	            id_usuario: datos.id_usuario,
	            id_curso_anual: datos.id_curso_anual,
	            comentarios: datos.comentarios
	        });
			return true;
		}
	}

};

function BusquedaJson(){

	var secciones = [
        {
            nombre: 'Matrículas de Alumno',
            enlace: 'matricula.panel',
            rol: ['adm'],
            contenido: 'Panel de matrícula para alumnos nuevos y antiguos.',
            tags: ['matrícula', 'registrar alumno', 'primer año']
        },
        {
            nombre: 'Nuevo Usuario',
            enlace: 'usuarios.nuevo_usuario',
            rol: ['adm'],
            contenido: 'Mantenedor de Usuarios (Creación y modificación de cualquier tipo de Usuario).',
            tags: ['nuevo', 'nuevo alumno', 'nuevo profesor', 'nuevo administrativo', 'nuevo apoderado']
        },
        {
            nombre: 'Modificar Usuario',
            enlace: 'usuarios.lista_usuarios',
            rol: ['adm'],
            contenido: 'Mantenedor de Usuarios (Creación y modificación de cualquier tipo de Usuario).',
            tags: ['modificar', 'modificar alumno', 'modificar profesor', 'modificar administrativo', 'modificar apoderado']
        },
        {
            nombre: 'Lista de Usuarios',
            enlace: 'usuarios.lista_usuarios',
            rol: ['adm'],
            contenido: 'Despliegue de todos los usuarios y su información.',
            tags: ['listar', 'lista', 'listar alumno', 'listar profesor', 'listar administrativo', 'listar apoderado']
        },
        {
            nombre: 'Perfil de Usuario',
            enlace: 'inicio.perfil',
            rol: ['adm', 'alm', 'prf', 'apd'],
            contenido: 'Despliega toda la información personal y permite modificarla.',
            tags: ['perfil', 'mis datos', 'cambiar contraseña', 'modificar mis datos', 'foto de perfil']
        },
        {
            nombre: 'Busqueda',
            enlace: 'inicio.busqueda',
            rol: ['adm', 'alm', 'prf', 'apd'],
            contenido: 'Panel que permite realizar busquedas entre todas las opciones disponibles del sistema.',
            tags: ['buscar', 'filtrar']
        },
        {
            nombre: 'Registro de Calificaciones',
            enlace: 'registro.calificacion',
            rol: ['adm', 'prf'],
            contenido: 'Gestión de las notas de los alumnos.',
            tags: ['notas', 'agregar notas', 'calificaciones', 'cambiar calificaciones', 'poner notas']
        },
        {
            nombre: 'Registro de Asistencia',
            enlace: 'registro.asistencia',
            rol: ['adm', 'prf'],
            contenido: 'Gestión de la asistencia de los alumnos.',
            tags: ['lista', 'pasar lista', 'registrar asistencia', 'asistencia']
        },
        {
            nombre: 'Mis Calificaciones',
            enlace: 'mi_registro.calificacion',
            rol: ['alm', 'apd'],
            contenido: 'Visualización de las notas por alumno especifico.',
            tags: ['mis notas', 'mis calificaciones', 'notas de mi hijo', 'notas pupilo']
        },
        {
            nombre: 'Mantenedor de Niveles',
            enlace: 'mantenedores.curso',
            rol: ['adm'],
            contenido: 'Gestión (Creación, modificación y eliminación) de los niveles.',
            tags: ['niveles', 'cursos', 'modificar cursos', 'agregar niveles', 'modificar niveles', 'cambiar niveles']
        },
        {
            nombre: 'Mantenedor de Asignaturas',
            enlace: 'mantenedores.asignatura',
            rol: ['adm'],
            contenido: 'Gestión (Creación, modificación y eliminación) de las Asignaturas.',
            tags: ['asignaturas', 'materias', 'modificar materias', 'agregar asignaturas', 'modificar asignaturas', 'cambiar asignaturas']
        },
        {
            nombre: 'Mantenedor de Periodos',
            enlace: 'mantenedores.periodo',
            rol: ['adm'],
            contenido: 'Gestión (Creación, modificación y eliminación) de los periodos.',
            tags: ['semestre', 'trimestre', 'modificar periodos', 'agregar periodos', 'modificar semestre', 'cambiar semestre']
        },
        {
            nombre: 'Asistente de Creacion del Plan Anual de Cursos',
            enlace: 'asistentes.enlace',
            rol: ['adm'],
            contenido: 'Gestión paso por paso de las diferentes etapas de la creación de los cursos del año seleccionado.',
            tags: ['crear cursos', 'asistente', 'paso uno']
        },
        {
            nombre: 'Listado de cursos',
            enlace: 'asistentes.listar_cursos',
            rol: ['adm'],
            contenido: 'Lista de todos los cursos creados con el asistente de creación de cursos.',
            tags: ['listado cursos', 'cursos', 'cursos anuales']
        },
        {
            nombre: 'Asignación de Alumnos',
            enlace: 'asistentes.asignar_alumnos',
            rol: ['adm'],
            contenido: 'Asistente para enlazar los alumnos a los cursos correspondientes.',
            tags: ['enlazar', 'asignar alumnos', 'asociar alumnos']
        },
        {
            nombre: 'Gestión de Horarios',
            enlace: 'horario.crear_horario',
            rol: ['adm'],
            contenido: 'Asistente para la creación de los diferentes horarios de lso cursos.',
            tags: ['horario', 'calendario', 'cambiar bloques']
        },
        {
            nombre: 'Mantenedor de Bloques',
            enlace: 'horario.bloque',
            rol: ['adm'],
            contenido: 'Gestión de los bloques del día.',
            tags: ['bloques', 'espacio', 'cambiar bloques']
        },
        {
            nombre: 'Lista de Implementos',
            enlace: 'gestionar.lista_implemento',
            rol: ['adm'],
            contenido: 'Mantenedor de los diferentes implementos para ser publicados.',
            tags: ['productos', 'venta', 'cantidad productos']
        },
        {
            nombre: 'Nuevo Implemento',
            enlace: 'gestionar.crear_implemento',
            rol: ['adm'],
            contenido: 'Creación de los implementos.',
            tags: ['creacion de productos', 'producto', 'asignar stock']
        },
        {
            nombre: 'Lista de Proveedores',
            enlace: 'gestionar.lista_proveedor',
            rol: ['adm'],
            contenido: 'Mantenedor de los diferentes proveedores para la compra de implementos.',
            tags: ['proveedores de productos', 'proveedores', 'comprar productos']
        },
        {
            nombre: 'Crear Proveedor',
            enlace: 'gestionar.crear_proveedor',
            rol: ['adm'],
            contenido: 'Creación de los proveedores.',
            tags: ['proveedores de productos', 'proveedores', 'crear']
        },
        {
            nombre: 'Historial de Pagos',
            enlace: 'historial.pagos',
            rol: ['adm'],
            contenido: 'Despliegue del historial de todas las compras realizadas.',
            tags: ['historial', 'pagos', 'ventas']
        },
        {
            nombre: 'Historial de Pedidos',
            enlace: 'historial.pedidos',
            rol: ['adm'],
            contenido: 'Despliegue del historial de todas los pedidos realizados.',
            tags: ['proveedores', 'compras', 'bajo stock']
        },
        {
            nombre: 'Pedidos de Materiales',
            enlace: 'movimientos.pedidos',
            rol: ['adm'],
            contenido: 'Gestión de los pedidos de materiales de talleres.',
            tags: ['taller', 'pedidos', 'materiales']
        },
        {
            nombre: 'Realizar Pedido',
            enlace: 'movimientos.crear_pedido',
            rol: ['adm'],
            contenido: 'Creación de los pedidos de materiales de talleres.',
            tags: ['taller', 'crear pedidos', 'materiales', 'nuevo pedido']
        },
        {
            nombre: 'Recepción de Materiales',
            enlace: 'movimientos.recepcion',
            rol: ['adm'],
            contenido: 'Recepción de materiales de los pedidos de talleres.',
            tags: ['taller', 'pedidos', 'materiales', 'recepción', 'recepcionar']
        },
        {
            nombre: 'Mantenedor de Materiales',
            enlace: 'inventario.material',
            rol: ['adm'],
            contenido: 'Gestión (Creación, modificación y eliminación) de materiales de talleres.',
            tags: ['crear', 'agregar', 'materiales', 'borrar', 'editar material']
        },
        {
            nombre: 'Nuevo Material',
            enlace: 'inventario.crear_material',
            rol: ['adm'],
            contenido: 'Creación de los materiales de taller.',
            tags: ['crear', 'agregar', 'materiales']
        },
        {
            nombre: 'Gestión de Stock',
            enlace: 'inventario.stock',
            rol: ['adm'],
            contenido: 'Manejo y existencia da la cantidad de materiales de un taller.',
            tags: ['stock', 'existencia', 'materiales']
        },
        {
            nombre: 'Listado de Libros',
            enlace: 'biblioteca.lista_libros',
            rol: ['adm'],
            contenido: 'Despliege de toda la información y los libros de los que dispone biblioteca.',
            tags: ['libros', 'biblio', 'biblioteca']
        },
        {
            nombre: 'Gestión de Pedidos',
            enlace: 'biblioteca.pedido',
            rol: ['adm'],
            contenido: 'Pedido, devolución, cancelación de las solitudes de libros de biblioteca.',
            tags: ['libros', 'biblio', 'biblioteca', 'devovler', 'pedir', 'pedir libros']
        }
    ];

	return{
		get_jsonBusqueda: function(){
			return secciones;
		}
	}
};

function PreCarga($http){

	var libros = new Array();
	var libros_cantidad = new Array();
	
	return{
		get_libros: function(){
			return libros;
		},
		cargar_libros: function(){
			$http.get('API/biblioteca/get_libros')
		    .success(function(data){
		        libros = data;
		    });
			return true;
		},
		llenar_libros: function(data){
			libros = data;
			return true;
		},
		get_libros_cantidad: function(){
			return libros_cantidad;
		},
		cargar_libros_cantidad: function(){
			$http.get('API/biblioteca/get_libros_cantidad')
		    .success(function(data){
		        libros_cantidad = data;
		    });
			return true;
		},
		llenar_libros_cantidad: function(data){
			libros_cantidad = data;
			return true;
		}
	}
};

angular
    .module('inspinia')
    .factory('principal', ['$q', '$http', '$timeout', principal])
    .factory('varStorage', varStorage)
    .factory('ordenarDatos', ordenarDatos)
    .factory('tools', tools)
    .factory('ServiceNotificaciones', ServiceNotificaciones)
    .factory('BusquedaJson', BusquedaJson)
    .factory('serviceFecha', serviceFecha)
    .factory('PreCarga', PreCarga)
    .factory('authorization', ['$rootScope', '$state', 'principal', authorization]);