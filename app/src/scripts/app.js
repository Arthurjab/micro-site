var app = angular.module('app', ['ui.router', 'duScroll', 'duParallax'])


//   .run(['optimizely', function(optimizely) {
//   optimizely.loadProject('880950754');
// }]);


app.directive('toggleChildHeight', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

          var w = angular.element($window);
          var linkHeight = angular.element(element)[0].offsetHeight;

          element.parent().css({ height: linkHeight });

            element.bind('click', function() {

              console.log(element.parent());
              element.parent().toggleClass('active');
            
              var actualHeight = angular.element(element.parent())[0].offsetHeight;
              var contentHeight = angular.element(element.next())[0].offsetHeight + 40;
              var totalHeight = linkHeight + contentHeight;
              console.log(totalHeight);
                

                if(totalHeight == actualHeight)
                  element.parent().css({ height: linkHeight });
                else
                  element.parent().css({ height: totalHeight });
            });


            w.bind('resize', function () {
              var linkHeight = angular.element(element)[0].offsetHeight;

              element.parent().css({ height: linkHeight });

                element.bind('click', function() {

                  console.log(element.parent());
                  element.parent().toggleClass('active');
                
                  var actualHeight = angular.element(element.parent())[0].offsetHeight;
                  var contentHeight = angular.element(element.next())[0].offsetHeight + 40;
                  var totalHeight = linkHeight + contentHeight;
                  console.log(totalHeight);
                    

                    if(totalHeight == actualHeight)
                      element.parent().css({ height: linkHeight });
                    else
                      element.parent().css({ height: totalHeight });
                });

            });

        }
    };
});


app.directive("phoneformat", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (phoneInput) {
                phoneInput = phoneInput.trim();
                if (phoneInput && phoneInput.length == 10 && !isNaN(phoneInput)) {
                    ctrl.$setValidity('phoneformat', true);
                    return phoneInput;
                } else {
                    ctrl.$setValidity('phoneformat', false);
                    return undefined;

                }
            });
        }
    };
});

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('nav', {
            abstract: true,
            templateUrl: 'templates/nav.html',
            controller: 'homeCtrl'
        })
        .state('nav.home', {
            url: '/:context',
            params:{context:null},
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })
        .state('nav.faq', {
            url: '/faq',
            templateUrl: 'templates/faq.html',
            controller: 'faqCtrl'
        })
        .state('nav.whoami', {
            url: '/whoami',
            templateUrl: 'templates/whoami.html',
            controller: 'whoamiCtrl'
        })
        .state('form', {
            url: '/form/:id',
            templateUrl: 'templates/form.html',
            controller: 'formCtrl'
        })

});
     


app.controller('faqCtrl', function ($scope) {


});

app.controller('whoamiCtrl', function ($scope) {


});

app.controller('homeCtrl', function ($scope, $http, $stateParams) {

        if($stateParams.context && $stateParams.context != 0)
          $scope.isFinished = true;
        if($stateParams.context && $stateParams.context == 0)
        {
          $scope.isFinished = true;
          $scope.isFromObs = true;
        }

        var contactButton = angular.element(document.getElementById('contact-validate'));
        var isSend = angular.element(document.getElementById('isSend'));


        $scope.sendEmail = function(){
          console.log($stateParams.context);
          $http.get('/subscribeToMailchimp/' + $stateParams.context)
          .then(function(){
             isSend.removeClass('hidden');
             contactButton.addClass('hidden');
          });
        };

    });


