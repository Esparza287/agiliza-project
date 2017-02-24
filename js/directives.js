/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Agiliza | Intranet para Instituciones Educacionales';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Agiliza | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}
/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * ListarComunas - 
 */
 function listaComunas($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="comuna in listComuna.comunas" value="{{comuna.id_comuna}}">{{comuna.nombre_comuna}}</option>',
        controller: function (){
            var lista = this;
            lista.comunas = [{"id_comuna":"5602","nombre_comuna":"Algarrobo","provincia_id":"56"},{"id_comuna":"13502","nombre_comuna":"Alhu\u00e9","provincia_id":"135"},{"id_comuna":"8314","nombre_comuna":"Alto Biob\u00edo","provincia_id":"83"},{"id_comuna":"3302","nombre_comuna":"Alto del Carmen","provincia_id":"33"},{"id_comuna":"1107","nombre_comuna":"Alto Hospicio","provincia_id":"11"},{"id_comuna":"10202","nombre_comuna":"Ancud","provincia_id":"102"},{"id_comuna":"4103","nombre_comuna":"Andacollo","provincia_id":"41"},{"id_comuna":"9201","nombre_comuna":"Angol","provincia_id":"92"},{"id_comuna":"12202","nombre_comuna":"Ant\u00e1rtica","provincia_id":"122"},{"id_comuna":"2101","nombre_comuna":"Antofagasta","provincia_id":"21"},{"id_comuna":"8302","nombre_comuna":"Antuco","provincia_id":"83"},{"id_comuna":"8202","nombre_comuna":"Arauco","provincia_id":"82"},{"id_comuna":"15101","nombre_comuna":"Arica","provincia_id":"151"},{"id_comuna":"11201","nombre_comuna":"Ays\u00e9n","provincia_id":"112"},{"id_comuna":"13402","nombre_comuna":"Buin","provincia_id":"134"},{"id_comuna":"8402","nombre_comuna":"Bulnes","provincia_id":"84"},{"id_comuna":"5402","nombre_comuna":"Cabildo","provincia_id":"54"},{"id_comuna":"12201","nombre_comuna":"Cabo de Hornos","provincia_id":"122"},{"id_comuna":"8303","nombre_comuna":"Cabrero","provincia_id":"83"},{"id_comuna":"2201","nombre_comuna":"Calama","provincia_id":"22"},{"id_comuna":"10102","nombre_comuna":"Calbuco","provincia_id":"101"},{"id_comuna":"3102","nombre_comuna":"Caldera","provincia_id":"31"},{"id_comuna":"13403","nombre_comuna":"Calera de Tango","provincia_id":"134"},{"id_comuna":"5302","nombre_comuna":"Calle Larga","provincia_id":"53"},{"id_comuna":"15102","nombre_comuna":"Camarones","provincia_id":"151"},{"id_comuna":"1402","nombre_comuna":"Cami\u00f1a","provincia_id":"14"},{"id_comuna":"4202","nombre_comuna":"Canela","provincia_id":"42"},{"id_comuna":"8203","nombre_comuna":"Ca\u00f1ete","provincia_id":"82"},{"id_comuna":"9102","nombre_comuna":"Carahue","provincia_id":"91"},{"id_comuna":"5603","nombre_comuna":"Cartagena","provincia_id":"56"},{"id_comuna":"5102","nombre_comuna":"Casablanca","provincia_id":"51"},{"id_comuna":"10201","nombre_comuna":"Castro","provincia_id":"102"},{"id_comuna":"5702","nombre_comuna":"Catemu","provincia_id":"57"},{"id_comuna":"7201","nombre_comuna":"Cauquenes","provincia_id":"72"},{"id_comuna":"13102","nombre_comuna":"Cerrillos","provincia_id":"131"},{"id_comuna":"13103","nombre_comuna":"Cerro Navia","provincia_id":"131"},{"id_comuna":"10401","nombre_comuna":"Chait\u00e9n","provincia_id":"104"},{"id_comuna":"3201","nombre_comuna":"Cha\u00f1aral","provincia_id":"32"},{"id_comuna":"7202","nombre_comuna":"Chanco","provincia_id":"72"},{"id_comuna":"6302","nombre_comuna":"Ch\u00e9pica","provincia_id":"63"},{"id_comuna":"8103","nombre_comuna":"Chiguayante","provincia_id":"81"},{"id_comuna":"11401","nombre_comuna":"Chile Chico","provincia_id":"114"},{"id_comuna":"8401","nombre_comuna":"Chill\u00e1n","provincia_id":"84"},{"id_comuna":"8406","nombre_comuna":"Chill\u00e1n Viejo","provincia_id":"84"},{"id_comuna":"6303","nombre_comuna":"Chimbarongo","provincia_id":"63"},{"id_comuna":"9121","nombre_comuna":"Cholchol","provincia_id":"91"},{"id_comuna":"10203","nombre_comuna":"Chonchi","provincia_id":"102"},{"id_comuna":"11202","nombre_comuna":"Cisnes","provincia_id":"112"},{"id_comuna":"8403","nombre_comuna":"Cobquecura","provincia_id":"84"},{"id_comuna":"10103","nombre_comuna":"Cocham\u00f3","provincia_id":"101"},{"id_comuna":"11301","nombre_comuna":"Cochrane","provincia_id":"113"},{"id_comuna":"6102","nombre_comuna":"Codegua","provincia_id":"61"},{"id_comuna":"8404","nombre_comuna":"Coelemu","provincia_id":"84"},{"id_comuna":"8405","nombre_comuna":"Coihueco","provincia_id":"84"},{"id_comuna":"6103","nombre_comuna":"Coinco","provincia_id":"61"},{"id_comuna":"7402","nombre_comuna":"Colb\u00fan","provincia_id":"74"},{"id_comuna":"1403","nombre_comuna":"Colchane","provincia_id":"14"},{"id_comuna":"13301","nombre_comuna":"Colina","provincia_id":"133"},{"id_comuna":"9202","nombre_comuna":"Collipulli","provincia_id":"92"},{"id_comuna":"6104","nombre_comuna":"Coltauco","provincia_id":"61"},{"id_comuna":"4302","nombre_comuna":"Combarbal\u00e1","provincia_id":"43"},{"id_comuna":"8101","nombre_comuna":"Concepci\u00f3n","provincia_id":"81"},{"id_comuna":"13104","nombre_comuna":"Conchal\u00ed","provincia_id":"131"},{"id_comuna":"5103","nombre_comuna":"Conc\u00f3n","provincia_id":"51"},{"id_comuna":"7102","nombre_comuna":"Constituci\u00f3n","provincia_id":"71"},{"id_comuna":"8204","nombre_comuna":"Contulmo","provincia_id":"82"},{"id_comuna":"3101","nombre_comuna":"Copiap\u00f3","provincia_id":"31"},{"id_comuna":"4102","nombre_comuna":"Coquimbo","provincia_id":"41"},{"id_comuna":"8102","nombre_comuna":"Coronel","provincia_id":"81"},{"id_comuna":"14102","nombre_comuna":"Corral","provincia_id":"141"},{"id_comuna":"11101","nombre_comuna":"Coyhaique","provincia_id":"111"},{"id_comuna":"9103","nombre_comuna":"Cunco","provincia_id":"91"},{"id_comuna":"9203","nombre_comuna":"Curacaut\u00edn","provincia_id":"92"},{"id_comuna":"13503","nombre_comuna":"Curacav\u00ed","provincia_id":"135"},{"id_comuna":"10204","nombre_comuna":"Curaco de V\u00e9lez","provincia_id":"102"},{"id_comuna":"8205","nombre_comuna":"Curanilahue","provincia_id":"82"},{"id_comuna":"9104","nombre_comuna":"Curarrehue","provincia_id":"91"},{"id_comuna":"7103","nombre_comuna":"Curepto","provincia_id":"71"},{"id_comuna":"7301","nombre_comuna":"Curic\u00f3","provincia_id":"73"},{"id_comuna":"10205","nombre_comuna":"Dalcahue","provincia_id":"102"},{"id_comuna":"3202","nombre_comuna":"Diego de Almagro","provincia_id":"32"},{"id_comuna":"6105","nombre_comuna":"Do\u00f1ihue","provincia_id":"61"},{"id_comuna":"13105","nombre_comuna":"El Bosque","provincia_id":"131"},{"id_comuna":"8407","nombre_comuna":"El Carmen","provincia_id":"84"},{"id_comuna":"13602","nombre_comuna":"El Monte","provincia_id":"136"},{"id_comuna":"5604","nombre_comuna":"El Quisco","provincia_id":"56"},{"id_comuna":"5605","nombre_comuna":"El Tabo","provincia_id":"56"},{"id_comuna":"7104","nombre_comuna":"Empedrado","provincia_id":"71"},{"id_comuna":"9204","nombre_comuna":"Ercilla","provincia_id":"92"},{"id_comuna":"13106","nombre_comuna":"Estaci\u00f3n Central","provincia_id":"131"},{"id_comuna":"8104","nombre_comuna":"Florida","provincia_id":"81"},{"id_comuna":"9105","nombre_comuna":"Freire","provincia_id":"91"},{"id_comuna":"3303","nombre_comuna":"Freirina","provincia_id":"33"},{"id_comuna":"10104","nombre_comuna":"Fresia","provincia_id":"101"},{"id_comuna":"10105","nombre_comuna":"Frutillar","provincia_id":"101"},{"id_comuna":"10402","nombre_comuna":"Futaleuf\u00fa","provincia_id":"104"},{"id_comuna":"14202","nombre_comuna":"Futrono","provincia_id":"142"},{"id_comuna":"9106","nombre_comuna":"Galvarino","provincia_id":"91"},{"id_comuna":"15202","nombre_comuna":"General Lagos","provincia_id":"152"},{"id_comuna":"9107","nombre_comuna":"Gorbea","provincia_id":"91"},{"id_comuna":"6106","nombre_comuna":"Graneros","provincia_id":"61"},{"id_comuna":"11203","nombre_comuna":"Guaitecas","provincia_id":"112"},{"id_comuna":"5503","nombre_comuna":"Hijuelas","provincia_id":"55"},{"id_comuna":"10403","nombre_comuna":"Hualaihu\u00e9","provincia_id":"104"},{"id_comuna":"7302","nombre_comuna":"Huala\u00f1\u00e9","provincia_id":"73"},{"id_comuna":"8112","nombre_comuna":"Hualp\u00e9n","provincia_id":"81"},{"id_comuna":"8105","nombre_comuna":"Hualqui","provincia_id":"81"},{"id_comuna":"1404","nombre_comuna":"Huara","provincia_id":"14"},{"id_comuna":"3304","nombre_comuna":"Huasco","provincia_id":"33"},{"id_comuna":"13107","nombre_comuna":"Huechuraba","provincia_id":"131"},{"id_comuna":"4201","nombre_comuna":"Illapel","provincia_id":"42"},{"id_comuna":"13108","nombre_comuna":"Independencia","provincia_id":"131"},{"id_comuna":"1101","nombre_comuna":"Iquique","provincia_id":"11"},{"id_comuna":"13603","nombre_comuna":"Isla de Maipo","provincia_id":"136"},{"id_comuna":"5201","nombre_comuna":"Isla de Pascua","provincia_id":"52"},{"id_comuna":"5104","nombre_comuna":"Juan Fern\u00e1ndez","provincia_id":"51"},{"id_comuna":"5502","nombre_comuna":"La Calera","provincia_id":"55"},{"id_comuna":"13109","nombre_comuna":"La Cisterna","provincia_id":"131"},{"id_comuna":"5504","nombre_comuna":"La Cruz","provincia_id":"55"},{"id_comuna":"6202","nombre_comuna":"La Estrella","provincia_id":"62"},{"id_comuna":"13110","nombre_comuna":"La Florida","provincia_id":"131"},{"id_comuna":"13111","nombre_comuna":"La Granja","provincia_id":"131"},{"id_comuna":"4104","nombre_comuna":"La Higuera","provincia_id":"41"},{"id_comuna":"5401","nombre_comuna":"La Ligua","provincia_id":"54"},{"id_comuna":"13112","nombre_comuna":"La Pintana","provincia_id":"131"},{"id_comuna":"13113","nombre_comuna":"La Reina","provincia_id":"131"},{"id_comuna":"4101","nombre_comuna":"La Serena","provincia_id":"41"},{"id_comuna":"14201","nombre_comuna":"La Uni\u00f3n","provincia_id":"142"},{"id_comuna":"14203","nombre_comuna":"Lago Ranco","provincia_id":"142"},{"id_comuna":"11102","nombre_comuna":"Lago Verde","provincia_id":"111"},{"id_comuna":"12102","nombre_comuna":"Laguna Blanca","provincia_id":"121"},{"id_comuna":"8304","nombre_comuna":"Laja","provincia_id":"83"},{"id_comuna":"13302","nombre_comuna":"Lampa","provincia_id":"133"},{"id_comuna":"14103","nombre_comuna":"Lanco","provincia_id":"141"},{"id_comuna":"6107","nombre_comuna":"Las Cabras","provincia_id":"61"},{"id_comuna":"13114","nombre_comuna":"Las Condes","provincia_id":"131"},{"id_comuna":"9108","nombre_comuna":"Lautaro","provincia_id":"91"},{"id_comuna":"8201","nombre_comuna":"Lebu","provincia_id":"82"},{"id_comuna":"7303","nombre_comuna":"Licant\u00e9n","provincia_id":"73"},{"id_comuna":"5802","nombre_comuna":"Limache","provincia_id":"58"},{"id_comuna":"7401","nombre_comuna":"Linares","provincia_id":"74"},{"id_comuna":"6203","nombre_comuna":"Litueche","provincia_id":"62"},{"id_comuna":"10107","nombre_comuna":"Llanquihue","provincia_id":"101"},{"id_comuna":"5703","nombre_comuna":"Llay Llay","provincia_id":"57"},{"id_comuna":"13115","nombre_comuna":"Lo Barnechea","provincia_id":"131"},{"id_comuna":"13116","nombre_comuna":"Lo Espejo","provincia_id":"131"},{"id_comuna":"13117","nombre_comuna":"Lo Prado","provincia_id":"131"},{"id_comuna":"6304","nombre_comuna":"Lolol","provincia_id":"63"},{"id_comuna":"9109","nombre_comuna":"Loncoche","provincia_id":"91"},{"id_comuna":"7403","nombre_comuna":"Longav\u00ed","provincia_id":"74"},{"id_comuna":"9205","nombre_comuna":"Lonquimay","provincia_id":"92"},{"id_comuna":"8206","nombre_comuna":"Los \u00c1lamos","provincia_id":"82"},{"id_comuna":"5301","nombre_comuna":"Los Andes","provincia_id":"53"},{"id_comuna":"8301","nombre_comuna":"Los \u00c1ngeles","provincia_id":"83"},{"id_comuna":"14104","nombre_comuna":"Los Lagos","provincia_id":"141"},{"id_comuna":"10106","nombre_comuna":"Los Muermos","provincia_id":"101"},{"id_comuna":"9206","nombre_comuna":"Los Sauces","provincia_id":"92"},{"id_comuna":"4203","nombre_comuna":"Los Vilos","provincia_id":"42"},{"id_comuna":"8106","nombre_comuna":"Lota","provincia_id":"81"},{"id_comuna":"9207","nombre_comuna":"Lumaco","provincia_id":"92"},{"id_comuna":"6108","nombre_comuna":"Machal\u00ed","provincia_id":"61"},{"id_comuna":"13118","nombre_comuna":"Macul","provincia_id":"131"},{"id_comuna":"14105","nombre_comuna":"M\u00e1fil","provincia_id":"141"},{"id_comuna":"13119","nombre_comuna":"Maip\u00fa","provincia_id":"131"},{"id_comuna":"6109","nombre_comuna":"Malloa","provincia_id":"61"},{"id_comuna":"6204","nombre_comuna":"Marchihue","provincia_id":"62"},{"id_comuna":"2302","nombre_comuna":"Mar\u00eda Elena","provincia_id":"23"},{"id_comuna":"13504","nombre_comuna":"Mar\u00eda Pinto","provincia_id":"135"},{"id_comuna":"14106","nombre_comuna":"Mariquina","provincia_id":"141"},{"id_comuna":"7105","nombre_comuna":"Maule","provincia_id":"71"},{"id_comuna":"10108","nombre_comuna":"Maull\u00edn","provincia_id":"101"},{"id_comuna":"2102","nombre_comuna":"Mejillones","provincia_id":"21"},{"id_comuna":"9110","nombre_comuna":"Melipeuco","provincia_id":"91"},{"id_comuna":"13501","nombre_comuna":"Melipilla","provincia_id":"135"},{"id_comuna":"7304","nombre_comuna":"Molina","provincia_id":"73"},{"id_comuna":"4303","nombre_comuna":"Monte Patria","provincia_id":"43"},{"id_comuna":"6110","nombre_comuna":"Mostazal","provincia_id":"61"},{"id_comuna":"8305","nombre_comuna":"Mulch\u00e9n","provincia_id":"83"},{"id_comuna":"8306","nombre_comuna":"Nacimiento","provincia_id":"83"},{"id_comuna":"6305","nombre_comuna":"Nancagua","provincia_id":"63"},{"id_comuna":"12401","nombre_comuna":"Natales","provincia_id":"124"},{"id_comuna":"6205","nombre_comuna":"Navidad","provincia_id":"62"},{"id_comuna":"8307","nombre_comuna":"Negrete","provincia_id":"83"},{"id_comuna":"8408","nombre_comuna":"Ninhue","provincia_id":"84"},{"id_comuna":"8409","nombre_comuna":"\u00d1iqu\u00e9n","provincia_id":"84"},{"id_comuna":"5506","nombre_comuna":"Nogales","provincia_id":"55"},{"id_comuna":"9111","nombre_comuna":"Nueva Imperial","provincia_id":"91"},{"id_comuna":"13120","nombre_comuna":"\u00d1u\u00f1oa","provincia_id":"131"},{"id_comuna":"11302","nombre_comuna":"O'Higgins","provincia_id":"113"},{"id_comuna":"6111","nombre_comuna":"Olivar","provincia_id":"61"},{"id_comuna":"2202","nombre_comuna":"Ollag\u00fce","provincia_id":"22"},{"id_comuna":"5803","nombre_comuna":"Olmu\u00e9","provincia_id":"58"},{"id_comuna":"10301","nombre_comuna":"Osorno","provincia_id":"103"},{"id_comuna":"4301","nombre_comuna":"Ovalle","provincia_id":"43"},{"id_comuna":"13604","nombre_comuna":"Padre Hurtado","provincia_id":"136"},{"id_comuna":"9112","nombre_comuna":"Padre las Casas","provincia_id":"91"},{"id_comuna":"4105","nombre_comuna":"Paihuano","provincia_id":"41"},{"id_comuna":"14107","nombre_comuna":"Paillaco","provincia_id":"141"},{"id_comuna":"13404","nombre_comuna":"Paine","provincia_id":"134"},{"id_comuna":"10404","nombre_comuna":"Palena","provincia_id":"104"},{"id_comuna":"6306","nombre_comuna":"Palmilla","provincia_id":"63"},{"id_comuna":"14108","nombre_comuna":"Panguipulli","provincia_id":"141"},{"id_comuna":"5704","nombre_comuna":"Panquehue","provincia_id":"57"},{"id_comuna":"5403","nombre_comuna":"Papudo","provincia_id":"54"},{"id_comuna":"6206","nombre_comuna":"Paredones","provincia_id":"62"},{"id_comuna":"7404","nombre_comuna":"Parral","provincia_id":"74"},{"id_comuna":"13121","nombre_comuna":"Pedro Aguirre Cerda","provincia_id":"131"},{"id_comuna":"7106","nombre_comuna":"Pelarco","provincia_id":"71"},{"id_comuna":"7203","nombre_comuna":"Pelluhue","provincia_id":"72"},{"id_comuna":"8410","nombre_comuna":"Pemuco","provincia_id":"84"},{"id_comuna":"13605","nombre_comuna":"Pe\u00f1aflor","provincia_id":"136"},{"id_comuna":"13122","nombre_comuna":"Pe\u00f1alol\u00e9n","provincia_id":"131"},{"id_comuna":"7107","nombre_comuna":"Pencahue","provincia_id":"71"},{"id_comuna":"8107","nombre_comuna":"Penco","provincia_id":"81"},{"id_comuna":"6307","nombre_comuna":"Peralillo","provincia_id":"63"},{"id_comuna":"9113","nombre_comuna":"Perquenco","provincia_id":"91"},{"id_comuna":"5404","nombre_comuna":"Petorca","provincia_id":"54"},{"id_comuna":"6112","nombre_comuna":"Peumo","provincia_id":"61"},{"id_comuna":"1405","nombre_comuna":"Pica","provincia_id":"14"},{"id_comuna":"6113","nombre_comuna":"Pichidegua","provincia_id":"61"},{"id_comuna":"6201","nombre_comuna":"Pichilemu","provincia_id":"62"},{"id_comuna":"8411","nombre_comuna":"Pinto","provincia_id":"84"},{"id_comuna":"13202","nombre_comuna":"Pirque","provincia_id":"132"},{"id_comuna":"9114","nombre_comuna":"Pitrufqu\u00e9n","provincia_id":"91"},{"id_comuna":"6308","nombre_comuna":"Placilla","provincia_id":"63"},{"id_comuna":"8412","nombre_comuna":"Portezuelo","provincia_id":"84"},{"id_comuna":"12301","nombre_comuna":"Porvenir","provincia_id":"123"},{"id_comuna":"1401","nombre_comuna":"Pozo Almonte","provincia_id":"14"},{"id_comuna":"12302","nombre_comuna":"Primavera","provincia_id":"123"},{"id_comuna":"13123","nombre_comuna":"Providencia","provincia_id":"131"},{"id_comuna":"5105","nombre_comuna":"Puchuncav\u00ed","provincia_id":"51"},{"id_comuna":"9115","nombre_comuna":"Puc\u00f3n","provincia_id":"91"},{"id_comuna":"13124","nombre_comuna":"Pudahuel","provincia_id":"131"},{"id_comuna":"13201","nombre_comuna":"Puente Alto","provincia_id":"132"},{"id_comuna":"10101","nombre_comuna":"Puerto Montt","provincia_id":"101"},{"id_comuna":"10302","nombre_comuna":"Puerto Octay","provincia_id":"103"},{"id_comuna":"10109","nombre_comuna":"Puerto Varas","provincia_id":"101"},{"id_comuna":"6309","nombre_comuna":"Pumanque","provincia_id":"63"},{"id_comuna":"4304","nombre_comuna":"Punitaqui","provincia_id":"43"},{"id_comuna":"12101","nombre_comuna":"Punta Arenas","provincia_id":"121"},{"id_comuna":"10206","nombre_comuna":"Puqueld\u00f3n","provincia_id":"102"},{"id_comuna":"9208","nombre_comuna":"Pur\u00e9n","provincia_id":"92"},{"id_comuna":"10303","nombre_comuna":"Purranque","provincia_id":"103"},{"id_comuna":"5705","nombre_comuna":"Putaendo","provincia_id":"57"},{"id_comuna":"15201","nombre_comuna":"Putre","provincia_id":"152"},{"id_comuna":"10304","nombre_comuna":"Puyehue","provincia_id":"103"},{"id_comuna":"10207","nombre_comuna":"Queil\u00e9n","provincia_id":"102"},{"id_comuna":"10208","nombre_comuna":"Quell\u00f3n","provincia_id":"102"},{"id_comuna":"10209","nombre_comuna":"Quemchi","provincia_id":"102"},{"id_comuna":"8308","nombre_comuna":"Quilaco","provincia_id":"83"},{"id_comuna":"13125","nombre_comuna":"Quilicura","provincia_id":"131"},{"id_comuna":"8309","nombre_comuna":"Quilleco","provincia_id":"83"},{"id_comuna":"8413","nombre_comuna":"Quill\u00f3n","provincia_id":"84"},{"id_comuna":"5501","nombre_comuna":"Quillota","provincia_id":"55"},{"id_comuna":"5801","nombre_comuna":"Quilpu\u00e9","provincia_id":"58"},{"id_comuna":"10210","nombre_comuna":"Quinchao","provincia_id":"102"},{"id_comuna":"6114","nombre_comuna":"Quinta de Tilcoco","provincia_id":"61"},{"id_comuna":"13126","nombre_comuna":"Quinta Normal","provincia_id":"131"},{"id_comuna":"5107","nombre_comuna":"Quintero","provincia_id":"51"},{"id_comuna":"8414","nombre_comuna":"Quirihue","provincia_id":"84"},{"id_comuna":"6101","nombre_comuna":"Rancagua","provincia_id":"61"},{"id_comuna":"8415","nombre_comuna":"R\u00e1nquil","provincia_id":"84"},{"id_comuna":"7305","nombre_comuna":"Rauco","provincia_id":"73"},{"id_comuna":"13127","nombre_comuna":"Recoleta","provincia_id":"131"},{"id_comuna":"9209","nombre_comuna":"Renaico","provincia_id":"92"},{"id_comuna":"13128","nombre_comuna":"Renca","provincia_id":"131"},{"id_comuna":"6115","nombre_comuna":"Rengo","provincia_id":"61"},{"id_comuna":"6116","nombre_comuna":"Requ\u00ednoa","provincia_id":"61"},{"id_comuna":"7405","nombre_comuna":"Retiro","provincia_id":"74"},{"id_comuna":"5303","nombre_comuna":"Rinconada","provincia_id":"53"},{"id_comuna":"14204","nombre_comuna":"R\u00edo Bueno","provincia_id":"142"},{"id_comuna":"7108","nombre_comuna":"R\u00edo Claro","provincia_id":"71"},{"id_comuna":"4305","nombre_comuna":"R\u00edo Hurtado","provincia_id":"43"},{"id_comuna":"11402","nombre_comuna":"R\u00edo Ib\u00e1\u00f1ez","provincia_id":"114"},{"id_comuna":"10305","nombre_comuna":"R\u00edo Negro","provincia_id":"103"},{"id_comuna":"12103","nombre_comuna":"R\u00edo Verde","provincia_id":"121"},{"id_comuna":"7306","nombre_comuna":"Romeral","provincia_id":"73"},{"id_comuna":"9116","nombre_comuna":"Saavedra","provincia_id":"91"},{"id_comuna":"7307","nombre_comuna":"Sagrada Familia","provincia_id":"73"},{"id_comuna":"4204","nombre_comuna":"Salamanca","provincia_id":"42"},{"id_comuna":"5601","nombre_comuna":"San Antonio","provincia_id":"56"},{"id_comuna":"13401","nombre_comuna":"San Bernardo","provincia_id":"134"},{"id_comuna":"8416","nombre_comuna":"San Carlos","provincia_id":"84"},{"id_comuna":"7109","nombre_comuna":"San Clemente","provincia_id":"71"},{"id_comuna":"5304","nombre_comuna":"San Esteban","provincia_id":"53"},{"id_comuna":"8417","nombre_comuna":"San Fabi\u00e1n","provincia_id":"84"},{"id_comuna":"5701","nombre_comuna":"San Felipe","provincia_id":"57"},{"id_comuna":"6301","nombre_comuna":"San Fernando","provincia_id":"63"},{"id_comuna":"12104","nombre_comuna":"San Gregorio","provincia_id":"121"},{"id_comuna":"8418","nombre_comuna":"San Ignacio","provincia_id":"84"},{"id_comuna":"7406","nombre_comuna":"San Javier","provincia_id":"74"},{"id_comuna":"13129","nombre_comuna":"San Joaqu\u00edn","provincia_id":"131"},{"id_comuna":"13203","nombre_comuna":"San Jos\u00e9 de Maipo","provincia_id":"132"},{"id_comuna":"10306","nombre_comuna":"San Juan de la Costa","provincia_id":"103"},{"id_comuna":"13130","nombre_comuna":"San Miguel","provincia_id":"131"},{"id_comuna":"8419","nombre_comuna":"San Nicol\u00e1s","provincia_id":"84"},{"id_comuna":"10307","nombre_comuna":"San Pablo","provincia_id":"103"},{"id_comuna":"13505","nombre_comuna":"San Pedro","provincia_id":"135"},{"id_comuna":"2203","nombre_comuna":"San Pedro de Atacama","provincia_id":"22"},{"id_comuna":"8108","nombre_comuna":"San Pedro de la Paz","provincia_id":"81"},{"id_comuna":"7110","nombre_comuna":"San Rafael","provincia_id":"71"},{"id_comuna":"13131","nombre_comuna":"San Ram\u00f3n","provincia_id":"131"},{"id_comuna":"8310","nombre_comuna":"San Rosendo","provincia_id":"83"},{"id_comuna":"6117","nombre_comuna":"San Vicente","provincia_id":"61"},{"id_comuna":"8311","nombre_comuna":"Santa B\u00e1rbara","provincia_id":"83"},{"id_comuna":"6310","nombre_comuna":"Santa Cruz","provincia_id":"63"},{"id_comuna":"8109","nombre_comuna":"Santa Juana","provincia_id":"81"},{"id_comuna":"5706","nombre_comuna":"Santa Mar\u00eda","provincia_id":"57"},{"id_comuna":"13101","nombre_comuna":"Santiago","provincia_id":"131"},{"id_comuna":"5606","nombre_comuna":"Santo Domingo","provincia_id":"56"},{"id_comuna":"2103","nombre_comuna":"Sierra Gorda","provincia_id":"21"},{"id_comuna":"13601","nombre_comuna":"Talagante","provincia_id":"136"},{"id_comuna":"7101","nombre_comuna":"Talca","provincia_id":"71"},{"id_comuna":"8110","nombre_comuna":"Talcahuano","provincia_id":"81"},{"id_comuna":"2104","nombre_comuna":"Taltal","provincia_id":"21"},{"id_comuna":"9101","nombre_comuna":"Temuco","provincia_id":"91"},{"id_comuna":"7308","nombre_comuna":"Teno","provincia_id":"73"},{"id_comuna":"9117","nombre_comuna":"Teodoro Schmidt","provincia_id":"91"},{"id_comuna":"3103","nombre_comuna":"Tierra Amarilla","provincia_id":"31"},{"id_comuna":"13303","nombre_comuna":"Tiltil","provincia_id":"133"},{"id_comuna":"12303","nombre_comuna":"Timaukel","provincia_id":"123"},{"id_comuna":"8207","nombre_comuna":"Tir\u00faa","provincia_id":"82"},{"id_comuna":"2301","nombre_comuna":"Tocopilla","provincia_id":"23"},{"id_comuna":"9118","nombre_comuna":"Tolt\u00e9n","provincia_id":"91"},{"id_comuna":"8111","nombre_comuna":"Tom\u00e9","provincia_id":"81"},{"id_comuna":"12402","nombre_comuna":"Torres del Paine","provincia_id":"124"},{"id_comuna":"11303","nombre_comuna":"Tortel","provincia_id":"113"},{"id_comuna":"9210","nombre_comuna":"Traigu\u00e9n","provincia_id":"92"},{"id_comuna":"8420","nombre_comuna":"Treguaco","provincia_id":"84"},{"id_comuna":"8312","nombre_comuna":"Tucapel","provincia_id":"83"},{"id_comuna":"14101","nombre_comuna":"Valdivia","provincia_id":"141"},{"id_comuna":"3301","nombre_comuna":"Vallenar","provincia_id":"33"},{"id_comuna":"5101","nombre_comuna":"Valpara\u00edso","provincia_id":"51"},{"id_comuna":"7309","nombre_comuna":"Vichuqu\u00e9n","provincia_id":"73"},{"id_comuna":"9211","nombre_comuna":"Victoria","provincia_id":"92"},{"id_comuna":"4106","nombre_comuna":"Vicu\u00f1a","provincia_id":"41"},{"id_comuna":"9119","nombre_comuna":"Vilc\u00fan","provincia_id":"91"},{"id_comuna":"7407","nombre_comuna":"Villa Alegre","provincia_id":"74"},{"id_comuna":"5804","nombre_comuna":"Villa Alemana","provincia_id":"58"},{"id_comuna":"9120","nombre_comuna":"Villarrica","provincia_id":"91"},{"id_comuna":"5109","nombre_comuna":"Vi\u00f1a del Mar","provincia_id":"51"},{"id_comuna":"13132","nombre_comuna":"Vitacura","provincia_id":"131"},{"id_comuna":"7408","nombre_comuna":"Yerbas Buenas","provincia_id":"74"},{"id_comuna":"8313","nombre_comuna":"Yumbel","provincia_id":"83"},{"id_comuna":"8421","nombre_comuna":"Yungay","provincia_id":"84"},{"id_comuna":"5405","nombre_comuna":"Zapallar","provincia_id":"54"}];
            /*$http.get('API/get_comunas').success(function(data){
                lista.comunas = data;
            });*/
        },
        controllerAs: "listComuna"
    };
 }
