// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand({
	capture: 'viewport', // capture viewport in screenshot
	customSnapshotsDir: 'snapshots/TogeeHost',
	failureThreshold: 0.05, // threshold for entire image
	failureThresholdType: 'percent', // percent of image or number of pixels
	customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
	
  });

require('cypress-iframe');

Cypress.Commands.add("createRoom", (user) =>{

    let newUrl = ''

	cy.visit("/")
//    cy.visit(user.qaUrlTog)
	cy.get(user.pluginBtn).click()
	cy.get(user.roomTyp[ Math.floor(Math.random()* user.roomTyp.length)]).find('.image_container').click()
	cy.get(user.nextBtn).click()
	let userNmP = user.hostNames[ Math.floor(Math.random()* user.hostNames.length)]
	cy.get(user.nameInput).find('input').type(userNmP)
	cy.get(user.createRoomBtn).should('be.visible')
	cy.get(user.createRoomBtn).click()
	cy.wait(2000)

    cy.get('.tlss_invitation_container > .tlss_invitation_button').click()
    cy.get(user.inviteBtnMenu).invoke('attr','data-invitation').then((link)=>{
        cy.task('log',`\t << Created Room's link : ${link} >>`)
        newUrl = link;
    })

})


// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
