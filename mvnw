#!/bin/sh
# ----------------------------------------------------------------------------
# Maven Wrapper startup script for Unix/Linux
# ----------------------------------------------------------------------------
set -e

MAVEN_PROJECTBASEDIR="$(cd "$(dirname "$0")" && pwd)"
WRAPPER_PROPERTIES="$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven-wrapper.properties"

# Find java
if [ -n "$JAVA_HOME" ]; then
    JAVACMD="$JAVA_HOME/bin/java"
else
    JAVACMD="java"
fi

# Parse distribution URL
DOWNLOAD_URL=$(grep "distributionUrl" "$WRAPPER_PROPERTIES" | cut -d'=' -f2-)

MAVEN_HOME="$HOME/.m2/wrapper/dists"

# Download Maven if not present
if [ ! -f "$MAVEN_HOME/apache-maven-3.9.6/bin/mvn" ]; then
    echo "Downloading Maven..."
    mkdir -p "$MAVEN_HOME"
    TMPFILE="$(mktemp /tmp/maven-XXXXXX.zip)"
    if command -v curl > /dev/null 2>&1; then
        curl -sSL -o "$TMPFILE" "$DOWNLOAD_URL"
    elif command -v wget > /dev/null 2>&1; then
        wget -q -O "$TMPFILE" "$DOWNLOAD_URL"
    else
        echo "Error: Neither curl nor wget found. Cannot download Maven." >&2
        exit 1
    fi
    unzip -q -o "$TMPFILE" -d "$MAVEN_HOME"
    rm -f "$TMPFILE"
fi

# Run Maven
exec "$MAVEN_HOME/apache-maven-3.9.6/bin/mvn" "$@"
