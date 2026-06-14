@REM Maven Wrapper for Windows
@echo off
set WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
set JAVA_EXE="java"

if defined JAVA_HOME (
    set JAVA_EXE="%JAVA_HOME%\bin\java.exe"
)

%JAVA_EXE% -jar %WRAPPER_JAR% %*
