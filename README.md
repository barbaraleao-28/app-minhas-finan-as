# Minhas Finanças

Aplicativo de controle de gastos pessoais em React Native, TypeScript e Expo SDK 57. Registre quanto gastou, escolha uma categoria e acompanhe o total em reais. Os lançamentos ficam salvos no aparelho com AsyncStorage.

# Aluno
Nome: Bárbara Leão
R.A: 126776

## Como executar

Você precisa de Node.js, npm, Git e uma versão do Expo Go compatível com o SDK 57. No PowerShell, execute:

```powershell
git clone https://github.com/barbaraleao-28/app-minhas-finan-as.git
cd app-minhas-finan-as
npm.cmd ci
npx.cmd expo start
```

Conecte o celular e o computador à mesma rede Wi-Fi e escaneie o QR Code no Expo Go. Se a rede bloquear a conexão, encerre o servidor com Ctrl+C e execute `npx.cmd expo start --tunnel`. Para abrir a versão web, pressione `w` no terminal do Expo.

## Como usar

1. Na tela **Minhas finanças**, toque em **Adicionar gasto**.
2. Digite a descrição, informe o valor (por exemplo, `12,50`) e selecione uma categoria. O formulário mostra um erro na tela se a descrição estiver vazia ou o valor for inválido.
3. Toque em **Salvar gasto**. O app volta à lista e atualiza o total. Valores acima de R$ 100,00 aparecem em laranja avermelhado.
4. Em um lançamento, toque em **Editar categoria** para reclassificá-lo ou em **Excluir** para removê-lo. As alterações continuam salvas quando você reabre o app.

## Interface original e redesign

O projeto inicia com as telas de `design/app/`. Elas usam o mesmo estado e a mesma chave de armazenamento das telas originais. Para experimentar a interface original, pare o servidor e execute no PowerShell:

```powershell
$env:FINANCAS_ORIGINAL = '1'
npx.cmd expo start --clear
```

Para voltar ao redesign, pare o servidor, remova a variável nessa mesma janela e reinicie:

```powershell
Remove-Item Env:FINANCAS_ORIGINAL
npx.cmd expo start --clear
```

## Organização do projeto

| Caminho | Conteúdo |
| --- | --- |
| `src/app/` | Telas e navegação originais |
| `src/gastos.tsx` | Estado compartilhado, categorias, cadastro, exclusão e persistência |
| `design/app/` | Telas de lista e cadastro do redesign |
| `design/interface.tsx` | Paleta, botões, seletor de categorias e formatação de valores |
| `app.config.js` | Seleção da interface usada pelo Expo Router |
