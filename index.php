<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="./node_modules/angular/angular.min.js"></script> 
        <script src="./node_modules/jquery/dist/jquery.min.js"></script>        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>              
        <link href="./css/style.css" rel="stylesheet">
        <script src="./app.js"></script>
    </head>
    <body ng-app="myApp" ng-controller="myCtrl" ng-init="disp()">
        <div class="bg-reds"></div>
        <div class="container" style="margin-top: 20px;">
            <header>
                <nav>
                    <div class="logo">
                        <img src="./img/wmsulogo.png" alt="" width="100" height="100">
                    </div>
                    <ul style="margin-top: 3%;">
                        <li><a href="">Overview</a></li>
                        <li><a href="">Organizational Structure</a></li>
                        <li><a href="">University Council</a></li>
                        <li><a href="">Offices</a></li>
                        <li><a href="">WMSU Journal</a></li>
                        <li><a href="">Research Events and Announcement</a></li>
                    </ul>
                </nav>
            </header>
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
                        <img src="./img/_DSC3918.JPG" alt="Los Angeles">
                    </div>
                
                    <div class="item">
                        <img src="./img/_DSC4730.JPG" alt="Chicago">
                    </div>
                
                    <div class="item">
                        <img src="./img/_DSC4751.JPG" alt="New York">
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
                    <h1>Overview </h1><span ng-show="edit" style="color: #a4a4a4">(Edit)</span>
                    <button class="btn btn-default ex" ng-click="gay()" ng-hide="edit"><span class="glyphicon glyphicon-pencil"></span> Edit</span></button>
                    <form action="" id="overview">
                        <br> <br>   <br>   
                        <div id="par">
                            <div id="hitme"></div>
                        </div> 
                        <textarea ng-show="edit" name="textov" id="overview-text" cols="100" rows="10" class="form-control"></textarea>
                        <br>
                        <input ng-show="edit" class="btn btn-success"  ng-click="save_o()" name="ovsave" type="submit" value="Save">
                        <button ng-show="edit" class="btn btn-default" ng-click="cancel_o()" type="button">Cancel</button>                    
                    </form>
                </center>
            </article>

        </div>
        <footer>
            <p style="text-align: center; letter-spacing: 20px;">Developed by <a href="">ISIS</a></p>
        </footer>
    </body>
</html>