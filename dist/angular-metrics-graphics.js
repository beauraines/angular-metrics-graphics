/* global MG */
/* jshint camelcase:false, unused:false */
'use strict';

/**
 * MetricsGraphics
 * This directive is based on tassekatt's Stackoverflow post
 * @see http://stackoverflow.com/questions/27252464/how-to-bind-graphicsmetrics-jquery-plugin-in-angular-app
 *
 * @param {Array} data Chart data
 * @param {Object} options Chart configuration
 */

var ngMG = angular.module('metricsgraphics', []);

ngMG.directive('chart', function() {
  return {
    link: function(scope, element) {
      // default options
      var options = {
        baselines: [], // [{value: 160000000, label: 'a baseline'}];
        description: null,
        height: 200,
        right: 0,
        title: null,
        width: element[0].parentElement.clientWidth || 300,
        x_accessor: null,
        y_accessor: null
      };
      // override default options with values from the scope
      if (scope.options) {
        Object.keys(scope.options).forEach(function(key) {
          options[key] = scope.options[key];
        });
      }
      // create a random identifier for the chart element
      // TODO replace this with a template that has a unique id
      function randomString(len) {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var s = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          s += charSet.substring(randomPoz,randomPoz+1);
        }
        return 'mg-chart-' + s;
      }
      element[0].id = element[0].id ? element[0].id : randomString(5);
      // set the data and target configuration options
      options.target = '#' + element[0].id;
      // create the chart
      scope.$watch('data', function(){
        options.data = scope.data || [];
        MG.data_graphic(options);
      },true);      
    },
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    }
  };
});

ngMG.directive('chartTimeSeries', function() {
  return {
    link: function(scope, element) {
      // default options
      var options = {
        baselines: [], // [{value: 160000000, label: 'a baseline'}];
        description: null,
        height: 200,
        right: 0,
        title: null,
        width: element[0].parentElement.clientWidth || 300,
        x_accessor: null,
        y_accessor: null
      };
      // override default options with values from the scope
      if (scope.options) {
        Object.keys(scope.options).forEach(function(key) {
          options[key] = scope.options[key];
        });
      }
      // create a random identifier for the chart element
      // TODO replace this with a template that has a unique id
      function randomString(len) {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var s = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          s += charSet.substring(randomPoz,randomPoz+1);
        }
        return 'mg-chart-' + s;
      }
      element[0].id = element[0].id ? element[0].id : randomString(5);
      // set the data and target configuration options
      options.target = '#' + element[0].id;
      // create the chart
      scope.$watch('data', function(){

        //Convert date strings to dates
        for (var i = 0; i < scope.data.length; i++) {
          if (typeof(scope.data[i][1].date) == 'string') {
            scope.data[i] = MG.convert.date(scope.data[i], 'date');
          }
        }

      // override default options with values from the scope
      if (scope.options) {
        Object.keys(scope.options).forEach(function(key) {
          options[key] = scope.options[key];
        });
      }

        options.data = scope.data || [];
        MG.data_graphic(options);
      },true);      
    },
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    }
  };
});
