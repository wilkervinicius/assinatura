#!/bin/sh

# Grava o nome do POD enviado pelo Kubernetes
echo "${POD_NAME}" > /usr/share/nginx/html/podname.txt

# Inicia o nginx (padrão da imagem)
nginx -g "daemon off;"
