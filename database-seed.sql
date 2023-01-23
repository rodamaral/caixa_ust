--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4 (Debian 12.4-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: valid_coordinations; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.valid_coordinations AS ENUM (
    'Coordenação1',
    'Coordenação2',
    'Coordenação3'
);


ALTER TYPE public.valid_coordinations OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(255),
    description character varying(8192)
);


ALTER TABLE public.activity OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activities_id_seq OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activity.id;


--
-- Name: cell; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cell (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(255) NOT NULL,
    macrocell_id integer NOT NULL
);


ALTER TABLE public.cell OWNER TO postgres;

--
-- Name: cell_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cell_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cell_id_seq OWNER TO postgres;

--
-- Name: cell_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cell_id_seq OWNED BY public.cell.id;


--
-- Name: cell_macrocell_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cell_macrocell_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cell_macrocell_id_seq OWNER TO postgres;

--
-- Name: cell_macrocell_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cell_macrocell_id_seq OWNED BY public.cell.macrocell_id;


--
-- Name: macrocell; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.macrocell (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.macrocell OWNER TO postgres;

--
-- Name: macrocell_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.macrocell_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.macrocell_id_seq OWNER TO postgres;

--
-- Name: macrocell_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.macrocell_id_seq OWNED BY public.macrocell.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying(255) NOT NULL,
    sess json NOT NULL,
    expired timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: solicitation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitation (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    month character varying(255) NOT NULL,
    cell_id integer NOT NULL,
    activity_id integer NOT NULL,
    user_id integer NOT NULL,
    coordination public.valid_coordinations,
    ust double precision
);


ALTER TABLE public.solicitation OWNER TO postgres;

--
-- Name: solicitation_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitation_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitation_activity_id_seq OWNER TO postgres;

--
-- Name: solicitation_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitation_activity_id_seq OWNED BY public.solicitation.activity_id;


--
-- Name: solicitation_cell_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitation_cell_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitation_cell_id_seq OWNER TO postgres;

--
-- Name: solicitation_cell_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitation_cell_id_seq OWNED BY public.solicitation.cell_id;


--
-- Name: solicitation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitation_id_seq OWNER TO postgres;

--
-- Name: solicitation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitation_id_seq OWNED BY public.solicitation.id;


--
-- Name: solicitation_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitation_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitation_user_id_seq OWNER TO postgres;

--
-- Name: solicitation_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitation_user_id_seq OWNED BY public.solicitation.user_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(255) NOT NULL,
    password character(60) NOT NULL,
    permissions json DEFAULT '[]'::json NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: cell id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cell ALTER COLUMN id SET DEFAULT nextval('public.cell_id_seq'::regclass);


--
-- Name: cell macrocell_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cell ALTER COLUMN macrocell_id SET DEFAULT nextval('public.cell_macrocell_id_seq'::regclass);


--
-- Name: macrocell id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.macrocell ALTER COLUMN id SET DEFAULT nextval('public.macrocell_id_seq'::regclass);


--
-- Name: solicitation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation ALTER COLUMN id SET DEFAULT nextval('public.solicitation_id_seq'::regclass);


--
-- Name: solicitation cell_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation ALTER COLUMN cell_id SET DEFAULT nextval('public.solicitation_cell_id_seq'::regclass);


--
-- Name: solicitation activity_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation ALTER COLUMN activity_id SET DEFAULT nextval('public.solicitation_activity_id_seq'::regclass);


--
-- Name: solicitation user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation ALTER COLUMN user_id SET DEFAULT nextval('public.solicitation_user_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity (id, created_at, name, description) FROM stdin;
1	2023-01-23 07:04:22.986874	Processos e ferramentas de TI	Propor, Implementar, Manter, Atualizar, Validar, Documentar melhorias nos processos e ferramentas de gestão de serviços de TI preconizados pelo ITIL (implementados e/ou a implementar). a. Promover ações para aumento da eficiência e eficácia dos processos e execuções sob sua responsabilidade; b. Apresentar plano de ação de recuperação de qualidade; c. Adequar o funcionamento dos Hardware, Software, Ferramentas e Aplicações visando à compatibilidade e facilidade na utilização; d. Construir, manter, atualizar e customizar interfaces, consoles, filtros, macros, script e painéis dentre outros meios, que permitam o acompanhamento e gerenciamento dos serviços de TI prestados pela CAIXA; e. Participar/ atuar na definição dos critérios de acionamento e escalonamento de incidentes, serviços, problemas, mudanças e configurações.
2	2023-01-23 07:04:51.435114	Monitoração, acionamento e recuperação dos serviços	1. Realizar procedimentos de monitoração, acionamento e recuperação dos serviços conforme padrão e prazos definidos pela CAIXA. (DIURNO / NOTURNO/MADRUGADA/FINAL DE SEMANA) a. Acompanhar disponibilidade do ambiente computacional; b. Atuar de forma preventiva e proativa na detecção de falhas e solucionar ocorrências com tempestividade, visando à disponibilidade dos IC administrados; c. Comunicar tempestivamente à equipe CAIXA, quaisquer incidentes detectados, eventos, situações anormais identificadas e problemas relacionados a hardware, software e aplicação, bem como quaisquer dificuldades/problemas que venham sendo enfrentados com as unidades internas ou externas; d. Detectar/ Acionar/ Registrar incidentes conforme padrão definido pela CAIXA; e. Resolver incidentes de todos os servidores, produtos, bancos de dados, componentes, serviços ou sistemas, em quaisquer ambientes Computacionais da CAIXA sob sua responsabilidade, interagindo com uma ou mais equipes técnicas, promovendo o restabelecimento desses serviços e documentando a solução de contorno; f. Acompanhar resolução de incidentes pendentes para que as medidas corretivas sejam providenciadas tempestivamente; g. Apresentar controle de ocorrências e da disponibilidade dos ambientes computacionais da CAIXA; h. Atuar em conjunto com outras equipes no planejamento da instalação/ implantação/ alteração na infraestrutura de TI da CAIXA, realizando testes, avaliações e liberações referentes à sua área de atuação; i. Executar e documentar tarefas em ambiente sob sua responsabilidade conforme padrão e prazos definidos pela CAIXA; j. Abrir/ Registrar/ Acompanhar chamados técnicos junto às unidades internas e externas e/ou empresas, quando devidamente autorizado pela CAIXA, acompanhando todas as ações corretivas e as manutenções até o efetivo restabelecimento do serviço/ software/ hardware. k. Realizar atendimento de primeiro nível de Incidentes e Serviços;
3	2023-01-23 07:05:41.248796	Incidentes, Serviços, Mudanças ou Tarefas	2. Realizar atendimento de Incidentes, Serviços, Mudanças ou Tarefas conforme padrão e prazos definido pela CAIXA. (DIUNO/NOTURNO) a. Abrir, Validar, Tratar, Registrar, Encaminhar, Fechar registros de Incidentes, Serviços, Mudanças, Problemas ou Tarefas; b. Efetuar o gerenciamento dos Incidentes, Serviços, Mudanças, Problemas, conforme as melhores práticas preconizadas pelo ITIL; c. Atuar como ponto focal, coletar/enviar informações e acompanhar a solução dos Incidentes, Serviços, Mudanças, Problemas ou Tarefas junto ao responsável pelo serviço, sistema ou rotina, seja de área interna ou externa à sua unidade na ferramenta de gestão.; d. Atender as demandas provenientes dos clientes externos ou internos à, nos canais definidos pela CAIXA; e. Promover ações para a manutenção da conformidade dos processos sob sua responsabilidade; f. Realizar atendimento de primeiro nível nos processos sob sua responsabilidade; g. Executar as boas práticas da funcionalidade de Central de Serviços (SERVICE DESK) alinhadas aos processos de gerenciamento dos demais processos preconizados pelo ITIL. h. Atuar em todo o ciclo de vida da mudança, internalizar, evoluir e fechar o registro com o resultado da implantação, sendo o ponto focal entre as equipes técnicas. i. Acionar os envolvidos na mudança para resolução de dúvidas e validação das demandas. h. Garantir o cumprimento do prazo de atendimento das mudanças, i) Garantir a execução, a análise, o diagnóstico, a otimização, o acompanhamento e a programação de rotinas de processamento on-line, batch, e de scripts manuais ou automatizados das rotinas e sistemas da unidade, em periodicidades diversas, ou ainda, garantir a execução e o acompanhamento das tarefas de infraestrutura. j) Criar, manter, implementar e documentar rotinas de apoio aos processos em produção. l) Zelar pela disponibilidade das bases de dados nos horários previstos, e pelos horários e prazos programados das tarefas, rotinas, scripts e bases de dados, m) Atender e solucionar incidentes relativos à execução e programação de rotinas, scripts, tarefas, disponibilização de bases, acionando e acompanhando as equipes técnicas internas ou o fornecedor/fabricante quando necessário, n) Atender requisições de serviços relativos a execução, o acompanhamento, a análise, o diagnóstico, a otimização e a programação de rotinas de processamento on-line, batch e de scripts, em periodicidades diversas, ou ainda, garantir a execução e o acompanhamento de tarefas de infraestrutura, o) Realizar e manter o inventário/CMDB dos sistemas, rotinas ou tarefas da unidade, e manter dados atualizados acerca da execução das demandas da unidade
4	2023-01-23 07:05:41.248796	Documentação, manuais e procedimentos	4. Elaborar, manter, disponibilizar e disseminar documentação, manuais, procedimentos, processos e fluxos operacionais. a. Realizar repasse de conhecimento às equipes CAIXA / terceirizados; b. Preparar e ministrar apresentações relativas às suas atividades sempre que solicitado pela CAIXA; c. Exercitar/Simular contingências, com emissão de pareceres conclusivos quanto à necessidade de correções e aperfeiçoamentos, mantendo o Plano de Contingência sempre atualizado em seu âmbito de atuação. d. Operacionalizar as providências de contingência, em seu âmbito de atuação
5	2023-01-23 07:06:06.431331	Suporte e health check	Acionar suporte do fornecedor, providenciar a abertura de chamados técnicos, executar health check e coletar logs dos equipamentos dentro dos padrões especificados pelos fabricantes
6	2023-01-23 07:06:37.604461	Acompanhar provas de conceitos	Acompanhar e documentar provas de conceitos de novas tecnologias de mercado. Prospectar inovação nos processos, procedimentos e ferramentas de operações de TI. Definir e documentar padrões a serem seguidos para as soluções de operações de TI.  Automatizar a descoberta de padrões de tendência. Criar processo de detecção de anomalias.
7	2023-01-23 07:06:56.921747	Acompanhar provas de conceitos (Desenvolvimento)	Acompanhar e documentar provas de conceitos de novas tecnologias de mercado. Prospectar inovação nos processos, procedimentos e ferramentas de operações de TI. Definir e documentar padrões a serem seguidos para as soluções de operações de TI. Automatizar a descoberta de padrões de tendência. Criar processo de detecção de anomalias. (Desenvolvimento)
8	2023-01-23 07:07:58.883513	Acompanhar fornecedores	Acompanhar fornecedores no tratamento de chamados técnicos para verificação e/ou manutenção do ambiente e para aplicação de correções
9	2023-01-23 07:08:31.013629	Sistema operacional Windows	Analisar a integridade de configuração dos serviços em plataforma baixa (sistema operacional Windows). Produzir relatório com a análise de integridade da configuração dos serviços em plataforma baixa, com periodicidade e padrão definidos pela CAIXA. Produzir relatório com a análise de integridade da configuração de integração dos serviços em plataforma baixa, com outras soluções. Produzir relatórios de desempenho dos serviços em plataforma baixa. Produzir relatórios de capacidade dos serviços em plataforma baixa. Atualizar topologias e documentação dos serviços em plataforma baixa.
10	2023-01-23 07:08:47.01186	Sistema operacional Linux	Analisar a integridade de configuração dos serviços em plataforma baixa (sistema operacional Linux). Produzir relatório com a análise de integridade da configuração dos serviços em plataforma baixa, com periodicidade e padrão definidos pela CAIXA. Produzir relatório com a análise de integridade da configuração de integração dos serviços em plataforma baixa, com outras soluções. Produzir relatórios de desempenho dos serviços em plataforma baixa. Produzir relatórios de capacidade dos serviços em plataforma baixa. Atualizar topologias e documentação dos serviços em plataforma baixa.
11	2023-01-23 07:09:11.980423	Analise de dados	Analisar os dados de múltiplas fontes e arquitetar solução integrada de análise de dados
12	2023-01-23 07:09:33.119736	Apoiar as demais áreas da TI	Apoiar as demais areas da TI na utilização dos ambientes de auto serviço  e esteiras ágeis (Ambientes On premises e Nuvem)
\.


