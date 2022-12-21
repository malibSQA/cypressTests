let tgo = '.blockbuilder-content-tool  .blockbuilder-content-tool-name'
let frDv = '#editor-1'

	describe ('Sample dd', function(){
		it('	=> Selects Room Type & Faq button', function() {

		cy.visit("https://react-email-editor-demo.netlify.app")
		cy.frameLoaded('iframe');
        // cy.enter('iframe').then(getBody => {
        //     getBody().find(tgo).should('be.visible').invoke('text').should('be.equal', 'TEXT').then(()=>{
        //         cy.log('TisdF fs')
                

        //     })

            
        //     //getBody().contains('Some hidden element').should('not.be.visible')
        //   })

        cy.enter('iframe').then(getBody => {
            getBody().find(tgo).as('elems')
        })    
        cy.get('@elems').each(($el, index, $list) => {
                let to = $el.text()
                let n = index
                
                if ( to == 'Text'){
                    expect(to).equal('Text') 
                    cy.get('@elems').eq(index).as('elo').then(()=>{
                        cy.get('@elo').trigger('dragstart')
                        cy.enter('iframe').then(getBody => {
                            getBody().find('.blockbuilder-layer-selector.blockbuilder-layer-selector-first').as('canv')
                        })
                        cy.get('@canv').eq(6).trigger('drop')

                        //background-color: rgb(35, 111, 161);
                        //sc-fiKUUL hXzcCw display-color

                        //u_content_text_2

                        // cy.get('@elo').trigger('mousedown', { which: 1 })
                        // cy.wait(1000)
                        // cy.get('@elo').trigger('mousemove', { clientX: 380, clientY: 330 })
                        // cy.wait(1000)
                        // cy.get('@elo').trigger('mouseup', { force: true })

                    })
                    
                    
                }
                else{
                    cy.log(to)
                    cy.log('Text card not found !!')
                }
               
            })
        })


        // trigger('mousedown')
        // cy.get(tgo).trigger('mousemove')
        // cy.get(tgo).trigger('mouseleft', { which: 1, pageX: 400, pageY: 10} )
        // cy.get(tgo).trigger('mouseleave')
        // cy.get(tgo).trigger('mouseup')

        
		
 })
