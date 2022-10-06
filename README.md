# ws-sender

desenvolvido em nodejs
lib utilizada: venom -> https://github.com/orkestral/venom

1 - executar "npm run dev" para subir a lib venom e o servidor na porta 5000
2 - ler o QRCode no console
3 - aguardar sincronizar
4 - enviar no body POST /send:
  numbers - array de string com os numeros do whatsapp
  message - string com a mensagem desejada
  delay: numero informando a quantidade de segundos que deseja aguardar até enviar a mensagem para o próximo número
