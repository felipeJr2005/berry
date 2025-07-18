# REGRAS DE PROCEDIMENTO - PROJETO

## CONTEXTO ESPECÍFICO OBRIGATÓRIO - LEIA PRIMEIRO
ANTES DE FAZER QUALQUER ALTERAÇÃO, CONSULTE:
- documentacao-berry.md - padrões técnicos deste projeto
- comandos-rapidos-file.md - templates e exemplos prontos

REGRA CRÍTICA: Use APENAS os padrões documentados. NUNCA invente código.

## PROCESSO OBRIGATÓRIO PARA ALTERAÇÕES

### ETAPA 1: MAPEAMENTO
- PRIMEIRO: Identificar TODAS as ocorrências que precisam ser alteradas
- Listar linha aproximada e conteúdo atual
- Aguardar confirmação antes de prosseguir

### ETAPA 2: EXECUÇÃO EM BLOCOS LÓGICOS
- **OBRIGATÓRIO:** Usar APENAS o comando `update`.
- **PRINCÍPIO DO AGRUPAMENTO:** Agrupar todas as alterações **simples e repetitivas** que respondem a um único pedido em **um único `update`**.
- **PRINCÍPIO DA SEPARAÇÃO:** Separar tarefas de **natureza fundamentalmente diferente** (ex: uma alteração de estilo e uma exclusão de arquivo) em `updates` distintos.
- **TRANSPARÊNCIA:** Antes de cada `update`, listar de forma consolidada as mudanças que serão feitas no bloco. Ex: `Alterando 5 ocorrências de 'amor' para 'respeito'`.

#### DEFINIÇÃO DE UM "BLOCO LÓGICO DE ALTERAÇÃO" (UM `UPDATE`)
- Um bloco lógico corresponde à solução completa de **uma instrução específica do usuário**.
- **DEVE-SE AGRUPAR:** Múltiplas ocorrências da mesma mudança (ex: alterar a mesma palavra 5 vezes, aplicar a mesma classe a 3 botões, mudar o tamanho da fonte em 10 lugares).
- **DEVE-SE SEPARAR:** Passos de um processo com naturezas diferentes (ex: Passo 1: Alterar textos. Passo 2: Deletar um componente. Passo 3: Adicionar um novo atributo).

#### EXEMPLOS PRÁTICOS DE EXECUÇÃO

**Cenário 1: Alterações Repetitivas**
- **Pedido do Usuário:** "Altere o texto das 5 palavras 'amor' para 'respeito' no arquivo `index.html`."
- **Execução CORRETA (O que fazer):**
    1. Mapear as 5 ocorrências.
    2. Executar **UM ÚNICO `update`** que modifica todas as 5 ocorrências de uma só vez.
- **Execução ERRADA (O que evitar):**
    - Executar 5 `updates` separados, um para cada palavra.

**Cenário 2: Tarefas Múltiplas e Distintas**
- **Pedido do Usuário:** "Primeiro, altere a cor de todos os títulos `<h2>` para azul. Depois, delete a seção com o ID `#contato-antigo`."
- **Execução CORRETA (O que fazer):**
    1. Mapear os títulos `<h2>`.
    2. Executar o **`update` 1** para alterar a cor de todos os títulos.
    3. Aguardar confirmação (se aplicável).
    4. Mapear a seção `#contato-antigo`.
    5. Executar o **`update` 2** para deletar a seção.

### ETAPA 3: VERIFICAÇÃO FINAL
- Listar TODAS as alterações feitas
- Confirmar que nenhuma foi esquecida
- Verificar consistência em elementos similares

## MÉTODO OBRIGATÓRIO

### UPDATES PONTUAIS SEMPRE:
- Usar APENAS comando "update"
- Uma alteração por vez, sistematicamente
- Transparência total do processo
- Controle completo sobre cada mudança

### VANTAGENS:
- Zero risco de esquecer alterações
- Usuário vê exatamente o que está sendo modificado
- Facilita correções e ajustes
- Preserva integridade do código original

## RESTRIÇÕES CRÍTICAS

### PRESERVAR SEMPRE:
- Funcionalidades existentes
- Sistemas de navegação e autenticação
- IDs e classes funcionais
- Estrutura de framework original
- Responsividade e compatibilidade

### NUNCA FAZER:
- Usar comando "create" para reescrever arquivos existentes
- Misturar tipos diferentes de alterações no mesmo update
- Alterar funcionalidades sem avisar
- Quebrar compatibilidade ou estrutura
- Modificar dados ou configurações críticas

## CHECKLIST FINAL OBRIGATÓRIO

- Todas as alterações solicitadas foram aplicadas?
- Elementos similares foram alterados consistentemente?
- Funcionalidades originais preservadas?
- Estrutura original mantida?
- Compatibilidade não foi quebrada?

RESPOSTA OBRIGATÓRIA AO FINALIZAR:
"VERIFICAÇÃO COMPLETA: X alterações feitas, Y elementos verificados, Consistência mantida"