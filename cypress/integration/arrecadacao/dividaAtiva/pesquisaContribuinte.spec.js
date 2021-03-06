//import acessaModuloCompras from '../AcessaModuloCompras'

class pesquisaContribuinte {
  acessaCCI(){
    
      it("ARRECADAÇÃO: Contribuinte - CCP", () => {
        cy.moduloMenu('ARRECADAÇÃO','Contribuinte - CCP','Pesquisa de contribuinte');
      });
  }
  carregaContribuinte(contribuinte){
    it("Carrega Contribuinte", () => {
      cy.get('button[nat="consultaPessoaLimpar"]',{timeout:10000}).click();
      //Observação da solicitaçõ de compra
      cy.get('input[nat="consultaPessoaContribuinte"]', {timeout: 60000});

      cy.get('[nat="consultaPessoaContribuintePesquisa"]').click();
      
      cy.get('div[nat="pesquisaPessoaGrid"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000});

      cy.get('input[nat="pesquisaPessoaNome"]', {timeout: 60000}).type(contribuinte);

      cy.get('[nat="pesquisaPessoaPesquisaPesquisar"]').click();

      cy.get('div[nat="pesquisaPessoaGrid"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000});

      cy.get('[nat="botaoCarregar"]').first().click();
      cy.contains('pd-input-text[nat="consultaPessoaContribuinteNome"]>div>div>span', contribuinte, {timeout: 60000});
      //cy.get('pd-input-text[nat="consultaPessoaContribuinteNome"]>div>div>span',{timeout:10000}).invoke(contribuinte)
      //cy.get('div[nat="consultaPessoaGridDuamItem"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000}).first();
    });
    it("Atualiza Divida", () => {
      cy.get('[nat="consultaPessoaAtualizaDivida"]').click();

      cy.get('.md-toast-text',{timeout:10000}).should('contain', 'Divida atualizada com sucesso!');

      cy.get('.md-action').click({force: true});
    });
  }
  atualizaDivida() {
    it("Imprimir Duam",()=>{
      cy.get('[nat="consultaPessoaImprimirDuam"]').click();

      cy.get('div[nat="popupTalaoDividaDuamGrid"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000});
      cy.get('[nat="popupTalaoDividaDuamImprimir"]',{timeout:10000}).click().wait(5000);

      cy.validaPDF("KEISCIANE");

      cy.get('[ng-click="fechar()"]',{timeout:10000}).click({force:true});
    });
    it("Valida Modal Parcelamento Duam",()=>{
      cy.get('button[nat="consultaPessoaParcelamento"]',{timeout:10000}).click();

      cy.get('[title="Editar duam"]', {timeout: 60000}).first().click();

      describe("Modal Duam Repactuação", () => {
        cy.get('div[nat="cadastroContaCorrenteFiscalGridDuamReceita"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000});

        

        cy.get('div[nat="cadastroContaCorrenteFiscalGridDuamReceita"]')
        .last()
        .find(".ui-grid-footer-cell")
        .as("footer");
        cy.get("@footer").eq(2).contains("731,43").should("length", 1);

        cy.get('[ng-click="fechar()"]',{timeout:10000}).first().click({force:true});
      });
    });
    it("Valida Valor Parcelamento Duam",()=>{
      cy.get('div[nat=""]')
        .last()
        .find(".ui-grid-footer-cell")
        .as("footer");

      cy.get("@footer").eq(6).contains("731,43").should("length", 1);
      cy.get('[ng-click="fechar()"]',{timeout:10000}).last().click({force:true});
    });
    
  }
  validaExtratos(){
    it('Valida Extratos', () => {
      cy.get('button[nat="consultaPessoaExtrato"]',{timeout:10000}).click();

      //aguardar tela carregar
      cy.aguardarGrid('div[nat="popupExtratoDaDividaGridReceitaTipoAviso"]');
      //cy.get('div[nat="consultaPessoaExtratoGrid"]>div>div>div>div[class="ui-grid-canvas"]>div>div', {timeout: 60000});
      cy.get('[role="checkbox button"]').first().click();

      cy.get('[nat="popupExtratoDaDividaImprimir"]').click();

      cy.wait(5000);

      cy.validaPDF("KEISCIANE");

      cy.get('[ng-click="fechar()"]',{timeout:10000}).first().click({force:true});
    });
  }
  simularRepactuacao(){
    it('Repactuação -> Simular', () => {
      cy.get('[nat="consultaPessoaRepactuacao"]',{timeout:10000}).click();

      

      cy.get('input[nat="repactuacaoReceita"]')
      .clear()
      .type('4602')
      

      cy.get('[nat="repactuacaoReceitaDescricao"]').click();

      cy.get('[nat="repactuacaoDtVencimentoBotaoPopUp"]').click();
      
      cy.get('.uib-datepicker-current',{timeout:10000}).click();

      cy.get('[nat="repactuacaoPesquisar"]').click();
      
      cy.get('div[nat="repactuacaoGridReceitaPesquisa"]>div>div>div>div[class="ui-grid-canvas"]>div>div',{timeout:10000});
      cy.get('div[nat="repactuacaoGridReceitaPesquisa"]>div>div>div>div[class="ui-grid-canvas"]',{timeout:10000}).click();

      cy.get('[nat="repactuacaoSimular"]').click();

      //valida mensagem de conformação
      cy.get('.md-toast-text',{timeout:10000}).should('contain', 'Ação realizado com sucesso!');

      cy.get('.md-action').click({force: true});
    });
  }
  repactucaoesAnteriores(){
    it('Repactuação -> Repactuações Anteriores', () => {

      cy.get('[nat="repactuacaoGetSimulacoesAnteriores"]',{timeout:10000}).click();

      cy.get('div[nat="popupOutrasSimulacoesGrid"]>div>div>div>div[class="ui-grid-canvas"]>div>div',{timeout:10000}).should('exist');
      //clica no botao fechar
      cy.get('[ng-click="fechar()"]',{timeout:10000}).first().click({force:true});

      });
  }
  homologaSimulacao(){
    it("Repactuação -> Homologa Simulação",()=>{
      cy.get('[nat="repactuacaoHomologar"]').click();

      cy.get('[nat="pdBtnAlertOKSim"',{timeout:10000}).click();

      cy.get('input[nat="popupTermoConfissaoDividaCarta"]',{timeout:10000}).clear().type('1').tab();
      cy.autoComplete('input[nat="popupTermoConfissaoDividaCartaDescricao"]','CARTA PADRAO');
      //cy.get('input[nat="popupTermoConfissaoDividaCartaDescricao"]').click();

      cy.get('[nat="popupTermoConfissaoDividaImprimir"]').click();

      cy.get('body').contains('Favor, informar um termo de confissão.').should('not.exist')
      //fechar modal
      cy.get('[ng-click="fechar()"]',{timeout:10000}).last().click({force:true});
      
      cy.get('[ng-click="fechar()"]',{timeout:10000}).first().click({force:true});

    });
  }
  pagamentoAvista(){
    it('Pagamento a vista', () => {
      cy.get('button[nat="consultaPessoaPagamentoAVista"]',{timeout:10000}).click();
      cy.get('[nat="BotaoPopUp"]',{timeout:10000}).eq(2).click();
      cy.get('.uib-datepicker-current',{timeout:10000}).click();
      cy.autoComplete('input[nat="Descricao"]','CARTA PADRAO');
      cy.get('[nat="Descricao"]').eq(0).click();
      //fecha modal
      cy.get('[ng-click="fechar()"]',{timeout:10000}).first().click({force:true});
    });
  }
  testaCertidaoNegativa(){
    it('Testa certidão Negativa', () => {
      cy.get('[nat="consultaPessoaTelaPadraoAcoesExtrasCb"]').click();
      cy.get('[nat="acoesExtrasCertidão"]',{timeout:10000}).click();
      cy.get('div[nat=""]>div>div>div>div[class="ui-grid-canvas"]>div>div',{timeout:10000});
      cy.get('button[aria-label="Imprimir"]').click();
    });
  }
  
}
export default new pesquisaContribuinte();
