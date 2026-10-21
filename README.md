# Ace of Fades — React, Vite e Material UI

O agendamento usa uma API Node para mostrar horários disponíveis por serviço e barbeiro, salvar reservas e evitar conflitos de horário. As reservas locais ficam em `.data/bookings.json`.

## Rodar localmente
```sh
npm install
npm run dev
```

O servidor Vite inicia a interface e a API. A agenda inicial considera terça a sábado, das 9h às 18h; ajuste `SHOP_OPEN_TIME` e `SHOP_CLOSE_TIME` no ambiente para configurar o horário do salão. Domingo permanece somente por agendamento externo.

## Build de produção
```sh
npm run build
npm start
```

`npm start` serve o build e a API na mesma porta. Para manter reservas em produção, use um host Node com disco persistente. A aplicação React está em `src/`.
