---
layout: post
title: Criando e distribuindo um CocoaPod com Swift3 e integração contínua com Travis
description: "Demo post displaying the various ways of highlighting code in Markdown."
modified: 2016-06-01T15:27:45-04:00
tags: [CocoaPods, Swift3, Travis]
image:
  feature: abstract-10.jpg
---
Criando um CocoaPod passo a passo.

Neste post iremos ver como criar um componente em **Swift3** e reaproveitá-lo em futuros projetos, utilizando também ferramentas de integração contínua. Vamos aprender a distribuir esse componente de modo privado, com um repositório pessoal, ou público, através do próprio CocoaPods.

Utilizaremos o **Github** como repositório, já que ele nos permite usufruir de ferramentas como o **Travis** de maneira **gratuita** desde que seu repositório seja **público**.

# 1. Criando um repositório para nosso componente

Vá até sua conta no Github e clique em **New repository**. Crie um projeto chamado **DMCalculadora**, ou utilize outro nome para seu projeto. Em seguida, clique em **Create repository**.

<figure>
	<a href="http://gdurl.com/k90v">
    <img src="http://gdurl.com/k90v" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/k90v" title="Repositório do componente">
      Estrutura básica
    </a>.
    </figcaption>
</figure>

Tome nota da url do seu repositório, pois a utilizaremos mais para frente.

<figure>
	<a href="http://gdurl.com/RIDy">
    <img src="http://gdurl.com/RIDy" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/RIDy" title="Repositório do componente">
      Estrutura básica
    </a>.
    </figcaption>
</figure>

Obs: não é necessário clonar o repositório nesse momento.

# 2. Criando um projeto Pod

## 2.1 Configuração inicial

O CocoaPods dispõe de uma ferramenta que irá nos auxiliar a configurar nosso projeto de Pod.

> **Tip**
>
> Lembre-se de usar, preferencialmente, o mesmo nome do repositório criado anterioremente

Navegue até sua pasta padrão de projetos e crie uma biblioteca:  

```bash
$ cd /pasta-de-projetos
$ pod lib create DMCalculadora
```

Em seguida, a ferramenta irá lhe fazer uma série de perguntas. Aqui estão as opções escolhidas durante esse processo:

> **Important**
>
> Não se esqueça de responder **yes** para a segunda pergunta (include a demo application), isso nos irá permitir testar mais facilmente nosso componente.

```bash
What language do you want to use?? [ Swift / ObjC ]
>> Swift
Would you like to include a demo application with your library? [ Yes / No ]
>> Yes
Which testing frameworks will you use? [ Quick / None ]
>> None
Would you like to do view based testing? [ YES / NO ]
>> No
```  

Logo que finalizar as perguntas, o XCode será iniciado já com a estrutura básica do nosso projeto.

<figure>
	<a href="http://gdurl.com/9dfu">
    <img src="http://gdurl.com/9dfu" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/9dfu" title="Estrutura básica">
      Estrutura básica
    </a>.
    </figcaption>
</figure>

A parte que nos interessa agora é a apresentada acima, no caminho `Pods/Development Pods/DMCalculadora/DMCalculadora/Classes`. Todos os nossos arquivos do componente devem estar incluídos dentro da pasta **Classes**. Já existe um arquivo nesta pasta, chamado `ReplaceMe.swift`. Podemos removê-lo e criar outro arquivo swift no mesmo local, chamado `DMCalculadora.swift`.

> **Tip**
>
> As classes criadas não precisam ter o mesmo nome do projeto, estamos dando o nome dessa classe de **DMCalculadora** pois queremos utilizar o componente como `import DMCalculadora
> …​
> let calc = DMCalculadora()`. Caso o nome **Calculator** fosse dado a classe, usariamos como: `import DMCalculadora
> …​
> let calc = Calculator()`

## 2.2 Adicionando código

Agora é hora de inserir algum código para nosso componente. Vamos criar alguma função bem simples para este exemplo:

```swift
import Foundation

public class DMCalculadora{
    public func calculate(sum x: Int, with y: Int) -> Int{
        return x+y
    }

    public func calculate(subtract x: Int, and y: Int) -> Int{
        return x-y
    }

    public func init(){}
}
```

> **Important**
>
> Você **DEVE** utilizar **public** antes da declaração da classe e das funções, senão o componente não será enxergado nas outras classes onde será importado posteriormente.

## 2.3 Arquivo Podspec

Podemos notar em nosso projeto que um arquivo com extensão **.podspec** foi criado automaticamente para nós. Ajuste-o de forma que melhor descreva seu projeto. Caso seu componente tenha suas próprias dependências, verifique a flag `s.dependency`.


