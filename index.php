<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="./node_modules/angular/angular.min.js"></script> 
        <script src="./node_modules/jquery/dist/jquery.min.js"></script>  
        <link href="https://fonts.googleapis.com/css?family=Raleway|Roboto" rel="stylesheet">         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="css/mdb.css" />
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css" />              
        <link href="./css/style.css" rel="stylesheet">
        <script src="./app.js"></script>
    </head>
    <body ng-app="myApp" ng-controller="myCtrl" ng-init="disp()">
        
        <div ng-hide="log">
            <div id="backgroundd" class="bg-reds bgg"></div>
            <div class="container" style="margin-top: 20px;">
                <header style="height: 180px;">
                    <nav style="height: inherit; position: relative;">
                        <center>
                        <div class="logo">
                            <img src="./img/wmsuresel.png" alt="" width="100" height="100" style="margin-top: 0;display: inline-block">
                            <div style="display: inline-block; height: 150px; padding-top: 20px; color: #fff; margin-left: 10px; font-family: 'Raleway';">
                                <h2 style="margin-top: 10px;">Research, Extension Services and External Linkages</h2>
                                <h5 style="letter-spacing: 2px; margin-left: -50px;">WMSU RESEL</h5>
                                <!-- NOT SURE IF MIDDLE OR LEFT -->
                            </div>
                        </div>
                        </center>
                        <ul>
                            <li><a href="" id="nav0" ng-click="nav_click(0);">Overview</a></li>
                            <li><a href="" id="nav1" ng-click="nav_click(1);">Organizational Structure</a></li>
                            <li><a href="" id="nav2" ng-click="nav_click(2);">University Council</a></li>
                            <li id="esteya"><a href="" id="nav3" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">Offices <span class="caret"></span></a>
                            <ul class="dropdown-menu o1">
                                <li class="dropitlow drop1 rad"><a href="" class="dropdown-toggle" data-togle="dropdown" data-hover="dropdown">Research Development and Evaluation Center (RDEC)</a>
                                    <ul class="dropdown-menu o2">
                                        <li class="dropitlow rad"><a id="nav10" href="" ng-click="nav_click(10);">Research Utilization, Publication and Information Dissemination (RUPID)</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav11" href="" ng-click="nav_click(11);">Research Ethics Oversight Committee (REOC)</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav12" href="" ng-click="nav_click(12);">Intellectual Property Unit/Innovation and Technology Support Office</a></li>
                                    </ul>
                                </li>
                                <hr>
                                <li class="dropitlow drop2"><a href="" >Extension Services and Community Development (ESCD)</a>
                                    <ul class="dropdown-menu o3">
                                        <li class="dropitlow rad"><a id="nav13" href="" ng-click="nav_click(13);">Extension Non-Formal Education Course and Programs Office</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav14" href="" ng-click="nav_click(14);">Agricultural Education Outreach Program (AEOP)</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav15" href="" ng-click="nav_click(15);">Community Outreach and Development Advocacy Program (CODAP)</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav16" href="" ng-click="nav_click(16);">Hands of Goodwill (HANDOG) Volunteer Center</a></li>
                                    </ul>
                                </li>
                                <hr>
                                <li class="dropitlow drop3"><a href="" >External Linkages</a>
                                    <ul class="dropdown-menu o4">
                                        <li class="dropitlow rad"><a id="nav17" href="" ng-click="nav_click(17);">Office of Alumni Affairs</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav18" href="" ng-click="nav_click(18);">Career Placement and Public Employment Service Office</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav19" href="" ng-click="nav_click(19);">International Linkage Office</a></li>
                                        <hr>
                                        <li class="dropitlow"><a id="nav20" href="" ng-click="nav_click(20);">University-Industry Relations Office</a></li>
                                    </ul>
                                </li>
                            </ul>
                            </li>
                            <li><a href="http://wmsuojs.byethost3.com" id="nav4">WMSU Journal</a></li>
                            <li><a href="" id="nav5" ng-click="nav_click(5);">Research Events and Announcement</a></li>
                            <li ng-show="success"><button class="btn btn-danger" style="color: red; float: right; display: inline-block; background-color: #fff;" ng-click="logout();"><span class="glyphicon glyphicon-log-out"></span></button></li>
                        </ul> 
                    </nav>
                </header>

                <!-- Modal -->
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Save Success</h4>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="submit();">Ok</button>
                            </div>
                        </div>

                    </div>
                </div>  

                <!-- ADD ANNOUNCEMENT -->
                <div id="myNews" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">{{ what }} Announcement</h4>
                            </div>
                            <div class="modal-body">
                                <form action="./php/addEvent.php" class="form-group" method="POST" id="add-event" enctype="multipart/form-data">
                                    <input type="text" id="secret-id" name="secrets" class="form-control" ng-value='secret' style="display: none">
                                    <h4 style="margin: 15px 0;">Header Image</h4>
                                    <input type="file" name="image" id="add5" class="btn btn-default">
                                    <h4 style="margin: 15px 0;">Title</h4>
                                    <input type="text" ng-value='title' id="title-text" name="title" class="form-control">
                                    <h4 style="margin: 15px 0;">Content</h4>
                                    <textarea name="content" ng-value='content' id="content-text" class="form-control" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div class="modal-footer">
                                <input type="submit" class="btn btn-success" ng-click="save_event();" value="Save">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>    
                                </form>                            
                            </div>
                        </div>

                    </div>
                </div>  


                <!-- ===================================================
                                        OVERVIEW
                ===================================================-->
                <div class="c-container">
                <div class="overview" ng-hide="n_over">
                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        
                        <!-- Wrapper for slides -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <img src="./img/_DSC5027.JPG" alt="Los Angeles">
                            </div>
                        
                            <div class="item">
                                <img src="./img/_DSC4730.JPG" alt="Chicago">
                            </div>
                        
                            <div class="item">
                                <img src="./img/_DSC3918.JPG" alt="New York">
                            </div>
                        </div>
                        
                        <!-- Left and right controls -->
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <article>
                        <br><br>
                        <center>
                            <h1>Overview </h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="" id="overview">
                                <br> <br>   <br>   
                                <div id="par">
                                    <div id="hitme"></div>
                                </div> 
                                <textarea ng-show="edit && success" name="textov" id="overview-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="save_o()" name="ovsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                            ORGANIZATIONAL STRUCTURE
                ===================================================-->

                <div class="org-struct" ng-show="n_org" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Organizational Structure </h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <!-- <div class="photo-rect" ng-show="edit">
                                <div class="bg-stats"></div>
                            </div> -->
                            <form action="./php/saveOrg.php" method="POST" id="organization" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par1">
                                    <div id="hitme1"></div>
                                </div> 
                                <input type="file" name="image" id="add1" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add1').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textorg" id="organization-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="save_org()" name="orgsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

            <!-- ===================================================
                                UNIVERSITY COUNCIL
                ===================================================-->

                <div class="council" ng-show="n_council" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>University Council </h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <!-- <div class="photo-rect" ng-show="edit">
                                <div class="bg-stats"></div>
                            </div> -->
                            <form action="./php/saveCouncil.php" method="POST" id="council" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par2">
                                    <div id="hitme2"></div>
                                </div> 
                                <input type="file" name="image" id="add2" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add2').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textcouncil" id="council-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="save_council()" name="councilsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                **********************  OFFICES  **********************
                ===================================================-->


                <!-- ===================================================
                                            RUPID
                    ===================================================-->

                <div class="rupid" ng-show="n_rupid" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Research Utilization, Publication and Information Dissemination (RUPID)</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveRupid.php" method="POST" id="rupid" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par4">
                                    <div id="hitme10"></div>
                                </div> 
                                <input type="file" name="image" id="add10" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add10').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textrupid" id="rupid-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="save_rupid()" name="rupidsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            REOC
                    ===================================================-->

                    <div class="reoc" ng-show="n_reoc" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Research Ethics Oversight Committee (REOC)</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveReoc.php" method="POST" id="reoc" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par11">
                                    <div id="hitme11"></div>
                                </div> 
                                <input type="file" name="image" id="add11" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add11').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textreoc" id="reoc-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="save_reoc()" name="rupidsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            IT
                    ===================================================-->

                <div class="it" ng-show="n_it" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Intellectual Property Unit/Innovation and Technology Support Office</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveIt.php" method="POST" id="it" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par12">
                                    <div id="hitme12"></div>
                                </div> 
                                <input type="file" name="image" id="add12" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add12').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textit" id="it-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="it()" name="itsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>
                
                <!-- ===================================================
                                            EPO
                    ===================================================-->

                    <div class="epo" ng-show="n_epo" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Extension Non-Formal Education Course and Programs Office</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveEpo.php" method="POST" id="epo" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par13">
                                    <div id="hitme13"></div>
                                </div> 
                                <input type="file" name="image" id="add13" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add13').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textepo" id="epo-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="epo()" name="eposave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            AEPO
                    ===================================================-->

                <div class="aepo" ng-show="n_aepo" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Agricultural Education Outreach Program (AEOP)</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveAepo.php" method="POST" id="aepo" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par14">
                                    <div id="hitme14"></div>
                                </div> 
                                <input type="file" name="image" id="add14" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add14').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textaepo" id="aepo-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="aepo()" name="aeposave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            CODAP
                    ===================================================-->

                <div class="codap" ng-show="n_codap" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Community Outreach and Development Advocacy Program (CODAP)</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveCodap.php" method="POST" id="codap" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par15">
                                    <div id="hitme15"></div>
                                </div> 
                                <input type="file" name="image" id="add15" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add15').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textcodap" id="codap-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="codap()" name="codapsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            HANDOG
                    ===================================================-->

                <div class="handog" ng-show="n_handog" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Hands of Goodwill (HANDOG) Volunteer Center</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveHandog.php" method="POST" id="handog" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par16">
                                    <div id="hitme16"></div>
                                </div> 
                                <input type="file" name="image" id="add16" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add16').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="texthandog" id="handog-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="handog()" name="handogsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            ALUMNI
                    ===================================================-->

                <div class="alumni" ng-show="n_alumni" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Office of Alumni Affairs</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/saveAlumni.php" method="POST" id="alumni" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par17">
                                    <div id="hitme17"></div>
                                </div> 
                                <input type="file" name="image" id="add17" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add17').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textalumni" id="alumni-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="alumni()" name="alumnisave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            PUBLIC
                    ===================================================-->

                <div class="public" ng-show="n_public" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>Career Placement and Public Employment Service Office</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/savepPublic.php" method="POST" id="public" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par18">
                                    <div id="hitme18"></div>
                                </div> 
                                <input type="file" name="image" id="add18" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add18').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textpublic" id="public-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="public()" name="publicsave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            LINKAGE
                    ===================================================-->

                <div class="linkage" ng-show="n_linkage" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>International Linkage Office</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/savepLinkage.php" method="POST" id="linkage" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par19">
                                    <div id="hitme19"></div>
                                </div> 
                                <input type="file" name="image" id="add19" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add19').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textlinkage" id="linkage-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="linkage()" name="linkagesave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                                            INDUSTRY
                    ===================================================-->

                <div class="industry" ng-show="n_industry" style="margin-top: 10%;">
                    <article>
                        <center>
                            <h1>University-Industry Relations Office</h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span>
                            <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                            <form action="./php/savepIndustry.php" method="POST" id="industry" enctype="multipart/form-data">
                                <br> <br>   <br>   
                                <div id="par20">
                                    <div id="hitme20"></div>
                                </div> 
                                <input type="file" name="image" id="add20" class="btn btn-default" style="display: none;">
                                <button style="float: left;" type="button" ng-show="edit && success" class="btn btn-default" onclick="document.getElementById('add20').click();"><span class="glyphicon glyphicon-picture"></span> Add Photo</button>
                                <textarea ng-show="edit && success" name="textindustry" id="industry-text" cols="100" rows="10" class="form-control"></textarea>
                                <br>
                                <input ng-show="edit && success" class="btn btn-success"  ng-click="industry()" name="industrysave" type="submit" value="Save">
                                <button ng-show="edit && success" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                            </form>
                        </center>
                    </article>
                </div>

                <!-- ===================================================
                            RESEARCH EVENTS AND ANNOUNCEMENTS
                ===================================================-->

                <div class="event" ng-show="n_event" style="margin-top: 10%;">
                    <article>
                        
                        <h1 style="border-bottom: 3px solid #e6324b; padding-bottom: 20px;">Research Events and Announcements </h1><span ng-show="edit && success" style="color: #a4a4a4">(Edit)</span><br><br><br>
                        <button type="button" ng-show="success" class="btn btn-success" onclick="$('#myNews').modal('show');" ng-click="what = 'Add'; secret = 0;"><span class="glyphicon glyphicon-plus"></span> Add Announcement</button>
                        <br> <br>   <br>  <br> 
                        <div id='par5'>
                            <div id="hitme5"></div>
                        </div> 
                            <!-- <img src="./img/_DSC7065-5.jpg" alt="" height=110 width=110 style="float: left; margin: 0 10px 0 0; object-fit: cover; border: 1px solid #e6324b;">
                            <h3 style="margin-top: 0;">Civil Engineering Licensure Exam (Nov. 11 & 12 2017)</h3>
                            <h5 style="padding-top: 5px;">{{ turncate }}</h5> -->
                    </article>
                </div>

                 <!-- ===================================================
                                       VIEW ANNOUNCEMENT
                    ===================================================-->

                    <div class="viewEvent" ng-show="n_viewEvent" style="margin-top: 2%;">
                    <article style="text-align: justify;">
                        <center id="view-event">
                            <div id="suave"></div>
                            <h1>{{ a_title }}</h1>
                            <div style="background-color: #e6324b; margin-top: 40px; height: 5px; width: 60px;"></div>
                        </center>
                        <br> <br>   
                        <pre id='mama5' ng-hide='edit && success' style='line-height: 1.6em;'>{{ a_content }}</pre>
                    </article>
                </div>

            </div>
            </div>
            <footer>
                <!-- <div class="container-fluid"> -->
                <div class="row">
                    <!-- div.col-sm-3xamp -->
                    <div class="col-sm-1"></div>
                    <div class="col-sm-3">
                        <h4><b>Contact Information</b></h4>
                        <b>Research, Extension Services and External Linkages</b>
                        <p>Normal Road, Baliwasan, Zamboanga City, Philippines 7000</p>
                    </div>
                    <div class="col-sm-3">
                        <h4><b style="visibility: hidden;">Contact Information</b></h4>
                        <b>Office</b>
                        Telephone: +63 98 989-0821
                        Fax: +63 96 998-0123
                        Email: wmsuresel@wmsu.edu.ph
                    </div>
                    <div class="col-sm-3">
                        <h4><b>Links</b></h4>
                        <a href="">WMSU Website</a> <br>
                        <a href="">WMSU Journal</a>                    
                    </div>
                    <div class="col-sm-1"></div>                
                </div>
                </div>
            </footer>
        </div>
        <div class="login" ng-show="log">

            <!-- Modal FOR LOGIN -->
            <div id="myLogin" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">{{ m_title }}</h4>
                            </div>
                            <div class="modal-body">
                                <p>{{ m_body }}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="checkLogin();">Ok</button>
                            </div>
                        </div>

                    </div>
            </div>  



            <div class="bg-l"></div>
            <center>
                <form action="" class="form-group l-container" id="login">
                    <img src="./img/wmsuresel.png" alt="WMSU RESEL LOGO" width="150" style="display: block;"><br>
                    <label for="">Username</label><br>
                    <input type="text" name="user" class="form-control" type="text"><br>
                    <label for="">Password</label><br>
                    <input type="password" name="pass" class="form-control" id="inputdefault" type="text"><br>
                    <input type="submit" class="btn myred" value="Login" ng-click="login();"><br>
                    <input type="button" class="btn myred" value="Cancel" ng-click="log = false;">                    
                </form>
            </center>
        </div>

        <!--Modal: Edit From-->
 <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog cascading-modal" role="document">
        <!--Content-->
        <div class="modal-content">

                    <!--Header-->
                    <div class="modal-header light-blue darken-3 white-text">
                        <h4 class="title"><i class="fa fa-newspaper-o"></i> Edit Form</h4>
                        <button type="button" class="close waves-effect waves-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!--Body-->
            <form method="post" id="editEmpForm" enctype="multipart/form-data">

                    <div class="modal-body mb-0">

                    <div class="md-form form-sm">
                    <i class="fa fa-envelope prefix"></i>
                    <input type="text" ng-model="modusername" name="username" id="username" class="form-control">
                    <label for="efname" style="height:20px;">Username</label>
                </div>

                <div class="md-form form-sm">
                            <i class="fa fa-lock prefix"></i>
                            <input type="password" name="password" id="password" class="form-control" maxlength = "20" minlength = "6">
                            <label for="password" style="height:20px;">Password</label>
                </div>
        

                <div class="text-center mt-1-half">
                    <center><button class="btn btn-info mb-1" name="saveEdit" ng-click="accEdit();" >Save<i class="fa fa-check ml-1"></i></button></center>
                </div>

            </div>
        </div>
     </form>
        <!--/.Content-->
    </div>
  </div>
    <!--Modal: Edit From-->

      <script type="text/javascript" src="node_modules/mdb/jquery-3.2.1.min.js"></script>
	  <script type="text/javascript" src="node_modules/mdb/mdb.js"></script>
	  <script type="text/javascript" src="node_modules/mdb/bootstrap.js"></script>
	  <script type="text/javascript" src="node_modules/mdb/popper.min.js"></script>
    </body>
</html>