--
-- Data for Name: cell; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cell (id, created_at, name, macrocell_id) FROM stdin;
2	2023-01-23 07:51:54.246358	AUTOMAÇÃO DE INFRAESTRUTURA E SERVIÇOS DATACENTER	1
3	2023-01-23 07:52:15.15504	GERENCIAMENTO DA INFRA DE MONITORAÇÃO DATACENTER	2
4	2023-01-23 07:52:30.536184	ADMINISTRAÇÃO DE SERVIÇO DE REDE	3
5	2023-01-23 07:52:41.046572	REDE DATACENTER	3
\.


--
-- Data for Name: macrocell; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.macrocell (id, created_at, name) FROM stdin;
1	2023-01-23 07:50:51.949245	AUTOMAÇÃO
2	2023-01-23 07:51:06.495893	CENTRAL DE ATENDIMENTO E MONITORAÇÃO
3	2023-01-23 07:51:18.142876	REDE
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expired) FROM stdin;
pxVeEI6ApaNmRI9L3v_rtUuR_79f4IPI	{"cookie":{"originalMaxAge":600000,"expires":"2023-01-23T13:01:36.005Z","httpOnly":true,"path":"/"},"user":{"id":5,"name":"admin","password":"$2a$10$opdCxtTb.fBbYGoZ/V7sE.QnZefhPEHQqVgwugJKEfxmxVUE1g0JW","permissions":["relatorio","solicitacao","macrocelula"]}}	2023-01-23 14:40:54.697+00
\.