<figure>
	<a href="http://gdurl.com/uyWG">
    <img src="http://gdurl.com/uyWG" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/uyWG" title="Arquivo podspec">
      Estrutura básica
    </a>.
    </figcaption>
</figure>

> **Tip**
>
> Para verificar que tudo está OK, digite no terminal:

```bash
$ pod lib lint DMCalculadora.podspec
```

<figure>
	<a href="http://gdurl.com/TSpe">
    <img src="http://gdurl.com/TSpe" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/TSpe" title="Tudo Ok!">
      Estrutura básica
    </a>.
    </figcaption>
</figure>

## 2.4 Adendo: Versionamento Semântico

É muito importante manter um padrão para o número de versionamento de seu componente e configurar corretamente a flag `s.version`, que será posteriormente linkada com uma flag criada no **git**. Isso irá permitir que os usuários do seu componente usem-o corretamente.

A forma mais comumente vista é a seguinte:

1.  Major: mudanças não retrocompatíveis

2.  Minor: mudanças retrocompatíveis com adição de novas funcionalidades

3.  Patch: mudanças retrocompatíveis sem adição de novas funcionalidades

Ou seja, num número de versionamento **2.7.3**, o número 2 seria o **major**, enquanto o 7 e o 3 seriam **minor** e **patch**, respectivamente.

Começando de trás para frente, quando o **patch** é incrementado, significa que bugs foram corrigidos ou melhorias foram feitas internamente, porém nenhuma função ou comportamento novo foram adicionados. A atualização do **minor** implica em novas funcionalidades adicionadas no código, mas que não devem causar nenhum tipo de erro com as versões anteriores. Finalmente, quando o **major** é atualizado, mudanças foram feitas de forma que o codigo pode se comportar de maneira diferente ao ser atualizado, ou então você tenha que corrigir alguns bugs em seu código.

> **Tip**
>
> Geralmente queremos atualizar os patches o mais rápido possível

## 2.3 Testes

Para que possamos aproveitar dos benefícios da integração contínua e evitar problemas como a regressão, devemos preparar casos de teste para o nosso componente.

Primeiramente, temos que instalar o nosso componente na aplicação de exemplo que foi criada automaticamente em nosso projeto. Para isso, a partir da pasta raíz do projeto, digite:

```bash
$ cd Example
$ pod install
```

<figure>
	<a href="http://gdurl.com/0P_M">
    <img src="http://gdurl.com/0P_M" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/0P_M" title="imagem">
      Pod install
    </a>.
    </figcaption>
</figure>

Voltando para o XCode, podemos ver que dentro da pasta **Tests**, há um arquivo `Tests.swift`. Abra-o e adicione algumas funções de teste, dessa forma:

```swift
import UIKit
import XCTest
import DMCalculadora

class Tests: XCTestCase {
    override func setUp() {
        super.setUp()
    }

    override func tearDown() {
        super.tearDown()
    }

    func testeDeSoma(){
        let calculadora = DMCalculadora()
        let soma = calculadora.calculate(sum: 5, with: 10)
        XCTAssertTrue(soma == 15)
    }

    func testeDeSubtracao(){
        let calculadora = DMCalculadora()
        let subtracao = calculadora.calculate(subtract: 10, and: 5)
        XCTAssertTrue(subtracao == 5)
    }
}
```

Se tentarmos rodar os testes agora (command + u), provavelmente iremos nos deparar com um erro:

```bash
    2017-04-03 22:15:07.452 xctest[1170:14500] The bundle “DMCalculadora_Tests” couldn’t be loaded because it is damaged or missing necessary resources. Try reinstalling the bundle.
    2017-04-03 22:15:07.458 xctest[1170:14500] (dlopen_preflight(/Users/domene/Library/Developer/Xcode/DerivedData/DMCalculadora-cnqtvxlntzcluncmgzqoouibphkq/Build/Products/Debug-iphonesimulator/DMCalculadora_Tests.xctest/DMCalculadora_Tests): Library not loaded: @rpath/DMCalculadora.framework/DMCalculadora
      Referenced from: /Users/domene/Library/Developer/Xcode/DerivedData/DMCalculadora-cnqtvxlntzcluncmgzqoouibphkq/Build/Products/Debug-iphonesimulator/DMCalculadora_Tests.xctest/DMCalculadora_Tests
      Reason: image not found)
    Program ended with exit code: 82
```

