@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set MAVEN_PROJECTBASEDIR=%~dp0
set WRAPPER_PROPERTIES="%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.properties"

@REM Find java.exe
if defined JAVA_HOME (
    set "JAVACMD=%JAVA_HOME%\bin\java.exe"
) else (
    set "JAVACMD=java.exe"
)

@REM Parse Maven distribution URL from wrapper properties
for /f "usebackq tokens=1,* delims==" %%A in (%WRAPPER_PROPERTIES%) do (
    if "%%A"=="distributionUrl" set "DOWNLOAD_URL=%%B"
)

set "MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists"

@REM Check if Maven is already downloaded
if not exist "%MAVEN_HOME%\apache-maven-3.9.6\bin\mvn.cmd" (
    echo Downloading Maven...
    powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $url='%DOWNLOAD_URL%'; $out='%TEMP%\maven.zip'; Invoke-WebRequest -Uri $url -OutFile $out; Expand-Archive -Path $out -DestinationPath '%MAVEN_HOME%' -Force; Remove-Item $out}"
)

@REM Run Maven
"%MAVEN_HOME%\apache-maven-3.9.6\bin\mvn.cmd" %*
