# Dockerfile — NGINX servindo um app estático (HTML/JS/CSS)
FROM nginx:1.27-alpine

# Define variável de ambiente para o diretório raiz do app
ENV APP=/usr/share/nginx/html/

# Define o diretório de trabalho
WORKDIR $APP


# Limpa a página padrão do NGINX
RUN rm -rf $APP/*

# Copia o app (HTML, JS, CSS, imagens, fontes, etc.) para a pasta pública
COPY . $APP

# Configuração do Nginx com stub_status
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Opcional: substitui a config padrão para habilitar cache estático leve e CORS de fontes
# Comente a linha abaixo caso não vá usar 'default.conf'
#COPY default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta do NGINX
EXPOSE 80

# O comando padrão do nginx já é definido pela imagem base

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]


#docker build -t agptidocker/app-assinatura:3.x .   <---versao
#docker run -d -p 8080:80 --name app-assinatura agptidocker/app-assinatura:3.1