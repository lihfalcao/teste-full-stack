# Usar a imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./ 

# Instalar dependências
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar o restante do código-fonte
COPY . .

# Expor a porta padrão do Angular
EXPOSE 4200

# Rodar a aplicação Angular no modo desenvolvimento com polling
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
