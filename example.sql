create database science_srm;

create table users (
    id         VARCHAR(64)  NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    username   VARCHAR(32)  NOT NULL UNIQUE,
    email      VARCHAR(32)  NOT NULL,
    passwords  VARCHAR(64)  NOT NULL,
    created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) NOT NULL,
    deleted_at TIMESTAMP(3)
);