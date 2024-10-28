/// <reference types="Cypress" />

//describe('template spec', () => {
//  it('passes', () => {
//    cy.visit('https://example.cypress.io')
//  })
//})
//describe('Central de Atendimento ao Cliente TAT', function(){
//    it('verifica o titulo da aplicação',function() {
//      cy.visit('./src/index.html')
//
//      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
//
//    })
//})
describe('Central de Atendimento ao Cliente TAT', () =>{
    beforeEach(() => {
      cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', () => {
        cy.title().should('include', 'Central de Atendimento ao Cliente TAT');
    })

    it('Devo preencher os campos obrigatórios e enviar o formulário', () =>{
        cy.get('#firstName').type('Magno');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('magnonasci@gmail.com', {delay: 50});
        cy.get('#open-text-area').type('Comentario',{delay: 0});
        cy.get('button[type="submit"]').click();
        
        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', () =>{
        cy.get('#firstName').type('Magno');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('magnonasci@gmail,com');
        cy.get('#open-text-area').type('Go!');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
    });
    it('Campo do telefone continua vazio quando preenchido por valor não-numérico', () =>{
      cy.get('#phone')
        .type('abcdefghijklm')
        .should('have.value', '');
    })   
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
        cy.get('#firstName').type('Magno');
        cy.get('#lastName').type('Filho');
        cy.get('#email').type('magnonasci@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Go!');
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');
    });  
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
       cy.get('#firstName')
         .type('Magno')
         .should('have.value', 'Magno')
         .clear()
         .should('have.value', '')
    });   
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('enviar o formulário com sucesso usando um comando customizado', () => { 
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible');
    })   
    it('selecione um produto (YouTube) por seu texto', () => {
       cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube');
    })
    it('selecione um produto (Mentoria) por seu valor', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value','mentoria')
    }) 
    it('selecione um produto (Blog) por seu valor', () => {
        cy.get('#product')
          .select(1)
          .should('have.value','blog')
    }) 
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')
    }) 
    it('marca cada tipo de atendimento', () => {
       cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })
    it('marca ambos checkboxes, depois desmarcar o últumo', () =>{
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('selecione um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 
    it('selecione um arquivo simulando drag and drop', () => {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 
    it('selecione um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 
    it('verifique que se a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    }) 
    it('acessa a página de politica de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    }) 
    it('testa a página da politica de privacidade de forma independent', function() {
      cy.visit('./src/privacy.html')
      cy.contains('Talking About Testing').should('be.visible')
    })
})    
