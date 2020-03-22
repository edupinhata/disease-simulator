# Simulador de doenças

![images/screen-shot-0.01.png]()

## Introdução

Este é um projeto que iniciou como um estudo de programação em Javascript. A ideia surgiu quando eu vi o arquivo ("Why outbreaks like coronavirus spread exponentially, and hot to flatten the curve")[https://www.washingtonpost.com/graphics/2020/world/corona-simulator/]. Achei legal a simulação mas gostaria de fazer algumas mudanças no comportamento das pessoas. Então resolvi programar minha versão deste projeto.

## Execução

Para executar este projeto, copie-o para um diretório em seu computador e abra o index.html em um navegador.

Este projeto também está disponível no github sites através do link: http://edupinhata.github.io/disease-simulator/.



## Releases

| Release  | Descrição                                                    |
| -------- | ------------------------------------------------------------ |
| **0.01** | a simulação é composta por pessoas que andam em direções aleatórias, com uma velocidade variável limitada a uma velocidade máxima. A webpage irá mostrar as pessoas se movimentando divididas em três grupos identificados por cores diferentes: branco para pessoas saudáveis, rosa para pessoas doentes e azul para pessoas que se recuperaram. Um gráfico também mostra a quantidade de pessoas em cada grupo para uma fácil visualização do histórico de infecção. |

## Próximos passos

Os próximos passos a serem adicionados neste projetos são os seguintes, não necessariamente nesta ordem.

- [ ] adição de casas onde as pessoas deverão voltar para recuperar suas energias, simulando o agrupamento de pessoas. As pessoas dentro de casa só podem ser infectadas por pessoas que estejam dentro da mesma casa. Isso simula que outras pessoas não entram na casa dos outros.
- [ ] adição de supermercados e níveis de abastecimento das casas. Quando o abastecimento fica baixo, as pessoas são obrigadas a irem para supermercados para reabastecer as casas em que moram. Isto também dará um objetivo para que as pessoas não andem simplesmente de modo aleatório.
- [ ] período de incumbação: os vírus não causam doenças nas pessoas assim que entram nelas. Há um período em que ele fica inerte, podendo ser transmitido, e que a pessoa não sente sintomas. Este é o período mais perigoso, pois a pessoa ainda não sabem que devem ficar afastadas de outras para evitar a contaminação. Adicionar a funcionalidade de incubação (identificada por outra cor). Fazer com que pessoas doentes (com sintomas) fiquem mais tempo em casa até se recuperarem.
- [ ] idade e letalidade: definir idade para as pessoas segundo uma proporção. 
- [ ] economia: adicionar locais de trabalho. Onde as pessoas tem mais um motivo para sair de casa e não andar em movimentos aleatórios.
- [ ] Adicionar ruas. As pessoas não podem mais andar por qualquer lugar. Elas devem passar por vias.
- [ ] Modelo de otimização para verificar quais parâmetros reduzem os impactos na sociedade.
