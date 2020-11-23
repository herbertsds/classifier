# Classifier

Classifier é uma API construída em Node.js para classificação e visualizar tickets de usuários. Construída a partir do case da NeoAssist.

## Índice

- [Motivação](#Motivação)
- [Instalação Manual](#Instalação&#32;Manual)
    - [Node.js 12.19.0 (LTS)](#Node.js)
    - [npm](#npm)
    - [MongoDB](#MongoDB)
    - [GIT](#GIT)
- [Utilização](#Utilização)
    - [Iniciando Servidor](#Iniciando&#32;Servidor)
    - [Endpoints](#Endpoints)
- [Serviços](#Serviços)
    - [Classificador](#Classificador)
    - [data_enhancer](#data_enhancer)
    - [Crowdsourcing](#Crowdsourcing)
    - [manipulateFile](#manipulateFile)
- [Considerações Finais](#Considerações&#32;Finais)

## Motivação

[voltar ao topo](#Índice)

A decisão de construir esta ferramenta em Node.js e MongoDB partiu da ideia de utilizar o case para aprender mais e colocar os conhecimentos a prova.

O desafio de construir um projeto funcional utilizando tecnologias das quais não tive oportunidade de trabalhar antes, embora já as tenha estudado, foi a principal motivação da escolha por Node.js e MongoDB.

## Instalação Manual

[voltar ao topo](#Índice)

### **Requisitos**

- [Node.js 12.19.0 (LTS)](#Node.js)
- [npm](#npm)
- [MongoDB](#MongoDB)
- [GIT](#GIT)

### Node.js

[voltar ao topo](#Índice)

A ferramenta foi desenvolvida utilizando a versão 12 LTS do Node. Versões diferentes (principalmente inferiores) podem ocasionar comportamentos inexperados.

Para verificar se já tem o Node.js instalado, pode-se verificar a versão com o seguinte comando no terminal:

```bash
node -v
# Exemplo de retorno caso o Node.js esteja instalado:
# $ v12.19.0
```

Para instalar o Node.js 12.x, siga [estes passos](https://nodejs.org/en/download/). No caso de uma distribuição Linux, se recomenda instalar o Node via [package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

[No caso de uma distribuição Debian ou Ubuntu](https://github.com/nodesource/distributions/blob/master/README.md), siga esses passos listados abaixo:

```bash
# Usando Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Usando Debian, as root
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```

### npm

[voltar ao topo](#Índice)

O npm é o gerenciador de pacotes do Node.js e é instalado junto com ele. Para verificar a instalação do npm, execute o seguinte comando no terminal:

```bash
node -v
# Exemplo de retorno caso o npm esteja instalado:
# $ 6.14.8
```

Caso não possua o npm instalado, reinstale o [Node.js](#Node.js)


### MongoDB

[voltar ao topo](#Índice)

Siga [estes passos](https://docs.mongodb.com/manual/installation/) para instalação do MongoDB. 

Essa instalação é mais complicada que as demais. 

Recomenda-se neste caso que se utilize a opção [dockerizada](https://hub.docker.com/_/mongo) do MongoDB.

### GIT

[voltar ao topo](#Índice)

Dependendo do sistema operacional utilizado, será necessário [instalar](https://git-scm.com/downloads) o GIT.

### **Configurando Aplicação**

- Download

O código da aplicação se encontra no [GitHub](https://github.com/herbertsds/classifier).

Para fazer o download, abra o terminal na pasta desejada e utilize um dos seguintes comandos:

```bash
#Via SSH
git clone git@github.com:herbertsds/classifier.git

#Via HTTPS
git clone https://github.com/herbertsds/classifier.git

#Via GitHub CLI
gh repo clone herbertsds/classifier
```
- Instalando dependências

Entre na pasta do projeto via terminal e execute o seguinte comando para instalar todas as dependências do projeto:

```
npm i
```

## Utilização

[voltar ao topo](#Índice)

### **Iniciando Servidor**

[voltar ao topo](#Índice)

Para que seja possível utilizar a API, é necessário antes iniciar o servidor. Para isso, na pasta do projeto, rode o seguinte comando:

```bash
npm run start
# Uma mensagem deverá aparecer:
# > O servidor está rodando na porta 3000
```

*OBS: Para rodar, é necessário que o MongoDB esteja rodando na porta padrão: 27017 e que a porta 3000 esteja livre para a execução do Node ou que uma variável de ambiente chamada port esteja definida com outro valor.*

### **Endpoints**

[voltar ao topo](#Índice)


| Tipo de Requisição | Endpoint | Descrição | Body |
|-----|-----|-----|-----|-----|
|POST|/tickets|Classifica os tickets utilizando o [serviço de classificação](#Classificador) e salva o resultado no banco e no json|**vazio:** Utiliza os tickets padrão. <br> <br> **json:** Utiliza os tickets recebidos via json. |


**Parâmetros**

*delete_before* 
- Descrição: deleta os arquivos existentes antes de adicionar os novos
- Valores possíveis: 
    - *nenhum valor suportado*
---
---
---


| Tipo de Requisição | Endpoint | Descrição | Body |
|---|---|---|---|---|
|GET|/tickets|Lista os tickets classificados. Caso não haja tickets classificados, utiliza os tickets padrão para rodar o [serviço de classificação](#Classificador) e salvar o resultado no banco e no json|*não aceita body* |
|

**Parâmetros**

*priority* 
- Descrição: **filtra** os tickets de acordo com a prioridade discretizada (Normal ou Alta). Para mais detalhes sobre a classificação, ver [serviço de classificação](#Classificador).
- Valores possíveis: 
    - normal
    - alta

*created_from* 
- Descrição: **filtra** os tickets, exibindo apenas tickets criados **a partir** da data especificada.
- Valores possíveis: 
    - Qualquer data no formato: YYYY-mm-dd
        - Os meses e/ou os dias são opcionais

*created_to* 
- Descrição: **filtra** os tickets, exibindo apenas tickets criados **até, no máximo,** a data especificada.
- Valores possíveis: 
    - Qualquer data no formato: YYYY-mm-dd
        - Os meses e/ou os dias são opcionais

*updated_from* 
- Descrição: **filtra** os tickets, exibindo apenas tickets atualizados **a partir** da data especificada.
- Valores possíveis: 
    - Qualquer data no formato: YYYY-mm-dd
        - Os meses e/ou os dias são opcionais


*updated_to* 
- Descrição: **filtra** os tickets, exibindo apenas tickets atualizados **até, no máximo,** a data especificada.
- Valores possíveis: 
    - Qualquer data no formato: YYYY-mm-dd
        - Os meses e/ou os dias são opcionais

*sort_by_priority* 
- Descrição: **ordena** os tickets de acordo com a prioridade discretizada (Normal ou Alta). Para mais detalhes sobre a classificação, ver [serviço de classificação](#Classificador).
- Valores possíveis: 
    - asc
        - Para ordenar de forma ascendente
    - desc
        - Para ordenar de forma descendente

*sort_by_score* 
- Descrição: **ordena** os tickets de acordo com a prioridade contínua. Para mais detalhes sobre a classificação, ver [serviço de classificação](#Classificador).
- Valores possíveis: 
    - asc
        - Para ordenar de forma ascendente
    - desc
        - Para ordenar de forma descendente


*sort_by_created* 
- Descrição: **ordena** os tickets de acordo com a data de criação.
- Valores possíveis: 
    - asc
        - Para ordenar de forma ascendente
    - desc
        - Para ordenar de forma descendente

*sort_by_updated* 
- Descrição: **ordena** os tickets de acordo com a data de atualização.
- Valores possíveis: 
    - asc
        - Para ordenar de forma ascendente
    - desc
        - Para ordenar de forma descendente



*limit* 
- Descrição: limita a quantidade de resultados retornados. Um dos parâmetros da **paginação**.
- Valores possíveis: 
    - Qualquer número inteiro positivo
- Exemplo: *limit=5* traz os cinco primeiros resultados


*skip* 
- Descrição: pula a quantidade de tickets definidos por *limit*. Um dos parâmetros da **paginação**.
- Valores possíveis: 
    - Qualquer número inteiro positivo
- Exemplo: *limit=5&skip=1* traz a segunda página de cinco resultados (pula os cinco primeiros resultados)


**OBS:** os parâmetros podem ser combinados.
- Exemplo: <br>*created_from=2017-12-31&updated_to=2018-01-05* 
    - filtrar resultados criados a partir de 31/12/2017 e atualizados até 05/01/2018

---
---
---



| Tipo de Requisição | Endpoint | Descrição | Body |
|---|---|---|---|---|
|POST|/suggest|Sugere novos valores de classificação das palavras. Para mais detalhes sobre sugestões, ver [serviço de crowdsourcing](#Crowdsourcing)|**json:** <br>```{ "palavra": int(valor) }``` <br> Pode ser enviado mais de uma palavra por requisição |
|

**Parâmetros**

*reclassify* 
- Descrição: reclassifica todos os tickets utilizando os novos valores de classificação. Para mais detalhes sobre sugestões, ver [serviço de crowdsourcing](#Crowdsourcing)
- Valores possíveis:
    - *nenhum valor suportado*

## Serviços

[voltar ao topo](#Índice)

### **Classificador**

[voltar ao topo](#Índice)

Diversos métodos de análise de sentimentos e classificação foram estudados para a construção do classificador utilizando [artigo científico brasileiro](https://link.springer.com/article/10.1007/s10462-020-09870-1) com o "estado da arte" sobre análise de sentimentos em língua portuguesa.

**Descrição do algoritmo**

- Análise de Sentimentos

O algoritmo de análise de sentimentos consiste em, a partir de uma base da palavras e sua classificação como negativa e positiva, determinar o quão positiva ou não é uma frase, comparando cada termo (token) com seu respectivo valor na base de dados.

O resultado é a soma de todos os valores. Quanto mais negativo for o resultado, mais negativa será uma frase. Para o classificador, essa polaridade foi invertida, portanto quanto mais positivo for uma frase, mais urgente é o ticket, indicando um cliente mais insatisfeito.

- Base de Palavras e Assertividade

Para garantir a assertividade do algoritmo, foram testadas algumas bases de palavras. [OpLexico](https​://www.inf.pucrs​.br/linat​ural/wordp​ress/recur​sos-e-ferra​menta​s/oplex​icon/) e [LIWC-PT](http://www.nilc.icmc.usp.br/portl​ex/index​.php/pt/proje​tos/liwc) presentes no [artigo](https://link.springer.com/article/10.1007/s10462-020-09870-1), uma base de dados [AFINN-111](https://github.com/aristeuroriz/sentiment-ptbr/blob/master/build/AFINN.json) utilizada em uma [biblioteca de análise de sentimentos em português](https://www.npmjs.com/package/sentiment-ptbr), e um base de dados [AFINN-165](http://www2.imm.dtu.dk/pubdb/pubs/6010-full.html) utilizada para análise de sentimentos em frases de língua inglesa, sendo esta traduzida ao português.

Testes preliminares mostraram que a base **AFINN-165 traduzida** mostrava melhores resultados. A base, em inglês, apresenta assertividade acima de 70% de acordo com a [biblioteca de análise de sentimentos que a utiliza](https://www.npmjs.com/package/sentiment). Para garantir que a versão traduzida também funcione com assertividade maior do que 70%, foram desenvolvidos dois serviços: [data_enhancer](#data_enhancer) e [crowdsourcing](#Crowdsourcing).

- Priority e Score

O algoritmo gera dois tipos de classificação. 

**Priority** é uma classificação discretizada. Se o "Customer" de um ticket não demonstra irritação (**Score** menor ou igual a zero) ou se é a primeira mensagem dele, é atribuído ao ticket uma classificação "Normal"

**Score** é uma classificação contínua. Para classificar um ticket, são consideradas todas as mensagens já enviadas pelo "Customer" com prioridade para as últimas mensagens e o tempo que o ticket se mantém aberto. É realizada a análise de sentimentos utilizando a base de dados AFINN-165 melhorada e atualizada via crowdsourcing como descritas em [data_enhancer](#data_enhancer) e [crowdsourcing](#Crowdsourcing). O resultado é calculado independente se a prioridade é Normal ou Alta, e as palavras consideradas com conotação positiva e negativa são adicionadas ao ticket para futura análise da multidão (poderia ser implementado uma espécie de recaptcha, por exemplo).

### **data_enhancer**

[voltar ao topo](#Índice)

Para garantir que a base de dados AFINN-165 tenha uma boa assertividade também em português, foi criado o serviço **data_enhancer**.

O serviço consiste em pegar a base AFINN-165 traduzida e, para cada palavra, capturar todas as palavras com o mesmo radical (stem) que estão em um [dicionário de palavras](https://github.com/pythonprobr/palavras/blob/master/palavras.txt), pegar todos os sinônimos da palavra e pegar todas as conjugações verbais no presente e pretérito perfeito se a palavra for um verbo para criar uma base de dados **AFINN-165 melhorada**.

O base resultante desse serviço é utilizada pelo serviço de classificação.

Para executar este serviço, é necessário parar a execução do servidor e rodar o seguinte comando no terminal:

```bash
npm run enhance
```

**OBS:**
- A biblioteca utilizada para retornar os sinônimos depende de internet e pode retornar dados de forma diferente em cada execução. Por isso, cada execução faz com que o **data_enhancer** gere uma base ligeiramente diferente. Idealmente esse serviço deve ser utilizado uma única vez antes de começar a utilizar a API de classificação. Essa base já foi gerada, mas uma nova execução do serviço gerará uma nova base.

### **Crowdsourcing**

[voltar ao topo](#Índice)

O serviço de crowdsourcing consiste em receber sugestões do usuário sobre a classificação de termos em português para aprimorar o valor sentimental de cada termo.

Cada termo recebido da multidão é colocado em um JSON que contém o valor total que aquele termo recebeu e quantas pessoas já opinaram sobre aquele termo. O valor sentimental da palavra é calculado através da média entre as sugestões e o valor atual da variável na base **AFINN-165 melhorada**, e o valor é, então, sobrescrito. Esta é uma forma de garantir, através de métodos de crowdsourcing, que a classificação seja melhorada conforme o tempo.

### **manipulateFile**

[voltar ao topo](#Índice)

Módulo responsável por ler e gravar arquivos TXT e JSON

## Considerações Finais

[voltar ao topo](#Índice)

Apesar de estarem em um único sistema monolítico, todos os serviços foram construídos de forma modular, para que fosse possível de forma rápida torná-los serviços independentes para implementação de uma arquitetura de microsserviços.