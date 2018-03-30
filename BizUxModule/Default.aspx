<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BizUxModule.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>TypeScript HTML App</title>
    <link rel="stylesheet" href="app.css" type="text/css" />
    <script src="Scripts/jquery-1.7.2.min.js"></script>
    <script src="Scripts/knockout-min.js"></script>
    <script src="PageNavigation.js"></script>
    <script type="text/javascript">
        if (typeof Object.create === 'undefined') {
            Object.create = function (o) {
                function F() { }
                F.prototype = o;
                return new F();
            };
        }
        var cx, cr;
        cx = 0;
        var cy = 50;
        var begin = true;
        var ci = 1; var int; var cisrecede = false;
        int = window.setInterval(function () { curves() }, 1);
        function curves() {
            var hlx = document.getElementById("Helix");
            var hlxCtx = hlx.getContext("2d");
            hlxCtx.beginPath();
            hlxCtx.fillStyle = "white";
            hlxCtx.arc(cx, cy, 11, 0, 2 * Math.PI);
            hlxCtx.fill();
            hlxCtx.moveTo(cx, cy);
            cy = 50 * (Math.sin(cx * (Math.PI / 25)));
            cy = 50 - cy;
            hlxCtx.fill();
            if (cisrecede) { }
            else {
                hlxCtx.fillStyle = getRandomColor();
                hlxCtx.arc(cx, cy, 8, 0, 2 * Math.PI);
            }
            hlxCtx.fill();
            if (cx == 500 && !cisrecede) {
                hlxCtx.beginPath();
                hlxCtx.fillStyle = "white";
                hlxCtx.arc(cx, cy, 11, 0, 2 * Math.PI);
                hlxCtx.fill();
                cx = 0;
            }
            else if (cx == 500 && cisrecede) {

                cx = 0; cisrecede = false;
            }
            else cx += 1;
        }
        var x, r;
        x = 20;
        r = 20;
        var i = 1; var int; var isrecede = false;
        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


    </script>
</head>
<body>
    <h1>Sample Web Application</h1>
    <table id="tblWait">
        <tr>
            <td>
                <canvas id="Helix" width="500" height="100">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </td>            
        </tr>
    </table>
    <a href="Javascript:void();" onclick="DriverPage.Logout()">Logout</a>
    <div id="divBreadcrumb">
        <table>
            <tr data-bind="template: { name: 'breadcrumbTemplate', foreach: pgHistory }"></tr>
        </table>
    </div>
        <script type="text/html" id="breadcrumbTemplate">
            <td>
                <a href="Javascript:void();" data-bind="text: SubPagename, click: function (x) { DriverPage.LoadSubPage(x.SubPagename); }">>></a>
            </td>
        </script>

    <div id="divSubpage"></div>
</body>
</html>