/**
 * ListarGeneral - 
 */
 function listarGeneral($http){
    return {
        restrict: 'A',
        scope: {
            name: '='
        },
        template: function(scope, element, attributes){
            var name = '{{listData.'+element.name+'}}';
            if(angular.isDefined(element.addCode)){
                name = '{{listData.'+element.addCode+'}} | {{listData.'+element.name+'}}';
            }
            return '<option ng-repeat="listData in datas" value="{{listData.'+element.idName+'}}">'+name+'</option>'; 
        },
        controller: function ($scope, $element, varStorage){
            var urlGet = $element.attr('url-get');
            $scope.datas = [];
            if(typeof varStorage.getVar(urlGet) !== 'undefined'){
                $scope.datas = varStorage.getVar(urlGet);
            }
            else{
                $http.get(urlGet).success(function(data){
                    console.log(data);
                    varStorage.addVar(urlGet, data);
                    $scope.datas = data;
                });
            }
        }
    };
 }
/**
 * ListarSubcuentas - 
 */
 function listaSubCuenta($http, ordenarCuentas){
    return {
        restrict: 'A',
        scope: {
            name: '='
        },
        template: '<option ng-repeat="cuenta in cuentas" value="{{cuenta.id_cuenta}}">{{cuenta.codigo_cuenta}} | {{cuenta.nombre_cuenta}}</option>',
        controller: function ($scope, $element, varStorage){
            var urlGet = $element.attr('url-get');
            $scope.cuentas = [];
            if(typeof varStorage.getVar(urlGet) !== 'undefined'){
                $scope.cuentas = varStorage.getVar(urlGet);
            }
            else{
                $http.get(urlGet).success(function(data){
                    varStorage.addVar(urlGet, data);
                    $scope.cuentas = data;
                    console.log($scope.cuentas);
                });
            }
        }
    };
 }