app.controller('formCtrl', function ($scope, $timeout, $stateParams, $http, $state) {


    // le subitem est là pour aménager un peu la réponse 
        $scope.values = [
        {
          id: 1,
          label: 'Automobile',
          subItem: { name: 'Automobile' }
        },{
          id: 1,
          label: 'Agriculture',
          subItem: { name: 'Agriculture' }
        }, {
          id: 2,
          label: 'Agroalimentaire',
          subItem: { name: 'Agroalimentaire' }
        }, {
          id: 3,
          label: 'Assurance',
          subItem: { name: 'Assurance' }
        }, {
          id: 4,
          label: 'BTP',
          subItem: { name: 'BTP' }
        }, {
          id: 5,
          label: 'Conseils et services aux entreprises',
          subItem: { name: 'Conseil' }
        }, {
          id: 6,
          label: 'Distribution, e-commerce, franchises',
          subItem: { name: 'Distribution' }
        }, {
          id: 7,
          label: 'Finance',
          subItem: { name: 'Finance' }
        }, {
          id: 8,
          label: 'Education, formation, recherche',
          subItem: { name: 'Education' }
        }, {
          id: 9,
          label: 'Energie, extraction',
          subItem: { name: 'Energie' }
        }, {
          id: 10,
          label: 'Industrie chimique, pharma',
          subItem: { name: 'Indus-chimique' }
        }, {
          id: 11,
          label: 'Industrie mécanique',
          subItem: { name: 'Indus-mécanique' }
        }, {
          id: 12,
          label: 'Luxe, cosmétiques',
          subItem: { name: 'Luxe' }
        }, {
          id: 13,
          label: 'Media, entertainment',
          subItem: { name: 'Medias' }
        }, {
          id: 14,
          label: 'Santé, sanitaire et social',
          subItem: { name: 'Secteur-publique' }
        }, {
          id: 15,
          label: 'Sécurité, défense',
          subItem: { name: 'Sécurité' }
        }, {
          id: 16,
          label: 'Services aux collectivités',
          subItem: { name: 'Services' }
        }, {
          id: 17,
          label: 'Technologies',
          subItem: { name: 'Technologies' }
        }];

    $scope.digitalValues = [
    {
      id: 1,
      label: '1, très mauvais',
      subItem: { name: '1' }
    },{
      id: 1,
      label: '2, mauvais',
      subItem: { name: '2' }
    }, {
      id: 2,
      label: '3, passable',
      subItem: { name: '3' }
    }, {
      id: 3,
      label: '4, bon',
      subItem: { name: '4' }
    }, {
      id: 4,
      label: '5, excellent',
      subItem: { name: '5' }
    }];


    $scope.data = {
        sector:"",
        email:"",
        fname:"",
        lname:"",
        phone:"",
        company:""
    };


    if ($stateParams.id)
    {
      $http.get('/getMyFormBack/' + $stateParams.id)
      .then(function(response){
        console.log(response);
        $scope.isToken = true;
        $scope.data.sector = response.data.sector;
        $scope.data.email = response.data.email;
        $scope.data.fname = response.data.fname;
        $scope.data.lname = response.data.lname;
        $scope.data.company = response.data.company;
      });
    }

    var button = angular.element(document.getElementById('validate'));

    $scope.sendForm = function(form){
        if (form.$valid)
        {
          var text = document.getElementById('text').outerHTML;
          button.addClass('on');
          var keepData = angular.copy($scope.data);
          keepData.response = text;
          if (!$scope.isToken)
            keepData.sector = angular.copy($scope.data.sector.response);
          $http.post('/postDiagnostic', keepData)
              .success(function(a,b){
                  if ($scope.isToken)
                    $state.go('nav.home', { context: $stateParams.id });
                  else
                    $state.go('nav.home', { context: 0 });
                  calq.action.track('Opt-in', {"data": keepData});
                  console.log(a,b);
              })
              .error(function(a,b){
                  button.removeClass('on');
                  console.log(a,b);
              });
        }
    };


  $scope.step = 1;
  $scope.maxStep = 1;
  $scope.totalStep = 6;

  var progressBar = angular.element(document.querySelector('.progress-bar'));
  var nav = angular.element(document.querySelector('.navigation-handler'));

  var updateBar = function() {
    progressBar.css({ width: ($scope.step * 100 / $scope.totalStep) + '%' });
  };
  var updateNav = function() {
    var currentNav = angular.element(nav[0].childNodes);
    var currentDot = angular.element(nav[0].childNodes[$scope.step - 1]);
    currentNav.removeClass("current");
    currentNav.removeClass("clickable");
    for (var i = 0; i < $scope.maxStep; i++)
    {
        var currentClickable = angular.element(nav[0].childNodes[i]);
        currentClickable.addClass("clickable");
    }
    currentDot.addClass("current");
  };

  $timeout(function(){
    updateBar();
  });

  $scope.goTo = function ($event, number) {  
    if (number <= $scope.maxStep)
    {
        $scope.step = number;
        updateBar();
        updateNav();
    }
  };

  $scope.next = function (form) {
    if (!form.$invalid) {
        calq.action.track('Question' + $scope.step, {'Answer': $scope.data['step' + $scope.step]});
        $scope.step++;
        if ($scope.maxStep < $scope.step)
        {
            $scope.maxStep++;
        }
        updateBar();
        updateNav();
    }
  };


});