Caso isso aconteça, clique no ícone azul do projeto no lado esquerdo superior escrito **DMCalculadora**, em seguida, selecione o target **DMCalculadora\_Tests** e na aba **General** deve haver um campo escrito **Host Application**. Abra as opções do campo e selecione o target **DMCalculadora\_Example**

<figure>
	<a href="http://gdurl.com/ZqHs">
    <img src="http://gdurl.com/ZqHs" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/ZqHs" title="imagem">
      Host Application
    </a>.
    </figcaption>
</figure>

Rode novamente os testes e se tudo correr bem, os testes passarão:

<figure>
	<a href="http://gdurl.com/yXyz">
    <img src="http://gdurl.com/yXyz" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/yXyz" title="imagem">
      Testes OK!
    </a>.
    </figcaption>
</figure>

Nosso componente está quase pronto para ser integrado com a ferramenta de integração contínua Travis no Github.

## 2.4 Tagging

Antes de mais nada, devemos salvar todo o trabalho feito até agora e taggear apropriadamente nosso componente no **git**, utilizando a mesma versão especificada no arquivo **.podspec**.

Lembra do repositório que criamos no começo para salvar nosso componente? Navegue até a pasta raíz do projeto e, com o link do repositório criado anteriormente, faça:

```bash
$ git remote add origin https://github.com/Edudjr/DMCalculadora.git
```

Estamos dizendo à pasta local que o repositório que representa esse projeto é o especificado pelo link. Estamos definindo a "origem" do repositório, se assim podemos dizer.

Agora, adicione todos os arquivos criados/modificados e faça o commit inicial:

```bash
$ git add -A
$ git commit -m "Commit inicial"
```

Não se esqueça de criar uma tag com a mesma versão do .podspec e dar **push** nas alterações (enviar para o repositório remoto):

```bash
$ git tag '0.1.0'
$ git push --tags
```

# 3. Distribuindo o componente

> **Important**
>
> É extremamente importante que você tenha seguido os passos em Tagging antes de prosseguir nesta sessão

## 3.1 Distribuindo a partir de um repositório particular

> **Note**
>
> Este passo é **opcional**, só prossiga se você desejar criar um CocoaPod que **não estará linkado** no respositório público do CocoaPods, mas sim em um repositório **particular**.

Primeiramente, iremos entrar novamente em nossa conta no Github e clicar em **New Repository**. Digite o nome do repositório, como por exemplo **DMPodSpecs**.

<figure>
	<a href="http://gdurl.com/kP-q">
    <img src="http://gdurl.com/kP-q" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/kP-q" title="imagem">
      Criando novo repositório
    </a>.
    </figcaption>
</figure>

Em seguida, clique em **Create repository**. Temos então que dizer ao Cocoapods, instalado localmente, que queremos adicionar esse novo repositório que acabamos de criar. No terminal, digite:

```bash
$ pod repo add [NOME_DO_REPOSITORIO] [URL_DO_REPOSITORIO]
```

No exemplo do meu repositório, o `NOME_DO_REPOSITORIO` é **DMPodSpecs**, e `URL_DO_REPOSITORIO` é **https://github.com/Edudjr/DMPodSpecs.git**

> **Tip**
>
> Se tudo correu bem, é possível rodar os seguintes comandos:

```bash
$ cd ~/.cocoapods/repos/DMPodSpecs
$ pod repo lint .
```

Ainda na pasta raíz de nosso componente, iremos adicionar o seu **.podspec** no repositório que acabamos de criar:

```bash
$ pod repo push DMPodSpecs DMCalculadora.podspec
```

<figure>
	<a href="http://gdurl.com/ipjo">
    <img src="http://gdurl.com/ipjo" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/ipjo" title="imagem">
      Criando novo repositório
    </a>.
    </figcaption>
</figure>

### 3.1.1 Utilizando em outros projetos

Agora que o processo de criação do Pod foi finalizado e ele foi adicionado em nosso repositório, só nos basta utilizar em outros projetos. Para tal, abra o arquivo **Podfile** do projeto em que iremos importar nosso componente e adicione o source do CocoaPods e também o source do seu repositório pessoal:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/Edudjr/DMPodSpecs'

target 'CustomProject' do
  pod 'Alamofire', '4.4.0'
  pod 'DMCalculadora', '0.1.0'
end

post_install do |installer|
    installer.pods_project.targets.each do |target|
        puts target.name
    end
