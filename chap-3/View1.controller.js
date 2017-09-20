sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("personslist.controller.View1", {
		onInit: function() {
		//ToDo: These two models needs to merged into one.
			var personModel = new JSONModel();
			this.getView().setModel(personModel, "person");
			var oDataModel = new sap.ui.model.odata.ODataModel("/personslist-jpa/personslist.svc");
			oDataModel.read("/Persons",
					 null,
					 null,
					 false,
					 function _OnSuccess(oData, response) {
						 var data = { "Persons" : oData.results };
						 personModel.setData(data);
					 }
				   );		
			
			
			var oBar = new sap.m.Bar({
				contentLeft: [new sap.m.Image({
					src: "https://www.sap.com/dam/application/shared/logos/sap-logo.png.adapt.72_36.false.false.false.false.png",
					height: "45px"
				})],
				contentMiddle: [new sap.m.Label({
					text: "{i18n>title}",
					textAlign: "Left",
					design: "Bold"
				})],
				contentRight: []
			});
			var oPage = this.getView().byId("idpage");
			oPage.setCustomHeader(oBar);
		},
		onPress: function(oEvent){
			//ToDo: These two models needs to merged into one.
            var oDataModel = new sap.ui.model.odata.ODataModel("/personslist-jpa/personslist.svc");
            var personModel = this.getView().getModel("person");
			var oLastName = this.getView().byId("idlastname").getValue();
			var oFirstName = this.getView().byId("idfirstname").getValue();
			
			var person = {};
			person.FirstName = oFirstName;
			person.LastName = oLastName;
			
			oDataModel.create("/Persons",person);
			oDataModel.read("/Persons",
				 null,
				 null,
				 false,
				 function _OnSuccess(oData, response) {
					 var data = { "Persons" : oData.results };
					 personModel.setData(data);
				 }
			   );		
			
	   }

  });						
});