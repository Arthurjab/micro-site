var app = angular.module('app', ['ui.router', 'duScroll', 'duParallax']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    //$urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('nav', {
            abstract: true,
            templateUrl: 'templates/nav.html',
            controller: 'homeCtrl'
        })
        .state('nav.home', {
            url: '/',
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

app.controller('homeCtrl', function ($scope) {

        var contactButton = angular.element(document.getElementById('button-validate'));
        var formBox = angular.element(document.getElementById('form'));

    });


app.controller('formCtrl', function ($scope, $timeout, $stateParams, $http, $state) {


    // le subitem est là pour aménager un peu la réponse 
    $scope.values = [{
      id: 1,
      label: 'Agriculture',
      subItem: { name: "L'agriculture", response: "agriculture" }
    }, {
      id: 2,
      label: 'Services',
      subItem: { name: 'Le service', response: "service" }
    }, {
      id: 3,
      label: 'Industrie',
      subItem: { name: "L'Industrie", response: "industrie" }
    }, {
      id: 4,
      label: 'Bâtiment',
      subItem: { name: 'Le bâtiment', response: "bâtiment" }
    }, {
      id: 5,
      label: 'Média / Edition',
      subItem: { name: "Les Média et l'edition", response: "edition" }
    }, {
      id: 6,
      label: 'Transport',
      subItem: { name: 'Le transport', response: "transport" }
    }, {
      id: 7,
      label: 'Télécom',
      subItem: { name: 'Les télécoms', response: "télécom" }
    }, {
      id: 8,
      label: 'Ecologie',
      subItem: { name: "L'ecologie", response: "ecologie" }
    }, {
      id: 9,
      label: 'E-commerce',
      subItem: { name: "L'e-commerce", response: "e-commerce" }
    }];

    $scope.data = {
        sector:"",
        time:"",
        randd:"",
        ischief:"",
        isdigital:"",
        need:"",
        worried:"",
        algo:"",
        isproblem:"",

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
        $scope.data.email = response.data.email;
        $scope.data.fname = response.data.fname;
        $scope.data.lname = response.data.lname;
        $scope.data.company = response.data.company;
      });
    }


    $scope.sendForm = function(form){
        var keepData = angular.copy($scope.data);
        keepData.sector = angular.copy($scope.data.sector.response);
        $http.post('/postDiagnostic', keepData)
            .success(function(a,b){
                $state.go('nav.home');
                console.log(a,b);
            })
            .error(function(a,b){
                console.log(a,b);
            });
    };


  $scope.step = 1;
  $scope.maxStep = 1;
  $scope.totalStep = 8;

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
