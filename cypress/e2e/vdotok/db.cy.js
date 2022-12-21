/// <reference types="cypress" />

describe("VdoTok Database Testing", () => {

        // let vdotokCons = "http://s.vdotok.dev";
    // let email = "k.dq7866@gmail.com";
    // let pass = "Kd@12345678";
    // let nRows = 0;

    let vdotokCons = "http://s.vdotok.dev";
    let email = "kolewe1120@xitudy.com";
    let pass = "1234567890Nn@";

    let projID = "20_20FT8NM";
    let dbName = "vdotok_db_20";
    // let deviType = "ios";
    // let deviName = "iPhone X";
    let deviType = "android";
    let grouPartis = 2, successP = 1, unavailP = 0 , missedP = 0, rejectP = 0, droppedP = 1; 
    let status = 200, nRows = 0, minCharge = 0.004;
    let dbResult = [];
    let  successPartis, db_success; let db_unavailable, db_missed, db_reject, db_drop, sessionID;
    let statuses = [200,480, 487, 410, 496]


    let cTime = 3, minLeft = 14709;




    it("Show all Data from db Call History table", function () {
        cy.task(
            "queryDb",
            `SELECT ref_id, session_uuid FROM ${dbName}.project_call_history_${projID} ORDER BY id DESC LIMIT ${grouPartis}`
        ).then((reso) => {
             sessionID = reso[0].session_uuid;
             cy.log(sessionID);
        for(let i =0;i<grouPartis;i++){
            cy.task(
            "queryDb",
              `SELECT device_type, participant_count, duration_minutes, call_status, status_description, ref_id, session_uuid, charged_amount_in_unit FROM ${dbName}.project_call_history_${projID} WHERE call_status = ${statuses[i]} AND session_uuid = "${sessionID}" ORDER BY ref_id DESC`
            ).then((result) => {
                dbResult.push(result);
            });
        }
        cy.wrap(dbResult).as("dbResult");
        cy.get('@dbResult').then((dbResult) => {
            db_success = dbResult[0];
            db_unavailable = dbResult[1];
            db_missed = dbResult[2];
            db_drop = dbResult[3];
            db_reject = dbResult[4];

            successPartis = db_success.length;
        })   
    }); 
        
    });

    //    it(`Check Before minutes:`, function () {
    //     cy.visit(vdotokCons);
    //     cy.get(".navlogin").click();
    //     cy.get("#email").type(email);
    //     cy.get(".password").type(pass);
    //     cy.get("#btn-signup").click();

    //     cy.get(".accordianTitle").contains("Billing").click();
    //     cy.wait(2000);
    //     cy.get(".minutesLeftNumber").invoke('text').then((text) => {
    //         minLeft = Number(text);
    //         cy.log("Type of Before Min: " + typeof(minLeft));
    //         cy.log("Before Min: " + minLeft);
    //     });

    // })

    
    // it(`call-${cTime}min, participants-${partis}`, function () {
    //     cy.log("Expected Duration: "+ cTime);
    //     expect(dbResult[1].duration_minutes).to.equal(cTime);
    //     cy.log("Expected Call Status: "+ status);
    //     expect(dbResult[1].call_status).to.equal(status);
    //     cy.log("Expected Participants: "+ partis);
    //     expect(dbResult[1].participant_count).to.equal(partis);


    //     }); 

    it(`call-${cTime}min, participants-${successP} : Success Participants`, function () {
        for (let i =1;i<successP;i++){
            cy.log("Participant "+ (i+1) +", Expected Duration: "+ cTime);
            expect(db_success[i].duration_minutes).to.equal(cTime);
            cy.log("Participant "+ (i+1) +", Expected Call Status: "+ statuses[0]);
            expect(db_success[i].call_status).to.equal(statuses[0]);
            cy.log("Participant "+ (i+1) +" entry, Expected Participants: "+ grouPartis);
            expect(db_success[i].participant_count).to.equal(grouPartis);
        }
    });    


    it(`call-${cTime}min, participants-${unavailP} : Temporary Unavailable Participants`, function () {
        cy.log("Entered __ Participants: " + unavailP);
        for (let i =0;i<unavailP;i++){
            cy.log("Participant "+ (i+1) +", Expected Duration: 0" );
            expect(db_unavailable[i].duration_minutes).to.equal(0);
            cy.log("Participant "+ (i+1) +", Expected Call Status: "+ statuses[1]);
            expect(db_unavailable[i].call_status).to.equal(statuses[1]);
            cy.log("Participant "+ (i+1) +" entry, Expected Participants: "+ grouPartis);
            expect(db_unavailable[i].participant_count).to.equal(grouPartis);
        }
    });    


    it(`call-${cTime}min, participants-${missedP} : Missed Participants`, function () {
        cy.log("Entered __ Participants: " + missedP);
        for (let i =0;i<missedP;i++){
            cy.log("Participant "+ (i+1) +", Expected Duration: 0" );
            expect(db_missed[i].duration_minutes).to.equal(0);
            cy.log("Participant "+ (i+1) +", Expected Call Status: "+ statuses[2]);
            expect(db_missed[i].call_status).to.equal(statuses[2]);
            cy.log("Participant "+ (i+1) +" entry, Expected Participants: "+ grouPartis);
            expect(db_missed[i].participant_count).to.equal(grouPartis);
        }
    });    

    
    it(`call-${cTime}min, participants-${droppedP} : Socket Dropped Participants`, function () {
        if(droppedP != 0){
                 for (let i =0;i<droppedP;i++){
                    cy.log("Participant "+ (i+1) +", Expected Duration: " + cTime);
                    expect(db_drop[i].duration_minutes).to.equal(cTime);
                    cy.log("Participant "+ (i+1) +", Expected Call Status: "+ statuses[3]);
                    expect(db_drop[i].call_status).to.equal(statuses[3]);
                    cy.log("Participant "+ (i+1) +" entry, Expected Participants: "+ grouPartis);
                    expect(db_drop[i].participant_count).to.equal(grouPartis);
                    }
        }
        else{
            cy.log("Entered __ Participants: " + droppedP);
        }
    });

    it(`call-${cTime}min, participants-${rejectP} : Rejected Participants`, function () {
        cy.log("Entered __ Participants: " + rejectP);
        for (let i =0;i<rejectP;i++){
            cy.log("Participant "+ (i+1) +", Expected Duration: 0" );
            expect(db_reject[i].duration_minutes).to.equal(0);
            cy.log("Participant "+ (i+1) +", Expected Call Status: "+ statuses[4]);
            expect(db_reject[i].call_status).to.equal(statuses[3]);
            cy.log("Participant "+ (i+1) +" entry, Expected Participants: "+ grouPartis);
            expect(db_reject[i].participant_count).to.equal(grouPartis);
        }
    });
    
    
        // expect(dbResult[1].duration_minutes).to.equal(cTime);
        // cy.log("Expected Call Status: "+ status);
        // expect(dbResult[1].call_status).to.equal(status);
        // cy.log("Expected Participants: "+ partis);
        // expect(dbResult[1].participant_count).to.equal(partis);


    it(`Check Billing minutes left:`, function () {
        cy.visit(vdotokCons);
        cy.get(".navlogin").click();
        cy.get("#emaillogin").type(email);
        cy.get(".password").type(pass);
        cy.get("#btn-signin").click();

        cy.get(".accordianCard").contains("Billing").click();
        cy.wait(2000);
        cy.get(".minutesLeftNumber")
            .invoke("text")
            .then((text) => {
                let leftTim = minLeft - (cTime * grouPartis);
                expect(text).equal(leftTim.toString());
                cy.log(
                    `TimeBeforeCall: ${minLeft} , Time should take: minute-${cTime} * partis-${grouPartis} = ` +
                    cTime * grouPartis
                );
                cy.log("Time left is: " + leftTim);
                //            expect(text).equal("14722");
            });
    });

    it(`Check console Session-Logs:`, function () {
        cy.visit(vdotokCons);
        cy.get(".navlogin").click();
        cy.get("#emaillogin").type(email);
        cy.get(".password").type(pass);
        cy.get("#btn-signin").click();
        cy.get(".accordianCard").contains("SESSION LOG").click();
        cy.wait(6000);

        cy.get(".table.table-hover>tbody>tr").then((rows) => {
            nRows = Cypress.$(rows).length;
            cy.log("Session-log entries: " + nRows);
            cy.get(".table").scrollTo("bottom", { ensureScrollable: false });

            cy.wait(8000);
            cy.get(
                `.table.table-hover>tbody>tr:nth-child(${nRows}) > td:nth-child(3)`
            )
                .invoke("text")
                .then((callStats) => {
                   expect(callStats.trim()).equal("Success");
                   cy.log("Call Status: " + callStats + "- Should be: Success");
                   expect(db_success[1].status_description).equal(callStats.trim());
                   cy.log("DB callStatus: " + db_success[1].status_description + "- Console callStatus: " + callStats.trim());

                });

//  `SELECT session_uuid, ref_id, start_time, status_description, duration_minutes, participant_count, charged_amount_in_unit`
   //   sessionID, createdBy, startDateTime, SatusDesc, duration, paticipants,totalSpend,

         cy.get(
            `.table.table-hover>tbody>tr:nth-child(${nRows}) > td:nth-child(1)`
        ).invoke("text")
        .then((sessionID) => {
            expect(db_success[1].session_uuid).equal(sessionID.trim());
            cy.log("DB sessionID: " + db_success[1].session_uuid + "- Console sessionID: " + sessionID.trim());

    });

//     cy.get(
//         `.table.table-hover>tbody>tr:nth-child(${nRows}) > td:nth-child(2)`
//     ).invoke("text")
//     .then((createdBy) => {
//         expect(dbResult[1].ref_id).equal(createdBy.trim());
//         cy.log("DB ref_ID: " + dbResult[1].ref_id + "- Console createdBy: " + createdBy.trim());

// });


            cy.get(`.table.table-hover>tbody>tr:nth-child(${nRows})>td:nth-child(5)`)
                .invoke("text")
                .then((duration) => {
                    cy.log("Duration(min): " + duration + "- Should be: " + (cTime * successPartis ).toString());
                    expect(duration.trim()).equal((cTime * successPartis).toString());
                    expect((db_success[1].duration_minutes)* successPartis).equal(Number(duration.trim()));
                   cy.log("DB callDuration: " + (db_success[1].duration_minutes * successPartis) + "- Console callDuration: " + Number(duration.trim()));
                });
            cy.get(`.table.table-hover>tbody>tr:nth-child(${nRows})>:nth-child(6)`)
                .invoke("text")
                .then((parts) => {
                    cy.log("Total Participants: " + successPartis + "- Should be: " + successPartis.toString());
                    expect(parts.trim()).equal(successPartis.toString());
                    expect(successPartis).equal(parts.trim());
                   cy.log("DB callParticipants: " + successPartis + "- Console Participants: " + parts.trim());
                });
            cy.get(`.table.table-hover>tbody>tr:nth-child(${nRows})>:nth-child(8)`)
                .invoke("text")
                .then((usdSpent) => {
                    cy.log("USD Spent: " + usdSpent + "- Should be: "+ cTime * successPartis * minCharge).toString();
                    expect(usdSpent.trim()).equal(
                        (cTime * successPartis * minCharge).toString()
                    );
                    expect(db_success[1].charged_amount_in_unit).equal(duration * 40);
                   cy.log("DB Charge in Units: " + db_success[1].charged_amount_in_unit + "- calculation value (duration x perMinuteUnitsCharge[40]): " + duration * 40);
                });
        });

    });
});
