(function(){
    'use strict';
    var success = false;
    var elem = new Array(11);
    var events = [];
    var c = 2;
    var app = angular.module("myApp",[]);
    
    app.controller('myCtrl', function($scope,$compile){

        //NAV RELATED
        for(var x = 0; x < elem.length; x++){
            var num = parseInt(10) + parseInt(x);  
            elem[x] = document.getElementById("nav" + num); 
        }

        $scope.log = false;
        $scope.success = false;
        $scope.edit = true;
        $scope.aclicked = false;
        
        function turncate(par){
            if(par.length > 350){
                par = par.substring(0,350) + ' . . . ';
            }
            return(par);
        }
        //FOR LOGIN
        
        $scope.login = function(){
            disableLoad("login");
            var contents = $("#login").serialize();
            console.log(contents);
            $.ajax({
                url: './php/login.php',
                dataType: 'JSON',
                type: 'POST',
                data: contents,
                success: function(data){
                    if(data == true){
                        success = true;
                        $scope.m_title = "Login Successful";
                        $scope.m_body = "Welcome Mr. Danrie Duarte!";
                        $scope.$apply();
                        $("#myLogin").modal("show"); 
                    }else{
                        success = false;                        
                        $scope.m_title = "Login Failed";
                        $scope.m_body = "Username / password is incorrect!";
                        $scope.$apply();
                        $("#myLogin").modal("show");
                    }
                },
                    error: function(a,b,c){
                        console.log("Error: " + a + " " + b + " " + c);
                    }
            });
        }

        $scope.checkLogin = function(){
            if(success){
                $scope.log = false;
                $scope.success = true;
                localStorage.setItem("success","true");
                $scope.nav_click(0);
                $(".bg-l").css('visibility','hidden');
            }
        }

        $scope.logout = function(){
            localStorage.clear();
            location.reload();
            $scope.nav_click(0);
        }

        $(window).on("keydown",function(e){
            if(e.ctrlKey && e.altKey && e.keyCode == 188){
                if(localStorage.getItem("success") != "true"){
                    $(".bg-l").css('visibility','visible');
                    $scope.log = true;
                    $scope.$apply();
                }
            }
        });

        $('#esteya').hover(function() {
                $('.o1').stop(true, true).fadeIn(500);
            }, function() {
                $('.o1').stop(true, true).fadeOut(200);
        });
        $('.drop1').hover(function() {
                $('.o2').stop(true, true).fadeIn(500);
            }, function() {
                $('.o2').stop(true, true).fadeOut(200);
        });
        $('.drop2').hover(function() {
                $('.o3').stop(true, true).fadeIn(500);
            }, function() {
                $('.o3').stop(true, true).fadeOut(200);
        });
        $('.drop3').hover(function() {
                $('.o4').stop(true, true).fadeIn(500);
            }, function() {
                $('.o4').stop(true, true).fadeOut(200);
        });
        document.getElementById('add1').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('organization-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add2').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('council-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add10').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('rupid-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add11').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('reoc-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add12').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('it-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add13').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('it-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add14').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('epo-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add15').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('aepo-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add16').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('handog-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add17').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('alumni-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add18').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('public-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add19').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('linkage-text','<center><img src="./img/'+f+'"></center>');
        };
        document.getElementById('add20').onchange = function () {
            var f = this.value.replace(/.*[\/\\]/, '');
            insertAtCaret('industry-text','<center><img src="./img/'+f+'"></center>');
        };
        $scope.disp = function(){
            $scope.secret = 0;
            $scope.title = "";
            $scope.content = "";
            console.log(localStorage.getItem('success'));
            if(localStorage.getItem('success') == "true"){
                $scope.edit = false;
                $scope.success = true;
            }
            load_industry();
            load_linkage();
            load_council();  
            load_alumni();
            load_handog();
            load_public();
            load_rupid(); 
            load_event();
            load_codap();
            load_aepo();
            load_reoc();
            load_org();     
            load_epo();
            load_it();
            load_o();
            if(localStorage.getItem('nav') == null)
                localStorage.setItem('nav',0);
            $scope.nav_click(localStorage.getItem('nav'));
            console.log(localStorage.getItem('nav'));
        };
        $scope.nav_click = function nav_click(nav){
            $scope.n_viewEvent = false;            
            $scope.n_industry = false;
            $scope.n_linkage = false;
            $scope.n_council = false;
            $scope.n_handog = false;
            $scope.n_public = false;  
            $scope.n_events = false;
            $scope.n_alumni = false;
            $scope.n_event = false;
            $scope.n_codap = false;
            $scope.n_rupid = false;
            $scope.n_aepo = false;
            $scope.n_reoc = false;
            $scope.n_over = false;
            $scope.n_epo = false;
            $scope.n_org = false;
            $scope.n_it = false;
            if(localStorage.getItem('success') == "true")
                $scope.edit = false; 
            $('#nav0, #nav1, #nav2, #nav3, #nav4, #nav5').removeClass('navs');
            $('#nav10, #nav11, #nav12, #nav13, #nav14, #nav15, #nav16, #nav17, #nav18, #nav19, #nav20').removeClass('sub-navs');            
            for(var x = 0; x < elem.length; x++)
                elem[x].style.color = "inherit";
                
            if(nav == 0){
                $('#nav0').addClass('navs');
                localStorage.setItem('nav',0);                
            }if(nav >= 10 && nav < 30){
                $('#nav3').addClass('navs');                
            }else if(nav == 1){
                $scope.n_over = true;
                $scope.n_org = true;
                $('#nav1').addClass('navs');
                localStorage.setItem('nav',1);                
            }else if(nav == 2){
                $scope.n_over = true;
                $scope.n_council = true;
                $('#nav2').addClass('navs');
                localStorage.setItem('nav',2);                
            }else if(nav == 5){
                $scope.n_over = true;
                $scope.n_event = true;
                $('#nav5').addClass('navs');   
                localStorage.setItem('nav',5);                
            }
            
            if(nav == 10){
                $scope.n_over = true;
                $scope.n_rupid = true;
                $('#nav3').addClass('navs');  
                $('#nav10').addClass('sub-navs');
                elem[0].style.color = "#e6324b";
                localStorage.setItem('nav',10);                
            }
            if(nav == 11){
                $scope.n_over = true;
                $scope.n_reoc = true;
                $('#nav3').addClass('navs');  
                $('#nav11').addClass('sub-navs');  
                elem[1].style.color = "#e6324b";                  
                localStorage.setItem('nav',11);                
            }
            if(nav == 12){
                $scope.n_over = true;
                $scope.n_it = true;
                $('#nav3').addClass('navs');  
                $('#nav12').addClass('sub-navs');                    
                elem[2].style.color = "#e6324b";
                localStorage.setItem('nav',12);                
            }
            if(nav == 13){
                $scope.n_over = true;
                $scope.n_epo = true;
                $('#nav3').addClass('navs');  
                $('#nav13').addClass('sub-navs');   
                elem[3].style.color = "#e6324b";                 
                localStorage.setItem('nav',13);                
            }
            if(nav == 14){
                $scope.n_over = true;
                $scope.n_aepo = true;
                $('#nav3').addClass('navs');  
                $('#nav14').addClass('sub-navs')
                elem[4].style.color = "#e6324b";;                    
                localStorage.setItem('nav',14);                
            }
            if(nav == 15){
                $scope.n_over = true;
                $scope.n_codap = true;
                $('#nav3').addClass('navs');  
                $('#nav15').addClass('sub-navs');    
                elem[5].style.color = "#e6324b";                
                localStorage.setItem('nav',15);                
            }
            if(nav == 16){
                $scope.n_over = true;
                $scope.n_handog = true;
                $('#nav3').addClass('navs');  
                $('#nav16').addClass('sub-navs'); 
                elem[6].style.color = "#e6324b";                   
                localStorage.setItem('nav',16);                
            }
            if(nav == 17){
                $scope.n_over = true;
                $scope.n_alumni = true;
                $('#nav3').addClass('navs');  
                $('#nav17').addClass('sub-navs');   
                elem[7].style.color = "#e6324b";                 
                localStorage.setItem('nav',17);                
            }
            if(nav == 18){
                $scope.n_over = true;
                $scope.n_public = true;
                $('#nav3').addClass('navs');  
                $('#nav18').addClass('sub-navs');    
                elem[8].style.color = "#e6324b";                
                localStorage.setItem('nav',18);                
            }
            if(nav == 19){
                $scope.n_over = true;
                $scope.n_public = true;
                $('#nav3').addClass('navs');  
                $('#nav19').addClass('sub-navs');  
                elem[9].style.color = "#e6324b";     
                localStorage.setItem('nav',19);                
            }
            if(nav == 20){
                $scope.n_over = true;
                $scope.n_industry = true;
                $('#nav3').addClass('navs');  
                $('#nav20').addClass('sub-navs');   
                elem[10].style.color = "#e6324b";                 
                localStorage.setItem('nav',20);                
            }
            // VIEW EVENT
            if(nav >= 30){
                $("#view-event").children('.hoyhoy').remove();
                $scope.n_over = true;
                $scope.n_viewEvent = true;
                $scope.a_title = events[nav].res_header;
                $scope.a_content = events[nav].res_text;
                if(events[nav] != null && events[nav] != "")
                    $("#suave").after($compile("<img class='hoyhoy' src='data:image/jpeg;base64,"+ events[nav].res_img +"' alt='' height=500 width='100%' style='box-shadow: 1px 1px 5px rgba(0,0,0,0.4); object-fit: cover;'>")($scope));
                $('#nav5').addClass('navs');   
                localStorage.setItem('nav',5);                
            }
        };

        //check if working
        $scope.gay = function(){
            $scope.edit = true;
            $("#overview-text").val($("#overview-text").text());
            $("#organization-text").val($("#organization-text").text());
            $("#council-text").val($("#council-text").text()); 
            $("#rupid-text").val($("#rupid-text").text());                                               
            $("#reoc-text").val($("#reoc-textmama11").text());                                                           
            $("#it-text").val($("#it-text").text()); 
            $("#epo-text").val($("#epo-text").text());     
            $("#aepo-text").val($("#aepo-text").text());
            $("#codap-text").val($("#codap-text").text());
            $("#handog-text").val($("#handog-text").text());
            $("#alumni-text").val($("#alumni-text").text());
            $("#public-text").val($("#public-text").text());
            $("#linkage-text").val($("#linkage-text").text());
            $("#industry-text").val($("#industry-text").text());
        };
        $scope.cancel_o = function(){
            $scope.edit = false;
        };

        // ====================================================        
        //                      SAVE FUNCTIONS
        // ====================================================

        $scope.save_o = function(){
            $scope.nav = 0;
            disableLoad('overview');
            var contents = $("#overview").serialize();
            $scope.edit = false;
            $.ajax({
                url: './php/saveOver.php',
                dataType: 'JSON',
                data: contents,  
                type: 'POST',
                cache: false,
                success: function(data){
                    localStorage.setItem('nav',0);                    
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
        $scope.save_org = function(){
            $scope.nav = 1;            
            disableLoad('organization');
            localStorage.setItem('nav',1);
            $("#myModal").modal("show");            
            // var contents = "textorg="+$("#organization-text").val()+"&image="+path_org+"&temp="+f;
            // console.log(contents);
            // $scope.edit = false;
            // $.ajax({
            //     url: './php/saveOrg.php',
            //     dataType: 'JSON',
            //     data: contents,  
            //     type: 'POST',
            //     cache: false,
            //     success: function(data){
            //         console.log("SUCCESS!");
            //         $('#mama1').remove();
            //         $scope.edit = false;
            //         load_org();
            //     },
            //     error: function(a,b,c){
            //         console.log('Error: ' + a + " " + b + " " + c);
            //     }
            // });
        };
        $scope.save_council = function(){
            $scope.nav = 2;            
            disableLoad('council');
            localStorage.setItem('nav',2);
            $("#myModal").modal("show");   
        };
        $scope.save_rupid = function(){
            $scope.nav = 10;            
            disableLoad('rupid');
            localStorage.setItem('nav',10);
            $("#myModal").modal("show");   
        };
        $scope.save_reoc = function(){
            $scope.nav = 11;            
            disableLoad('reoc');
            localStorage.setItem('nav',11);
            $("#myModal").modal("show");   
        };
        $scope.save_it = function(){
            $scope.nav = 12;            
            disableLoad('it');
            localStorage.setItem('nav',12);
            $("#myModal").modal("show");   
        };
        $scope.save_epo = function(){
            $scope.nav = 13;            
            disableLoad('epo');
            localStorage.setItem('nav',13);
            $("#myModal").modal("show");   
        };
        $scope.save_aepo = function(){
            $scope.nav = 14;            
            disableLoad('aepo');
            localStorage.setItem('nav',14);
            $("#myModal").modal("show");   
        };
        $scope.save_codap = function(){
            $scope.nav = 15;            
            disableLoad('codap');
            localStorage.setItem('nav',15);
            $("#myModal").modal("show");   
        };
        $scope.save_handog = function(){
            $scope.nav = 16;            
            disableLoad('handog');
            localStorage.setItem('nav',16);
            $("#myModal").modal("show");   
        };
        $scope.save_alumni = function(){
            $scope.nav = 17;            
            disableLoad('alumni');
            localStorage.setItem('nav',17);
            $("#myModal").modal("show");   
        };
        $scope.save_public = function(){
            $scope.nav = 18;            
            disableLoad('public');
            localStorage.setItem('nav',18);
            $("#myModal").modal("show");   
        };
        $scope.save_linkage = function(){
            $scope.nav = 19;            
            disableLoad('linkage');
            localStorage.setItem('nav',19);
            $("#myModal").modal("show");   
        };
        $scope.save_industry = function(){
            $scope.nav = 20;            
            disableLoad('industry');
            localStorage.setItem('nav',20);
            $("#myModal").modal("show");   
        };
        $scope.save_event = function(){
            $scope.nav = 5;
            disableLoad('add-event');
            localStorage.setItem('nav',5);
            $("#myNews").modal("hide");            
            $("#myModal").modal("show");   
        };
        $scope.submit = function(){
            if($scope.nav == 1)
                document.getElementById('organization').submit();
            else if ($scope.nav == 2)
                document.getElementById('council').submit();
            else if ($scope.nav == 4)
                document.getElementById('journal').submit();
            else if ($scope.nav == 5){
                document.getElementById('add-event').submit();
                $scope.secret = 0;
                load_event();
            }
            else if ($scope.nav == 10)
                document.getElementById('rupid').submit();
            else if ($scope.nav == 11)
                document.getElementById('reoc').submit();
            else if ($scope.nav == 12)
                document.getElementById('it').submit();
            else if ($scope.nav == 13)
                document.getElementById('epo').submit();
            else if ($scope.nav == 14)
                document.getElementById('aepo').submit();
            else if ($scope.nav == 15)
                document.getElementById('codap').submit();
            else if ($scope.nav == 16)
                document.getElementById('handog').submit();
            else if ($scope.nav == 17)
                document.getElementById('alumni').submit();
            else if ($scope.nav == 18)
                document.getElementById('public').submit();
            else if ($scope.nav == 19)
                document.getElementById('linkage').submit();
            else if ($scope.nav == 20)
                document.getElementById('industry').submit();
        }

        // ====================================================        
        //                      LOAD FUNCTIONS
        // ====================================================

        // LOAD OVERVIEW
        function load_o(){
            $.ajax({
                url: './php/loadOver.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#overview-text').text(data);
                    $('#hitme').after($compile("<pre id='mama' ng-hide='edit && success' style='text-align: left;line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD ORGANIZATIONAL STRUCTURE
        function load_org(){
            $.ajax({
                url: './php/loadOrg.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#organization-text').text(data);
                    $('#hitme1').after($compile("<pre id='mama1' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD UNIVERSITY COUNCIL
        function load_council(){
            $.ajax({
                url: './php/loadCouncil.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#council-text').text(data);
                    $('#hitme2').after($compile("<pre id='mama2' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

         // LOAD RUPID
         function load_rupid(){
            $.ajax({
                url: './php/loadRupid.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#rupid-text').text(data);
                    $('#hitme10').after($compile("<pre id='mama10' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD ROEC
        function load_reoc(){
            $.ajax({
                url: './php/loadReoc.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#roec-text').text(data);
                    $('#hitme11').after($compile("<pre id='mama11' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD IT
        function load_it(){
            $.ajax({
                url: './php/loadIt.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#it-text').text(data);
                    $('#hitme12').after($compile("<pre id='mama12' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD EPO
        function load_epo(){
            $.ajax({
                url: './php/loadEpo.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#epo-text').text(data);
                    $('#hitme13').after($compile("<pre id='mama13' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD AEPO
        function load_aepo(){
            $.ajax({
                url: './php/loadAepo.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#aepo-text').text(data);
                    $('#hitme14').after($compile("<pre id='mama14' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD CODAP
        function load_codap(){
            $.ajax({
                url: './php/loadCodap.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#codap-text').text(data);
                    $('#hitme15').after($compile("<pre id='mama15' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD HANDOG
        function load_handog(){
            $.ajax({
                url: './php/loadHandog.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#handog-text').text(data);
                    $('#hitme16').after($compile("<pre id='mama16' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD ALUMNI
        function load_alumni(){
            $.ajax({
                url: './php/loadAlumni.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#alumni-text').text(data);
                    $('#hitme17').after($compile("<pre id='mama17' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD PUBLIC
        function load_public(){
            $.ajax({
                url: './php/loadPublic.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#public-text').text(data);
                    $('#hitme18').after($compile("<pre id='mama18' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD LINKAGE
        function load_linkage(){
            $.ajax({
                url: './php/loadLinkage.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#linkage-text').text(data);
                    $('#hitme19').after($compile("<pre id='mama19' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD INDUSTRY
        function load_industry(){
            $.ajax({
                url: './php/loadIndustry.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    $('#industry-text').text(data);
                    $('#hitme20').after($compile("<pre id='mama20' ng-hide='edit && success' style='line-height: 1.6em;'>"+ data +"</pre>")($scope));
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        }

        // LOAD EVENTS
        function load_event(){
            $("#par5").children(".news").remove();
            events = [];
            $.ajax({
                url: './php/loadEvent.php',
                dataType: 'JSON',
                type: 'GET',
                cache: false,
                success: function(data){
                    for(var x = 0; x < data.length; x++){
                        var id = parseInt(30) + parseInt(x);
                        $('#hitme5').after($compile(
                            "<div class='o-news' style='position: relative;'>"+
                            "<center>"+
                            "<div class='news-action' ng-mouseleave='leave($event,0);' style='visibility: hidden; z-index: 2; background-color: transparent; padding-top: 45px; position: absolute; top:0;bottom:0;right:0;left:0;'>"+
                            "<span class='actionss glyphicon glyphicon-edit' ng-hide='aclicked' ng-click='editEvent("+ id +");' style='font-size: 2.2em; margin-right: 70px;'></span>"+
                            "<span class='actionss glyphicon glyphicon-trash' ng-hide='aclicked' ng-click='actionClicked($event);' style='font-size: 2.2em'></span>"+                            
                            "<h4 ng-show='aclicked' style='color: #fff; margin-top: -10px; margin-bottom: 15px;'>Are you sure you want to delete?</h4>"+
                            "<input ng-show='aclicked' type='submit' ng-click='deleteEvent("+ data[x].res_id +");' class='btn ask-event' value='Yes'>"+
                            "<button ng-show='aclicked' ng-click='backactions($event,1);' class='btn ask-event'>No</button>"+
                            "</div>"+
                            "</center>"+
                            "<div class='news' ng-mouseenter='come($event);' style='padding: 10px; margin-bottom: 10px; width: 100%; border-bottom: 1px solid #ccc; height: 135px;'>"+
                            "<img src='data:image/jpeg;base64,"+ data[x].res_img +"' alt='No Image' height=110 width=110 style='float: left; margin: 0 10px 0 0; object-fit: cover; border: 1px solid #e6324b;'>"+
                            "<h3 style='margin-top: 0;'>"+ data[x].res_header +"</h3>"+
                            "<h5 style='padding-top: 5px;'>"+ turncate(data[x].res_text) +" <a href='' class='read-more' ng-click='nav_click("+ id +");'><b>Read More</b></a></h5>"+
                            "</div>"+
                            "</div>"
                        )($scope));
                        events[id] = {
                            'res_id': data[x].res_id,
                            'res_img': data[x].res_img,
                            'res_header': data[x].res_header,
                            'res_text': data[x].res_text
                        };
                    }
                },
                error: function(a,b,c){
                    console.log("Error: " + a + " " + b + " " + c);
                }
            });
        }

        $scope.editEvent = function(id){
            $scope.secret = events[id].res_id;
            $scope.title = events[id].res_header;
            $scope.content = events[id].res_text;
            $scope.what = 'Edit';
            $("#myNews").modal('show');
        }

        $scope.actionClicked = function($event){
            var el = angular.element($event.currentTarget).parent();
            if(c % 2 == 0){
                $(el).css('background-color','#e6324b');
                $scope.aclicked = true;
            }else{
                $(el).css('background-color','transparent');   
                $scope.aclicked = false;             
            }
            c++;
        }

        $scope.hoverme = function($event){
            var el = angular.element($event.currentTarget);
            $(el).toggleClass('hoverme');
        }

        $scope.come = function($event){
            if($scope.success == true){
                var el = angular.element($event.currentTarget).parent().find('center').children('.news-action');
                $(el).css('visibility','visible');
                var news = angular.element($event.currentTarget);
                $(news).addClass('come');
            }
        }

        $scope.deleteEvent = function(id){
            console.log(id);
            $.ajax({
                url: './php/deleteEvent.php',
                dataType: 'JSON',
                type: 'POST',
                data: 'res_id=' + id,
                success: function(data){
                    console.log("Delete Success");
                    location.reload();
                },
                error: function(a,b,c){
                    console.log("Error: " + a + " " + b + " " + c);
                }
            });
        }

        $scope.leave = function($event){
            if($scope.success == true){
                $scope.backactions($event);
                var el = angular.element($event.currentTarget);
                $(el).css('visibility','hidden');
                var news = angular.element($event.currentTarget).parent().parent().children('.news');
                $(news).removeClass('come');
            }
        }

        $scope.hover_news = function(){
            console.log('hello world');
        }

        $scope.backactions = function($event,num){
            c = 2;
            var el;
            if(num == 1)
                el = angular.element($event.currentTarget).parent();
            else
                el = angular.element($event.currentTarget);                
            $(el).css('background-color', 'transparent');
            $scope.aclicked = false;
        }
        function disableLoad(id){
            $('#'+ id).submit(()=>{
                return false;
            });
        }
        function insertAtCaret(areaId, text) {
            var txtarea = document.getElementById(areaId);
            if (!txtarea) { return; }
    
            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false ) );
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                strPos = range.text.length;
            } else if (br == "ff") {
                strPos = txtarea.selectionStart;
            }
    
            var front = (txtarea.value).substring(0, strPos);
            var back = (txtarea.value).substring(strPos, txtarea.value.length);
            txtarea.value = front + text + back;
            strPos = strPos + text.length;
            if (br == "ie") {
                txtarea.focus();
                var ieRange = document.selection.createRange();
                ieRange.moveStart ('character', -txtarea.value.length);
                ieRange.moveStart ('character', strPos);
                ieRange.moveEnd ('character', 0);
                ieRange.select();
            } else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
            }
    
            txtarea.scrollTop = scrollPos;
        }
    });
})();