--
-- Data for Name: solicitation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitation (id, created_at, month, cell_id, activity_id, user_id, coordination, ust) FROM stdin;
1	2023-01-23 10:14:57.433149	Jan/2023	2	1	3	Coordenação3	123
4	2023-01-23 10:33:30.208037	Jan/2023	3	2	2	Coordenação1	80
7	2023-01-23 10:37:48.352152	Jan/2023	4	5	5	Coordenação1	78.45
8	2023-01-23 10:45:12.162093	Fev/2023	2	1	2	Coordenação3	50.32
9	2023-01-23 10:48:33.638617	Fev/2023	4	6	2	Coordenação1	55.88
10	2023-01-23 10:49:35.510135	Jan/2023	5	6	3	Coordenação2	44.7
11	2023-01-23 13:40:07.621054	Jan/2023	2	11	5	Coordenação1	80
12	2023-01-23 14:01:18.112474	Jan/2023	2	12	5	Coordenação2	104
13	2023-01-23 14:18:51.575947	Fev/2023	2	11	5	Coordenação1	235.2
14	2023-01-23 14:18:51.575947	Fev/2023	4	10	5	Coordenação2	117.6
15	2023-01-23 14:20:16.615888	Fev/2023	2	11	5	Coordenação1	235.2
16	2023-01-23 14:20:16.615888	Fev/2023	4	10	5	Coordenação2	117.6
17	2023-01-23 14:20:16.615888	Dez/2023	4	10	5	Coordenação2	486
18	2023-01-23 14:22:26.761484	Ago/2023	3	2	5	Coordenação3	56
19	2023-01-23 14:22:26.761484	Ago/2023	3	2	5	Coordenação3	32
20	2023-01-23 14:29:26.42042	Out/2023	2	2	5	Coordenação1	69
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, created_at, name, password, permissions) FROM stdin;
2	2023-01-23 06:12:12.914757	relator	$2a$10$hyeCcrBp9CEpffR.Hn9j/.GtCDVoFKkzZQ8O8kN4RNyE0dg/ovYI2	["relatorio"]
3	2023-01-23 06:13:22.380033	macrocelula	$2a$10$5TDP9MEkmBIdSmdpzy0kN.az2wIt2DT1yS4ZbB2V66GrTFU5OmV6i	["macrocelula"]
5	2023-01-23 06:14:26.837121	admin	$2a$10$opdCxtTb.fBbYGoZ/V7sE.QnZefhPEHQqVgwugJKEfxmxVUE1g0JW	["relatorio", "solicitacao", "macrocelula"]
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 12, true);


