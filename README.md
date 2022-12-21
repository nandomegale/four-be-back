# ws-sender

desenvolvido em nodejs<br/>
lib utilizada: venom -> https://github.com/orkestral/venom<br/>
<br/>
1 - executar "npm run dev" para subir a lib venom e o servidor na porta 5000<br/>
2 - ler o QRCode no console<br/>
3 - aguardar sincronizar<br/>
4 - enviar no body POST /send:<br/>
  numbers - array de string com os numeros do whatsapp<br/>
  message - string com a mensagem desejada<br/>
  delay: numero informando a quantidade de segundos que deseja aguardar até enviar a mensagem para o próximo número<br/>