/**
* Listar Tipos de Clientes - 
*/
function listaTipoCliente($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="tipo_cliente in listTipoCliente.tipos_cliente" value="{{tipo_cliente.id_tipo_cliente}}">{{tipo_cliente.nombre_tipo_cliente}}</option>',
        controller: function (){
            var lista = this;
            lista.tipos_cliente = [];
            $http.get('API/cliente/get_tipos_cliente').success(function(data){
                lista.tipos_cliente = data;
            });
        },
        controllerAs: "listTipoCliente"
    };
}
/**
* Listar Propiedades - 
*/
function listaPropiedad($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="tipo_propiedad in listPropiedad.tipos_propiedad" value="{{tipo_propiedad.id_propiedad}}">{{tipo_propiedad.descripcion_propiedad}}</option>',
        controller: function (){
            var lista = this;
            lista.tipos_propiedad = [];
            $http.get('API/factura/get_propiedad').success(function(data){
                lista.tipos_propiedad = data;
            });
        },
        controllerAs: "listPropiedad"
    };
}
/**
* Listar Cuentas
*/
function listaForma($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="tipo_forma in listForma.tipos_forma" value="{{tipo_forma.id_forma_pago}}">{{tipo_forma.nombre_forma_pago}}</option>',
        controller: function (){
            var lista = this;
            lista.tipos_forma = [];
            $http.get('API/ingreso/get_forma_pago').success(function(data){
                lista.tipos_forma = data;
            });
        },
        controllerAs: "listForma"
    };
}
/**
* Listar Centros de Costos
*/
function listaCentroCosto($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="tipo_centro in listCentro.tipos_centro" value="{{tipo_centro.id_centro_costo}}">{{tipo_centro.nombre_centro_costo}}</option>',
        controller: function (){
            var lista = this;
            lista.tipos_centro = [];
            $http.get('API/ingreso/get_centro_costo').success(function(data){
                lista.tipos_centro = data;
            });
        },
        controllerAs: "listCentro"
    };
}
/**
* Listar Tipo Facturacion - 
*/
function listaTipoFacturacion($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="tipo_facturacion in listFacturacion.tipos_facturacion" value="{{tipo_facturacion.id_tipo_facturacion}}">{{tipo_facturacion.nombre_tipo_facturacion}}</option>',
        controller: function (){
            var lista = this;
            lista.tipos_facturacion = [];
            $http.get('API/cliente/get_tipos_facturacion').success(function(data){
                lista.tipos_facturacion = data;
            });
        },
        controllerAs: "listFacturacion"
    };
}
/**
* Listar Niveles de ALumno 
*/
function listaNivelAlumno($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="nivel in listNivelAlumno.nivel_alumno" value="{{nivel.id_curso}}">{{nivel.descripcion_curso}}</option>',
        controller: function (){
            var niveles = this;
            niveles.nivel_alumno = [];
            $http.get('API/usuario/get_niveles').success(function(data){
                niveles.nivel_alumno = data;
            });
        },
        controllerAs: "listNivelAlumno"
    };
}
/**
* Listar CATEGORíAS
*/
function listaCategoria($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="categoria in listCateg.categoria_implemento" value="{{categoria.id_categoria}}">{{categoria.nombre_categoria}}</option>',
        controller: function (){
            var categorias = this;
            categorias.categoria_implemento = [];
            $http.get('API/implemento/get_categorias').success(function(data){
                categorias.categoria_implemento = data;
            });
        },
        controllerAs: "listCateg"
    };
}
/**
* Listar AÑOS
*/
function listaYear($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="year in listYear.years" value="{{year.id_year}}">{{year.nombre_year}}</option>',
        controller: function (){
            var anio = this;
            anio.years = [];
            $http.get('API/fecha/get_years').success(function(data){
                anio.years = data;
            });
        },
        controllerAs: "listYear"
    };
}   
/**
* Listar ASIGNATURAS
*/
function listaAsignatura($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="asignatura in listAsignaturas.asignaturas" value="{{asignatura.id_asignatura}}">{{asignatura.nombre_asignatura}}</option>',
        controller: function (){
            var materia = this;
            materia.asignaturas = [];
            $http.get('API/planificacion/get_materias').success(function(data){
                materia.asignaturas = data;
            });
        },
        controllerAs: "listAsignaturas"
    };
}   
/**
* Listar ESPECIALIDADES
*/
function listaEspecialidad($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="especialidad in listEspecialidad.especialidades" value="{{especialidad.id_especialidad}}">{{especialidad.nombre_especialidad}}</option>',
        controller: function (){
            var especialidad = this;
            especialidad.especialidades = [];
            $http.get('API/planificacion/get_especialidades').success(function(data){
                especialidad.especialidades = data;
            });
        },
        controllerAs: "listEspecialidad"
    };
}
/**
*
* llenar lista de proveedores
*/
function listaProveedor($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="prov in listProveedor.proveedores" value="{{prov.id_proveedor}}">Rut: {{ prov.rut_proveedor}} | {{ prov.razon_social}}| {{ prov.correo_proveedor}}</option>',
        controller: function (){
            var proveedor = this;
            proveedor.proveedores = [];
            $http.get('API/proveedor/get_proveedores').success(function(data){
                proveedor.proveedores = data;
            });
        },
        controllerAs: "listProveedor"
    };
}
/**
*
* llenar lista de cursos anuales
*/
function cursosAnuales($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="cursito in listCurso.cursos_anuales" value="{{cursito.id_curso_anual}}">{{ cursito.nombre_curso_anual}}</option>',
        controller: function (){
            var cursos = this;
            cursos.cursos_anuales = [];
            $http.get('API/planificacion/get_cursos_anuales').success(function(data){
                cursos.cursos_anuales = data;
            });
        },
        controllerAs: "listCurso"
    };
}
/**
*
* llenar lista de Planes de CUENTA
*/
function listaCuentas($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="account in listCuenta.cuentas" value="{{account.id_plan_cuenta}}">{{ account.nombre_plan_cuenta}}</option>',
        controller: function (){
            var cuenta = this;
            cuenta.cuentas = [];
            $http.get('API/material/get_planes').success(function(data){
                cuenta.cuentas = data;
            });
        },
        controllerAs: "listCuenta"
    };
} /**
*
* llenar lista de Proveedores
*/
function listaProveedorMaterial($http){
    return {
        restrict: 'A',
        template: '<option ng-repeat="proveedor in listProveedor.proveedores" value="{{proveedor.id_proveedor_material}}">{{ proveedor.razon_social}}</option>',
        controller: function (){
            var provedor = this;
            provedor.proveedores = [];
            $http.get('API/pedido/get_proveedores').success(function(data){
                provedor.proveedores = data;
            });
        },
        controllerAs: "listProveedor"
    };
}
/**
* Pasar de string a int
*/
function stringToNumber() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
                number = '= filter';
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value, 10);
            });
        }
    };
};
/**
* Pasar de string a int
*/
function stringToTrueFalse() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return (value ? '1' : '0' );
            });
            ngModel.$formatters.push(function(value) {
                return value == '1';
            });
        }
    };
};
 /**
 * Agregas los putos puntos
 */
