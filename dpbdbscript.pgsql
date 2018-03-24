CREATE DATABASE discordpowerbottest;
\c discordpowerbottest;
CREATE TABLE public.commands
(
    guildid numeric(20) NOT NULL,
    command text COLLATE pg_catalog."default" NOT NULL,
    type text NOT NULL,
    response jsonb NOT NULL,
    CONSTRAINT commands_guildid_command_key UNIQUE (guildid, command)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
CREATE SEQUENCE public.deleted_commands_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
CREATE TABLE public.deleted_commands
(
    guildid numeric(20) NOT NULL,
    command text COLLATE pg_catalog."default" NOT NULL,
    type text NOT NULL,
    response jsonb NOT NULL,
    id integer NOT NULL DEFAULT nextval('deleted_commands_id_seq'::regclass),
    CONSTRAINT deleted_commands_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;