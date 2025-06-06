-- Elimina si ya existen
DROP TABLE IF EXISTS user_project;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS roles;

-- Crear tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES roles(id),
    administrador_id INTEGER
);

-- Crear tabla de proyectos
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    administrador_id INTEGER REFERENCES users(id)
);

-- Tabla intermedia para relación muchos-a-muchos
CREATE TABLE user_project (
    user_id INTEGER REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id),
    PRIMARY KEY (user_id, project_id)
);