--
-- Name: cell_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cell_id_seq', 5, true);


--
-- Name: cell_macrocell_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cell_macrocell_id_seq', 1, false);


--
-- Name: macrocell_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.macrocell_id_seq', 3, true);


--
-- Name: solicitation_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitation_activity_id_seq', 1, false);


--
-- Name: solicitation_cell_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitation_cell_id_seq', 1, false);


--
-- Name: solicitation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitation_id_seq', 20, true);


--
-- Name: solicitation_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitation_user_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: activity activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: cell cell_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cell
    ADD CONSTRAINT cell_pkey PRIMARY KEY (id);


--
-- Name: macrocell macrocell_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.macrocell
    ADD CONSTRAINT macrocell_name_key UNIQUE (name);


--
-- Name: macrocell macrocell_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.macrocell
    ADD CONSTRAINT macrocell_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: solicitation solicitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation
    ADD CONSTRAINT solicitation_pkey PRIMARY KEY (id);


--
-- Name: user user_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_name_key UNIQUE (name);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: sessions_expired_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sessions_expired_index ON public.sessions USING btree (expired);


--
-- Name: cell cell_macrocell_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cell
    ADD CONSTRAINT cell_macrocell_id_fkey FOREIGN KEY (macrocell_id) REFERENCES public.macrocell(id);


--
-- Name: solicitation solicitation_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation
    ADD CONSTRAINT solicitation_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activity(id);


--
-- Name: solicitation solicitation_cell_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation
    ADD CONSTRAINT solicitation_cell_id_fkey FOREIGN KEY (cell_id) REFERENCES public.cell(id);


--
-- Name: solicitation solicitation_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitation
    ADD CONSTRAINT solicitation_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

