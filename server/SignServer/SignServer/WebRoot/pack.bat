@echo off
cd WEB-INF
if exist "classes" rd /s /q classes
md classes
cd ..
cd ..
javac -d WebRoot\WEB-INF\classes -encoding utf-8 -sourcepath src src\com\alex\server\sign\*.java -cp WebRoot\WEB-INF\lib\servlet-api.jar;WebRoot\WEB-INF\lib\fastjson.jar;WebRoot\WEB-INF\lib\mysql.jar;
cd WebRoot
jar -cvf SignServer.war *
pause