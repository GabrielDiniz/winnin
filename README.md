# Desafio winnin

Para instalar a aplicação, configure o arquivo *./config/app.config.js*
Informe os dados de conexão com o banco de dados
Apos a configuração, execute o comando 

     npm run install

**Requisitos: mysql <= 5.7**

Para iniciar a aplicação execute 

    npm start
    
Caso queira apenas popular o banco de dados com os hot_posts do momento execute

    npm run fetch-job
    

Os endpoits para acessar a api sao:


### Endpoint 1

    /hot-posts/start-date/:startDate/end-date/:endDate/:order?

Onde as datas devem ser informadas no formato ISO e a ordem deve ser "ups" ou "comments"

Ex. 1: 

    /hot-posts/start-date/2020-02-03/end-date/2021-03-05/ups

Ex. 2: 

    /hot-posts/start-date/2020-09-01/end-date/2020-09-10/

### Endpoint 2

     /authors/order/:order
     
Onde a ordem pode ser "ups" ou "comments"

Ex.: 
    
    /authors/order/ups

