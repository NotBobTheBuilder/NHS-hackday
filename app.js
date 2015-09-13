var appointment = angular.module('appointment', ['ngRoute']);

appointment.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/prepare', {
      templateUrl: 'templates/prepare.html',
      controller: 'PrepareCtrl'
    })
    .when('/appointments/:condition', {
      templateUrl: 'templates/consultation.html',
      controller: 'ConsultationCtrl'
    })
    .when('/appointments', {
      templateUrl: 'templates/appointments.html',
      controller: 'AppointmentsCtrl'
    })
    .when('/conditions', {
      templateUrl: 'templates/conditions.html',
      controller: 'ConditionsCtrl'
    })
    .when('/condition', {
      templateUrl: 'templates/condition.html',
      controller: 'ConditionCtrl'
    })
    .when('/concern', {
      templateUrl: 'templates/concern.html',
      controller: 'ConcernCtrl'
    })
    .when('/concerns', {
      templateUrl: 'templates/concerns.html',
      controller: 'ConcernsCtrl'
    })
    .when('/expectations', {
      templateUrl: 'templates/expectations.html',
      controller: 'ExpectationsCtrl'
    })
    .when('/expectation', {
      templateUrl: 'templates/expectation.html',
      controller: 'ExpectationCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

appointment.factory('Appointment', function ($window) {
  function save(data) {
    $window.localStorage.data = angular.toJson(data);
  }

  function empty () {
    return {
      expectations: [],
      conditions: [],
      concerns: {
        'patient': [],
        'doctor': []
      }
    }
  }

  return {
    save: save,
    get: function() {
      if (!$window.localStorage.data) {
        save(empty())
      }
      return angular.fromJson($window.localStorage.data);
    },
    empty: empty,
    demo: function() {
      return {
        'condition': 'Diabetes',
        'doctor': 'Dr Jones',
        'date': new Date(),
        'conditions': [{
          name: 'Diabetes',
          duration: '2 Years'
        }],
        'concerns': {
          'doctor': [{
            'because': 'high blood pressure',
            'discuss': 'something'
          }],
          'patient': [{
            'because': 'itchy foot',
            'discuss': 'foot cream'
          }]
        }
      };
    }
  }
});

appointment.controller('HomeCtrl', function($scope) {

})

appointment.controller('ConsultationCtrl', function($scope, Appointment) {
  $scope.app = Appointment.get();
  $scope.save = Appointment.save;
});

appointment.controller('PrepareCtrl', function($scope, $location, Appointment) {
  $scope.conditionsInSpec = function(specialism) {
    return {
      'haematology': ['blood disease a', 'blood disease b']
    }[specialism];
  }
  $scope.app = Appointment.empty();
  $scope.save = function(appointment) {
    Appointment.save(appointment);
    $location.path('/');
  };
});

appointment.controller('ConsultationCtrl', function($scope, $routeParams, Appointment) {
  $scope.app = Appointment.get();
  $scope.condition = $scope.app.conditions.filter(function(c) { return c.name == $routeParams.condition;})[0];
  $scope.conditionConcerns = function() {
    return $scope.app.concerns.patient.filter(function(c) {
      return c.condition == $routeParams.condition || c.condition == "";
    })
  }
});

appointment.controller('AppointmentsCtrl', function($scope, Appointment) {
  $scope.app = Appointment.get();
});

appointment.controller('ConditionsCtrl', function($scope, Appointment) {
  $scope.app = Appointment.get();
});

appointment.controller('ConditionCtrl', function($scope, $location, Appointment) {
  function save(condition) {
    var appt = Appointment.get();
    appt.conditions.push(condition);
    Appointment.save(appt);
  }
  $scope.saveAndAnother = function (condition) {
    save(condition);
    alert('saved');
    $scope.concern = {};
  };

  $scope.saveAndConditions = function (condition) {
    save(condition);
    $location.path('/conditions');
  };
});

appointment.controller('ConcernsCtrl', function($scope, Appointment) {
  $scope.app = Appointment.get();
});

appointment.controller('ConcernCtrl', function($scope, $location, Appointment) {
  $scope.app = Appointment.get();
  function save(condition) {
    var appt = Appointment.get();
    appt.concerns.patient.push(condition);
    Appointment.save(appt);
  }
  $scope.saveAndAnother = function (condition) {
    save(condition);
    alert('saved');
    $scope.concern = {};
  };

  $scope.saveAndExpectation = function (condition) {
    save(condition);
    alert('saved');
    $location.path('/expectation');
  };

  $scope.saveAndConcern = function (condition) {
    save(condition);
    $location.path('/concerns');
  };
});


appointment.controller('ExpectationsCtrl', function($scope, Appointment) {
  $scope.app = Appointment.get();
});

appointment.controller('ExpectationCtrl', function($scope, $location, Appointment) {
  $scope.app = Appointment.get();
  function save(expectation) {
    var appt = Appointment.get();
    appt.expectations.push(expectation);
    Appointment.save(appt);
  }
  $scope.saveAndAnother = function (expectation) {
    save(expectation);
    alert('saved');
    $scope.concern = {};
  };

  $scope.saveAndExpectations = function (expectation) {
    save(expectation);
    $location.path('/expectations');
  };
});