end
```

## 3.2 Distribuindo publicamente através do CocoaPods

> **Note**
>
> Este passo é **opcional**, só prossiga se você desejar disponibilizar seu componente no respositório **público** do CocoaPods.

Primeiro de tudo precisamos nos registrar na API do CocoaPods chamada **Trunk**:

```bash
$ pod trunk register seu@email.com 'Seu Nome' --description='macbook air'
```

Um email será enviado para você para que possa confirmar sua sessão. Depois de confirmada a sessão, você só precisa dar um **push** no **.podspec** do seu componente:

```bash
$ pod trunk push DMCalculadora.podspec
```

Pronto! Seu componente está disponível publicamente através do repositório do CocoaPods.

# 4. Integração Contínua com Travis

Antes de incorporar um código novo através de um Pull Request é muito importante saber se o código não irá quebrar nossa aplicação. Por isso, rodar testes automatizados a cada Pull Request é uma boa idéia.

## 4.1 Login e ativação

O primeiro passo é entrar no site <http://travis-ci.org> e logar com a conta do Github no canto superior direito. Uma tela de autorização irá surgir pedindo para que você autorize a ferramenta a utilizar alguns recursos de seus repositórios.

Após feito isso, você deve ver seu nome no canto superior direito, clique nele para entrar em seu perfil. Nessa tela será possível ver todos os seus projetos com um "switch" desativado em cada um deles. Encontre o projeto de nosso componente e ative o switch.

<figure>
	<a href="http://gdurl.com/Co-Z">
    <img src="http://gdurl.com/Co-Z" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/Co-Z" title="imagem">
      Travis ativado
    </a>.
    </figcaption>
</figure>

## 4.2 Adicionando o arquivo .travis.yml

Precisamos agora adicionar um arquivo **yml** ao nosso projeto para que o Travis reconheça os comandos a serem executados. De volta ao terminal, na pasta raíz do componente, crie uma nova branch e um novo arquivo vazio:

```bash
$ git checkout -b travis-setup
$ touch .travis.yml
```

Agora abra esse arquivo em seu editor de preferência e inclua o seguinte código:

```
osx_image: xcode8.1
language: objective-c

script:
 - xcodebuild test -workspace Example/DMCalculadora.xcworkspace -scheme DMCalculadora-Example -destination 'platform=iOS Simulator,name=iPhone 7,OS=10.1' ONLY_ACTIVE_ARCH=NO | xcpretty
```

> **Tip**
>
> Preste atenção no nome do arquivo com extensão `.xcworkspace` e no `scheme` no script acima para substituir pelos respectivos nomes de seu projeto

## 4.3 Pull request das alterações

Agora adicione o novo arquivo no git, faça um commit e em seguida um push.

```bash
$ git add -A
$ git commit -m "Adicionado arquivo .travis.yml"
$ git push origin travis-setup
```

Após feito o push, entre em sua conta no github no repositório do seu componente. Você deverá ver uma linha amarela escrita **travis-setup** com um botão verde escrito **Compare & pull request**. Clique nele.

<figure>
	<a href="http://gdurl.com/rL-Q">
    <img src="http://gdurl.com/rL-Q" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/rL-Q" title="imagem">
      Criando um pull request
    </a>.
    </figcaption>
</figure>

A seguinte telá irá aparecer. Adicione algum comentário se necessário e clique em **Create pull request**.

<figure>
	<a href="http://gdurl.com/RSSl">
    <img src="http://gdurl.com/RSSl" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/RSSl" title="imagem">
      Criando um pull request
    </a>.
    </figcaption>
</figure>

## 4.4 Resultados

Uma tela será exibida com o status dos testes realizados pelo Travis. Eles devem ficar amarelos até serem executados. Se os testes não passarem eles ficarão vermelhos. Esperamos que o resultado seja verde, ou seja, todos os testes passaram:

<figure>
	<a href="http://gdurl.com/GIMu">
    <img src="http://gdurl.com/GIMu" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/GIMu" title="imagem">
      Resultado dos testes
    </a>.
    </figcaption>
</figure>

podemos clicar em **Details** para saber mais sobre a execução dos testes, seja numa falha ou em caso de sucesso. Se abrirmos a página de detalhes e formos até o final do log, veremos que nossos testes, de fato, passaram:

<figure>
	<a href="http://gdurl.com/dv15">
    <img src="http://gdurl.com/dv15" alt="">
  </a>
	<figcaption>
    <a href="http://gdurl.com/dv15" title="imagem">
      Resultado dos testes
    </a>.
    </figcaption>
</figure>

Agora que sabemos que todos os testes passaram, podemos voltar e clicar em **Merge pull request** sem medo.

Pronto! Nosso componente feito em Swift3 possui integração contínua e está sendo distribuido para todos os interessados em usá-lo. Ficamos por aqui :)
