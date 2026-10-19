package com.vikram.portfolio.config;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Configures the PostgreSQL DataSource by parsing the DATABASE_URL
 * environment variable provided by Voroa.
 *
 * Voroa provides a URL in the format:
 *   postgres://username:password@host:port/database
 *
 * This class converts it to:
 *   jdbc:postgresql://host:port/database
 * and extracts the username and password separately.
 */
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl == null || databaseUrl.isBlank()) {
            throw new IllegalStateException(
                "DATABASE_URL environment variable is not set. " +
                "Please set it to your Voroa PostgreSQL connection URL."
            );
        }

        try {
            URI uri = new URI(databaseUrl);

            String host = uri.getHost();
            int port = uri.getPort();
            String path = uri.getPath(); // e.g., "/dbname"
            String query = uri.getQuery(); // e.g., "sslmode=require"

            String jdbcUrl = "jdbc:postgresql://" + host
                    + (port > 0 ? ":" + port : "")
                    + path
                    + (query != null ? "?" + query : "");

            String userInfo = uri.getUserInfo(); // "username:password"
            String username = "";
            String password = "";

            if (userInfo != null) {
                String[] parts = userInfo.split(":", 2);
                username = parts[0];
                if (parts.length > 1) {
                    password = parts[1];
                }
            }

            return DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .username(username)
                    .password(password)
                    .driverClassName("org.postgresql.Driver")
                    .build();

        } catch (URISyntaxException e) {
            throw new IllegalStateException(
                "Invalid DATABASE_URL format: " + databaseUrl, e
            );
        }
    }
}
