(function(){
    'use strict';
    var app = angular.module("myApp",[]);
    app.controller('myCtrl', function($scope,$compile){
        $scope.edit = false;
        $scope.disp = load_o();
        $scope.save_o = function(){
            $('#overview').submit(()=>{
                return false;
            });
            var contents = $("#overview").serialize();
            $scope.edit = false;
            $.ajax({
                url: './php/saveOver.php',
                dataType: 'JSON',
                data: contents,  
                type: 'POST',
                cache: false,
                success: function(data){
                    console.log("SUCCESS!");
                    $('#mama').remove();
                    $scope.edit = false;
                    load_o();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        };
        $scope.gay = function(){
            $scope.edit = true;
        };
        $scope.cancel_o = function(){
            $scope.edit = false;
        };

        // FUNCTIONS
        function load_o(){
            $.ajax({
                url: './php/loadOver.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#overview-text').text(data);
                    $('#hitme').after($compile("<p id='mama' ng-hide='edit' style='line-height: 1.6em;'>&emsp;&emsp;&emsp;&emsp;&emsp;"+ data +"</p>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

    });
})();