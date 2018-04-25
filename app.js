(function(){
    'use strict';
    let success = false;
    let elem = new Array(11);
    let events = [];
    let c = 2;
    let opt = 1;
    let app = angular.module("myApp",[]);

    // Contents
    let overview_text = '', 
        organization_text = '',
        council_text = '',
        rupid_text = '',
        reoc_text = '',
        it_text = '',
        epo_text = '',
        aepo_text = '',
        codap_text = '',
        handog_text = '',
        alumni_text = '',
        public_text = '',
        linkage_text = '',
        industry_text = '';
    
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
        $scope.editUser_b = 'Edit';
        $scope.editName_b = 'Edit';
        $scope.editPass_b = 'Edit';
        
        function turncate(par){
            if(par.length > 350){
                par = par.substring(0,350) + ' . . . ';
            }
            return(par);
        }
        //FOR LOGIN

        $scope.showOpt = ()=>{
            (opt++ % 2 == 1) ? $('.q1').css('display','initial') : $('.q1').css('display','none');
        }

        $scope.showEdit = ()=>{
            opt = 1;
            $('#modalEdit').modal('show');
            $('.q1').css('display','none');
            
        }
        
        $scope.signin = function(){
            const formData = new FormData(document.forms.namedItem('login'));
            // console.log(...formData);
            $.ajax({
                url: './php/login.php',
                dataType: 'JSON',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    if(data.status == true){
                        success = true;
                        $scope.m_title = "Login Successful";
                        $scope.m_body = `Welcome ${data.username}!`;
                        $scope.username = data.username;
                        $scope.uname = data.uname;
                        $('.header').css('display','initial');                        
                        localStorage.setItem('username',data.username);
                        localStorage.setItem('uname',data.uname);
                        localStorage.setItem('pw',data.pass);
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
                console.log('asd');
                $scope.log = false;
                $scope.success = true;
                localStorage.setItem("success","true");
                $scope.nav_click(0);
                $(".bg-l").css('visibility','hidden');
            }
        }

        $scope.logout = function(){
            opt = 1;
            $('.q1').css('display','none')
            localStorage.clear();
            location.reload();
            $scope.nav_click(0);
        }
        
        // Rich Text Editor
        $scope.showEditor = (id,content) =>{
            const element = document.getElementById('editor');
            if(!element){
                $(id).after('<textarea ng-show="edit && success" id="editor" cols="100" rows="10" class="form-control"></textarea>');
                $("#editor").val(content);
                CKEDITOR.replace('editor');
            }
        }

        $scope.removeEditor = ()=>{
            const element = document.getElementById('editor');
            if(element){
                $('#editor, #cke_editor').remove();
            }            
        }

        $scope.editName_s = ()=>{
            $scope.editUser_c();
            $scope.editPass_c();

            let formData = new FormData();
            formData.append('username', $scope.uname);

            if($scope.editName){
                formData.append('section','uname');
                formData.append('uname', $('#uname').val());
                updateAccount('Name',formData);
                $scope.editName_c();
                $scope.username = $('#uname').val();
                localStorage.setItem('username', $('#uname').val());
            }else{
                $scope.editName = true;                
                $scope.editName_b = 'Save';
                $('#editName_b').addClass('disabled');
                $('#uname').val($('#editName').text());
            }
        }

        $scope.editName_c = ()=>{
            $scope.editName = false; 
            $scope.editName_b = 'Edit';
            $('#editName_b').removeClass('disabled');
        }

        $scope.editUser_s = ()=>{
            $scope.editName_c();
            $scope.editPass_c();
            
            
            let formData = new FormData();
            formData.append('username', $scope.uname);  

            if($scope.editUsername){
                formData.append('section','username');
                formData.append('user', $('#username').val());
                updateAccount('Username',formData);
                $scope.editUser_c();
                $scope.uname = $('#username').val();
                localStorage.setItem('uname', $('#username').val());                
            }else{
                $scope.editUsername = true;
                $scope.editUser_b = 'Save';
                $('#editUser_b').addClass('disabled');                
                $('#username').val($('#editUser').text());
            }
        }

        $scope.editUser_c = ()=>{
            $scope.editUsername = false; 
            $scope.editUser_b = 'Edit';
            $('#editUser_b').removeClass('disabled');
        }

        $scope.editPass_s = ()=>{
            $scope.editName_c();
            $scope.editUser_c();
            
            let formData = new FormData();
            formData.append('username', $scope.uname);  
            console.log(localStorage.getItem('pw'));
            if($scope.editPass){
                formData.append('section','password');
                formData.append('oldPass', localStorage.getItem('pw'));
                formData.append('coldPass', $('#oPassword').val());
                formData.append('newPass', $('#nPassword').val());
                formData.append('cPass', $('#cPassword').val());
                updateAccount('Password',formData);
            }else{
                $scope.editPass = true;
                $scope.editPass_b = 'Save';
                $('#editPass_b').addClass('disabled');   
                $('#changePass').css('display','block');
                $('#oPassword').val('');
                $('#nPassword').val('');
                $('#cPassword').val('');
            }
        }

        $scope.editPass_c = ()=>{
            $scope.editPass = false; 
            $scope.editPass_b = 'Edit';
            $('#editPass_b').removeClass('disabled');
            $('#changePass').css('display','none');                        
        }

        

        function updateAccount(section,formData){
            $.ajax({
                url: './php/updateAccount.php',
                dataType: 'JSON',
                data: formData,
                type: 'POST',
                processData: false,
                contentType: false,
                success: (data)=>{
                    if(data.success){
                        $scope.modal_h = 'Save Success';
                        $scope.modal_b = `${section} has successfuly edited!`;
                        if(data['pw']){ 
                            localStorage.setItem('pw', data['pw']);
                            $scope.editPass_c();
                        } 
                        $scope.$apply();
                        $('#mEdit').modal('show');
                    }else{
                        $scope.modal_h = 'Edit Failed';
                        $scope.modal_b = data.err;
                        $scope.$apply();
                        $('#mEdit').modal('show');
                    }
                },
                error: (a,b,c)=>{
                    console.log(`Error: ${a} ${b} ${c}`)
                }

            });
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


        // VALIDATION
        $('#oPassword').on('keyup',()=>{
            checkPwLength();            
        });

        $('#nPassword').on('keyup',()=>{
            checkPwLength();            
        });

        $('#cPassword').on('keyup',()=>{
            checkPwLength();
        });

        function checkPwLength(){
            if($('#oPassword').val().length > 4 && $('#nPassword').val().length > 4 && $('#cPassword').val().length > 4){
                $('#editPass_b').removeClass('disabled');
            }else{
                $('#editPass_b').addClass('disabled');
            }
        }

        $('#uname').on('keyup',()=>{
            if($scope.username.trim() == $('#uname').val().trim()){
                $('#editName_b').addClass('disabled');
            }else if($('#uname').val().length > 2){
                $('#editName_b').removeClass('disabled');
            }else if(!$('#uname').val().trim()){
                $('#editName_b').addClass('disabled');
            }else{
                $('#editName_b').addClass('disabled');
            }
        });

        $('#username').on('keyup',()=>{
            if($scope.uname.trim() == $('#username').val().trim()){
                $('#editUser_b').addClass('disabled');
            }else if($('#username').val().length > 3){
                $('#editUser_b').removeClass('disabled');
            }else if(!$('#username').val().trim()){
                $('#editUser_b').addClass('disabled');
            }else{
                $('#editUser_b').addClass('disabled');
            }
        });

        $("#inputdefault").on("keydown",(e)=>{
            if(e.keyCode == 13){
                $scope.signin();
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
        // document.getElementById('add1').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('organization-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add2').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('council-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add10').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('rupid-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add11').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('reoc-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add12').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('it-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add13').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('it-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add14').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('epo-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add15').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('aepo-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add16').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('handog-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add17').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('alumni-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add18').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('public-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add19').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('linkage-text','<center><img src="./img/'+f+'"></center>');
        // };
        // document.getElementById('add20').onchange = function () {
        //     var f = this.value.replace(/.*[\/\\]/, '');
        //     insertAtCaret('industry-text','<center><img src="./img/'+f+'"></center>');
        // };
        $scope.disp = function(){
            $scope.secret = 0;
            $scope.title = "";
            $scope.content = "";
            console.log(localStorage.getItem('success'));
            if(localStorage.getItem('success') == "true"){
                $scope.username = localStorage.getItem('username');
                $scope.uname = localStorage.getItem('uname');
                $('.header').css('display','initial');
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
            $scope.removeEditor();
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
                $scope.n_linkage = true;
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
        $scope.gay = function(section){
            $scope.edit = true;
            if(section == 'over'){
                $scope.showEditor('#overview-text',overview_text);
            }else if(section == 'org'){
                $scope.showEditor('#organization-text',organization_text);                
            }else if(section == 'council'){
                $scope.showEditor('#council-text',council_text);                                
            }else if(section == 'rupid'){
                $scope.showEditor('#rupid-text',rupid_text);                                
            }else if(section == 'reoc'){
                $scope.showEditor('#reoc-text',reoc_text);              
            }else if(section == 'it'){
                $scope.showEditor('#it-text',it_text);
            }else if(section == 'epo'){
                $scope.showEditor('#epo-text',epo_text);
            }else if(section == 'aepo'){
                $scope.showEditor('#aepo-text',aepo_text);
            }else if(section == 'codap'){
                $scope.showEditor('#codap-text',codap_text);
            }else if(section == 'handog'){
                $scope.showEditor('#handog-text',handog_text);
            }else if(section == 'alumni'){
                $scope.showEditor('#alumni-text',alumni_text);
            }else if(section == 'public'){
                $scope.showEditor('#public-text',public_text);
            }else if(section == 'linkage'){
                $scope.showEditor('#linkage-text',linkage_text);
            }else if(section == 'industry'){
                $scope.showEditor('#industry-text',industry_text);
            }
        };
        $scope.cancel_o = function(){
            $scope.edit = false;
            $scope.removeEditor();
        };

        // ====================================================        
        //                      SAVE FUNCTIONS
        // ====================================================

        $scope.save_o = function(){
            $scope.nav = 0;
            disableLoad('overview');
            let formData = new FormData();
            formData.append('textov',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveOver.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',0);                    
                    console.log("SUCCESS!");
                    $('#mama').remove();
                    $scope.cancel_o();
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
            let formData = new FormData();
            formData.append('textorg',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveOrg.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',1);                    
                    console.log("SUCCESS!");
                    $('#mama1').remove();
                    $scope.cancel_o();
                    load_org();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        };
        $scope.save_council = function(){
            $scope.nav = 2;            
            disableLoad('council');
            localStorage.setItem('nav',2);
            let formData = new FormData();
            formData.append('textcouncil',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveCouncil.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',2);                    
                    console.log("SUCCESS!");
                    $('#mama2').remove();
                    $scope.cancel_o();
                    load_council();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        };
        $scope.save_rupid = function(){
            $scope.nav = 10;            
            disableLoad('rupid');
            localStorage.setItem('nav',10);
            let formData = new FormData();
            formData.append('textrupid',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveRupid.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',10);                    
                    console.log("SUCCESS!");
                    $('#mama10').remove();
                    $scope.cancel_o();
                    load_rupid();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        };
        $scope.save_reoc = function(){
            $scope.nav = 11;            
            disableLoad('reoc');
            localStorage.setItem('nav',11);
            let formData = new FormData();
            formData.append('textreoc',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveReoc.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',11);                    
                    console.log("SUCCESS!");
                    $('#mama11').remove();
                    $scope.cancel_o();
                    load_reoc();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });
        };
        $scope.save_it = function(){
            $scope.nav = 12;            
            disableLoad('it');
            localStorage.setItem('nav',12);
            let formData = new FormData();
            formData.append('textit',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveIt.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',12);                    
                    console.log("SUCCESS!");
                    $('#mama12').remove();
                    $scope.cancel_o();
                    load_it();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });  
        };
        $scope.save_epo = function(){
            $scope.nav = 13;            
            disableLoad('epo');
            localStorage.setItem('nav',13);
            let formData = new FormData();
            formData.append('textepo',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveEpo.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',13);                    
                    console.log("SUCCESS!");
                    $('#mama13').remove();
                    $scope.cancel_o();
                    load_epo();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_aepo = function(){
            $scope.nav = 14;            
            disableLoad('aepo');
            localStorage.setItem('nav',14);
            let formData = new FormData();
            formData.append('textaepo',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveAepo.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',14);                    
                    console.log("SUCCESS!");
                    $('#mama14').remove();
                    $scope.cancel_o();
                    load_aepo();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_codap = function(){
            $scope.nav = 15;            
            disableLoad('codap');
            localStorage.setItem('nav',15);
            let formData = new FormData();
            formData.append('textcodap',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveCodap.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',15);                    
                    console.log("SUCCESS!");
                    $('#mama15').remove();
                    $scope.cancel_o();
                    load_codap();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_handog = function(){
            $scope.nav = 16;            
            disableLoad('handog');
            localStorage.setItem('nav',16);
            let formData = new FormData();
            formData.append('texthandog',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveHandog.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',16);                    
                    console.log("SUCCESS!");
                    $('#mama16').remove();
                    $scope.cancel_o();
                    load_handog();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_alumni = function(){
            $scope.nav = 17;            
            disableLoad('alumni');
            localStorage.setItem('nav',17);
            let formData = new FormData();
            formData.append('textalumni',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveAlumni.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',17);                    
                    console.log("SUCCESS!");
                    $('#mama17').remove();
                    $scope.cancel_o();
                    load_alumni();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_public = function(){
            $scope.nav = 18;            
            disableLoad('public');
            localStorage.setItem('nav',18);
            let formData = new FormData();
            formData.append('textpublic',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/savePublic.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',18);                    
                    console.log("SUCCESS!");
                    $('#mama18').remove();
                    $scope.cancel_o();
                    load_public();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_linkage = function(){
            $scope.nav = 19;            
            disableLoad('linkage');
            localStorage.setItem('nav',19);
            let formData = new FormData();
            formData.append('textlinkage',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveLinkage.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',19);                    
                    console.log("SUCCESS!");
                    $('#mama19').remove();
                    $scope.cancel_o();
                    load_linkage();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_industry = function(){
            $scope.nav = 20;            
            disableLoad('industry');
            localStorage.setItem('nav',20);
            let formData = new FormData();
            formData.append('textindustry',CKEDITOR.instances.editor.getData());
            $scope.edit = false;
            $.ajax({
                url: './php/saveIndustry.php',
                dataType: 'JSON',
                data: formData,  
                type: 'POST',
                contentType: false,
                processData: false,
                success: function(data){
                    $("#myModal").modal("show");                                
                    localStorage.setItem('nav',20);                    
                    console.log("SUCCESS!");
                    $('#mama20').remove();
                    $scope.cancel_o();
                    load_industry();
                },
                error: function(a,b,c){
                    console.log('Error: ' + a + " " + b + " " + c);
                }
            });   
        };
        $scope.save_event = function(){
            $scope.nav = 5;
            disableLoad('add-event');
            localStorage.setItem('nav',5);
            $("#myNews").modal("hide");      
            $("#myModal").modal("show");        
        };
        $scope.submit = function(){
            if ($scope.nav == 5){
                document.getElementById('add-event').submit();
                $scope.secret = 0;
                load_event();
            }
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
                    overview_text = data;
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
                    organization_text = data;
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
                    council_text = data;
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
                    rupid_text = data;
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
                    reoc_text = data;
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
                    it_text = data;
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
                    epo_text = data;
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
                    aepo_text = data;
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
                    codap_text = data;
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
                    handog_text = data;
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
                    alumni_text = data;
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
                    public_text = data;
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
                    linkage_text = data;
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
                    industry_text = data;
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