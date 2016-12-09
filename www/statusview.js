// Dropdown boxes
var host = window.location.hostname;
var server = [
  {name:'Host', url:'http://' + host, speed_api:'', code:'host', fold:false},
]

var code2server = {}

for (var key in server) {
  code2server[server[key].code] = server[key]
}

var app = angular.module('servertool', []);
app.controller("serverCtrl", function($scope) {
  $scope.servers = server;
});

var no = 0

function waitAndQuery() {
  sp_query(server[no].code)
  if (++no >= server.length) {
    no = 0
  }
  setTimeout(waitAndQuery, 2000)
}

$(document).ready(function () {
  waitAndQuery()
})
