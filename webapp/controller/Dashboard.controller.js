sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"

], function(Controller, MessageBox, MessageToast,Fragment,History) {
	"use strict";
	
	return Controller.extend("EmployeeLoginEmployeeLogin.controller.Dashboard", {
		onInit: function() {
			window.console.log("initialized");
			var sModel = sap.ui.getCore().getModel("baseInfo");
			var myData = sModel.getData();
			var arr = [];
			var oTableID = this.getView().byId("empdetails");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(arr);
			oTableID.setModel(oModel);
			window.console.log(myData);
			var oTab = this.getView().byId("empdetails").getModel().getProperty("/");
			oTab.push(myData);
			this.getView().byId("empdetails").getModel().setProperty("/",oTab);
			
		},
		
		onBack : function(evt){
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if(sPreviousHash !== undefined){
				window.history.go(-1);
			}else{
				this.getOwnerComponent().getRouter().navTo("View1");
			}
		}

	});
});