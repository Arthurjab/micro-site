var app = angular.module('app', ['ui.router', 'duScroll', 'duParallax']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('nav', {
            abstract: true,
            templateUrl: 'nav.html',
            controller: 'homeCtrl'
        })        
        .state('nav.home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .state('nav.faq', {
            url: '/faq',
            templateUrl: 'faq.html',
            controller: 'faqCtrl'
        })
        .state('nav.whoami', {
            url: '/whoami',
            templateUrl: 'whoami.html',
            controller: 'whoamiCtrl'
        })
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
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


        $scope.sendContact = function(form, $http){

            if ($scope.form.$valid)
            {
                contactButton.addClass('on');

                $http.post('control/sendMail', $scope.data)
                    .success(function(a,b){
                        el.addClass('win');
                        console.log(a,b);
                    })
                    .error(function(a,b){
                        el.addClass('fail');
                        console.log(a,b);
                    });
            }
        };

    });


app.controller('formCtrl', function ($scope, $timeout) {

    // le subitem est là pour aménager un peu la réponse 
    $scope.values = [{
      id: 1,
      label: 'Agriculture',
      subItem: { name: "L'agriculture" }
    }, {
      id: 2,
      label: 'Services',
      subItem: { name: 'Le service' }
    }, {
      id: 3,
      label: 'Industrie',
      subItem: { name: "L'Industrie" }
    }, {
      id: 4,
      label: 'Bâtiment',
      subItem: { name: 'Le bâtiment' }
    }, {
      id: 5,
      label: 'Média / Edition',
      subItem: { name: "Les Média et l'edition" }
    }, {
      id: 6,
      label: 'Transport',
      subItem: { name: 'Le transport' }
    }, {
      id: 7,
      label: 'Télécom',
      subItem: { name: 'Les télécoms' }
    }, {
      id: 8,
      label: 'Ecologie',
      subItem: { name: "L'ecologie" }
    }, {
      id: 9,
      label: 'E-commerce',
      subItem: { name: "L'e-commerce" }
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
        isproblem:""
    };

    $scope.sendForm = function(form, $http){

        $scope.data.sector = $scope.data.sector.name;
        console.log("c'est la fête !");
        // $http.post('control/sendMail', $scope.data)
        //     .success(function(a,b){
        //         el.addClass('win');
        //         console.log(a,b);
        //     })
        //     .error(function(a,b){
        //         el.addClass('fail');
        //         console.log(a,b);
        //     });

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
    console.log($scope.data);
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