function formatoToMoneda($filter, $locale){
    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    var filterFunc = function (value) {
        return $filter('currency')(value, '', 0);
    };

    function getCaretPosition(input){
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos){
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; // Input's hidden
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    
    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {    
            modelCtrl.$formatters.push(filterFunc);
            modelCtrl.$parsers.push(function (newViewValue) {
                var oldModelValue = modelCtrl.$modelValue;
                var newModelValue = toNumber(newViewValue);
                modelCtrl.$viewValue = filterFunc(newModelValue);
                var pos = getCaretPosition(elem[0]);
                elem.val(modelCtrl.$viewValue);
                var newPos = pos + modelCtrl.$viewValue.length -
                                   newViewValue.length;
                if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
                    newPos -= 3;
                }
                setCaretPosition(elem[0], newPos);
                return newModelValue;
            });
        }
    };
};
 /**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('stringToNumber', stringToNumber)
    .directive('stringToTrueFalse', stringToTrueFalse)
    .directive('formatoToMoneda', formatoToMoneda)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('listaComunas', ['$http', listaComunas])
    .directive('listaTipoCliente', ['$http', listaTipoCliente])
    .directive('listaPropiedad', ['$http', listaPropiedad])
    .directive('listaForma', ['$http', listaForma])
    .directive('listaCentroCosto', ['$http', listaCentroCosto])
    .directive('listaTipoFacturacion', ['$http', listaTipoFacturacion])
    .directive('listaNivelAlumno', ['$http', listaNivelAlumno])
    .directive('listaCategoria', ['$http', listaCategoria])
    .directive('listaEspecialidad', ['$http', listaEspecialidad])
    .directive('listaYear', ['$http', listaYear])
    .directive('listaAsignatura', ['$http', listaAsignatura])
    .directive('listarGeneral', listarGeneral)
    .directive('fullScroll', fullScroll)
    .directive('listaSubCuenta', listaSubCuenta)
    .directive('listaCuentas', listaCuentas)
    .directive('listaProveedorMaterial', listaProveedorMaterial)
    .directive('icheck', icheck)
    .directive('cursosAnuales', cursosAnuales)
    .directive('listaProveedor', listaProveedor);
