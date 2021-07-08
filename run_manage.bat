@echo off
REM mvn clean install
SET curpath=%CD%
cd %curpath%\manage\backend & start mvn spring-boot:run
REM cd %curpath%\apis\shared-api & start mvn spring-boot:run
cd %curpath%\cdn\file-server & start mvn spring-boot:run
cd %curpath%
